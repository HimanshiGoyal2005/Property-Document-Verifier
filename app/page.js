"use client";
import { useState, useRef, useCallback, useEffect } from "react";

// ── MOCK DATA ──────────────────────────────────────────────────────────────────
const MOCK_REPORT = {
  id: "demo-critical-001",
  state: "Maharashtra",
  created_at: new Date().toISOString(),
  overall_risk: "critical",
  summary: "Verification of 4 documents revealed critical discrepancies. Survey number mismatch and buyer name variation detected. Transaction must not proceed without resolution.",
  flag_count: 4,
  critical_count: 2,
  warning_count: 2,
  all_flags: [
    {
      severity: "critical",
      field: "property.survey_number",
      values: ["10/2", "10/3"],
      description: "Survey numbers do not match. Sale Deed states Gat No. 10/2 while Encumbrance Certificate records Gat No. 10/3.",
      recommendation: "Verify correct survey number with Sub-Registrar office, Dapoli. All documents must reflect the same Gat number before proceeding.",
    },
    {
      severity: "critical",
      field: "missing_document",
      values: ["Index II"],
      description: "Index II is mandatory in Maharashtra for all registered documents but was not found in the submission.",
      recommendation: "Obtain certified Index II from Sub-Registrar office, Dapoli before proceeding with this transaction.",
    },
    {
      severity: "warning",
      field: "parties.buyer.name",
      values: ["YASH DAGA", "YASH DAGGA"],
      description: "Buyer name spelling differs between Sale Deed (YASH DAGA) and 7/12 Extract (YASH DAGGA). Could indicate different individuals.",
      recommendation: "Request original government-issued ID proof from buyer to confirm identity and correct spelling.",
    },
    {
      severity: "warning",
      field: "transaction.consideration_amount",
      values: ["Rs. 40,00,000"],
      description: "Consideration amount should be verified against current market value for Ganpatipule, Dapoli area to confirm adequate stamp duty was paid.",
      recommendation: "Obtain current ready reckoner rates from the District Registrar and verify stamp duty adequacy.",
    },
  ],
  compliance: {
    state: "Maharashtra",
    compliant: false,
    missing_documents: ["Index II"],
    mandatory_required: ["Sale Deed", "Index II", "7/12 Extract", "Encumbrance Certificate"],
    uploaded_documents: ["sale_deed", "seven_twelve", "ec"],
    stamp_duty_rate: "5%",
    registration_fee_rate: "1%",
    notes: [
      "Index II is mandatory for all registered documents in Maharashtra",
      "7/12 Extract confirms land records from Revenue Department",
      "NA Order required if agricultural land converted to non-agricultural",
    ],
  },
  cross_reference: {
    is_title_chain_continuous: false,
    title_chain: [
      { owner: "KISHORE KARANDE", date: "15 March 2016", doc: "Sale Deed" },
      { owner: "YASH DAGA", date: "15 March 2016", doc: "Sale Deed" },
    ],
    flags: [],
    overall_risk: "critical",
  },
  documents: [
    {
      id: "doc-1",
      doc_type: "Sale Deed",
      confidence: "high",
      parties: {
        seller: { name: "KISHORE KARANDE", address: "751, Katraj, Pune 411035" },
        buyer: { name: "YASH DAGA", address: "S.No.18, Maruti Mandir, Ratnagiri 415612" },
      },
      property: { survey_number: "10/2", area_sqft: "5 Hectares 0 Ares", district: "Ratnagiri", locality: "Ganpatipule" },
      transaction: { consideration_amount: "Rs. 40,00,000", registration_date: "15 March 2016", registration_number: "MH-RGT-2016-04521" },
    },
    {
      id: "doc-2",
      doc_type: "7/12 Extract",
      confidence: "high",
      parties: {
        seller: { name: "KISHORE KARANDE", address: null },
        buyer: { name: "YASH DAGGA", address: null },
      },
      property: { survey_number: "10/2", area_sqft: "5 Hectares 0 Ares", district: "Ratnagiri", locality: "Ganpatipule" },
      transaction: { consideration_amount: null, registration_date: null, registration_number: null },
    },
    {
      id: "doc-3",
      doc_type: "Encumbrance Certificate",
      confidence: "medium",
      parties: {
        seller: { name: "KISHORE KARANDE", address: null },
        buyer: { name: "YASH DAGA", address: null },
      },
      property: { survey_number: "10/3", area_sqft: "5 Hectares 0 Ares", district: "Ratnagiri", locality: "Ganpatipule" },
      transaction: { consideration_amount: null, registration_date: "15 March 2016", registration_number: "MH-RGT-2016-04521" },
    },
  ],
};

