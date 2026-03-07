const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('404'));
let count = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We replace the entire style attribute of the installAppBtn to guarantee 100% uniformity.
    // We want a very small button: padding: 5px 12px; font-size: 0.55rem; border: 1px solid rgba(212, 162, 58, 0.4)
    const newStyle = `display: block; margin-top: 20px; background: transparent; border: 1px solid rgba(212, 162, 58, 0.4); color: var(--gold); padding: 5px 12px; border-radius: 30px; font-family: 'Inter', sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.4s ease;`;

    // Regex to match the installAppBtn and replace its style attribute
    content = content.replace(/(id="installAppBtn"[^>]*?style=")([^"]*)(")/g, `$1${newStyle}$3`);

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
}

console.log(`Unified Install App button styled in ${count} files.`);
