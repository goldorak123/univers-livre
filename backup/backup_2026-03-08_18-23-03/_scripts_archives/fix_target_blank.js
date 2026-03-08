const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Add target="_blank" to the footer link
    content = content.replace(/(<a href="https:\/\/www\.mon-univers\.ca\/index\.html")(?! target="_blank")/g, '$1 target="_blank"');

    // Bump PWA version
    content = content.replace(/v47\.pwa_fix/g, 'v48.pwa_fix').replace(/v=47_/g, 'v=48_');
    content = content.replace(/v46\.pwa_fix/g, 'v48.pwa_fix').replace(/v=46_/g, 'v=48_');

    fs.writeFileSync(file, content);
    console.log('Added target=_blank in ' + file);
});

// Update sw-v41.js
let sw = fs.readFileSync('sw-v41.js', 'utf8');
sw = sw.replace(/simon-lero-v47-final/g, 'simon-lero-v48-final');
sw = sw.replace(/simon-lero-v46-final/g, 'simon-lero-v48-final');
fs.writeFileSync('sw-v41.js', sw);
console.log('Updated sw-v41.js to v48');
