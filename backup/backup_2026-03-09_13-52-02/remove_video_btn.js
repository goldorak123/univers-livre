const fs = require('fs');
const files = ['livre.html', 'livre-en.html', 'livre-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log("File not found: " + file);
        return;
    }
    let content = fs.readFileSync(file, 'utf8');

    // Remove the HTML injected block
    const htmlRegex = /\s*<div class="custom-play-btn"[\s\S]*?<\/script>/;
    content = content.replace(htmlRegex, '');

    // Remove the CSS injected block
    const cssRegex = /\s*\/\* Custom Play Button Desktop \*\/[\s\S]*?@media \(max-width: 1000px\) \{\s*\.custom-play-btn \{\s*display: none !important;\s*\}\s*\}/;
    content = content.replace(cssRegex, '');

    // Remove the position: relative; we added to .video-box { if it's there
    content = content.replace(/\.video-box\s*\{\s*position:\s*relative;\s*/, '.video-box {\n      ');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned ' + file);
});
console.log("Done.");
