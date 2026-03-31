
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

// ─── SHARED CONFIG ───
// Flip to false when Gemini quota is restored
export const DRY_RUN = false;
export const RATE_LIMIT_DELAY_MS = 4000;

// ─── SHARED CLIENT ───
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── SHARED SLEEP ───
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── SHARED UPLOAD ───
export async function uploadToGemini(buffer, mimeType, filename) {

  if (DRY_RUN) {
    console.log(`DRY RUN — skipping upload for ${filename}`);
    return { uri: "mock-uri-" + filename, mimeType };
  }

  const result = await ai.files.upload({
    file: new Blob([buffer], { type: mimeType }),
    config: { mimeType, displayName: filename }
  });

  console.log(`Uploaded: ${filename} → ${result.uri}`);
  return result;
}

// ─── SHARED EXTRACTION ───
export async function extractFields(uploadedFile, documentType, state) {

  console.log(`Extracting: ${documentType} (${state})`);

  // ── DRY RUN MOCK DATA ──
  if (DRY_RUN) {
    console.log("DRY RUN — returning mock extracted data");

    const mocks = {
      sale_deed: {
        doc_type: "Sale Deed",
        state,
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
          area_sqft: "1200",
          locality: "Shivanagar",
          district: "Warangal",
          state
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

      ec: {
        doc_type: "Encumbrance Certificate",
        state,
        confidence: "high",
        parties: {
          seller: {
            name: "KUDIKALA SUDHAKAR RAO",
            father_or_husband_name: null,
            address: null
          },
          buyer: {
            name: "KURMANI SUMALATHA",
            father_or_husband_name: null,
            address: null
          }
        },
        property: {
          survey_number: "381",
          plot_number: null,
          area_sqft: "1200",
          locality: "Shivanagar",
          district: "Warangal",
          state
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
      },

      pahani: {
        doc_type: "Pahani / Adangal",
        state,
        confidence: "high",
        parties: {
          seller: {
            name: "KUDIKALA SUDHAKAR RAO",
            father_or_husband_name: null,
            address: null
          },
          buyer: { name: null, father_or_husband_name: null, address: null }
        },
        property: {
          survey_number: "381",
          plot_number: null,
          area_sqft: "1200",
          locality: "Shivanagar",
          district: "Warangal",
          state
        },
        transaction: {
          consideration_amount: null,
          stamp_duty_paid: null,
          registration_date: null,
          registration_number: null,
          sub_registrar_office: null
        },
        encumbrances_mentioned: [],
        witnesses: [],
        extraction_notes: "DRY RUN mock Pahani data"
      }
    };

    // Return matching mock or fall back to sale_deed mock
    return mocks[documentType] || mocks["sale_deed"];
  }

  // ── REAL GEMINI CALL ──
  const prompt = `
    You are an expert Indian property lawyer specialising in ${state} state.
    This document is a: ${documentType}

    Extract every important field from this document.

    Rules:
    - Return ONLY a valid JSON object
    - No markdown, no backticks, no explanation before or after
    - If a field is not found return null
    - Do not guess or invent values
    - Preserve exact spelling of names as written in the document
    - Your entire response must start with { and end with }

    Return this exact structure:
    {
      "doc_type": "${documentType}",
      "state": "${state}",
      "confidence": "high or medium or low",
      "parties": {
        "seller": {
          "name": null,
          "father_or_husband_name": null,
          "address": null
        },
        "buyer": {
          "name": null,
          "father_or_husband_name": null,
          "address": null
        }
      },
      "property": {
        "survey_number": null,
        "plot_number": null,
        "area_sqft": null,
        "locality": null,
        "district": null,
        "state": null
      },
      "transaction": {
        "consideration_amount": null,
        "stamp_duty_paid": null,
        "registration_date": null,
        "registration_number": null,
        "sub_registrar_office": null
      },
      "encumbrances_mentioned": [],
      "witnesses": [],
      "extraction_notes": "any issues reading this document"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{
      role: "user",
      parts: [
        {
          fileData: {
            mimeType: uploadedFile.mimeType,
            fileUri: uploadedFile.uri
          }
        },
        { text: prompt }
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
    console.log(`Extraction successful: ${documentType}`);
    return parsed;
  } catch (e) {
    console.error("Parse failed. Raw response:", rawText);
    return {
      doc_type: documentType,
      error: true,
      error_message: "Could not parse Gemini response",
      raw_response: rawText
    };
  }
}