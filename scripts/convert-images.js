const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
    path.join(__dirname, '../public/images/routes'),
    path.join(__dirname, '../public/images/fleet')
];

async function convertImages() {
    for (const dir of directories) {
        if (!fs.existsSync(dir)) continue;
        
        const files = fs.readdirSync(dir);
        for (const file of files) {
            if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg')) {
                const filePath = path.join(dir, file);
                const webpPath = path.join(dir, file.replace(/\.(png|jpg)$/i, '.webp'));
                
                if (!fs.existsSync(webpPath)) {
                    console.log(`Converting ${file} to WebP...`);
                    await sharp(filePath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    console.log(`Successfully created ${webpPath}`);
                }
            }
        }
    }
}

convertImages().catch(console.error);
