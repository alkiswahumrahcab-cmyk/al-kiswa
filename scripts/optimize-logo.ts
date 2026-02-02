import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const inputFile = path.join(publicDir, 'logo.png');
const backupFile = path.join(publicDir, 'logo-original.png');
const outputWebP = path.join(publicDir, 'logo.webp');
const outputPng = path.join(publicDir, 'logo.png'); // Overwrite optimized

async function optimize() {
    if (!fs.existsSync(inputFile)) {
        console.error('Source logo.png not found');
        process.exit(1);
    }

    // Backup
    if (!fs.existsSync(backupFile)) {
        fs.copyFileSync(inputFile, backupFile);
        console.log('Backed up original logo to logo-original.png');
    }

    const image = sharp(backupFile);
    const metadata = await image.metadata();

    console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

    // Resize to a reasonable max width (e.g. 512px) - ample for 64px display @ 4x dpr
    const resizeOptions = { width: 512, withoutEnlargement: true };

    // 1. Create WebP
    await image
        .clone()
        .resize(resizeOptions)
        .webp({ lossless: true })
        .toFile(outputWebP);
    console.log(`Generated logo.webp`);

    // 2. Optimized PNG (overwrite original for metadata compatibility)
    await image
        .clone()
        .resize(resizeOptions)
        .png({ force: true, compressionLevel: 9 })
        .toFile(outputPng);
    console.log(`Optimized logo.png`);
}

optimize().catch(err => {
    console.error(err);
    process.exit(1);
});
