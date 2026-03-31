import { TOKEN } from "../constants/tokens.js";
import { STATE_DOCS } from "../constants/stateDocs.js";
import { Icon } from "../icons/index.jsx";

export function StateSelector({ selectedState, setSelectedState }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select property state…</option>
          {Object.keys(STATE_DOCS).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: TOKEN.textMuted,
          }}
        >
          <Icon.ChevronDown />
        </div>
      </div>

      {selectedState && (
        <div
          className="slide-up"
          style={{
            marginTop: 12,
            padding: "14px 16px",
            background: "#F0F4FF",
            border: `1px solid #C7D7FF`,
            borderRadius: 10,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: TOKEN.info,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Required for {selectedState}
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {STATE_DOCS[selectedState].map((doc, i) => (
              <li
                key={i}
                style={{
                  fontSize: 13,
                  color: TOKEN.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: TOKEN.success }}>
                  <Icon.Check size={13} />
                </span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
