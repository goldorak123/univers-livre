const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre',
];

function processFile(filePath) {
    let orig = fs.readFileSync(filePath, 'utf8');
    let content = orig;
    let filename = path.basename(filePath);

    // Looking for lines like:
    // <p class="footer-copyright"><a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">C</a>opyright &copy; <span id="current-year-footer"></span> simonlero.com &mdash; All rights

    // Replace the exact strings we know were introduced:
    // "C</a>opyright &copy;"
    // or string "Copyright &copy;"
    // with: "&copy;</a> <span id="current-year-footer">" but ensuring the <a> is on the &copy;

    // Specifically looking at the footer copyright block in livre-accueil files which usually looks like:
    // <p class="footer-copyright"><a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">C</a>opyright &copy;

    // 1. Remove "C</a>opyright " and wrap the &copy; in the link, or if it already is:
    content = content.replace(/(<a href="404\.html"[^>]*>)C(<\/a>)opyright\s+(?:&copy;|©)/gi, '$1&copy;$2');

    // 2. Or if it says "Copyright &copy;" without the link, we add the link to the &copy;
    content = content.replace(/Copyright\s+(?:&copy;|©)/gi, '<a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">&copy;</a>');

    // 3. And if it's "C</a>opyright" followed by a space... ensure no extra space
    // Let's just do a manual replace of the localized strings:
    content = content.replace(/<a href="404\.html"[^>]*>C(?:<\/a>|)<\/a>opyright\s*(?:&copy;|©)/g, '<a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">&copy;</a>');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        return 1;
    }
    return 0;
}

dirs.forEach(dir => {
    let count = 0;
    fs.readdirSync(dir).forEach(f => {
        if (f.startsWith('livre-accueil') && f.endsWith('.html') && !f.includes('backup')) {
            count += processFile(path.join(dir, f));
        }
    });
    console.log(`Easter egg fixes applied to ${count} files in ${dir}`);
});
