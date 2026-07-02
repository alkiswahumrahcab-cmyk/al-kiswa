const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
    const outDir = path.join(__dirname, 'brand_assets');
    const rasterPath = path.join(outDir, 'master-raster-transparent.png');
    const userSvgPath = path.join(outDir, 'kiswahlogo.svg');

    if (!fs.existsSync(rasterPath)) {
        console.error("master-raster.png not found!");
        return;
    }

    // Since the user wants the exact logo, we'll copy their exact SVG to the requested SVG variants,
    // even though it contains a raster image.
    const svgNames = [
        'icon.svg',
        'icon-light.svg',
        'icon-dark.svg',
        'favicon.svg',
        'logo.svg',
        'logo-light.svg',
        'logo-dark.svg',
        'logo-secondary.svg'
    ];
    for (const name of svgNames) {
        fs.copyFileSync(userSvgPath, path.join(outDir, name));
    }

    // Convert to PNGs
    const sizes = [1024, 512, 256, 192, 180, 150, 96, 64, 48, 32, 16];
    
    for (const size of sizes) {
        // Regular icon
        await sharp(rasterPath)
            .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile(path.join(outDir, `icon-${size}.png`));
            
        // Favicon specifically optimized (we just resize the raster)
        if ([16, 32, 48].includes(size)) {
            await sharp(rasterPath)
                .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .png()
                .toFile(path.join(outDir, `favicon-${size}.png`));
        }
    }

    // Create special named copies
    fs.copyFileSync(path.join(outDir, 'icon-180.png'), path.join(outDir, 'apple-touch-icon.png'));
    fs.copyFileSync(path.join(outDir, 'icon-192.png'), path.join(outDir, 'android-chrome-192.png'));
    fs.copyFileSync(path.join(outDir, 'icon-512.png'), path.join(outDir, 'android-chrome-512.png'));
    fs.copyFileSync(path.join(outDir, 'icon-150.png'), path.join(outDir, 'mstile-150.png'));
    
    // Web App Manifest
    const manifest = {
        name: "Al Kiswah Umrah Transport",
        short_name: "Al Kiswah",
        icons: [
            { src: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
            { src: "/android-chrome-512.png", sizes: "512x512", type: "image/png" }
        ],
        theme_color: "#D4AF37",
        background_color: "#111111",
        display: "standalone"
    };
    fs.writeFileSync(path.join(outDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

    const readme = `# Al Kiswah Umrah Transport - Brand Assets

## Vector Files
- \`logo.svg\`, \`icon.svg\`, etc. are copies of the exact file you provided.

## App & Web Icons
- \`apple-touch-icon.png\` (180x180) - iOS Home Screen
- \`android-chrome-192.png\` - Android/PWA
- \`android-chrome-512.png\` - Android/PWA
- \`mstile-150.png\` - Windows 10/11 Start Menu

## Favicons
- \`favicon-16.png\`, \`favicon-32.png\`, \`favicon-48.png\`
- \`favicon.ico\` (Generated via command line)

## Manifest
- \`site.webmanifest\` - Production-ready PWA manifest.
`;
    fs.writeFileSync(path.join(outDir, 'README.md'), readme);

    console.log("All brand assets generated successfully from exact master!");
}

main().catch(console.error);
