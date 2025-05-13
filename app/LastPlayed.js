"use client";

export default function LastPlayed() {
  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        backgroundColor: "#CF8BA9", // Updated box color
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        border: "2px solid #8C6381", // Border with specified color
        borderRadius: "8px",
        padding: "0.5rem",
        maxWidth: "200px",
        textAlign: "center",
        fontFamily: "Comic Sans MS, Comic Sans, cursive", // Comic Sans font
      }}
    >
      <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Last Played</h2>
      <p style={{ fontSize: "0.9rem" }}>
        <strong>3d country</strong> by geese
      </p>
    </div>
  );
}
