const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'components', 'booking', 'BookingForm.tsx');
let content = fs.readFileSync(file, 'utf8');

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
content = content.replace(/bg-\[\#04162B\]\/50/g, 'bg-surface-sunken');
content = content.replace(/text-gold-dark/g, 'text-gold-strong');

fs.writeFileSync(file, content);
console.log('Replaced colors in BookingForm.tsx');
