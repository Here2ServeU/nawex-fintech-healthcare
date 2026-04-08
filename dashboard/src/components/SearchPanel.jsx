import React from "react";

export default function SearchPanel({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonLabel = "Search",
  disabled = false
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        alignItems: "center"
      }}
    >
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          flex: "1 1 280px",
          minWidth: "240px",
          padding: "0.9rem 1rem",
          borderRadius: "999px",
          border: "1px solid #b8c4d6",
          background: "#fff",
          fontSize: "0.95rem"
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          border: "none",
          borderRadius: "999px",
          padding: "0.9rem 1.2rem",
          background: disabled ? "#94a3b8" : "#0f172a",
          color: "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          fontWeight: 700
        }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
