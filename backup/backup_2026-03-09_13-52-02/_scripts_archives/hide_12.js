const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const cssSnippet = `
    .header-livre::before {
        content: "";
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 60px;
        height: 50px;
        background: #000;
        filter: blur(8px);
        z-index: 1;
        pointer-events: none;
    }
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Inject if .header-livre exists and we haven't already injected the fix
    if (content.includes('.header-livre::after {') && !content.includes('.header-livre::before {')) {
        content = content.replace(
            '.header-livre::after {',
            cssSnippet + '\n    .header-livre::after {'
        );
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Patched '12' across ${file}`);
    }
});
