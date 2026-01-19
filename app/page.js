"use client";
import { useState, useRef, useEffect } from "react";
import LastPlayed from "./LastPlayed";
import ProjectsWindow from "./myprojects";
import PassionsWindow from "./mypassions";

// Desktop Icon Component
function DesktopIcon({ icon, iconType = "emoji", label, onClick, position }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "100px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: "8px",
        backgroundColor: isSelected ? "rgba(0, 0, 128, 0.3)" : "transparent",
        border: isSelected ? "1px dotted #000080" : "1px solid transparent",
        zIndex: 0
      }}
      onClick={onClick}
      onMouseDown={() => setIsSelected(true)}
      onMouseUp={() => setIsSelected(false)}
      onMouseLeave={() => setIsSelected(false)}
      onDoubleClick={onClick}
    >
      <div style={{
        width: "48px",
        height: "48px",
        fontSize: "32px",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {iconType === "image" ? (
          <img 
            src={icon} 
            alt={label}
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain"
            }}
          />
        ) : (
          icon
        )}
      </div>
      <div style={{
        fontSize: "11px",
        fontFamily: "MS Sans Serif, sans-serif",
        textAlign: "center",
        color: "white",
        textShadow: "1px 1px 1px black",
        lineHeight: "12px",
        wordWrap: "break-word",
        width: "100%"
      }}>
        {label}
      </div>
    </div>
  );
}

