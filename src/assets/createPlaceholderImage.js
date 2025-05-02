import fs from 'fs';
import { createCanvas } from 'canvas';

// Create a canvas with dimensions (width, height)
const width = 800;
const height = 600;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fill the background
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(0, 0, width, height);

// Add a border
ctx.strokeStyle = '#ddd';
ctx.lineWidth = 5;
ctx.strokeRect(5, 5, width - 10, height - 10);

// Add text
ctx.font = 'bold 30px Arial';
ctx.fillStyle = '#333';
ctx.textAlign = 'center';
ctx.fillText('Bio Page Project', width / 2, height / 2 - 15);

ctx.font = '20px Arial';
ctx.fillText('Placeholder Image', width / 2, height / 2 + 20);

// Convert canvas to a PNG Buffer
const buffer = canvas.toBuffer('image/png');

// Write to a file
fs.writeFileSync('src/assets/bio-page.png', buffer);

console.log('Placeholder image created at src/assets/bio-page.png'); 