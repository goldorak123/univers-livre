const fs = require('fs');
const files = ['contact.html', 'contact-en.html', 'contact-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Extract the <p> text
    const pMatch = content.match(/<div class="narrative-box">\s*<p>([\s\S]*?)<\/p>/);
    if (!pMatch) {
        console.log('No paragraph found in', file);
        return;
    }
    const citationText = pMatch[1].trim();

    // 2. Remove the <p> from narrative-box
    content = content.replace(/(<div class="narrative-box">)\s*<p>[\s\S]*?<\/p>/, '$1');

    // 3. Inject citation into hero-subtitle
    content = content.replace(/(<div class="hero-subtitle">)[\s\S]*?(<\/div>)/, `$1\n            ${citationText}\n        $2`);

    // 4. Update the CSS for hero-subtitle
    const oldCss = `.hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 200;
            color: #ccc;
            margin-top: 40px;
            margin-left: 5px;
            letter-spacing: 12px;
            text-transform: uppercase;
            animation: fadeIn 2s ease-out 0.8s forwards;
            opacity: 0;
        }`;
    const newCss = `.hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 1.15rem;
            font-weight: 300;
            line-height: 1.6;
            color: #aaa;
            margin-top: 40px;
            margin-left: 0;
            text-align: left;
            max-width: 800px;
            font-style: italic;
            animation: fadeIn 2s ease-out 0.8s forwards;
            opacity: 0;
        }`;

    // We try to replace the exact CSS block, or a chunk of it
    if (content.includes("letter-spacing: 12px;")) {
        content = content.replace(/\.hero-subtitle\s*\{[\s\S]*?opacity:\s*0;\s*\}/, newCss);
    }

    // 5. Remove the JS override
    content = content.replace(/if\s*\(\s*source\s*===\s*'book'\s*\)\s*\{[\s\S]*?\}\s*(?=\/\/ Update Copyright)/g, '');

    // just in case, explicitly remove the subtitle update logic
    content = content.replace(/const subtitle\s*=\s*document\.querySelector\('\.hero-subtitle'\);[\s\S]*?subtitle\.style\.letterSpacing\s*=\s*"15px";\s*\}/g, '');

    // 6. bump sw cache
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1003'");
    content = content.replace(/v=1002/g, 'v=1003');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully refactored', file);
});

// Bump global SW version
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1003'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
    console.log('Bumped service worker file to v1003');
}