// Resume Window Component
function ResumeWindow({ isOpen, onClose, position, onDrag }) {
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
        width: "600px",
        height: "700px",
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isDragging ? 1000 : 3
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Titlebar */}
      <div className="windows-titlebar" style={{ cursor: 'grab' }}>
        <span>📄 Lucy Acheson - Resume.pdf</span>
        <div style={{ display: "flex", gap: "2px" }}>
          <button style={{
            width: "16px",
            height: "14px",
            backgroundColor: "#c0c0c0",
            border: "1px outset #c0c0c0",
            fontSize: "9px",
            padding: "0",
            cursor: "pointer"
          }}>_</button>
          <button style={{
            width: "16px",
            height: "14px",
            backgroundColor: "#c0c0c0",
            border: "1px outset #c0c0c0",
            fontSize: "9px",
            padding: "0",
            cursor: "pointer"
          }}>□</button>
          <button 
            onClick={onClose}
            style={{
              width: "16px",
              height: "14px",
              backgroundColor: "#c0c0c0",
              border: "1px outset #c0c0c0",
              fontSize: "9px",
              padding: "0",
              cursor: "pointer"
            }}>×</button>
        </div>
      </div>
      
      {/* Content Area with PDF */}
      <div className="windows-content" style={{ height: "calc(100% - 20px)", padding: "4px" }}>
        <iframe
          src={`${process.env.NODE_ENV === 'production' ? '/personalwebsite' : ''}/resume.pdf`}
          style={{
            width: "100%",
            height: "100%",
            border: "1px inset #c0c0c0",
            backgroundColor: "white"
          }}
          title="Resume PDF"
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  // Use static initial values to prevent hydration mismatch
  const [mainWindowPos, setMainWindowPos] = useState({ x: 200, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resumeWindowOpen, setResumeWindowOpen] = useState(false);
  const [resumeWindowPos, setResumeWindowPos] = useState({ x: 100, y: 100 });
  const [projectsWindowOpen, setProjectsWindowOpen] = useState(false);
  const [projectsWindowPos, setProjectsWindowPos] = useState({ x: 150, y: 150 });
  const [passionsWindowOpen, setPassionsWindowOpen] = useState(false);
  const [passionsWindowPos, setPassionsWindowPos] = useState({ x: 200, y: 200 });
  const mainWindowRef = useRef(null);

  // Update position after hydration to center the window
  useEffect(() => {
    const updatePosition = () => {
      setMainWindowPos({
        x: (window.innerWidth - 500) / 2,
        y: (window.innerHeight - 300) / 2
      });
      
      // Position resume window on the right side
      setResumeWindowPos({
        x: window.innerWidth - 650, // 600px width + 50px margin from edge
        y: 50 // 50px from top
      });
      
      setPassionsWindowPos({
        x: (window.innerWidth) / 4, 
        y: 20 
      });
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.windows-titlebar')) {
      setIsDragging(true);
      const rect = mainWindowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMainWindowPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative"
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Main Application Window */}
      <div 
        ref={mainWindowRef}
        className="windows-app" 
        style={{
          width: "500px",
          minHeight: "300px",
          position: "absolute",
          left: `${mainWindowPos.x}px`,
          top: `${mainWindowPos.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
          zIndex: isDragging ? 1000 : 1
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Titlebar */}
        <div className="windows-titlebar" style={{ cursor: 'grab' }}>
          <span>Lucy Acheson - Personal Website</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{
              width: "16px",
              height: "14px",
              backgroundColor: "#c0c0c0",
              border: "1px outset #c0c0c0",
              fontSize: "9px",
              padding: "0",
              cursor: "pointer"
            }}>_</button>
            <button style={{
              width: "16px",
              height: "14px",
              backgroundColor: "#c0c0c0",
              border: "1px outset #c0c0c0",
              fontSize: "9px",
              padding: "0",
              cursor: "pointer"
            }}>□</button>
            <button style={{
              width: "16px",
              height: "14px",
              backgroundColor: "#c0c0c0",
              border: "1px outset #c0c0c0",
              fontSize: "9px",
              padding: "0",
              cursor: "pointer"
            }}>×</button>
          </div>
        </div>
        {/* Content Area */}
        <div className="windows-content" style={{ textAlign: "center" }}>
          <div style={{
            border: "1px inset #c0c0c0",
            padding: "15px",
            margin: "10px 0",
            backgroundColor: "#ffffff"
          }}>
            <h1 style={{
              fontFamily: "MS Sans Serif, sans-serif",
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 0 10px 0"
            }}>Lucy Acheson</h1>
            <p style={{
              fontFamily: "MS Sans Serif, sans-serif",
              fontSize: "11px",
              margin: "5px 0"
            }}>Welcome to my Desktop :D</p>
            <p style={{
              fontFamily: "MS Sans Serif, sans-serif",
              fontSize: "11px",
              margin: "5px 0"
            }}>Please enjoy!</p>
          </div>
        <br></br>
          <div style={{ margin: "10px 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px" }}>
            <button
              onClick={() => setProjectsWindowOpen(true)}
              className="windows-button"
            >
              Lucy's Projects
            </button>
            <button
              onClick={() => setResumeWindowOpen(true)}
              className="windows-button"
            >
              Lucy's Resume
            </button>
            <button
              onClick={() => setPassionsWindowOpen(true)}
              className="windows-button"
            >
              Lucy's Passions
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Icons */}
      <DesktopIcon
        icon="https://blog.hyperiondev.com/wp-content/uploads/2018/01/Github-logo.png"
        iconType="image"
        label="Lucy's GitHub"
        position={{ x: 30, y: 30 }}
        onClick={() => window.open("https://github.com/lucyach", "_blank")}
      />
      
      <DesktopIcon
        icon="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
        iconType="image"
        label="Lucy's LinkedIn"
        position={{ x: 30, y: 140 }}
        onClick={() => window.open("https://linkedin.com/in/lucy-acheson", "_blank")}
      />

      <DesktopIcon
        icon="https://www.last.fm/static/images/lastfm_avatar_twitter.52a5d69a85ac.png"
        iconType="image"
        label="Lucy's Last.FM"
        position={{ x: 30, y: 250 }}
        onClick={() => window.open("https://www.last.fm/user/lucyacheson", "_blank")}
      />

      <DesktopIcon
        icon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Rate_Your_Music_logo.svg/250px-Rate_Your_Music_logo.svg.png"
        iconType="image"
        label="Lucy's Rate Your Music"
        position={{ x: 30, y: 360 }}
        onClick={() => window.open("https://rateyourmusic.com/~lucy4", "_blank")}
      />
      
      <LastPlayed />
      
      <ResumeWindow 
        isOpen={resumeWindowOpen}
        onClose={() => setResumeWindowOpen(false)}
        position={resumeWindowPos}
        onDrag={setResumeWindowPos}
      />
      
      <ProjectsWindow 
        isOpen={projectsWindowOpen}
        onClose={() => setProjectsWindowOpen(false)}
        position={projectsWindowPos}
        onDrag={setProjectsWindowPos}
      />
      
      <PassionsWindow 
        isOpen={passionsWindowOpen}
        onClose={() => setPassionsWindowOpen(false)}
        position={passionsWindowPos}
        onDrag={setPassionsWindowPos}
      />
    </main>
  );
}
