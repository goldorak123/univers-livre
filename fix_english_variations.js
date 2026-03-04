const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('-en.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Check for "Moonlight Encounters" and replace with "Encounters by Moonlight"
    if (content.includes('Moonlight Encounters')) {
        content = content.replace(/Moonlight Encounters/g, 'Encounters by Moonlight');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Replaced 'Moonlight Encounters' with 'Encounters by Moonlight' in ${file}`);
    }
});
