"use client";
import { useState, useRef } from "react";

// Passions Window Component
export default function PassionsWindow({ isOpen, onClose, position, onDrag }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

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
      onDrag({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="windows-app"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "500px",
        height: "350px",
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isDragging ? 1000 : 5
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Titlebar */}
      <div className="windows-titlebar" style={{ cursor: 'grab' }}>
        <span>❤️ Lucy's Passions</span>
        <div style={{ display: "flex", gap: "2px" }}>
          <button className="windows-button" style={{ width: "16px", height: "14px", fontSize: "9px", padding: "0" }}>_</button>
          <button className="windows-button" style={{ width: "16px", height: "14px", fontSize: "9px", padding: "0" }}>□</button>
          <button 
            onClick={onClose}
            className="windows-button"
            style={{ width: "16px", height: "14px", fontSize: "9px", padding: "0" }}>×</button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="windows-content" style={{ height: "calc(100% - 20px)", padding: "8px", overflow: "auto" }}>
        <div style={{
          border: "1px inset #c0c0c0",
          padding: "10px",
          backgroundColor: "#ffffff",
          minHeight: "calc(100% - 20px)"
        }}>
          <h2 style={{
            fontFamily: "MS Sans Serif, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            margin: "0 0 10px 0",
            color: "#800080"
          }}>What I'm Passionate About</h2>
          
          <div style={{
            fontFamily: "MS Sans Serif, sans-serif",
            fontSize: "11px",
            lineHeight: "1.4"
          }}>
            <p>What I love most in life is live music! Read below to learn about my show booking.</p>
            
            <div style={{ margin: "15px 0" }}>
              <h3 style={{ fontSize: "12px", fontWeight: "bold", margin: "5px 0", color: "#800080" }}>Booking Shows</h3>
              <p>I have booked 10+ shows around Eugene featuring DJs and bands I have learned a lot about management, promotion, music technology and hardware, security, and venue organization along the way. Most of my shows have been $5 or less and the money has gone to charity. I'm a big believer in music community and the powerful things we can do for each other.</p>
            </div>

            {/* show flyers */}
            <div style={{ margin: "15px 0" }}>
              <h3 style={{ fontSize: "12px", fontWeight: "bold", margin: "5px 0", color: "#800080" }}>Show Flyers</h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
                gap: "10px", 
                margin: "10px 0" 
              }}>
                <img 
                  src="/showflyers/01.jpg" 
                  alt="Show Flyer 1"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/02.jpg" 
                  alt="Show Flyer 2"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/03.jpg" 
                  alt="Show Flyer 3"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/04.jpg" 
                  alt="Show Flyer 4"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/05.jpg" 
                  alt="Show Flyer 5"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/06.jpg" 
                  alt="Show Flyer 6"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/07.jpg" 
                  alt="Show Flyer 7"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/11.png" 
                  alt="Show Flyer 11"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
                <img 
                  src="/showflyers/12.png" 
                  alt="Show Flyer 12"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    maxHeight: "150px",
                    objectFit: "cover"
                  }} 
                />
              </div>
            </div>
            
            <div style={{ margin: "15px 0" }}>
              <h3 style={{ fontSize: "12px", fontWeight: "bold", margin: "5px 0", color: "#800080" }}>Get In Touch:</h3>
              <p style={{ margin: "5px 0" }}>Send me an email if you'd like to hear more about my experience in show booking.</p>
              <button 
                className="windows-button"
                onClick={() => window.location.href = "mailto:achesonlucy@gmail.com"}
                style={{ marginTop: "5px" }}
              >
                Send Email
              </button>
            </div>
            
            <p style={{ fontStyle: "italic", color: "#666", marginTop: "20px" }}>
              Thank you for reading!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}