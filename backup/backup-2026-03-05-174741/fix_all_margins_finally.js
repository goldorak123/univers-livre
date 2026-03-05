const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('backup'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Remove empty <header class="hero"> tags that add 280px of invisible space
    const emptyHeroRegex = /<header class="hero">\s*<\/header>/g;
    if (content.match(emptyHeroRegex)) {
        content = content.replace(emptyHeroRegex, '');
        dirty = true;
    }

    // 2. Set FAQ margin to 120px top
    if (file.startsWith('faq')) {
        // Match margin: Xpx auto 100px;
        const faqMarginRegex = /margin:\s*\d+px\s+auto\s+100px;/g;
        if (content.match(faqMarginRegex)) {
            content = content.replace(faqMarginRegex, 'margin: 120px auto 100px;');
            dirty = true;
        }
    }

    // 3. Set Resume margin to 120px top
    if (file.startsWith('resume') || file.startsWith('tech') || file.startsWith('fich') || file.startsWith('media')) {
        // Match padding: 0 0 40px 0; margin-top: Xpx;
        const resumeMarginRegex = /padding:\s*0\s+0\s+40px\s+0;\s*margin-top:\s*[-]*\d+px;/g;
        if (content.match(resumeMarginRegex)) {
            content = content.replace(resumeMarginRegex, 'padding: 0 0 40px 0; margin-top: 120px;');
            dirty = true;
        }
    }

    // 4. Set Contact margin to 120px top
    if (file.startsWith('contact')) {
        // Match margin: Xpx 0 40px; inside .narrative-box
        const contactMarginRegex = /margin:\s*\d+px\s+0\s+40px;/g;
        if (content.match(contactMarginRegex)) {
            content = content.replace(contactMarginRegex, 'margin: 120px 0 40px;');
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned up hero and fixed margin in ${file}`);
    }
});
