const fs = require('fs');
const path = require('path');

function extract() {
    const svgContent = fs.readFileSync(path.join(__dirname, 'brand_assets', 'kiswahlogo.svg'), 'utf8');
    const match = svgContent.match(/href="data:image\/(png|jpeg|jpg);base64,([^"]+)"/);
    
    if (match && match[2]) {
        const base64Data = match[2];
        fs.writeFileSync(path.join(__dirname, 'brand_assets', 'master-raster.png'), Buffer.from(base64Data, 'base64'));
        console.log("Extracted master-raster.png successfully!");
    } else {
        console.log("No base64 image found.");
    }
}
extract();
