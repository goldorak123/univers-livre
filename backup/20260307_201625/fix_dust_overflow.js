const fs = require('fs');

['livre-en.html', 'livre-es.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Remove overflow: hidden from .hero-stage
    content = content.replace(/(\.hero-stage\s*\{[^}]*?)overflow:\s*hidden;/g, '$1overflow: visible;');

    // Also ensuring .hero is visible (it should already be visible, but just in case)
    content = content.replace(/(\.hero\s*\{[^}]*?)overflow:\s*hidden;(?! \/\*)/g, '$1overflow: visible;');

    // Bump global cache variable in these files
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1006'");
    content = content.replace(/v=\d+/g, 'v=1006');

    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed overflow in', f);
});

// Bump service-worker.js
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1006'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
}
