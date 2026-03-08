const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Bump PWA version from v43.pwa_fix to v44.pwa_fix
    // Also bump the url parameter 'v=43_' to 'v=44_'
    content = content.replace(/v43\.pwa_fix/g, 'v44.pwa_fix').replace(/v=43_/g, 'v=44_');
    // Just in case it was still v42
    content = content.replace(/v42\.pwa_fix/g, 'v44.pwa_fix').replace(/v=42_/g, 'v=44_');

    fs.writeFileSync(file, content);
    console.log('Bumped PWA cache in ' + file);
});

// Update sw-v41.js cache name
let sw = fs.readFileSync('sw-v41.js', 'utf8');
sw = sw.replace(/simon-lero-v43-final/g, 'simon-lero-v44-final');
fs.writeFileSync('sw-v41.js', sw);
console.log('Updated sw-v41.js');
