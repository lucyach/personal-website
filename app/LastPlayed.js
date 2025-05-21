"use client";
import { useState, useEffect } from "react";

export default function LastPlayed() {
  const [lastTrack, setLastTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTrack = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
          throw new Error("Missing Last.fm API key");
        }

        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lucyacheson&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&limit=1`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const track = data.recenttracks.track[0];

        setLastTrack({
          name: track.name,
          artist: track.artist["#text"],
        });
      } catch (err) {
        setError(err.message);
        console.error("LastFM Error:", err);
      }
    };

    fetchLastTrack();
    const interval = setInterval(fetchLastTrack, 30000);

    return () => clearInterval(interval);
  }, []);

  const trackText = lastTrack
    ? `${lastTrack.name} - ${lastTrack.artist}`
    : "";

  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        backgroundColor: "#CF8BA9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        border: "2px solid #8C6381",
        borderRadius: "8px",
        padding: "0.5rem",
        maxWidth: "200px",
        textAlign: "center",
        fontFamily: "Comic Sans MS, Comic Sans, cursive",
      }}
    >
      <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Lucy Is Now Playing</h2>
      <div style={{ fontSize: "0.9rem", overflow: "hidden" }}>
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : !lastTrack ? (
          <span>Loading...</span>
        ) : (
          <span>{trackText}</span>
        )}
      </div>
    </div>
  );
}
