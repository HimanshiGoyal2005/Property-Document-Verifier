import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { crossReferenceDocuments } from "./cross-reference.js";
import { checkStateCompliance, detectDocumentType } from "./rules.js";
import { saveReport } from "./store.js";

const DRY_RUN = false;
const RATE_LIMIT_DELAY_MS = 4000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Uploads a file buffer to Gemini Files API
async function uploadToGemini(buffer, mimeType, filename) {
  if (DRY_RUN) {
    return { uri: "mock-uri-" + filename, mimeType };
  }

  const result = await ai.files.upload({
    file: new Blob([buffer], { type: mimeType }),
    config: { mimeType, displayName: filename }
  });

  return result;
}

// Extracts structured fields from a document using Gemini
async function extractFields(uploadedFile, documentType, state) {
  if (DRY_RUN) {
    const mocks = {
      "sale_deed": {
        doc_type: "Sale Deed",
        state: state,
        confidence: "high",
        parties: {
          seller: {
            name: "KUDIKALA SUDHAKAR RAO",
            father_or_husband_name: "Kupender",
            address: "H.No. 16-10-1112, Shivanagar, Warangal"
          },
          buyer: {
            name: "KURMANI SUMALATHA",
            father_or_husband_name: "K. Raj Kumar",
            address: "H.No. 16-9-908, A.C. Reddy Nagar, Warangal"
          }
        },
        property: {
          survey_number: "381",
          plot_number: null,
          area_sqft: "1200",
          locality: "Shivanagar",
          district: "Warangal",
          state: state
        },
        transaction: {
          consideration_amount: "85,00,000",
          stamp_duty_paid: "4,25,000",
          registration_date: "10 April 2023",
          registration_number: "AW 900378",
          sub_registrar_office: "Warangal"
        },
        encumbrances_mentioned: [],
        witnesses: ["Witness 1", "Witness 2"],
        extraction_notes: "DRY RUN mock data"
      },
      "ec": {
        doc_type: "Encumbrance Certificate",
        state: state,
        confidence: "high",
        parties: {
          seller: { name: "KUDIKALA SUDHAKAR RAO", father_or_husband_name: null, address: null },
          buyer: { name: "KURMANI SUMALATHA", father_or_husband_name: null, address: null }
        },
        property: {
          survey_number: "381",
          plot_number: null,
          area_sqft: "1200",
          locality: "Shivanagar",
          district: "Warangal",
          state: state
        },
        transaction: {
          consideration_amount: null,
          stamp_duty_paid: null,
          registration_date: null,
          registration_number: null,
          sub_registrar_office: "Warangal"
        },
        encumbrances_mentioned: [],
        witnesses: [],
        extraction_notes: "DRY RUN mock EC data"
      }
    };

    return mocks[documentType] || mocks["sale_deed"];
  }

  const prompt = `
    You are an expert Indian property lawyer specialising in ${state} state.
    This document is a: ${documentType}
    
    Extract every important field from this document.
    Rules:
    - Return ONLY a valid JSON object
    - No markdown, no backticks, no explanation
    - If a field is not found return null
    - Do not guess or invent values
    - Your entire response must start with { and end with }
    
    Return this exact structure:
    {
      "doc_type": "${documentType}",
      "state": "${state}",
      "confidence": "high or medium or low",
      "parties": {
        "seller": { "name": null, "father_or_husband_name": null, "address": null },
        "buyer": { "name": null, "father_or_husband_name": null, "address": null }
      },
      "property": {
        "survey_number": null, "plot_number": null, "area_sqft": null,
        "locality": null, "district": null, "state": null
      },
      "transaction": {
        "consideration_amount": null, "stamp_duty_paid": null,
        "registration_date": null, "registration_number": null,
        "sub_registrar_office": null
      },
      "encumbrances_mentioned": [],
      "witnesses": [],
      "extraction_notes": "any issues reading this document"
    }
  `;

  let cleanText = "";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [
          { fileData: { mimeType: uploadedFile.mimeType, fileUri: uploadedFile.uri }},
          { text: prompt }
        ]
      }]
    });

    const rawText = response.text;
    cleanText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch (apiError) {
    console.warn(`Gemini extraction failed for ${documentType}:`, apiError.message);
    return {
      doc_type: documentType,
      error: true,
      error_message: "Gemini API failed (possibly high load)",
      raw_response: ""
    };
  }

  try {
    return JSON.parse(cleanText);
  } catch (e) {
    return {
      doc_type: documentType,
      error: true,
      error_message: "Parse failed",
      raw_response: cleanText
    };
  }
}

