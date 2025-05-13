import { asciiMtn } from "./asciiMtn";
import LastPlayed from "./LastPlayed";

export default function HomePage() {
  return (
    <main
      style={{
        backgroundColor: "#483A58", // Updated background color
        color: "#DCB6D5", // Updated text color
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 0,
        padding: "2rem 0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to My Personal Website</h1>
        <p>This is where I showcase my projects, skills, and portfolio.</p>
      </div>
      <LastPlayed />
      <pre
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          color: "#DCB6D5", // Updated ASCII art color
          fontSize: "1.5rem",
          textAlign: "center",
          margin: 0,
        }}
      >
        {asciiMtn}
      </pre>
    </main>
  );
}
