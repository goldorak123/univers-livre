const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Auteur header (50% was 0.4, 25% is 0.55rem)
    const auteurRegex = /\.auteur-header\s*\{\s*font-size:\s*(0\.75rem|0\.4rem|0\.5rem|1\.1rem|0\.55rem);\s*letter-spacing:[\s\S]*?margin-bottom:[\s\S]*?\}/g;
    content = content.replace(auteurRegex,
        `.auteur-header {
        font-size: 0.55rem;
        letter-spacing: 4px;
        margin-bottom: 0px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`);

    // Titre Memoire (Original 2.2rem, 25% is 1.65rem)
    const titreMemRegex = /\.titre-memoire\s*\{\s*font-size:\s*(2\.2rem|1\.65rem|2rem);\s*letter-spacing:.*?[\s\S]*?\}/g;
    content = content.replace(titreMemRegex,
        `.titre-memoire {
        font-size: 1.65rem;
        letter-spacing: 0.05em;
        color: #ffffff !important;
        background: none !important;
        -webkit-text-fill-color: #ffffff !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      }`);

    // Livre header (Original 1rem, 50% was 0.5rem, 25% is 0.75rem)
    const livreRegex = /\.livre-header\s*\{\s*font-size:\s*(1rem|0\.5rem|0\.75rem);\s*letter-spacing:[\s\S]*?margin-top:[\s\S]*?\}/g;
    content = content.replace(livreRegex,
        `.livre-header {
        font-size: 0.75rem;
        letter-spacing: 1px;
        margin-top: 2px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`);

    // Desktop font white force
    content = content.replace(/color:\s*#d4a23a\s*;/g, 'color: #ffffff;');

    // Bust cache to v86
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=86');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Updated 25% mobile fonts in ${f}`);
    }
});
