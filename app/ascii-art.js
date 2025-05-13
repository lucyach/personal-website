import { asciiWave } from './asciiMtn';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('ascii-art-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get 2D context!');
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log('Canvas initialized with dimensions:', canvas.width, canvas.height);

  const fontSize = 12; // Adjust font size for ASCII art
  const lineHeight = fontSize * 1.2; // Line height for ASCII art
  const lines = asciiWave.split('\n'); // Split ASCII art into lines

  function drawAsciiArt() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = '#DCB6D5'; // Updated ASCII art color

    const startX = (canvas.width - ctx.measureText(lines[0]).width) / 2; // Center horizontally
    const startY = (canvas.height - lines.length * lineHeight) / 2; // Center vertically

    lines.forEach((line, index) => {
      ctx.fillText(line, startX, startY + index * lineHeight);
    });
  }

  drawAsciiArt();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas resized to:', canvas.width, canvas.height);
    drawAsciiArt(); // Redraw ASCII art on resize
  });

  console.log('ASCII art rendering started.');
});
