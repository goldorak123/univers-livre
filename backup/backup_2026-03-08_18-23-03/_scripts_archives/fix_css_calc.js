const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html') && !f.includes('cv-secure'));

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // 1. Fix the global CSS block we injected in the previous step
    content = content.replace(/font-size:\s*calc\(1\.1rem\s*-\s*2px\)\s*!important;/g, 'font-size: 0.95rem !important;');

    // 2. Fix the inline style injected into livre-en and livre-es manually
    content = content.replace(/font-size:\s*calc\(1\.1rem\s*-\s*2px\);?/g, 'font-size: 0.95rem;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed calc() bug in: " + file);
        count++;
    }
}
console.log("Total files patched: " + count);
