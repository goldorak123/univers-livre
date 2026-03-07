const fs = require('fs');
const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('backup'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Remove empty hero from tech specs just in case it was missed
    const emptyHeroRegex = /<header class="hero">\s*<\/header>/g;
    if (content.match(emptyHeroRegex)) {
        content = content.replace(emptyHeroRegex, '');
        dirty = true;
    }

    // Tech specs margin: .grid-editions margin-top
    if (file.startsWith('tech') || file.startsWith('fich') || file.startsWith('ficha')) {
        const gridEditionsRegex = /margin-top:\s*40px;/g;
        if (content.match(gridEditionsRegex)) {
            // we specifically want to target .grid-editions margin-top
            content = content.replace(/.grid-editions\s*{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(2,\s*1fr\);\s*gap:\s*40px;\s*margin-top:\s*40px;/g,
                '.grid-editions {\n            display: grid;\n            grid-template-columns: repeat(2, 1fr);\n            gap: 40px;\n            margin-top: 120px;');
            dirty = true;
        }
    }

    // Livre pages margin: .hero-stage padding
    if (file.startsWith('livre')) { // livre.html, livre-en.html, livre-es.html, livre-accueil...
        if (file !== 'livre-accueil.html' && file !== 'livre-accueil-en.html' && file !== 'livre-accueil-es.html') {
            const heroStageRegex = /padding:\s*60px\s+0\s+40px;/g;
            if (content.match(heroStageRegex)) {
                content = content.replace(heroStageRegex, 'padding: 120px 0 40px;');
                dirty = true;
            }
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Unified margins to 120px in ${file}`);
    }
});
