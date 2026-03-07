const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. FAQ spacing: decrease from 100px to 20px
    if (file.startsWith('faq')) {
        if (content.match(/margin:\s*100px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*100px\s+auto\s+100px;/, 'margin: 20px auto 100px;');
            dirty = true;
        }
    }

    // 2. Resume spacing: change from 40px to -10px
    if (file.startsWith('resume')) {
        if (content.match(/margin-top:\s*40px;/)) {
            content = content.replace(/margin-top:\s*40px;/, 'margin-top: -10px;');
            dirty = true;
        }
    }

    // 3. Contact spacing: change from 20px to -30px
    if (file.startsWith('contact')) {
        if (content.match(/margin-top:\s*20px;/)) {
            content = content.replace(/margin-top:\s*20px;/, 'margin-top: -30px;');
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Decreased spacing in ${file}`);
    }
});
