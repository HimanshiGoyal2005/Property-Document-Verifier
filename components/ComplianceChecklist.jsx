import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function ComplianceChecklist({ compliance }) {
  const uploaded = compliance.uploaded_documents || [];
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {compliance.mandatory_required.map((doc, i) => {
          const key = doc
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z_]/g, "");
          const isUploaded = uploaded.some(
            (u) => doc.toLowerCase().includes(u) || u.includes(key.slice(0, 4)),
          );
          return (
            <div key={i} className="compliance-item">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isUploaded ? "#ECFDF5" : "#FEF2F2",
                }}
              >
                {isUploaded ? (
                  <span style={{ color: TOKEN.success }}>
                    <Icon.Check size={13} />
                  </span>
                ) : (
                  <span style={{ color: TOKEN.danger }}>
                    <Icon.X size={13} />
                  </span>
                )}
              </div>
              <span
                style={{
                  fontWeight: 500,
                  color: isUploaded ? TOKEN.textPrimary : TOKEN.danger,
                }}
              >
                {doc}
              </span>
              {!isUploaded && (
                <span
                  className="badge"
                  style={{
                    background: "#FEF2F2",
                    color: TOKEN.danger,
                    border: "none",
                    fontSize: 10,
                    marginLeft: "auto",
                  }}
                >
                  MISSING
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}
      >
        <div
          style={{
            padding: "10px 16px",
            background: "#F0F4FF",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: TOKEN.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Stamp Duty
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: TOKEN.primary,
              marginTop: 2,
            }}
          >
            {compliance.stamp_duty_rate}
          </p>
        </div>
        <div
          style={{
            padding: "10px 16px",
            background: "#F0FDF4",
            borderRadius: 10,
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: TOKEN.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Reg. Fee
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: TOKEN.success,
              marginTop: 2,
            }}
          >
            {compliance.registration_fee_rate}
          </p>
        </div>
      </div>

      {compliance.notes.map((note, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            marginBottom: 6,
          }}
        >
          <span style={{ color: TOKEN.textMuted, marginTop: 1 }}>
            <Icon.Dash />
          </span>
          <p
            style={{
              fontSize: 13,
              color: TOKEN.textSecondary,
              lineHeight: 1.6,
            }}
          >
            {note}
          </p>
        </div>
      ))}
    </div>
  );
}
