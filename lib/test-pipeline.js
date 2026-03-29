import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";
import { runPipeline } from "./pipeline.js";
import { getReport } from "./store.js";

dotenv.config();

async function main() {
  console.log("=== PROPCHECK PIPELINE TEST ===\n");

  // Mock file inputs — real usage sends browser-uploaded buffers
  const testFiles = [
    {
      buffer: Buffer.from("mock pdf content 1"),
      mimeType: "application/pdf",
      filename: "sale-deed-2019.pdf"
    },
    {
      buffer: Buffer.from("mock pdf content 2"),
      mimeType: "application/pdf",
      filename: "encumbrance-certificate.pdf"
    }
  ];

  const state = "Telangana";

  // Progress callback — real usage streams this to the frontend
  const sendProgress = (step, message, status) => {
    const icon = status === "done" ? "✓" : status === "running" ? "⟳" : "✗";
    console.log(`${icon} [${step}] ${message}`);
  };

  try {
    console.log(`Running pipeline for ${state}...\n`);

    const reportId = await runPipeline(testFiles, state, sendProgress);
    console.log(`\nPipeline complete. Report ID: ${reportId}`);

    const report = getReport(reportId);

    console.log("\n=== FINAL REPORT ===");
    console.log("Overall Risk:  ", report.overall_risk.toUpperCase());
    console.log("Total Flags:   ", report.flag_count);
    console.log("Critical:      ", report.critical_count);
    console.log("Warnings:      ", report.warning_count);
    console.log("Compliant:     ", report.compliance.compliant);
    console.log("Summary:       ", report.summary);

    console.log("\n=== FLAGS ===");
    report.all_flags.forEach((flag, i) => {
      console.log(`\n${i + 1}. [${flag.severity.toUpperCase()}] ${flag.field}`);
      console.log(`   ${flag.description}`);
      console.log(`   → ${flag.recommendation}`);
    });

    console.log("\n=== TITLE CHAIN ===");
    if (report.title_chain.length === 0) {
      console.log("No deeds found to build title chain");
    } else {
      report.title_chain.forEach((link, i) => {
        console.log(`${i + 1}. ${link.owner} (${link.date})`);
      });
    }

    console.log("\n=== COMPLIANCE ===");
    console.log("State:    ", report.compliance.state);
    console.log("Missing:  ", report.compliance.missing_documents.join(", ") || "None");
    console.log("Notes:");
    report.compliance.notes?.forEach(n => console.log("  •", n));

  } catch (error) {
    console.error("Pipeline failed:", error.message);
    console.error(error.stack);
  }
}

main();