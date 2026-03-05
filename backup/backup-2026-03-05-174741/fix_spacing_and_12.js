const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newPatch = `
    .header-livre::before {
        content: "";
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 120px;
        height: 80px;
        background: radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
        z-index: 5;
        pointer-events: none;
    }
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Fix the 12 Patch (replace old one if it exists)
    if (content.includes('.header-livre::before {') && content.includes('filter: blur(8px);')) {
        content = content.replace(/ \.header-livre::before \{[\s\S]*?pointer-events: none;\s*\}/, newPatch.trim());
        dirty = true;
    }

    // 2. Fix FAQ Spacing
    if (file.startsWith('faq')) {
        if (content.match(/margin:\s*40px\s+auto\s+100px;/)) {
            content = content.replace(/margin:\s*40px\s+auto\s+100px;/, 'margin: -80px auto 100px;\n            position: relative;\n            z-index: 20;');
            dirty = true;
        }
    }

    // 3. Fix Contact Spacing
    if (file.startsWith('contact')) {
        // Find .hero { padding: ... }
        if (content.match(/\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;/)) {
            content = content.replace(
                /\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;/,
                '.hero {\n            position: relative;\n            padding: 0px 40px 80px;\n            margin-top: -60px;\n            z-index: 20;'
            );
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed spacing and rogue 12 in ${file}`);
    }
});
