const fs = require('fs');
const files = ['livre.html', 'livre-en.html', 'livre-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log("File not found: " + file);
        return;
    }
    let content = fs.readFileSync(file, 'utf8');

    // Add position: relative to .video-box if missing
    if (!content.includes('position: relative;') || content.includes('.video-box {\\n            border: 1px')) {
        content = content.replace('.video-box {\r\n            border: 1px', '.video-box {\r\n            position: relative;\r\n            border: 1px');
        content = content.replace('.video-box {\n            border: 1px', '.video-box {\n            position: relative;\n            border: 1px');
    }

    // Change SVG fill to white
    content = content.replace(
        /(\.custom-play-btn\s*svg\s*\{[\s\S]*?fill:\s*)var\(--gold\)(;)/,
        '$1#fff$2'
    );

    // Just in case it was written exactly that way:
    content = content.replace(
        'fill: var(--gold);',
        'fill: #fff;' // Note: this will also change the hover effect if we are not careful, but the hover was `fill: #fff;` already. Wait.
    );

    // Make sure we only change the base color of the SVG, not the border of the button if we don't need to.
    // The user said "changer la couleur pour le blanc dans les 3 langues" (change the color to white). The border of the button is also --gold. Do they want the whole button white or just the arrow? "la fleche au centre... changer la couleur pour le blanc" implies just the arrow.

    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
});
console.log("Done.");
