const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html') && !f.includes('cv-secure'));

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // 1. Fix the CSS block that we injected in `fix_gold_and_size.js` for `livre.html`
    // It currently has `.footer-nav a { color: #d8b25a !important; ... }`
    content = content.replace(/\.footer-nav\s+a\s*\{\s*color:\s*#d8b25a\s*!important;/g, '.footer-nav a {\n            color: #c9a24d !important;');

    // 2. Fix the manual inline styles we forced into translation pages in `force_inline_es_en.js`
    // It currently has `color: #d8b25a !important; font-size: 0.95rem;`
    content = content.replace(/color:\s*#d8b25a\s*!important;/g, 'color: #c9a24d !important;');


    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated to true gold #c9a24d in: " + file);
        count++;
    }
}
console.log("Total files patched: " + count);
