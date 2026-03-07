const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('faq') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // We removed the empty .hero tag which was causing the black gap. 
    // Now the -140px margin is causing the content to overlap the header.
    // Let's reset it to -10px to just tuck it slightly under the gradient without overlapping the text.
    if (content.match(/margin:\s*-140px\s+auto\s+100px;/)) {
        content = content.replace(/margin:\s*-140px\s+auto\s+100px;/, 'margin: 0px auto 100px;');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Reset faq-container margin in ${file}`);
    }
});
