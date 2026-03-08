const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skipFiles = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html', '404.html'];

let count = 0;
for (const file of files) {
    if (skipFiles.includes(file) || file.startsWith('livre-accueil-v')) continue;

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('titre-memoire')) continue;

    let newContent = content;

    // Increase titre-memoire (Main Title)
    newContent = newContent.replace(
        /(\.titre-memoire\s*\{\s*font-size:\s*)2\.2rem;/g,
        '$12.6rem;'
    );

    // Decrease auteur-header (Simon Lero)
    newContent = newContent.replace(
        /(\.auteur-header\s*\{\s*font-size:\s*)0\.55rem;/g,
        '$10.45rem;'
    );

    // Decrease livre-header (Subtitle)
    newContent = newContent.replace(
        /(\.livre-header\s*\{\s*font-size:\s*)0\.75rem;/g,
        '$10.65rem;'
    );

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated font sizes in', file);
        count++;
    }
}
console.log('Total files updated:', count);
