const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('faq') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // We previously set it to 'margin: 0px auto 100px;'
    // User wants it lower, let's try 40px to give it breathing room below the subheader
    if (content.match(/margin:\s*0px\s+auto\s+100px;/)) {
        content = content.replace(/margin:\s*0px\s+auto\s+100px;/, 'margin: 40px auto 100px;');
        dirty = true;
    }
    // Just in case it's still -140px somehow
    else if (content.match(/margin:\s*-140px\s+auto\s+100px;/)) {
        content = content.replace(/margin:\s*-140px\s+auto\s+100px;/, 'margin: 40px auto 100px;');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Lowered faq-container margin in ${file}`);
    }
});
