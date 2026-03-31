import { useState } from "react";
import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function FlagCard({ flag }) {
  const [open, setOpen] = useState(false);
  const isCrit = flag.severity === "critical";
  const isWarn = flag.severity === "warning";
  const borderColor = isCrit
    ? TOKEN.danger
    : isWarn
      ? TOKEN.warning
      : TOKEN.info;
  const badgeBg = isCrit ? "#FEF2F2" : isWarn ? "#FFFBEB" : "#EFF6FF";
  const badgeText = isCrit ? TOKEN.danger : isWarn ? TOKEN.warning : TOKEN.info;

  return (
    <div
      className="flag-card"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                className="badge"
                style={{
                  background: badgeBg,
                  color: badgeText,
                  border: "none",
                }}
              >
                {flag.severity.toUpperCase()}
              </span>
              <code
                style={{
                  fontSize: 12,
                  color: TOKEN.textMuted,
                  background: TOKEN.bg,
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {flag.field}
              </code>
            </div>
            <p
              style={{
                fontSize: 14,
                color: TOKEN.textPrimary,
                lineHeight: 1.6,
              }}
            >
              {flag.description}
            </p>

            {flag.values && flag.values.length === 2 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "5px 12px",
                    background: isCrit ? "#FEF2F2" : "#FFFBEB",
                    border: `1px solid ${borderColor}20`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: borderColor,
                  }}
                >
                  {flag.values[0]}
                </span>
                <span
                  style={{ color: borderColor, fontWeight: 700, fontSize: 16 }}
                >
                  ≠
                </span>
                <span
                  style={{
                    padding: "5px 12px",
                    background: isCrit ? "#FEF2F2" : "#FFFBEB",
                    border: `1px solid ${borderColor}20`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: borderColor,
                  }}
                >
                  {flag.values[1]}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: TOKEN.info,
            fontWeight: 500,
            padding: 0,
          }}
        >
          <span
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "0.2s",
              display: "flex",
            }}
          >
            <Icon.ChevronDown />
          </span>
          {open ? "Hide" : "View"} recommendation
        </button>

        {open && (
          <div
            className="slide-up"
            style={{
              marginTop: 12,
              padding: "12px 14px",
              background: "#F8FAFF",
              borderRadius: 8,
              border: "1px solid #DBEAFE",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: TOKEN.textPrimary,
                lineHeight: 1.7,
              }}
            >
              <span style={{ fontWeight: 600, color: TOKEN.info }}>
                Recommended action:{" "}
              </span>
              {flag.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
