import { TOKEN } from "../constants/tokens.js";
import { RISK_CONFIG } from "../constants/riskConfig.js";
import { Logo } from "./Logo.jsx";
import { RiskBadge } from "./RiskBadge.jsx";
import { SectionHeader } from "./SectionHeader.jsx";
import { FlagCard } from "./FlagCard.jsx";
import { TitleChain } from "./TitleChain.jsx";
import { ComplianceChecklist } from "./ComplianceChecklist.jsx";
import { DocumentSummary } from "./DocumentSummary.jsx";
import { Icon } from "../icons/index.jsx";

export function ResultsPage({ report, onBack }) {
  const riskCfg = RISK_CONFIG[report.overall_risk];
  const dateStr = new Date(report.created_at).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}
      className="fade-in"
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Logo />
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn-ghost"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon.Download /> Download PDF
          </button>
          <button
            className="btn-ghost"
            onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon.Home /> New Analysis
          </button>
        </div>
      </div>

      {/* Risk Banner */}
      <div
        className="risk-banner slide-up"
        style={{
          background: riskCfg.bg,
          border: `1.5px solid ${riskCfg.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <RiskBadge risk={report.overall_risk} large />
              <span style={{ fontSize: 13, color: TOKEN.textSecondary }}>
                {report.state} · {dateStr}
              </span>
            </div>
            <p
              style={{
                fontSize: 16,
                color: TOKEN.textPrimary,
                lineHeight: 1.7,
                maxWidth: 560,
              }}
            >
              {report.summary}
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: TOKEN.danger }}>
                {report.critical_count}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: TOKEN.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Critical
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{ fontSize: 28, fontWeight: 700, color: TOKEN.warning }}
              >
                {report.warning_count}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: TOKEN.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Warnings
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: TOKEN.textPrimary,
                }}
              >
                {report.flag_count}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: TOKEN.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Total Flags
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flags */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24 }}>
        <SectionHeader
          title="Issues Found"
          count={report.flag_count}
          countColor={TOKEN.danger}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {report.all_flags.map((flag, i) => (
            <FlagCard key={i} flag={flag} />
          ))}
        </div>
      </div>

      {/* Title Chain */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24 }}>
        <SectionHeader
          title="Title Chain"
          count={
            report.cross_reference.is_title_chain_continuous
              ? "Continuous"
              : "Broken"
          }
          countColor={
            report.cross_reference.is_title_chain_continuous
              ? TOKEN.success
              : TOKEN.danger
          }
        />
        <TitleChain
          titleChain={report.cross_reference.title_chain}
          isContinuous={report.cross_reference.is_title_chain_continuous}
        />
      </div>

      {/* Compliance */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24 }}>
        <SectionHeader
          title={`${report.compliance.state} Compliance`}
          count={report.compliance.compliant ? "Compliant" : "Non-Compliant"}
          countColor={
            report.compliance.compliant ? TOKEN.success : TOKEN.danger
          }
        />
        <ComplianceChecklist compliance={report.compliance} />
      </div>

      {/* Documents */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24 }}>
        <SectionHeader
          title="Uploaded Documents"
          count={report.documents.length}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {report.documents.map((doc) => (
            <DocumentSummary key={doc.id} doc={doc} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <p style={{ fontSize: 12, color: TOKEN.textMuted }}>
          Report ID:{" "}
          <code
            style={{
              background: TOKEN.bg,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {report.id}
          </code>
          {" · "}PropCheck AI · For legal purposes, obtain independent legal
          opinion.
        </p>
      </div>
    </div>
  );
}
