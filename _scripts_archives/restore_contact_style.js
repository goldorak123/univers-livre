const fs = require('fs');
const files = ['contact.html', 'contact-en.html', 'contact-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // The preferred CSS style (uppercase, sans-serif, spaced out)
    const newCss = `.hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 200;
            color: #ccc;
            margin-top: 40px;
            margin-bottom: 20px;
            letter-spacing: 8px; /* Slightly reduced from 12px to accommodate longer sentence */
            text-transform: uppercase;
            line-height: 1.8;
            max-width: 900px;
            animation: fadeIn 2s ease-out 0.8s forwards;
            opacity: 0;
            align-self: center;
            text-align: center;
        }`;

    // Execute replacement
    content = content.replace(/\.hero-subtitle\s*\{[\s\S]*?opacity:\s*0;\s*\}/, newCss);

    // Also center the whole hero container to make this wide text look balanced
    content = content.replace(/(\.hero\s*\{[\s\S]*?)align-items:\s*flex-start;([\s\S]*?text-align:\s*)left;/, '$1align-items: center;$2center;');

    // Bump global SW version
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1004'");
    content = content.replace(/v=\d+/g, 'v=1004');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully restored style in', file);
});

// Bump service-worker.js
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1004'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
    console.log('Bumped service worker to v1004');
}
