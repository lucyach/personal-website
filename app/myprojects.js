"use client";
import { useState, useRef } from "react";

// Projects Window Component
export default function ProjectsWindow({ isOpen, onClose, position, onDrag }) {
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
        height: "600px",
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: isDragging ? 1000 : 4
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Titlebar */}
      <div className="windows-titlebar" style={{ cursor: 'grab' }}>
        <span>💻 Lucy's Projects</span>
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
            color: "#000080"
          }}>My Projects</h2>
          
          <div style={{
            fontFamily: "MS Sans Serif, sans-serif",
            fontSize: "11px",
            lineHeight: "1.4"
          }}>
            <p>Hi, welcome to my projects. In addition to school, I love coding on the side. Here are some of the things I've worked on! Visit my GitHub for more.</p>
            
            <div style={{ margin: "15px 0" }}>
              <h3 style={{ fontSize: "12px", fontWeight: "bold", margin: "5px 0", color: "#000080" }}>Featured Projects:</h3>
              <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                <li style={{ margin: "5px 0" }}><b>The Stoning, a music reviewing publication.</b> With a team of two other devs and many devoted writers, I started a grassroots music reviewing publication, designed to subvert mainstream publications! I built the website and wrote multiple articles for it, as well as led the entire project. We have over 15 different authors, over 100 readers, and have made many different types of articles, from interviews to quizzes to reviews. Visit the website here: </li>
                <div style={{ margin: "10px 0" }}>
                    <button 
                        className="windows-button"
                        onClick={() => window.open("https://thestoning.net", "_blank")}
                        style={{ marginRight: "5px" }}
                    >
                        Visit The Stoning
                    </button>
                </div>
                <li style={{ margin: "5px 0" }}><b>Automated DJ Setlist Generator.</b> I love DJing in my free time! One day, I was trying to make a DJ set, sorting my library by key and BPM and thought to myself, <i>wow, I bet I could automate this process!</i> So I made a Python program that takes the BPM and key data from an mp3 file and sorts your library by which songs line up the best, according to math and music theory!</li>
                <div style={{ margin: "10px 0" }}>
                    <button 
                        className="windows-button"
                        onClick={() => window.open("https://github.com/lucyach/automated-setlist", "_blank")}
                        style={{ marginRight: "5px" }}
                    >
                        Visit the GitHub repo
                    </button>
                </div>
                <li style={{ margin: "5px 0" }}><b>Automod Discord Bot.</b> Like many during COVID-19 lockdowns, I got very into the logistics of Discord. I was running a server and decided to have some fun and make an automoderation bot. When it detects a trigger word, it will delete the message, send a reminder to the user, and alert the moderation team. The code was hosted on Repl and kept running using UpTimeRobot. It was fun to make, but had a reverse effect on the server, where all my friends began swearing profusely and creatively, trying to see what words triggered it and which didn't.</li>
                <div style={{ margin: "10px 0" }}>
                    <button 
                        className="windows-button"
                        onClick={() => window.open("https://github.com/lucyach/automodDiscordBot", "_blank")}
                        style={{ marginRight: "5px" }}
                    >
                        Check out the GitHub repo
                    </button>
                </div>
                <li style={{ margin: "5px 0" }}><b>RYM Plus.</b> I am an avid user of Rate Your Music, where users can log and rate albums. It's old internet and unstyled HTML is charming and classy in its own right, and was part of my inspiration for the design of this website. However, there are many things about this website I wish were modern. So I built a Chrome extension to address those things! Now I have made browsing Rate Your Music much more enjoyable, without removing much of the classic styling. Soon, I will make it available on the Chrome extension store. For now, you can check out the GitHub repo.</li>
                <div style={{ margin: "10px 0" }}>
                    <button 
                        className="windows-button"
                        onClick={() => window.open("https://github.com/lucyach/rym-plus", "_blank")}
                        style={{ marginRight: "5px" }}
                    >
                        Check out the GitHub repo
                    </button>
                </div>
              </ul>
            </div>
            
            <p style={{ fontStyle: "italic", color: "#666", marginTop: "20px" }}>
              Thank you for reading about my projects!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}