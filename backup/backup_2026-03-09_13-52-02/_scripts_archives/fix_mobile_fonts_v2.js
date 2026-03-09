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
    // Use regex to carefully target the 768px block properties.

    // Titre memoire
    newContent = newContent.replace(
        /(\.titre-memoire\s*\{[^}]*?font-size:\s*)2\.6rem;/g,
        '$12.1rem;'
    );
    // remove scaleX 
    newContent = newContent.replace(
        /transform:\s*scaleX\(0\.75\);\s*/g,
        ''
    );
    // add line-height if missing
    if (!newContent.match(/\.titre-memoire\s*\{[^}]*?line-height/)) {
        newContent = newContent.replace(
            /(\.titre-memoire\s*\{(?:\s*.*?)*?)display:\s*inline-block;/g,
            '$1display: inline-block;\n        line-height: 1.1;'
        );
    }

    // Subtitles (They asked to REDUCE from the original 0.75 and 0.55, but 0.65 and 0.45 was too "merde". Let's give them 0.7rem and 0.5rem)
    newContent = newContent.replace(
        /(\.auteur-header\s*\{[^}]*?font-size:\s*)0\.45rem;/g,
        '$10.5rem;'
    );
    newContent = newContent.replace(
        /(\.livre-header\s*\{[^}]*?font-size:\s*)0\.65rem;/g,
        '$10.7rem;'
    );

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed mobile font layout in', file);
        count++;
    }
}
console.log('Total files repaired:', count);
