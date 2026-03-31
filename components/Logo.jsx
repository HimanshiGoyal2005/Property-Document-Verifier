import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: TOKEN.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(26,58,107,0.3)",
        }}
      >
        <Icon.Shield size={20} />
      </div>
      <div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: TOKEN.primary,
            lineHeight: 1,
          }}
        >
          PropCheck <span style={{ color: TOKEN.accent }}>AI</span>
        </h1>
        <p
          style={{
            fontSize: 11,
            color: TOKEN.textSecondary,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          Property verification in 60 seconds
        </p>
      </div>
    </div>
  );
}
