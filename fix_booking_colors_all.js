const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            content = content.replace(/bg-\[\#0B0F19\]\/90/g, 'bg-surface/90');
            content = content.replace(/text-\[\#C9D4E0\]/g, 'text-muted');
            content = content.replace(/text-white/g, 'text-ink');
            content = content.replace(/text-n-[3456]00/g, 'text-muted');
            content = content.replace(/bg-\[\#111\]/g, 'bg-surface');
            content = content.replace(/bg-\[\#151515\]/g, 'bg-surface-alt');
            content = content.replace(/border-white\/\d+/g, 'border-border');
            content = content.replace(/bg-white\/5/g, 'bg-surface-alt');
            content = content.replace(/bg-white\/10/g, 'bg-surface-sunken');
            content = content.replace(/bg-charcoal\/40/g, 'bg-surface-alt');
            content = content.replace(/bg-charcoal/g, 'bg-surface-alt');
            content = content.replace(/bg-\[\#04162B\]\/50/g, 'bg-surface-sunken');
            content = content.replace(/text-gold-dark/g, 'text-gold-strong');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed:', fullPath);
            }
        }
    }
}

const targetDir = path.join(__dirname, 'src', 'components', 'booking');
processDir(targetDir);
