const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('404'));

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Make the 4 footer links permanently gold
    // Find the CSS block for .footer-nav-links a
    content = content.replace(/(\.footer-nav-links\s*a\s*\{[^}]*?color:\s*)#fff(;\s*[^}]*\})/g, '$1var(--gold)$2');

    // Also handling edge cases where it might be white or already var(--gold) but we want to ensure it
    // Wait, let's just use replaceAll if there is #ffffff or #fff
    content = content.replace(/(\.footer-nav-links\s*a\s*\{[^}]*?color:\s*)(?:#fff|#ffffff|white)(;\s*[^}]*\})/gi, '$1var(--gold)$2');

    // 2. Reduce the size of the "Installer l'App" button by ~30%
    // Original: padding: 10px 25px; font-size: 0.85rem;
    // New: padding: 7px 18px; font-size: 0.65rem;
    content = content.replace(/(id="installAppBtn"[^>]*?style="[^"]*?padding:\s*)10px 25px([^"]*?font-size:\s*)0\.85rem([^"]*?")/g, '$17px 18px$20.65rem$3');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
}

console.log(`Updated navigation links and button size in ${updatedCount} files.`);
