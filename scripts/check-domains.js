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

const BAD_PLACEHOLDERS = [
    'TODO',
    'PLACEHOLDER',
    'FIXME',
    'XXX',
    'CHANGEME'
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

    // Check for leaked placeholders in user-visible HTML
    // We ignore matches that look like an HTML attribute e.g., placeholder="Search"
    BAD_PLACEHOLDERS.forEach(placeholder => {
        // Regex to find the placeholder but ensure it's not part of placeholder="something"
        // A simple way is to check if it's not preceded by 'placeholder="' or 'placeholder='
        const index = content.indexOf(placeholder);
        if (index !== -1) {
            // It's possible it is a false positive if we just do indexOf, let's just use regex for better accuracy
            // Match placeholder string that is NOT inside an HTML tag attribute, or at least not literally placeholder="TODO" 
            // Since we just want to prevent these from rendering, even finding them inside an HTML tag might be a leak (e.g. href="TODO").
            // So we will just fail if we find 'TODO', 'PLACEHOLDER', 'FIXME', 'XXX', 'CHANGEME' as whole words (case sensitive usually)
            // Wait, we can just do an indexOf because these shouldn't be anywhere in the compiled output.
            console.error(`\n❌ Build check failed: Placeholder '${placeholder}' found in ${file}\n`);
            failed = true;
        }
    });
});

if (failed) {
    process.exit(1);
} else {
    console.log('✅ Build check passed: No cross-domain metadata leaks or placeholders found in generated HTML.');
}
