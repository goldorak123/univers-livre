const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skipFiles = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html', '404.html'];

let count = 0;
for (const file of files) {
    if (skipFiles.includes(file) || file.startsWith('livre-accueil-v')) continue;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('titre-memoire')) continue;

    // Titre = 2.4rem
    content = content.replace(/(\.titre-memoire\s*\{[^}]*?font-size:\s*)(2\.1rem|2\.2rem|2\.6rem);/g, '$12.4rem;');

    // Simon Lero = 0.45rem
    content = content.replace(/(\.auteur-header\s*\{[^}]*?font-size:\s*)(0\.5rem|0\.45rem|0\.55rem);/g, '$10.45rem;');

    // Sub-title = 0.65rem
    content = content.replace(/(\.livre-header\s*\{[^}]*?font-size:\s*)(0\.7rem|0\.65rem|0\.75rem);/g, '$10.65rem;');

    // maintain line-height 1.1 for titre-memoire safely
    content = content.replace(/(\.titre-memoire\s*\{[\s\S]*?\}?)(?=\s*\})/g, (match) => {
        let m = match;
        if (m.includes('line-height')) {
            m = m.replace(/line-height:\s*[\d\.]+;/, 'line-height: 1.1;');
        } else if (m.includes('display: inline-block;')) {
            m = m.replace('display: inline-block;', 'display: inline-block;\n        line-height: 1.1;');
        }
        return m;
    });

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
}
console.log('Perfectly adjusted fonts in ' + count + ' files');
