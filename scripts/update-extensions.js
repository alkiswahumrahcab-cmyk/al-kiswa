const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(path.join(__dirname, '../src'), (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = content.replace(/(\/images\/routes\/.*?\.)(png|jpg)/gi, '$1webp');
        updated = updated.replace(/(\/images\/fleet\/.*?\.)(png|jpg)/gi, '$1webp');
        
        if (content !== updated) {
            console.log(`Updated ${filePath}`);
            fs.writeFileSync(filePath, updated, 'utf8');
        }
    }
});
