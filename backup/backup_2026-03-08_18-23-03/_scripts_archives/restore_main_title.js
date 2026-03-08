const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Restore .titre-memoire in mobile media query back to original
    const titreMemoireRegex = /\.titre-memoire\s*\{\s*font-size:\s*1\.65rem;[\s\S]*?text-shadow:.*?\}\s*/g;

    // We replace the overridden one back to the standard mobile size
    content = content.replace(titreMemoireRegex,
        `.titre-memoire {
        font-size: 2.2rem;
        letter-spacing: 0.05em;
      }
`);

    // Bust cache to v88
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=88');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully restored main title in ${f}`);
    }
});
