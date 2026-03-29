import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const DRY_RUN = false;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Normalises a string for loose comparison
function normalise(str) {
  if (!str) return "";
  return str.toLowerCase().trim().replace(/\s+/g, " ");
}

// Returns true if two strings match after normalisation
function looslyMatches(a, b) {
  if (!a || !b) return false;
  return normalise(a) === normalise(b);
}

// Rule-based checks: survey number, district, title chain, consideration amount
function runRuleBasedChecks(extractions) {
  const flags = [];

  const surveyNumbers = extractions
    .map(e => e.property?.survey_number)
    .filter(s => s !== null && s !== undefined);

  const uniqueSurveys = [...new Set(surveyNumbers.map(s => normalise(s)))];
  if (uniqueSurveys.length > 1) {
    flags.push({
      severity: "critical",
      field: "property.survey_number",
      values: surveyNumbers,
      description: `Survey numbers do not match across documents: ${surveyNumbers.join(" vs ")}`,
      recommendation: "Verify which survey number is correct with the Sub-Registrar office. Do not proceed until resolved."
    });
  }

  const districts = extractions
    .map(e => e.property?.district)
    .filter(d => d !== null && d !== undefined);

  const uniqueDistricts = [...new Set(districts.map(d => normalise(d)))];
  if (uniqueDistricts.length > 1) {
    flags.push({
      severity: "warning",
      field: "property.district",
      values: districts,
      description: `District names differ across documents: ${districts.join(" vs ")}`,
      recommendation: "Confirm the correct district. Could be a clerical error or a genuine mismatch."
    });
  }

  const deedsOnly = extractions.filter(e =>
    e.doc_type?.toLowerCase().includes("sale deed") ||
    e.doc_type?.toLowerCase().includes("deed")
  );

  if (deedsOnly.length > 1) {
    for (let i = 0; i < deedsOnly.length - 1; i++) {
      const currentBuyer = deedsOnly[i].parties?.buyer?.name;
      const nextSeller = deedsOnly[i + 1].parties?.seller?.name;

      if (!looslyMatches(currentBuyer, nextSeller)) {
        flags.push({
          severity: "critical",
          field: "title_chain",
          values: [currentBuyer, nextSeller],
          description: `Title chain is broken. Buyer in document ${i + 1} ("${currentBuyer}") does not match seller in document ${i + 2} ("${nextSeller}")`,
          recommendation: "Missing link in ownership chain. Obtain the intermediate sale deed or gift deed that transferred ownership."
        });
      }
    }
  }

  extractions.forEach((e, i) => {
    const amount = e.transaction?.consideration_amount;
    if (amount) {
      const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
      if (numericAmount < 1000) {
        flags.push({
          severity: "warning",
          field: "transaction.consideration_amount",
          values: [amount],
          description: `Document ${i + 1} has unusually low consideration amount: ₹${amount}. Possible undervaluation or benami transaction.`,
          recommendation: "Verify market value with local Sub-Registrar. Stamp duty should be paid on market value, not declared value."
        });
      }
    }
  });

  return flags;
}

// AI-based checks: asks Gemini to find deeper inconsistencies
async function runGeminiChecks(extractions) {
  if (DRY_RUN) {
    console.log("DRY RUN — returning mock Gemini cross-reference flags");
    return [
      {
        severity: "warning",
        field: "parties.seller.name",
        values: ["KUDIKALA SUDHAKAR RAO", "KUDIKALA SUDHAKAR RAU"],
        description: "Possible name spelling variation detected across documents. 'RAO' vs 'RAU' — could be the same person or a different individual.",
        recommendation: "Request original ID proof from seller to confirm identity."
      }
    ];
  }

  const prompt = `
    You are a senior Indian property lawyer and title verification expert.
    
    Below is extracted data from ${extractions.length} property documents
    that should all relate to the same property and ownership chain.
    
    Extracted data:
    ${JSON.stringify(extractions, null, 2)}
    
    Your job is to find EVERY inconsistency, ambiguity, or red flag.
    Be paranoid. Be thorough. A missed issue could cost someone crores.
    
    Look specifically for:
    - Name spelling variations that could indicate different people
    - Address inconsistencies
    - Suspicious consideration amounts vs property location
    - Missing or unusual witnesses
    - Any dates that seem chronologically wrong
    - Any field that seems unusual for a ${extractions[0]?.state} property document
    
    Return ONLY a valid JSON array of flags. No explanation outside the JSON.
    If no issues found, return an empty array [].
    
    Each flag must follow this exact structure:
    {
      "severity": "critical or warning or info",
      "field": "which field has the issue",
      "values": ["value from doc 1", "value from doc 2"],
      "description": "plain English explanation a non-lawyer can understand",
      "recommendation": "exactly what the lawyer should do about this"
    }
  `;

  await sleep(4000);

  let cleanText = "";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const rawText = response.text;
    cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  } catch (apiError) {
    console.warn("Gemini cross-reference API failed:", apiError.message);
    return [];
  }

  try {
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Gemini cross-reference parse failed:", cleanText);
    return [];
  }
}

