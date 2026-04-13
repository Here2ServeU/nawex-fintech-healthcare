import React from "react";

export default function SearchPanel({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonLabel,
  disabled,
  asEditor
}) {
  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      {asEditor ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={12}
          style={inputStyle(true)}
        />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} style={inputStyle(false)} />
      )}
      <button
        type="submit"
        disabled={disabled}
        style={{
          border: 0,
          borderRadius: "14px",
          background: "#111827",
          color: "#fff",
          fontWeight: 700,
          padding: "0.85rem 1rem",
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}

function inputStyle(multiline) {
  return {
    width: "100%",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#fff",
    padding: "0.9rem 1rem",
    fontSize: "0.92rem",
    lineHeight: multiline ? 1.6 : 1.4,
    fontFamily: multiline ? "\"SFMono-Regular\", Consolas, monospace" : "\"Avenir Next\", \"Segoe UI\", sans-serif",
    resize: multiline ? "vertical" : "none"
  };
}
