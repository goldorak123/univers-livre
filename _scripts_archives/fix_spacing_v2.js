const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // FAQ Files: aggressively pull .faq-container up and ensure z-index is high enough
    if (file.startsWith('faq')) {
        if (content.match(/margin:\s*-80px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*-80px\s+auto\s+100px;/, 'margin: -140px auto 100px;');
            dirty = true;
        } else if (content.match(/margin:\s*40px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*40px\s+auto\s+100px;/, 'margin: -140px auto 100px;\n            position: relative;\n            z-index: 20;');
            dirty = true;
        }
    }

    // Contact Files: aggressively pull .hero up
    if (file.startsWith('contact')) {
        if (content.match(/margin-top:\s*-60px;/)) {
            content = content.replace(/margin-top:\s*-60px;/, 'margin-top: -120px;');
            dirty = true;
        } else if (content.match(/\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;/)) {
            content = content.replace(
                /\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;/,
                '.hero {\n            position: relative;\n            padding: 0px 40px 80px;\n            margin-top: -120px;\n            z-index: 20;'
            );
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Pulled content higher in ${file}`);
    }
});
