const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Matches <header class="hero"> exactly with optional whitespace/newlines followed by </header>
    const emptyHeroRegex = /<header class="hero">\s*<\/header>/g;

    if (content.match(emptyHeroRegex)) {
        content = content.replace(emptyHeroRegex, '');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Removed empty hero from ${file}`);
    }
});
