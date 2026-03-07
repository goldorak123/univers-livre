const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    if (f.startsWith('livre-accueil') || f.startsWith('404')) return;

    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Apply strict regex to match the exact mobile CSS block to ensure we don't break the layout.
    // 1. Auteur Header (Simon Lero) - Size remains 0.75rem, but force white color and shadow
    const auteurRegex = /\.auteur-header\s*\{\s*font-size:\s*0\.75rem;\s*letter-spacing:\s*5px;\s*margin-bottom:\s*0px;\s*\}/g;
    content = content.replace(auteurRegex,
        `.auteur-header {\n            font-size: 0.75rem;\n            letter-spacing: 5px;\n            margin-bottom: 0px;\n            color: #ffffff !important;\n            text-shadow: 0 1px 3px rgba(0,0,0,0.8);\n        }`);

    // 2. Livre Header (Subtitle) - Size reduced from 1rem to 0.75rem, force white color and shadow
    const livreRegex = /\.livre-header\s*\{\s*font-size:\s*1rem;\s*letter-spacing:\s*1px;\s*margin-top:\s*2px;\s*\}/g;
    content = content.replace(livreRegex,
        `.livre-header {\n            font-size: 0.75rem;\n            letter-spacing: 1px;\n            margin-top: 2px;\n            color: #ffffff !important;\n            text-shadow: 0 1px 3px rgba(0,0,0,0.8);\n        }`);

    // Let's also bump the service worker cache to ensure the changes are seen!
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=76');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Updated mobile header fonts safely in ${f}`);
    }
});
