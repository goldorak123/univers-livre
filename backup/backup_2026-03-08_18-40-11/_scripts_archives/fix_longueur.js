const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Use regex to locate Mobile titre-memoire
    const regex = /\.titre-memoire\s*\{\s*font-size:\s*2\.2rem;\s*letter-spacing:\s*0\.05em;\s*\}/g;

    content = content.replace(regex,
        `.titre-memoire {
        font-size: 2.2rem;
        letter-spacing: 0.05em;
        transform: scaleX(0.75);
        transform-origin: center;
        display: inline-block;
      }`);

    // Some might have different indentation or trailing spaces
    const regexFallback = /\.titre-memoire\s*\{\s*font-size:\s*2\.2rem;\s*letter-spacing:\s*0\.05em;\s*[\s\S]*?\}/g;
    content = content.replace(regexFallback,
        `.titre-memoire {
        font-size: 2.2rem;
        letter-spacing: 0.05em;
        transform: scaleX(0.75);
        transform-origin: center;
        display: inline-block;
      }`);

    // Bust cache to v94
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=94');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully reduced length of main title in ${f}`);
    }
});
