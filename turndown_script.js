const fs = require('fs');
const TurndownService = require('turndown');
const turndownService = new TurndownService();

// Configure turndown to handle line breaks better
turndownService.addRule('linebreaks', {
  filter: ['br'],
  replacement: function (content) {
    return '\n';
  }
});

let content = fs.readFileSync('src/data/blog-posts.ts', 'utf-8');
content = content.replace(/content:\s*`([\s\S]*?)`,/g, (match, html) => {
    if (!html.includes('<div class="prose')) return match;
    let md = turndownService.turndown(html);
    md = md.replace(/^\\n+/, '');
    return 'content: `\n\n' + md.replace(/`/g, '\\`') + '\n\n`,';
});
fs.writeFileSync('src/data/blog-posts.ts', content);
console.log('Done!');
