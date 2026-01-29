"use client";
import { useState, useEffect, useRef } from "react";

export default function LastPlayed() {
  const [lastTrack, setLastTrack] = useState(null);
  const [error, setError] = useState(null);
  // Use static initial value to prevent hydration mismatch
  const [windowPos, setWindowPos] = useState({ x: 800, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Update position after hydration to place in top-right corner
  useEffect(() => {
    const updatePosition = () => {
      setWindowPos(prevPos => ({
        x: window.innerWidth - 270,
        y: prevPos.y // Keep the y position as set
      }));
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.windows-titlebar')) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setWindowPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const fetchLastTrack = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
          setError("Missing Last.fm API key. Please configure it in your environment.");
          return;
        }

        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lucyacheson&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&limit=1`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.recenttracks || !data.recenttracks.track || !data.recenttracks.track.length) {
          throw new Error("Invalid response from Last.fm API");
        }

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
      ref={windowRef}
      className="windows-app"
      style={{
        position: "fixed",
        left: `${windowPos.x}px`,
        top: `${windowPos.y}px`,
        width: "250px",
        minHeight: "80px",
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isDragging ? 1000 : 2
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Titlebar */}
      <div className="windows-titlebar" style={{ cursor: 'grab' }}>
        <span>♪ Lucy Is Now Playing</span>
        <div style={{ display: "flex", gap: "2px" }}>
          <button className="windows-button" style={{ width: "16px", height: "14px", fontSize: "9px", padding: "0" }}>_</button>
          <button className="windows-button" style={{ width: "16px", height: "14px", fontSize: "9px", padding: "0" }}>×</button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="windows-content">
        <div style={{
          border: "1px inset #c0c0c0",
          padding: "8px",
          backgroundColor: "#ffffff",
          textAlign: "center"
        }}>
          <div style={{ 
            fontSize: "11px", 
            fontFamily: "MS Sans Serif, sans-serif",
            wordWrap: "break-word"
          }}>
            {error ? (
              <span style={{ color: "red" }}>{error}</span>
            ) : !lastTrack ? (
              <span>{error ? "Error loading track" : "Loading..."}</span>
            ) : (
              <span>{trackText}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
