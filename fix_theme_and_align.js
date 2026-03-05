const fs = require('fs');

// 1. Fix Contact Page Alignment
['contact.html', 'contact-en.html', 'contact-es.html'].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Revert the container to left aligned
    content = content.replace(/(\.hero\s*\{[\s\S]*?)align-items:\s*center;([\s\S]*?text-align:\s*)center;/, '$1align-items: flex-start;$2left;');

    // Change subtitle alignment to left
    content = content.replace(/align-self:\s*center;/g, 'align-self: flex-start;');
    content = content.replace(/text-align:\s*center;/g, 'text-align: left;');

    // Slight margin adjustment
    content = content.replace(/margin-bottom:\s*20px;/g, 'margin-bottom: 30px;');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed alignment in', file);
    }
});

// 2. Fix the white browser bar by setting theme-color on ALL html pages
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let metaCount = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    let changed = false;
    if (!content.includes('theme-color')) {
        const metaTags = `    <meta name="theme-color" content="#000000">
    <meta name="color-scheme" content="dark">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;

        content = content.replace(/(<meta charset="[^"]*">)/i, `$1\n${metaTags}`);
        changed = true;
    }

    // Bump cache
    if (content.match(/sw_version',\s*'\d+'/)) {
        content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1005'");
        content = content.replace(/v=\d+/g, 'v=1005');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        metaCount++;
    }
}
console.log('Added missing theme-colors to ' + metaCount + ' pages');

// Bump SW
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1005'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
}
