const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;

    // We want to replace any font-family in .footer-nav a and .footer-nav-links a with Inter
    // Let's use regex to find those blocks and replace their font-family property

    // Replace in .footer-nav-links a
    const rxLinks = /(\.footer-nav-links\s*a\s*\{[^}]*?font-family:\s*)[^;]+(?=;)/g;
    content = content.replace(rxLinks, (match, prefix) => {
        changed = true;
        return prefix + "'Inter', sans-serif, serif";
    });

    const rxNav = /(\.footer-nav\s*a\s*\{[^}]*?font-family:\s*)[^;]+(?=;)/g;
    content = content.replace(rxNav, (match, prefix) => {
        changed = true;
        return prefix + "'Inter', sans-serif, serif";
    });

    // Some footers might use Cinzel explicitly, let's also find "Cinzel" in footer context just in case, but usually it's in those two classes.
    // Also bump cache if changes made
    if (changed) {
        content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1009'");
        content = content.replace(/v=\d+/g, 'v=1009');
        fs.writeFileSync(f, content, 'utf8');
        count++;
        console.log('Fixed fonts in', f);
    }
});

console.log(`Updated footer fonts in ${count} files.`);

if (fs.existsSync('service-worker.js') && count > 0) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1009'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
}
