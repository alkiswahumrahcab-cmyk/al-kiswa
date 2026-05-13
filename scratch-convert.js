const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = 'C:\\Users\\zubii\\Downloads\\fleet images\\GMC';
const destDir = 'd:\\with data base\\umrah cab\\al kiswa umrah transport\\public\\images\\fleet\\gmc-yukon';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

async function convertImages() {
    try {
        const files = fs.readdirSync(sourceDir);
        for (const file of files) {
            if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
                const sourcePath = path.join(sourceDir, file);
                const destFileName = file.replace(/\.(jpeg|jpg|png)$/i, '.webp');
                const destPath = path.join(destDir, destFileName);
                
                await sharp(sourcePath)
                    .webp({ quality: 80 })
                    .toFile(destPath);
                
                console.log(`Converted ${file} to ${destFileName}`);
            }
        }
        console.log('All images converted to WebP successfully.');
    } catch (error) {
        console.error('Error during conversion:', error);
    }
}

convertImages();
