import { TOKEN } from "../constants/tokens.js";
import { STEPS } from "../constants/steps.js";
import { Icon, Spinner } from "../icons/index.jsx";

export function AgentProgress({ stepStatuses }) {
  return (
    <div className="card" style={{ padding: "24px 28px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          className="pulse"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: TOKEN.info,
          }}
        />
        <p style={{ fontWeight: 600, fontSize: 15, color: TOKEN.textPrimary }}>
          Analysis in progress…
        </p>
      </div>
      {STEPS.map((step, i) => {
        const status = stepStatuses[step.key] || "pending";
        return (
          <div key={step.key} className="progress-step">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  status === "done"
                    ? TOKEN.success
                    : status === "running"
                      ? TOKEN.info
                      : status === "error"
                        ? TOKEN.danger
                        : "#F3F4F6",
                color: status === "pending" ? TOKEN.textMuted : "white",
                transition: "all 0.3s",
              }}
            >
              {status === "running" ? (
                <Spinner size={14} />
              ) : status === "done" ? (
                <Icon.Check size={14} />
              ) : status === "error" ? (
                <Icon.X size={14} />
              ) : (
                <span style={{ fontSize: 13, fontWeight: 600 }}>{i + 1}</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color:
                    status === "pending" ? TOKEN.textMuted : TOKEN.textPrimary,
                }}
              >
                {step.label}
              </p>
              {status === "running" && (
                <p style={{ fontSize: 12, color: TOKEN.info, marginTop: 2 }}>
                  Processing…
                </p>
              )}
              {status === "done" && (
                <p style={{ fontSize: 12, color: TOKEN.success, marginTop: 2 }}>
                  Complete
                </p>
              )}
              {status === "error" && (
                <p style={{ fontSize: 12, color: TOKEN.danger, marginTop: 2 }}>
                  Failed
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
