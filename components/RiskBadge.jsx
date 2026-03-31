import { RISK_CONFIG } from "../constants/riskConfig.js";

export function RiskBadge({ risk, large = false }) {
  const cfg = RISK_CONFIG[risk] || RISK_CONFIG.medium;
  return (
    <span
      className="badge"
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        color: cfg.text,
        fontSize: large ? "14px" : "12px",
        padding: large ? "6px 16px" : "4px 10px",
      }}
    >
      <span style={{ fontSize: large ? "16px" : "13px" }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
