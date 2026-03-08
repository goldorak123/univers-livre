const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. FAQ spacing: adjust from 20px to 60px (middle ground between 100 and 20)
    if (file.startsWith('faq')) {
        if (content.match(/margin:\s*20px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*20px\s+auto\s+100px;/, 'margin: 60px auto 100px;');
            dirty = true;
        }
    }

    // 2. Resume spacing: adjust from -10px to 20px (middle ground between 40 and -10)
    if (file.startsWith('resume')) {
        if (content.match(/margin-top:\s*-10px;/)) {
            content = content.replace(/margin-top:\s*-10px;/, 'margin-top: 20px;');
            dirty = true;
        }
    }

    // 3. Contact spacing: adjust from -30px to 0px (middle ground between 20 and -30)
    if (file.startsWith('contact')) {
        if (content.match(/margin-top:\s*-30px;/)) {
            content = content.replace(/margin-top:\s*-30px;/, 'margin-top: 0px;');
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Balanced spacing in ${file}`);
    }
});
