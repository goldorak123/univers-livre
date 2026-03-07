const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const targets = ['livre-en.html', 'livre-es.html'];

for (const file of targets) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Hardcode the inline style changes for the two specific buttons to ensure they absolutely take effect
    // We will replace font-size: 1.1rem; with font-size: calc(1.1rem - 2px);
    // And ensure the color is #d8b25a

    content = content.replace(/font-size:\s*1\.1rem;/g, 'font-size: calc(1.1rem - 2px);');

    // Also inject color: #d8b25a into the style just in case
    // We previously stripped color: #c9a24d. Let's make sure #d8b25a is there.
    content = content.replace(/style="/g, 'style="color: #d8b25a !important; ');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Hard-patched styles inline for " + file);
    }
}