const STATES = ["Maharashtra", "Karnataka", "Telangana", "Uttar Pradesh"];

const RISK_CONFIG = {
  low:      { label: "LOW RISK",      bg: "bg-emerald-50",  border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500", text: "text-emerald-700" },
  medium:   { label: "MEDIUM RISK",   bg: "bg-amber-50",    border: "border-amber-200",   badge: "bg-amber-100 text-amber-800",     dot: "bg-amber-500",   text: "text-amber-700"   },
  high:     { label: "HIGH RISK",     bg: "bg-orange-50",   border: "border-orange-200",  badge: "bg-orange-100 text-orange-800",   dot: "bg-orange-500",  text: "text-orange-700"  },
  critical: { label: "CRITICAL RISK", bg: "bg-red-50",      border: "border-red-200",     badge: "bg-red-100 text-red-800",         dot: "bg-red-500",     text: "text-red-700"     },
};

const SEV_CONFIG = {
  critical: { bar: "bg-red-500",    badge: "bg-red-100 text-red-700 border-red-200",    icon: "●", label: "CRITICAL" },
  warning:  { bar: "bg-amber-400",  badge: "bg-amber-100 text-amber-700 border-amber-200", icon: "▲", label: "WARNING"  },
  info:     { bar: "bg-blue-400",   badge: "bg-blue-100 text-blue-700 border-blue-200",  icon: "ℹ", label: "INFO"     },
};

const STEPS = [
  { id: "step_1", label: "Reading documents",       sub: "Gemini Vision extracts all fields" },
  { id: "step_2", label: "Cross-referencing",       sub: "Comparing fields across documents" },
  { id: "step_3", label: "State compliance check",  sub: "Verifying mandatory documents" },
  { id: "step_4", label: "Generating report",       sub: "Calculating risk and recommendations" },
];

// ── GLOBAL STYLES ──────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F5F0E8;
    --ink: #0D1117;
    --navy: #0F2744;
    --gold: #B8965A;
    --muted: #6B7280;
    --border: #E5E0D5;
    --surface: #FEFCF8;
  }

  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: var(--cream);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }

  .serif { font-family: 'Instrument Serif', Georgia, serif; }

  /* Upload zone */
  .drop-zone {
    border: 1.5px dashed var(--border);
    border-radius: 14px;
    background: var(--surface);
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .drop-zone::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(15,39,68,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .drop-zone:hover, .drop-zone.active {
    border-color: var(--navy);
    background: #F0F4FF;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(15,39,68,0.08);
  }

  /* Buttons */
  .btn-primary {
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.06), transparent);
    pointer-events: none;
  }
  .btn-primary:hover:not(:disabled) {
    background: #0a1e35;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(15,39,68,0.28);
  }
  .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    padding: 8px 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-ghost:hover { background: white; border-color: #9CA3AF; color: var(--ink); }

  /* Select */
  .state-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .state-select:focus {
    border-color: var(--navy);
    box-shadow: 0 0 0 3px rgba(15,39,68,0.08);
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.7; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .anim-up   { animation: fadeUp 0.5s ease both; }
  .anim-in   { animation: fadeIn 0.4s ease both; }
  .spinner   { animation: spin 0.75s linear infinite; }
  .pulse-dot { animation: pulse-dot 1.4s ease-in-out infinite; }

  .shimmer-bg {
    background: linear-gradient(90deg, #ede8df 25%, #e3ddd3 50%, #ede8df 75%);
    background-size: 800px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 6px;
  }

  /* Cards */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.04);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D1C9BA; border-radius: 10px; }

  /* Flag expand */
  details > summary { cursor: pointer; list-style: none; user-select: none; }
  details > summary::-webkit-details-marker { display: none; }
`;

// ── COMPONENTS ─────────────────────────────────────────────────────────────────

function Logo({ compact }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{
        width: compact ? 34 : 42, height: compact ? 34 : 42,
        borderRadius: 10, background: "var(--navy)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(15,39,68,0.25)",
        flexShrink: 0,
      }}>
        <svg width={compact ? 17 : 21} height={compact ? 17 : 21} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div>
        <h1 className="serif" style={{ fontSize: compact ? 18 : 22, color: "var(--navy)", lineHeight: 1, fontWeight: 400 }}>
          PropCheck <span style={{ color: "var(--gold)" }}>AI</span>
        </h1>
        {!compact && (
          <p style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
            Property verification in 60 seconds
          </p>
        )}
      </div>
    </div>
  );
}

function UploadZone({ files, setFiles }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming) => {
    const valid = Array.from(incoming).filter(f =>
      ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(f.type)
    );
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      return [...prev, ...valid.filter(f => !existing.has(f.name))].slice(0, 10);
    });
  };

  const onDrop = useCallback(e => {
    e.preventDefault(); setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = e => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  return (
    <div>
      <div
        className={`drop-zone ${dragging ? "active" : ""}`}
        style={{ padding: "32px 24px", textAlign: "center" }}
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp"
          style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />

        <div style={{
          width: 48, height: 48, borderRadius: 12, background: "rgba(15,39,68,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
          {dragging ? "Drop documents here" : "Upload property documents"}
        </p>
        <p style={{ fontSize: 12, color: "var(--muted)" }}>
          PDF, JPG, PNG, WEBP · Up to 10 files
        </p>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {files.map((file, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 14px", background: "white", borderRadius: 10,
              border: "1px solid var(--border)", fontSize: 13,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: "rgba(15,39,68,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <span style={{ color: "var(--ink)", fontWeight: 500, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setFiles(f => f.filter((_, j) => j !== i)); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "2px 4px", fontSize: 16, lineHeight: 1 }}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AgentProgress({ stepStatuses }) {
  return (
    <div className="card" style={{ padding: "28px 28px" }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
          Analysis Running
        </p>
        <p className="serif" style={{ fontSize: 22, color: "var(--navy)" }}>
          Verifying your documents...
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {STEPS.map((step, i) => {
          const status = stepStatuses[step.id] || "pending";
          const isDone    = status === "done";
          const isRunning = status === "running";

          return (
            <div key={step.id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "14px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
              opacity: status === "pending" ? 0.4 : 1,
              transition: "opacity 0.3s ease",
            }}>
              {/* Icon */}
              <div style={{
                width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? "var(--navy)" : isRunning ? "rgba(15,39,68,0.08)" : "rgba(0,0,0,0.04)",
                border: isRunning ? "1.5px solid var(--navy)" : "1.5px solid transparent",
                transition: "all 0.3s ease",
              }}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : isRunning ? (
                  <div className="spinner" style={{
                    width: 14, height: 14, border: "2px solid rgba(15,39,68,0.2)",
                    borderTop: "2px solid var(--navy)", borderRadius: "50%",
                  }}/>
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#CBD5E1" }}/>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
                  {step.label}
                </p>
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  {step.sub}
                </p>
              </div>

              {isDone && (
                <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", letterSpacing: "0.04em" }}>
                  DONE
                </span>
              )}
              {isRunning && (
                <div className="pulse-dot" style={{
                  width: 8, height: 8, borderRadius: "50%", background: "var(--navy)",
                }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RiskBanner({ report }) {
  const cfg = RISK_CONFIG[report.overall_risk] || RISK_CONFIG.low;

  return (
    <div style={{
      borderRadius: 16, padding: "28px 32px", marginBottom: 24,
      background: report.overall_risk === "critical" ? "#FFF1F2" : report.overall_risk === "high" ? "#FFF7ED" : "#F0FDF4",
      border: `1.5px solid ${report.overall_risk === "critical" ? "#FECDD3" : report.overall_risk === "high" ? "#FED7AA" : "#BBF7D0"}`,
    }} className="anim-up">

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em",
              background: report.overall_risk === "critical" ? "#DC2626" : report.overall_risk === "high" ? "#EA580C" : "#16A34A",
              color: "white",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)", display: "inline-block" }}/>
              {cfg.label}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              {report.state} · {new Date(report.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
            </span>
          </div>
          <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.7, maxWidth: 540 }}>
            {report.summary}
          </p>
        </div>

        <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
          {[
            { val: report.critical_count, label: "Critical", color: "#DC2626" },
            { val: report.warning_count,  label: "Warnings", color: "#D97706" },
            { val: report.flag_count,     label: "Total",    color: "var(--ink)" },
          ].map(({ val, label, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlagCard({ flag }) {
  const cfg = SEV_CONFIG[flag.severity] || SEV_CONFIG.info;
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderRadius: 12, background: "white", border: "1px solid var(--border)",
      overflow: "hidden", transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Severity bar */}
      <div style={{ height: 3, background: flag.severity === "critical" ? "#DC2626" : flag.severity === "warning" ? "#F59E0B" : "#3B82F6" }}/>

      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{
                padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.06em", border: "1px solid",
              }} className={cfg.badge}>
                {cfg.label}
              </span>
              <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>
                {flag.field}
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6 }}>
              {flag.description}
            </p>

            {flag.values && flag.values.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {flag.values.map((v, i) => (
                  <span key={i} style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                    background: i === 0 ? "rgba(15,39,68,0.06)" : "rgba(220,38,38,0.08)",
                    color: i === 0 ? "var(--navy)" : "#DC2626",
                    fontFamily: "monospace",
                  }}>
                    {v}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setOpen(!open)} style={{
            flexShrink: 0, background: "none", border: "none", cursor: "pointer",
            fontSize: 18, color: "var(--muted)", padding: "2px 6px",
            transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
          }}>
            ↓
          </button>
        </div>

        {open && (
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)",
          }} className="anim-in">
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              Recommendation
            </p>
            <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.7 }}>
              {flag.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TitleChain({ chain, continuous }) {
  if (!chain || chain.length === 0) {
    return <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>No deed chain found</p>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
      {chain.map((link, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            padding: "12px 16px", borderRadius: 12,
            background: "rgba(15,39,68,0.05)", border: "1px solid var(--border)",
            textAlign: "center", minWidth: 140,
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{link.owner}</p>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{link.date}</p>
            <p style={{ fontSize: 10, color: "var(--gold)", marginTop: 2, fontWeight: 500 }}>{link.doc}</p>
          </div>

          {i < chain.length - 1 && (
            <div style={{ textAlign: "center" }}>
              {continuous ? (
                <svg width="20" height="16" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6h20M15 1l5 5-5 5" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <svg width="20" height="16" viewBox="0 0 24 12" fill="none">
                    <path d="M0 6h20M15 1l5 5-5 5" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2"/>
                  </svg>
                  <p style={{ fontSize: 9, color: "#DC2626", fontWeight: 700, letterSpacing: "0.05em" }}>GAP</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ComplianceChecklist({ compliance }) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {compliance.mandatory_required?.map((doc, i) => {
          const uploaded = !compliance.missing_documents?.includes(doc);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 0",
              borderBottom: i < compliance.mandatory_required.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: uploaded ? "rgba(5,150,105,0.1)" : "rgba(220,38,38,0.1)",
              }}>
                {uploaded ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 14, color: uploaded ? "var(--ink)" : "#DC2626", fontWeight: uploaded ? 400 : 500 }}>
                {doc}
              </span>
              {!uploaded && (
                <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#DC2626", letterSpacing: "0.05em" }}>
                  MISSING
                </span>
              )}
            </div>
          );
        })}
      </div>

      {compliance.notes?.length > 0 && (
        <div style={{ marginTop: 16, padding: "14px 16px", background: "rgba(15,39,68,0.03)", borderRadius: 10, borderLeft: "3px solid var(--navy)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--navy)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            State Notes — {compliance.state}
          </p>
          {compliance.notes.map((note, i) => (
            <p key={i} style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginBottom: 4 }}>
              · {note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function DocumentCard({ doc }) {
  const [open, setOpen] = useState(false);
  const confColor = { high: "#059669", medium: "#D97706", low: "#DC2626" }[doc.confidence] || "#6B7280";

  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: 12, background: "white", overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 18px", background: "none", border: "none",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        textAlign: "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: "rgba(15,39,68,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{doc.doc_type}</p>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
              Confidence: <span style={{ color: confColor, fontWeight: 600 }}>{doc.confidence?.toUpperCase()}</span>
            </p>
          </div>
        </div>
        <span style={{ fontSize: 16, color: "var(--muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>↓</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px", borderTop: "1px solid var(--border)" }} className="anim-in">
          <div style={{ paddingTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
            {[
              ["Seller",        doc.parties?.seller?.name],
              ["Buyer",         doc.parties?.buyer?.name],
              ["Gat / Survey",  doc.property?.survey_number],
              ["Area",          doc.property?.area_sqft],
              ["District",      doc.property?.district],
              ["Locality",      doc.property?.locality],
              ["Amount",        doc.transaction?.consideration_amount],
              ["Date",          doc.transaction?.registration_date],
              ["Reg. No.",      doc.transaction?.registration_number],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>
                  {label}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children, count, countColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
        {children}
      </h3>
      {count !== undefined && (
        <span style={{ fontSize: 12, fontWeight: 700, color: countColor || "var(--muted)" }}>
          {count}
        </span>
      )}
    </div>
  );
}

// ── UPLOAD PAGE ────────────────────────────────────────────────────────────────
function UploadPage({ onAnalyse }) {
  const [files, setFiles] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepStatuses, setStepStatuses] = useState({});

  const canAnalyse = files.length > 0 && selectedState;

  const handleAnalyse = async () => {
    setLoading(true);
    setStepStatuses({});

    // In production: replace with real SSE fetch to /api/analyse
    // const formData = new FormData();
    // files.forEach(f => formData.append("documents", f));
    // formData.append("state", selectedState);
    // const response = await fetch("/api/analyse", { method: "POST", body: formData });
    // const reader = response.body.getReader(); ... (SSE handling)

    // Demo simulation
    for (const step of ["step_1", "step_2", "step_3", "step_4"]) {
      await new Promise(r => setTimeout(r, 120));
      setStepStatuses(p => ({ ...p, [step]: "running" }));
      await new Promise(r => setTimeout(r, 900 + Math.random() * 500));
      setStepStatuses(p => ({ ...p, [step]: "done" }));
    }
    await new Promise(r => setTimeout(r, 400));
    onAnalyse({ ...MOCK_REPORT, state: selectedState });
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: 520 }} className="anim-up">
          <div style={{ marginBottom: 32 }}><Logo /></div>
          <AgentProgress stepStatuses={stepStatuses} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "1px solid var(--border)", background: "var(--surface)",
        padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }}/>
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>AI Pipeline Ready</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

        {/* Left — Hero copy */}
        <div className="anim-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(15,39,68,0.06)", border: "1px solid var(--border)", marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--navy)" }}/>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Track 2 — Agentic AI
            </span>
          </div>

          <h2 className="serif" style={{ fontSize: 46, color: "var(--navy)", lineHeight: 1.1, marginBottom: 20, fontWeight: 400 }}>
            Property verification<br />
            <em style={{ color: "var(--gold)" }}>in 60 seconds.</em>
          </h2>

          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, marginBottom: 36, maxWidth: 400 }}>
            Upload your sale deed, encumbrance certificate, and supporting documents. Our AI agent cross-references every field, checks state compliance, and flags every inconsistency.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "📄", text: "Reads scanned, handwritten, and regional language documents" },
              { icon: "🔍", text: "Detects survey number mismatches, broken title chains, name variations" },
              { icon: "📋", text: "Checks state-specific mandatory document requirements" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Upload card */}
        <div className="anim-up" style={{ animationDelay: "0.1s" }}>
          <div className="card" style={{ padding: "32px" }}>
            <h3 className="serif" style={{ fontSize: 22, color: "var(--navy)", marginBottom: 6, fontWeight: 400 }}>
              Verify Documents
            </h3>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>
              Upload documents and select your state to begin the AI verification pipeline.
            </p>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                Property Documents
              </label>
              <UploadZone files={files} setFiles={setFiles} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                Property State
              </label>
              <div style={{ position: "relative" }}>
                <select className="state-select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                  <option value="">Select state...</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <button className="btn-primary" disabled={!canAnalyse} onClick={handleAnalyse}
              style={{ width: "100%", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Run PropCheck Analysis
            </button>

            {!canAnalyse && (
              <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
                {files.length === 0 ? "Upload at least one document to continue" : "Select a state to continue"}
              </p>
            )}

            {/* Demo hint */}
            <div style={{ marginTop: 16, padding: "10px 14px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8 }}>
              <p style={{ fontSize: 12, color: "#92400E", textAlign: "center" }}>
                <strong>Demo mode:</strong> Upload any file, select Maharashtra, click Analyse
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RESULTS PAGE ───────────────────────────────────────────────────────────────
function ResultsPage({ report, onBack }) {
  const handleDownload = () => {
    const lines = [];
    lines.push("PROPCHECK AI — VERIFICATION REPORT");
    lines.push("=".repeat(50));
    lines.push(`Report ID : ${report.id}`);
    lines.push(`State     : ${report.state}`);
    lines.push(`Date      : ${new Date(report.created_at).toLocaleString("en-IN")}`);
    lines.push(`Risk Level: ${report.overall_risk.toUpperCase()}`);
    lines.push("");
    lines.push("SUMMARY");
    lines.push("-".repeat(50));
    lines.push(report.summary);
    lines.push("");
    lines.push(`FLAGS (${report.flag_count} total · ${report.critical_count} critical · ${report.warning_count} warnings)`);
    lines.push("-".repeat(50));
    report.all_flags.forEach((f, i) => {
      lines.push(`${i + 1}. [${f.severity.toUpperCase()}] ${f.field}`);
      lines.push(`   ${f.description}`);
      if (f.values?.length) lines.push(`   Values: ${f.values.join(" vs ")}`);
      if (f.recommendation) lines.push(`   → ${f.recommendation}`);
      lines.push("");
    });
    lines.push("COMPLIANCE");
    lines.push("-".repeat(50));
    lines.push(`Status: ${report.compliance.compliant ? "Compliant" : "Non-Compliant"}`);
    if (report.compliance.missing_documents?.length) {
      lines.push(`Missing: ${report.compliance.missing_documents.join(", ")}`);
    }
    lines.push("");
    lines.push("DOCUMENTS ANALYSED");
    lines.push("-".repeat(50));
    report.documents.forEach((doc, i) => {
      lines.push(`${i + 1}. ${doc.doc_type} (confidence: ${doc.confidence})`);
      if (doc.parties?.seller?.name) lines.push(`   Seller : ${doc.parties.seller.name}`);
      if (doc.parties?.buyer?.name)  lines.push(`   Buyer  : ${doc.parties.buyer.name}`);
      if (doc.property?.survey_number) lines.push(`   Survey : ${doc.property.survey_number}`);
      if (doc.transaction?.registration_date) lines.push(`   Date   : ${doc.transaction.registration_date}`);
      lines.push("");
    });
    lines.push("PropCheck AI — For informational purposes only. Obtain independent legal advice before transacting.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `propcheck-report-${report.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "1px solid var(--border)", background: "var(--surface)",
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <Logo compact />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" onClick={handleDownload}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Report
          </button>
          <button className="btn-ghost" onClick={onBack}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            New Analysis
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px" }}>

        <RiskBanner report={report} />

        {/* Flags */}
        <div className="card anim-up" style={{ padding: "24px 28px", marginBottom: 20 }}>
          <SectionTitle count={`${report.flag_count} found`} countColor="#DC2626">
            Issues Found
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {report.all_flags.map((flag, i) => <FlagCard key={i} flag={flag} />)}
          </div>
        </div>

        {/* Title Chain */}
        <div className="card anim-up" style={{ padding: "24px 28px", marginBottom: 20, animationDelay: "0.05s" }}>
          <SectionTitle
            count={report.cross_reference.is_title_chain_continuous ? "✓ Continuous" : "✗ Broken"}
            countColor={report.cross_reference.is_title_chain_continuous ? "#059669" : "#DC2626"}
          >
            Title Chain
          </SectionTitle>
          <TitleChain
            chain={report.cross_reference.title_chain}
            continuous={report.cross_reference.is_title_chain_continuous}
          />
        </div>

        {/* Compliance */}
        <div className="card anim-up" style={{ padding: "24px 28px", marginBottom: 20, animationDelay: "0.1s" }}>
          <SectionTitle
            count={report.compliance.compliant ? "✓ Compliant" : "✗ Non-Compliant"}
            countColor={report.compliance.compliant ? "#059669" : "#DC2626"}
          >
            {report.compliance.state} State Compliance
          </SectionTitle>
          <ComplianceChecklist compliance={report.compliance} />
        </div>

        {/* Documents */}
        <div className="card anim-up" style={{ padding: "24px 28px", marginBottom: 20, animationDelay: "0.15s" }}>
          <SectionTitle count={report.documents.length}>
            Uploaded Documents
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {report.documents.map((doc) => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "16px 0 32px" }}>
          <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8 }}>
            Report ID: <code style={{ background: "white", padding: "2px 7px", borderRadius: 4, border: "1px solid var(--border)", fontFamily: "monospace" }}>
              {report.id}
            </code>
            <br/>
            PropCheck AI · This report is for informational purposes only. Always obtain independent legal opinion before transacting.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function PropCheckAI() {
  const [report, setReport] = useState(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      {!report
        ? <UploadPage onAnalyse={setReport} />
        : <ResultsPage report={report} onBack={() => setReport(null)} />
      }
    </>
  );
}