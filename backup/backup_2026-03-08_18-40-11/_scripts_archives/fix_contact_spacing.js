const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('contact') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Fix Contact Spacing
    if (content.match(/<header\s+class="hero">/)) {
        // Change inline margin
        if (content.match(/\.hero\s*{[^}]*padding:\s*0px\s+40px\s+80px;[^}]*}/)) {
            // Already modified partially, but let's make sure margin-top is -120px
            content = content.replace(/margin-top:\s*-60px;/, 'margin-top: -120px;');
            content = content.replace(/padding:\s*0px\s+40px\s+80px;/, 'padding: 0px 40px 80px;'); // noop, just to check

            // Wait, looking at the source:
            // .hero {
            //     position: relative;
            //     padding: 160px 40px 80px;
            content = content.replace(
                /\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;\s*\}/,
                '.hero {\n            position: relative;\n            padding: 0px 40px 80px;\n            margin-top: -120px;\n            z-index: 20;\n        }'
            );
            dirty = true;
        }

        // if the above didn't match, maybe it's just the padding rule missing the brace in the regex
        content = content.replace(
            /\.hero\s*\{\s*position:\s*relative;\s*padding:\s*160px\s+40px\s+80px;/,
            '.hero {\n            position: relative;\n            padding: 0px 40px 80px;\n            margin-top: -120px;\n            z-index: 20;'
        );
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Pulled contact content higher in ${file}`);
    }
});
