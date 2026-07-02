const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

function floodFill(png, startX, startY) {
    const width = png.width;
    const height = png.height;
    const targetR = 0;
    const targetG = 0;
    const targetB = 0;
    
    // Check if start pixel is black enough
    const startIdx = (width * startY + startX) << 2;
    const r = png.data[startIdx];
    const g = png.data[startIdx + 1];
    const b = png.data[startIdx + 2];
    
    if (r > 20 || g > 20 || b > 20) return; // Not black

    const stack = [[startX, startY]];
    
    while (stack.length > 0) {
        const [x, y] = stack.pop();
        
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        
        const idx = (width * y + x) << 2;
        
        // Skip if already transparent
        if (png.data[idx + 3] === 0) continue;
        
        // Skip if not black
        const pr = png.data[idx];
        const pg = png.data[idx + 1];
        const pb = png.data[idx + 2];
        
        if (pr > 30 || pg > 30 || pb > 30) continue;
        
        // Make transparent
        png.data[idx + 3] = 0; // alpha to 0
        
        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
    }
}

function processImage() {
    const inPath = path.join(__dirname, 'brand_assets', 'master-raster.png');
    const outPath = path.join(__dirname, 'brand_assets', 'master-raster-transparent.png');
    
    fs.createReadStream(inPath)
        .pipe(new PNG())
        .on('parsed', function() {
            // Flood fill from the 4 corners
            floodFill(this, 0, 0);
            floodFill(this, this.width - 1, 0);
            floodFill(this, 0, this.height - 1);
            floodFill(this, this.width - 1, this.height - 1);
            
            // Also fill from midpoints of edges to be safe
            floodFill(this, Math.floor(this.width / 2), 0);
            floodFill(this, Math.floor(this.width / 2), this.height - 1);
            floodFill(this, 0, Math.floor(this.height / 2));
            floodFill(this, this.width - 1, Math.floor(this.height / 2));

            this.pack().pipe(fs.createWriteStream(outPath))
                .on('finish', () => console.log('Successfully made background transparent!'));
        });
}

processImage();
