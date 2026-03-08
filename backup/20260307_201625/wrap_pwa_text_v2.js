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

    // Match any img tag that has class="pwa-text-banner" followed by any whitespace/newlines and then the pwa-install-hint div
    let regex = /(<img[^>]*class="pwa-text-banner"[^>]*>)[\s\S]*?(<div[^>]*class="pwa-install-hint"[^>]*>[\s\S]*?<\/div>)/g;

    content = content.replace(regex, (match, banner, hint) => {
        // Double check no other HTML is getting swallowed between the banner and the hint by checking the gap length
        if (match.length > 500) {
            return match; // safety fallback
        }
        return `<div class="pwa-banner-wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
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
