const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/danie/OneDrive/Desktop/univers-livre';

function processFiles() {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    let modifiedCount = 0;

    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        let changed = false;

        // Find .pwa-banner-wrapper block and replace margin-right: 20px; with margin: 0 auto; on mobile
        // Actually, just removing the margin-right or setting it to 0 is enough.
        // Let's replace "margin-right: 20px;" inside .pwa-banner-wrapper with "margin: 0;"

        const newContent = content.replace(/(\.pwa-banner-wrapper\s*\{[^}]*)margin-right:\s*20px;([^}]*\})/g, '$1margin: 0 !important;$2');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${file}`);
            modifiedCount++;
        }
    }

    console.log(`Done. ${modifiedCount} files updated.`);
}

processFiles();
