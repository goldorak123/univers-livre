const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Fix English Translation
    if (file.endsWith('-en.html')) {
        if (content.includes('Meetings in the Moonlight')) {
            content = content.replace(/Meetings in the Moonlight/g, 'Encounters by Moonlight');
            dirty = true;
        }
    }

    // 2. Fix the empty <header class="hero"> causing spacing in FAQ (or others)
    // We can just add display: none to it or remove it entirely if it's empty
    if (file.startsWith('faq')) {
        if (content.match(/<header class="hero">[\s\n\r]*<\/header>/)) {
            content = content.replace(/<header class="hero">[\s\n\r]*<\/header>/g, '');
            dirty = true;
        }

        // Also if we have a hero class in the style block of FAQ that's not used, let's just make sure 
        // faq-container margin is adjusted. Since we removed hero, maybe we only need -60px now, but let's see.
        // I will just remove the empty hero tags for now.
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
