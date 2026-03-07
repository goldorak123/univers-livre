const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Use robust flexible regex to replace the font sizes inside the mobile media query safely
    // 1. .auteur-header: 0.75rem -> 0.55rem (26% shrink), add white
    const auteurRegex = /\.auteur-header\s*\{\s*font-size:\s*(0\.75rem|0\.4rem|0\.5rem|1\.1rem);\s*letter-spacing:.*?margin-bottom:.*?\}/g;
    content = content.replace(auteurRegex,
        `.auteur-header {
        font-size: 0.55rem;
        letter-spacing: 4px;
        margin-bottom: 0px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`);

    // 2. .titre-memoire: 2.2rem -> 1.65rem (25% shrink)
    const titreMemoireRegex = /\.titre-memoire\s*\{\s*font-size:\s*2\.2rem;\s*letter-spacing:.*?\}/g;
    content = content.replace(titreMemoireRegex,
        `.titre-memoire {
        font-size: 1.65rem;
        letter-spacing: 0.05em;
        color: #ffffff !important;
        background: none !important;
        -webkit-text-fill-color: #ffffff !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      }`);

    // Titre memoire variation (if it's already modified)
    const titreMemoireRegex2 = /\.titre-memoire\s*\{\s*font-size:\s*1\.65rem;[\s\S]*?\}/g;
    content = content.replace(titreMemoireRegex2,
        `.titre-memoire {
        font-size: 1.65rem;
        letter-spacing: 0.05em;
        color: #ffffff !important;
        background: none !important;
        -webkit-text-fill-color: #ffffff !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      }`);

    // 3. .livre-header: 1rem -> 0.75rem (25% shrink)
    const livreRegex = /\.livre-header\s*\{\s*font-size:\s*(1rem|0\.5rem|0\.75rem);\s*letter-spacing:.*?margin-top:.*?\}/g;
    content = content.replace(livreRegex,
        `.livre-header {
        font-size: 0.75rem;
        letter-spacing: 1px;
        margin-top: 2px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`);

    // Make main desktop subtitle white if it isn't already
    content = content.replace(/color:\s*#d4a23a\s*;/g, 'color: #ffffff;');

    // Bust cache to v84
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=84');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully reduced fonts by 25% in ${f}`);
    }
});
