const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Bump PWA version from v44.pwa_fix to v45.pwa_fix
    // Also bump the url parameter 'v=44_' to 'v=45_'
    content = content.replace(/v44\.pwa_fix/g, 'v45.pwa_fix').replace(/v=44_/g, 'v=45_');

    fs.writeFileSync(file, content);
    console.log('Bumped PWA cache to v45 in ' + file);
});

// Update sw-v41.js cache name
let sw = fs.readFileSync('sw-v41.js', 'utf8');
sw = sw.replace(/simon-lero-v44-final/g, 'simon-lero-v45-final');
fs.writeFileSync('sw-v41.js', sw);
console.log('Updated sw-v41.js');
