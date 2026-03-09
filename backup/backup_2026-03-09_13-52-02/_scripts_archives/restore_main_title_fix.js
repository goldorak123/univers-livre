const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Use a very permissive regex to capture everything inside the titre-memoire block that has font-size: 1.65rem;
    const regex = /\.titre-memoire\s*\{\s*font-size:\s*1\.65rem;[\s\S]*?\}/g;

    // Replace it back to the clean original version
    content = content.replace(regex,
        `.titre-memoire {
        font-size: 2.2rem;
        letter-spacing: 0.05em;
      }`);

    // Bust cache to v90
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=90');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully restored main title in ${f}`);
    }
});
