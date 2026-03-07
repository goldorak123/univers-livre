const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html') && !f.includes('cv-secure'));

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Add font-weight: 900 and a strong text-shadow to the inline styles of the 2 buttons
    content = content.replace(/color:\s*#c9a24d\s*!important;/g, 'color: #c9a24d !important; text-shadow: 0 4px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1) !important; font-weight: 900 !important;');

    // Also update the global CSS block in livre.html just in case
    content = content.replace(/color:\s*#c9a24d\s*!important;\s*\n/g, 'color: #c9a24d !important;\n            text-shadow: 0 4px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1) !important;\n            font-weight: 900 !important;\n');

    // Make sure we didn't duplicate it if run twice
    content = content.replace(/(text-shadow:[^;]+;\s*font-weight:[^;]+;)\s*text-shadow:[^;]+;\s*font-weight:[^;]+;/g, '$1');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Boosted contrast in: " + file);
        count++;
    }
}
console.log("Total files patched: " + count);
