import "./globals.css";

export const metadata = {
  title: "Lucy Acheson",
  description: "Lucy Acheson Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}