const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// We will check all html files in .next/server/app and its subdirectories
function getAllHtmlFiles(dirPath, arrayOfFiles) {
    let files;
    try {
        files = fs.readdirSync(dirPath);
    } catch (e) {
        return arrayOfFiles;
    }

    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, '/', file));
            }
        }
    });
    return arrayOfFiles;
}

const buildDir = path.join(__dirname, '../.next/server/app');
const htmlFiles = getAllHtmlFiles(buildDir);

let failed = false;

const BAD_DOMAINS = [
    'alkiswahumrahtransport.com',
    'alaqsaumrahtransport.com',
    'mehartransport.com'
];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    BAD_DOMAINS.forEach(domain => {
        if (content.includes(domain)) {
            // Further verify if it's in canonical or og:url
            const ogUrlMatch = content.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"/);
            const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
            
            if (ogUrlMatch && ogUrlMatch[1].includes(domain)) {
                console.error(`\n❌ Build check failed: Bad domain ${domain} found in og:url of ${file}\n`);
                failed = true;
            }
            if (canonicalMatch && canonicalMatch[1].includes(domain)) {
                console.error(`\n❌ Build check failed: Bad domain ${domain} found in canonical URL of ${file}\n`);
                failed = true;
            }
        }
    });
});

if (failed) {
    process.exit(1);
} else {
    console.log('✅ Build check passed: No cross-domain metadata leaks found in generated HTML.');
}