// Returns overall risk level based on flags
function calculateRisk(flags) {
  if (flags.some(f => f.severity === "critical")) return "critical";
  if (flags.some(f => f.severity === "warning")) return "high";
  if (flags.length > 0) return "medium";
  return "low";
}

// Cross-references multiple extracted documents and returns a combined result
export async function crossReferenceDocuments(extractions) {
  console.log(`\nCross-referencing ${extractions.length} document(s)...`);

  const ruleFlags = runRuleBasedChecks(extractions);
  console.log(`Rule-based checks found ${ruleFlags.length} flag(s)`);

  const geminiFlags = await runGeminiChecks(extractions);
  console.log(`Gemini checks found ${geminiFlags.length} flag(s)`);

  const allFlags = [...ruleFlags, ...geminiFlags];
  const overallRisk = calculateRisk(allFlags);

  const deedsOnly = extractions.filter(e => e.doc_type?.toLowerCase().includes("deed"));
  const titleChain = deedsOnly.map(d => ({
    owner: d.parties?.buyer?.name,
    date: d.transaction?.registration_date,
    doc: d.doc_type
  }));

  return {
    total_documents: extractions.length,
    flags: allFlags,
    flag_count: allFlags.length,
    critical_count: allFlags.filter(f => f.severity === "critical").length,
    warning_count: allFlags.filter(f => f.severity === "warning").length,
    overall_risk: overallRisk,
    title_chain: titleChain,
    is_title_chain_continuous: !allFlags.some(f => f.field === "title_chain"),
    summary: generateSummary(allFlags, overallRisk, extractions.length)
  };
}

// Generates a plain English summary
function generateSummary(flags, risk, docCount) {
  if (flags.length === 0) {
    return `All ${docCount} documents are consistent. No issues found. Title appears clear.`;
  }

  const criticals = flags.filter(f => f.severity === "critical").length;
  const warnings = flags.filter(f => f.severity === "warning").length;

  let summary = `Verification of ${docCount} documents found ${flags.length} issue(s): `;
  if (criticals > 0) summary += `${criticals} critical issue(s) requiring immediate attention. `;
  if (warnings > 0) summary += `${warnings} warning(s) to review. `;
  summary += `Overall risk level: ${risk.toUpperCase()}.`;

  return summary;
}

// Test block — mock data with deliberate mismatches
const mockExtractions = [
  {
    doc_type: "Sale Deed",
    state: "Telangana",
    parties: {
      seller: { name: "ORIGINAL OWNER", father_or_husband_name: "Someone" },
      buyer:  { name: "KUDIKALA SUDHAKAR RAO", father_or_husband_name: "Kupender" }
    },
    property: { survey_number: "381", district: "Warangal", state: "Telangana" },
    transaction: { consideration_amount: "50,00,000", registration_date: "15 March 2019" }
  },
  {
    doc_type: "Sale Deed",
    state: "Telangana",
    parties: {
      seller: { name: "KUDIKALA SUDHAKAR RAU", father_or_husband_name: "Kupender" },
      buyer:  { name: "KURMANI SUMALATHA", father_or_husband_name: "K. Raj Kumar" }
    },
    property: { survey_number: "381/A", district: "Warangal", state: "Telangana" },
    transaction: { consideration_amount: "100", registration_date: "10 April 2023" }
  }
];

const result = await crossReferenceDocuments(mockExtractions);

console.log("\n=== CROSS REFERENCE RESULT ===");
console.log(JSON.stringify(result, null, 2));

console.log("\n=== SUMMARY ===");
console.log("Overall Risk:", result.overall_risk.toUpperCase());
console.log("Total Flags:", result.flag_count);
console.log("Summary:", result.summary);
console.log("\nFlags:");
result.flags.forEach((flag) => {
  console.log(`\n  [${flag.severity.toUpperCase()}] ${flag.field}`);
  console.log(`  ${flag.description}`);
  console.log(`  → ${flag.recommendation}`);
});