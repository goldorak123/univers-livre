const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre',
    'c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public'
];

function processFile(filePath) {
    let filename = path.basename(filePath);
    if (!filename.endsWith('.html') || filename.includes('backup')) return 0;

    let orig = fs.readFileSync(filePath, 'utf8');
    let content = orig;

    if (content.includes('class="pwa-banner-wrapper"')) {
        return 0; // already wrapped
    }

    // Match <img ... pwa-text-banner ...> followed by <div ... pwa-install-hint ...>
    let regex = /(<img[^>]*pwa-text-banner[^>]*>)(\s*)(<div[^>]*pwa-install-hint[^>]*>[\s\S]*?<\/div>)/gi;

    content = content.replace(regex, (match, banner, space, hint) => {
        return `<div class="pwa-banner-wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;">
                    ${banner}
                    ${hint}
                </div>`;
    });

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        return 1;
    }
    return 0;
}

let count = 0;
dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(f => {
        let fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isFile()) {
            count += processFile(fullPath);
        }
    });
});

console.log(`Wrapped PWA banner and hint text in a column container in ${count} pages.`);
