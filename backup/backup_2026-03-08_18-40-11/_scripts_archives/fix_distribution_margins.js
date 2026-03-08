const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('distribution') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // 1. Move <style> into <head>
    if (content.includes('</head>\r\n\r\n<style>') || content.includes('</head>\n<style>')) {
        content = content.replace(/<\/head>[\r\n]+<style>/, '<style>');
        content = content.replace(/<\/style>[\r\n]+<body/, '</style>\n</head>\n<body');
        dirty = true;
    }

    // 2. Force body margin 0
    if (content.match(/body\s*{[^}]*background:[^;]+;/)) {
        content = content.replace(/body\s*{[^}]*background:[^;]+;/, match => {
            if (!match.includes('margin: 0 !important')) {
                return match + '\n        margin: 0 !important;\n        padding: 0 !important;';
            }
            return match;
        });
        dirty = true;
    }

    // 3. Make sure .distribution-container doesn't have mysterious padding inherited
    // We'll explicitly add CSS for it to be padding: 0; margin: 0; width: 100%
    if (content.includes('.distribution-container') && !content.includes('.distribution-container {')) {
        content = content.replace('</style>', `
    .distribution-container {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
</style>`);
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed body/container margins in ${file}`);
    }
});
