import { useState } from "react";
import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function DocumentSummary({ doc }) {
  const [open, setOpen] = useState(false);
  const confColor =
    doc.confidence === "high"
      ? TOKEN.success
      : doc.confidence === "medium"
        ? TOKEN.warning
        : TOKEN.danger;
  const confBg =
    doc.confidence === "high"
      ? "#ECFDF5"
      : doc.confidence === "medium"
        ? "#FFFBEB"
        : "#FEF2F2";

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: TOKEN.primary }}>
            <Icon.File />
          </span>
          <div>
            <p
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: TOKEN.textPrimary,
              }}
            >
              {doc.name}
            </p>
            <p
              style={{ fontSize: 12, color: TOKEN.textSecondary, marginTop: 2 }}
            >
              {doc.type}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="badge"
            style={{
              background: confBg,
              color: confColor,
              border: "none",
              fontSize: 11,
            }}
          >
            {doc.confidence.toUpperCase()} CONFIDENCE
          </span>
          <span
            style={{
              color: TOKEN.textMuted,
              transform: open ? "rotate(180deg)" : "none",
              transition: "0.2s",
              display: "flex",
            }}
          >
            <Icon.ChevronDown />
          </span>
        </div>
      </div>

      {open && (
        <div
          className="slide-up"
          style={{
            borderTop: `1px solid ${TOKEN.border}`,
            padding: "16px 20px",
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {Object.entries(doc.fields).map(([key, val]) => (
              <div
                key={key}
                style={{
                  padding: "8px 12px",
                  background: TOKEN.bg,
                  borderRadius: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: TOKEN.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 3,
                  }}
                >
                  {key}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: TOKEN.textPrimary,
                  }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
