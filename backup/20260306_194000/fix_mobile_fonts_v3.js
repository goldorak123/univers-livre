const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skipFiles = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html', '404.html'];

let count = 0;
for (const file of files) {
    if (skipFiles.includes(file) || file.startsWith('livre-accueil-v')) continue;

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('titre-memoire')) continue;

    let newContent = content;

    // We replace the mobile @media block for the typography specifically.
    // Use simpler regex to avoid backtracking.

    // Titre memoire
    newContent = newContent.replace(
        /(\.titre-memoire\s*\{[\s\S]*?font-size:\s*)2\.6rem;/g,
        '$12.1rem;'
    );
    // remove scaleX 
    newContent = newContent.replace(
        /transform:\s*scaleX\(0\.75\);\s*/g,
        ''
    );
    // add line-height if missing
    newContent = newContent.replace(
        /(\.titre-memoire\s*\{[\s\S]*?)display:\s*inline-block;/g,
        (match, p1) => {
            if (p1.includes('line-height')) return match;
            return p1 + 'display: inline-block;\n        line-height: 1.1;';
        }
    );

    // Subtitles 
    newContent = newContent.replace(
        /(\.auteur-header\s*\{[\s\S]*?font-size:\s*)0\.45rem;/g,
        '$10.5rem;'
    );
    newContent = newContent.replace(
        /(\.livre-header\s*\{[\s\S]*?font-size:\s*)0\.65rem;/g,
        '$10.7rem;'
    );

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed mobile font layout in', file);
        count++;
    }
}
console.log('Total files repaired:', count);
