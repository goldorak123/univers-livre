const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('404'));

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Make the footer nav links permanently gold
    // We target `.footer-nav-links a` and change color to var(--gold)
    content = content.replace(/(\.footer-nav-links\s*a\s*\{[\s\S]*?color:\s*)#fff(;|})/g, '$1var(--gold)$2');
    content = content.replace(/(\.footer-nav\s*a\s*\{[\s\S]*?color:\s*)#fff(;|})/g, '$1var(--gold)$2');
    content = content.replace(/(\.footer-nav-links\s*a\s*\{[\s\S]*?color:\s*)#ffffff(;|})/g, '$1var(--gold)$2');
    content = content.replace(/(\.footer-nav\s*a\s*\{[\s\S]*?color:\s*)#ffffff(;|})/g, '$1var(--gold)$2');

    // 2. Reduce the size of the PWA Install Button
    content = content.replace(/(id="installAppBtn"[^>]*?padding:\s*)10px 25px([^>]*?font-size:\s*)0\.85rem/g, '$17px 18px$20.65rem');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
}

console.log(`Updated footer links and reduced button size in ${updatedCount} HTML files.`);
