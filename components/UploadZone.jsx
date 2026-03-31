import { useState, useRef, useCallback } from "react";
import { TOKEN } from "../constants/tokens.js";
import { Icon } from "../icons/index.jsx";

export function UploadZone({ files, setFiles }) {
  const [isDrag, setIsDrag] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const valid = Array.from(newFiles).filter((f) =>
      [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ].includes(f.type),
    );
    setFiles((prev) => {
      const combined = [...prev, ...valid];
      return combined.slice(0, 10);
    });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDrag(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const removeFile = (i) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const getTypeLabel = (f) => {
    if (f.type === "application/pdf") return "PDF";
    return f.type.split("/")[1].toUpperCase();
  };

  return (
    <div>
      <div
        className={`upload-zone ${isDrag ? "drag-over" : ""}`}
        style={{ padding: "40px 24px", textAlign: "center" }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDrag(true);
        }}
        onDragLeave={() => setIsDrag(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div
          style={{
            color: isDrag ? TOKEN.primary : TOKEN.textMuted,
            marginBottom: 16,
          }}
        >
          <Icon.Upload />
        </div>
        <p
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: TOKEN.textPrimary,
            marginBottom: 6,
          }}
        >
          Drop property documents here
        </p>
        <p style={{ color: TOKEN.textSecondary, fontSize: 14 }}>
          PDF, JPG, PNG, WebP · Up to 10 files
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: TOKEN.surface,
                border: `1px solid ${TOKEN.border}`,
                borderRadius: 10,
              }}
            >
              <span style={{ color: TOKEN.primary }}>
                <Icon.File />
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {f.name}
              </span>
              <span
                className="badge"
                style={{
                  background: "#EEF2FF",
                  color: TOKEN.info,
                  fontSize: 10,
                  border: "none",
                }}
              >
                {getTypeLabel(f)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: TOKEN.textMuted,
                  display: "flex",
                  padding: 4,
                }}
              >
                <Icon.X />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
