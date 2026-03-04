const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. FAQ spacing: increase from 40px to 100px
    if (file.startsWith('faq')) {
        if (content.match(/margin:\s*40px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*40px\s+auto\s+100px;/, 'margin: 100px auto 100px;');
            dirty = true;
        }
    }

    // 2. Resume spacing: change from -30px to 40px
    if (file.startsWith('resume')) {
        if (content.match(/margin-top:\s*-30px;/)) {
            content = content.replace(/margin-top:\s*-30px;/, 'margin-top: 40px;');
            dirty = true;
        }
    }

    // 3. Contact spacing: change from -60px to 20px
    if (file.startsWith('contact')) {
        if (content.match(/margin-top:\s*-60px;/)) {
            content = content.replace(/margin-top:\s*-60px;/, 'margin-top: 20px;');
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Increased spacing in ${file}`);
    }
});
