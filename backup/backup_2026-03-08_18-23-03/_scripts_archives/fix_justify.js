const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre',
    'c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public'
];

let changedCount = 0;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let orig = content;

        // I previously injected: text-align: left !important; /* Fallback...
        // Let's replace it with text-align: justify !important;
        content = content.replace(/text-align:\s*left\s*!important;\s*\/\*\s*Fallback.*?\*\//g, 'text-align: justify !important;');

        if (content !== orig) {
            fs.writeFileSync(filePath, content, 'utf8');
            changedCount++;
            console.log("Updated: " + filePath);
        }
    }
}
console.log('Total files updated to justify: ' + changedCount);
