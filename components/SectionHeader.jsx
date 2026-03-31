import { TOKEN } from "../constants/tokens.js";

export function SectionHeader({ title, count, countColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 600,
          color: TOKEN.textPrimary,
        }}
      >
        {title}
      </h2>
      {count !== undefined && (
        <span
          className="badge"
          style={{
            background: countColor ? `${countColor}18` : TOKEN.bg,
            color: countColor || TOKEN.textSecondary,
            border: "none",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
