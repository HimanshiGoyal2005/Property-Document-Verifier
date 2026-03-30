
import {
  uploadToGemini,
  extractFields,
  sleep,
  DRY_RUN,
  RATE_LIMIT_DELAY_MS
} from "./gemini.js";

import { crossReferenceDocuments } from "./cross-reference.js";
import { checkStateCompliance, detectDocumentType } from "./rules.js";
import { saveReport } from "./store.js";

// ─── MAIN PIPELINE ───
// files   = array of { buffer, mimeType, filename }
// state   = "Telangana" | "Maharashtra" | "Karnataka" | "Uttar Pradesh"
// sendProgress = function(step, message, status) for SSE streaming

export async function runPipeline(files, state, sendProgress) {

  const reportId = crypto.randomUUID();
  const extractions = [];

  // ── STEP 1: Upload and extract each document ──
  sendProgress("step_1", "Uploading and reading documents...", "running");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const docType = detectDocumentType(file.filename);

    console.log(`\nProcessing file ${i + 1}/${files.length}: ${file.filename} → type: ${docType}`);

    // Upload to Gemini File API
    const uploaded = await uploadToGemini(
      file.buffer,
      file.mimeType,
      file.filename
    );

    // Rate limit between calls — only needed for real API
    if (!DRY_RUN && i > 0) {
      await sleep(RATE_LIMIT_DELAY_MS);
    }

    // Extract structured fields
    const extracted = await extractFields(uploaded, docType, state);
    extractions.push(extracted);

    sendProgress(
      "step_1",
      `Read document ${i + 1} of ${files.length}: ${file.filename}`,
      "running"
    );
  }

  sendProgress("step_1", "All documents read successfully", "done");

  // ── STEP 2: Cross-reference all extractions ──
  sendProgress("step_2", "Cross-referencing documents...", "running");
  await sleep(500);

  const crossRef = await crossReferenceDocuments(extractions);

  sendProgress(
    "step_2",
    `Found ${crossRef.flag_count} issue(s) across documents`,
    "done"
  );

  // ── STEP 3: State compliance check ──
  sendProgress("step_3", `Checking ${state} state requirements...`, "running");
  await sleep(500);

  // Map extracted doc types to rule engine codes
  const uploadedDocTypes = extractions.map(e =>
    detectDocumentType(e.doc_type || "unknown")
  );

  const compliance = checkStateCompliance(state, uploadedDocTypes);

  sendProgress(
    "step_3",
    compliance.compliant
      ? "All required documents present"
      : `Missing: ${compliance.missing_documents.join(", ")}`,
    "done"
  );

  // ── STEP 4: Assemble final report ──
  sendProgress("step_4", "Generating due diligence report...", "running");

  // Merge all flags from cross-reference and compliance
  const allFlags = [
    ...crossRef.flags,
    ...compliance.flags
  ];

  // Take worst risk level between cross-reference and compliance
  const riskOrder = { low: 0, medium: 1, high: 2, critical: 3 };
  const complianceRisk = compliance.compliant ? "low" : "high";
  const finalRisk = [crossRef.overall_risk, complianceRisk]
    .sort((a, b) => riskOrder[b] - riskOrder[a])[0];

  const report = {
    id: reportId,
    state,
    created_at: new Date().toISOString(),
    overall_risk: finalRisk,
    summary: buildSummary(allFlags, finalRisk, files.length, compliance),
    documents: extractions,
    cross_reference: crossRef,
    compliance,
    all_flags: allFlags,
    flag_count: allFlags.length,
    critical_count: allFlags.filter(f => f.severity === "critical").length,
    warning_count: allFlags.filter(f => f.severity === "warning").length,
    title_chain: crossRef.title_chain,
    is_title_chain_continuous: crossRef.is_title_chain_continuous
  };

  // Save to persistent store
  saveReport(reportId, report);

  sendProgress("step_4", "Report ready", "done");

  return reportId;
}

// ─── SUMMARY BUILDER ───
function buildSummary(flags, risk, docCount, compliance) {

  if (flags.length === 0 && compliance.compliant) {
    return `All ${docCount} document(s) verified successfully. No issues found. Title appears clear and transaction can proceed.`;
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