import { useState } from "react";
import { TOKEN } from "../constants/tokens.js";
import { MOCK_REPORT } from "../data/mockReport.js";
import { Logo } from "./Logo.jsx";
import { UploadZone } from "./UploadZone.jsx";
import { StateSelector } from "./StateSelector.jsx";
import { AgentProgress } from "./AgentProgress.jsx";
import { Icon } from "../icons/index.jsx";

export function UploadPage({ onAnalyse }) {
  const [files, setFiles] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepStatuses, setStepStatuses] = useState({});
  const [error, setError] = useState(null);

  const canAnalyse = files.length > 0 && selectedState && !loading;

  const runDemo = async () => {
    setLoading(true);
    setError(null);
    setStepStatuses({});

    // Simulate SSE steps
    const steps = ["step_1", "step_2", "step_3", "step_4"];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 100));
      setStepStatuses((prev) => ({ ...prev, [steps[i]]: "running" }));
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
      setStepStatuses((prev) => ({ ...prev, [steps[i]]: "done" }));
    }
    await new Promise((r) => setTimeout(r, 400));
    onAnalyse(MOCK_REPORT);
  };

  if (loading) {
    return (
      <div
        style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px" }}
        className="fade-in"
      >
        <Logo />
        <div style={{ marginTop: 40 }}>
          <AgentProgress stepStatuses={stepStatuses} />
          {error && (
            <div
              style={{
                marginTop: 16,
                padding: "14px 16px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 10,
              }}
            >
              <p style={{ color: TOKEN.danger, fontSize: 14 }}>{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px" }}
      className="fade-in"
    >
      <Logo />

      <div style={{ marginTop: 48 }}>
        <div className="card" style={{ padding: "32px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 600,
              color: TOKEN.textPrimary,
              marginBottom: 6,
            }}
          >
            Verify property documents
          </h2>
          <p
            style={{
              fontSize: 14,
              color: TOKEN.textSecondary,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Upload your documents and let PropCheck AI cross-reference them for
            discrepancies, title chain issues, and state compliance.
          </p>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: TOKEN.textPrimary,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Property Documents
            </label>
            <UploadZone files={files} setFiles={setFiles} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: TOKEN.textPrimary,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Property State
            </label>
            <StateSelector
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />
          </div>

          <button
            className="btn-primary"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            disabled={!canAnalyse}
            onClick={runDemo}
          >
            <Icon.Shield size={16} />
            Run PropCheck Analysis
          </button>

          {(!files.length || !selectedState) && (
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: TOKEN.textMuted,
                marginTop: 10,
              }}
            >
              {!files.length
                ? "Upload at least one document"
                : "Select a state to continue"}
            </p>
          )}
        </div>

        {/* Demo hint */}
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: TOKEN.warning }}>
            <strong>Demo mode:</strong> Upload any file, select any state, click
            Analyse to see a sample critical-risk report.
          </p>
        </div>
      </div>
    </div>
  );
}
