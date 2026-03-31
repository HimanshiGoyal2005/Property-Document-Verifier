import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function TitleChain({ titleChain, isContinuous }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          paddingBottom: 8,
          gap: 0,
        }}
      >
        {titleChain.map((node, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 0 }}
          >
            <div className="title-chain-node" style={{ padding: "0 4px" }}>
              <div
                style={{
                  padding: "14px 20px",
                  background: isContinuous
                    ? "#ECFDF5"
                    : i === titleChain.length - 1
                      ? "#FEF2F2"
                      : TOKEN.surface,
                  border: `2px solid ${isContinuous ? "#A7F3D0" : i === titleChain.length - 1 ? "#FECACA" : TOKEN.border}`,
                  borderRadius: 12,
                  minWidth: 140,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: TOKEN.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {node.owner}
                </p>
                <p style={{ fontSize: 12, color: TOKEN.textSecondary }}>
                  {node.date}
                </p>
                <span
                  className="badge"
                  style={{
                    marginTop: 6,
                    background: "#EEF2FF",
                    color: TOKEN.info,
                    border: "none",
                    fontSize: 10,
                  }}
                >
                  {node.doc}
                </span>
              </div>
            </div>

            {i < titleChain.length - 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "0 8px",
                }}
              >
                {!isContinuous ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ color: TOKEN.danger }}>
                      <Icon.Link2Off />
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: TOKEN.danger,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      GAP
                    </span>
                  </div>
                ) : (
                  <span style={{ color: TOKEN.success }}>
                    <Icon.ArrowRight />
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!isContinuous && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 8,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span style={{ color: TOKEN.danger }}>
            <Icon.AlertTriangle />
          </span>
          <p style={{ fontSize: 13, color: TOKEN.danger }}>
            <strong>Broken title chain detected.</strong> Ownership cannot be
            verified as continuous.
          </p>
        </div>
      )}
    </div>
  );
}
