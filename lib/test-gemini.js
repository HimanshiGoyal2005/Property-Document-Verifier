// Standalone test — uploads a real file to Gemini and extracts fields

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";

dotenv.config();

const DRY_RUN = false;
const RATE_LIMIT_DELAY_MS = 4000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Uploads a local file to Gemini Files API
async function uploadDocument(filepath) {
  if (DRY_RUN) {
    console.log("DRY RUN — skipping upload");
    return { uri: "mock-uri", mimeType: "application/pdf" };
  }

  console.log(`Uploading: ${filepath}`);

  const ext = path.extname(filepath).toLowerCase();
  const mimeTypes = {
    ".pdf":  "application/pdf",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png":  "image/png",
    ".webp": "image/webp"
  };
  const mimeType = mimeTypes[ext] || "application/pdf";
  const fileBuffer = fs.readFileSync(filepath);

  const result = await ai.files.upload({
    file: new Blob([fileBuffer], { type: mimeType }),
    config: { mimeType, displayName: path.basename(filepath) }
  });

  console.log(`Upload successful: ${result.uri}`);
  return result;
}

// Extracts structured fields from a document using Gemini
async function extractDocumentFields(uploadedFile, documentType, state) {
  console.log(`Extracting fields from ${documentType}...`);

  if (DRY_RUN) {
    console.log("DRY RUN — returning mock extracted data");
    return {
      doc_type: documentType,
      state: state,
      confidence: "high",
      parties: {
        seller: {
          name: "KUDIKALA SUDHAKAR RAO",
          father_or_husband_name: "Kupender",
          address: "H.No. 16-10-1112, Shivanagar, Warangal City and District"
        },
        buyer: {
          name: "KURMANI SUMALATHA",
          father_or_husband_name: "K. Raj Kumar",
          address: "H.No. 16-9-908, A.C. Reddy Nagar, Shivanagar, Warangal"
        }
      },
      property: {
        survey_number: "381",
        plot_number: null,
        area_sqft: null,
        locality: "Shivanagar",
        district: "Warangal",
        state: "Telangana"
      },
      transaction: {
        consideration_amount: "100",
        stamp_duty_paid: "100",
        registration_date: "10 April 2023",
        registration_number: "AW 900378",
        sub_registrar_office: "Warangal"
      },
      encumbrances_mentioned: [],
      witnesses: [],
      extraction_notes: "DRY RUN — mock data"
    };
  }

  const extractionPrompt = `
    You are an expert Indian property lawyer specialising in ${state} state.
    This document is a: ${documentType}
    
    Extract every important field from this document.
    
    Rules:
    - Return ONLY a valid JSON object
    - No markdown, no backticks, no explanation before or after
    - If a field is not found, return null for that field
    - Do not guess or invent values
    - Preserve exact spelling of names as written
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

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{
      role: "user",
      parts: [
        { fileData: { mimeType: uploadedFile.mimeType, fileUri: uploadedFile.uri } },
        { text: extractionPrompt }
      ]
    }]
  });

  const rawText = response.text;
  const cleanText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleanText);
    console.log(`Extraction successful for ${documentType}`);
    return parsed;
  } catch (parseError) {
    console.error("JSON parse failed. Raw response was:");
    console.error(rawText);
    return {
      doc_type: documentType,
      error: true,
      error_message: "Could not parse Gemini response",
      raw_response: rawText
    };
  }
}

async function main() {
  const testFilePath = "./public/sample-sale-deed.webp";

  if (!fs.existsSync(testFilePath)) {
    console.error(`File not found: ${testFilePath}`);
    console.error("Put a sample document in the public/ folder");
    return;
  }

  try {
    const uploaded = await uploadDocument(testFilePath);
    await sleep(RATE_LIMIT_DELAY_MS);

    const extracted = await extractDocumentFields(uploaded, "Sale Deed", "Telangana");

    console.log("\n=== EXTRACTED DATA ===");
    console.log(JSON.stringify(extracted, null, 2));
    if (extracted.error) {
      console.log("\nExtraction had errors. See above.");
    } else {
      console.log("\n=== KEY FIELDS ===");
      console.log("Seller:        ", extracted.parties?.seller?.name);
      console.log("Buyer:         ", extracted.parties?.buyer?.name);
      console.log("Survey Number: ", extracted.property?.survey_number);
      console.log("Amount:        ", extracted.transaction?.consideration_amount);
      console.log("Date:          ", extracted.transaction?.registration_date);
      console.log("Confidence:    ", extracted.confidence);
    }

  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

main();