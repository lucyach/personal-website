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
        flexDirection: "row", // Changed to row to align content horizontally
        justifyContent: "space-between",
        alignItems: "center",
        margin: 0,
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", flex: 1 }}>
        <h1>Lucy Acheson</h1>
        <p>Click below to look at my projects.</p>
        <div style={{ margin: "1rem 0" }}>
          <a
            href="https://github.com/lucyach"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#DCB6D5",
              color: "#483A58",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/lucy-acheson"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#DCB6D5",
              color: "#483A58",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://thestoning.net"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#DCB6D5",
              color: "#483A58",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            The Stoning Website
          </a>
          <a
            href="/resume.pdf" // Updated path to the resume file
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#DCB6D5",
              color: "#483A58",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Resume
          </a>
          <a
            href="mailto:achesonlucy@gmail.com"
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#DCB6D5",
              color: "#483A58",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Contact Me
          </a>
        </div>
        <LastPlayed />
      </div>
      <pre
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          color: "#DCB6D5", // Updated ASCII art color
          fontSize: "1.2rem",
          textAlign: "center",
          margin: 0,
          flex: 1, // Allow ASCII art to take equal space
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {asciiMtn}
      </pre>
    </main>
  );
}