// Main pipeline: upload → extract → cross-reference → compliance → report
export async function runPipeline(files, state, sendProgress) {
  const reportId = crypto.randomUUID();
  const extractions = [];

  sendProgress("step_1", "Uploading and reading documents...", "running");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const docType = detectDocumentType(file.filename);

    console.log(`Processing file ${i + 1}/${files.length}: ${file.filename}`);

    const uploaded = await uploadToGemini(file.buffer, file.mimeType, file.filename);

    if (!DRY_RUN && i > 0) await sleep(RATE_LIMIT_DELAY_MS);

    const extracted = await extractFields(uploaded, docType, state);
    extractions.push(extracted);

    sendProgress("step_1", `Read document ${i + 1} of ${files.length}: ${file.filename}`, "running");
  }

  sendProgress("step_1", "All documents read successfully", "done");

  sendProgress("step_2", "Cross-referencing documents...", "running");
  await sleep(500);

  const crossRef = await crossReferenceDocuments(extractions);
  sendProgress("step_2", `Found ${crossRef.flag_count} issue(s)`, "done");

  sendProgress("step_3", `Checking ${state} state requirements...`, "running");
  await sleep(500);

  const uploadedDocTypes = extractions.map(e => detectDocumentType(e.doc_type || "unknown"));
  const compliance = checkStateCompliance(state, uploadedDocTypes);

  sendProgress(
    "step_3",
    compliance.compliant ? "All required documents present" : `Missing: ${compliance.missing_documents.join(", ")}`,
    "done"
  );

  sendProgress("step_4", "Generating due diligence report...", "running");

  const allFlags = [...crossRef.flags, ...compliance.flags];

  const riskOrder = { "low": 0, "medium": 1, "high": 2, "critical": 3 };
  const finalRisk = [crossRef.overall_risk, compliance.compliant ? "low" : "high"]
    .sort((a, b) => riskOrder[b] - riskOrder[a])[0];

  const report = {
    id: reportId,
    state: state,
    created_at: new Date().toISOString(),
    overall_risk: finalRisk,
    summary: buildSummary(allFlags, finalRisk, files.length, compliance),
    documents: extractions,
    cross_reference: crossRef,
    compliance: compliance,
    all_flags: allFlags,
    flag_count: allFlags.length,
    critical_count: allFlags.filter(f => f.severity === "critical").length,
    warning_count: allFlags.filter(f => f.severity === "warning").length,
    title_chain: crossRef.title_chain
  };

  saveReport(reportId, report);
  sendProgress("step_4", "Report ready", "done");

  return reportId;
}

// Builds a plain English summary of the report
function buildSummary(flags, risk, docCount, compliance) {
  if (flags.length === 0 && compliance.compliant) {
    return `All ${docCount} documents verified successfully. No issues found. Title appears clear.`;
  }

  const criticals = flags.filter(f => f.severity === "critical").length;
  const warnings  = flags.filter(f => f.severity === "warning").length;
  const missing   = compliance.missing_documents.length;

  let summary = `Verification of ${docCount} document(s) completed. `;
  if (criticals > 0) summary += `${criticals} critical issue(s) require immediate attention. `;
  if (warnings  > 0) summary += `${warnings} warning(s) should be reviewed. `;
  if (missing   > 0) summary += `${missing} required document(s) are missing. `;
  summary += `Overall risk: ${risk.toUpperCase()}.`;

  return summary;
}