const fs = require('fs');

const filesToProcess = ['livre-en.html', 'livre-es.html'];

for (let filename of filesToProcess) {
    let content = fs.readFileSync(filename, 'utf8');

    // Remove old hero-content with label
    content = content.replace(/<div class="hero-content reveal" style="position: relative; z-index: 10;">\s*<span class="label">.*?<\/span>\s*<\/div>/, '');

    // Shrink padding of .hero-stage
    content = content.replace(/\.hero-stage\s*\{\s*min-height:\s*95vh;\s*display:\s*flex;\s*align-items:\s*flex-start;\s*padding:\s*260px\s+0\s+40px;/, '.hero-stage {\\n      min-height: auto;\\n      display: flex;\\n      align-items: flex-start;\\n      padding: 60px 0 40px;');

    content = content.replace(/\.hero-stage\s*\{\s*padding:\s*110px\s+0\s+10px;\s*text-align:\s*center;\s*display:\s*block;\s*\}/, '.hero-stage {\\n        padding: 40px 0 10px;\\n        text-align: center;\\n        display: block;\\n      }');

    // We also need to change the white subtitle text in the luxury header
    // In English
    if (filename === 'livre-en.html') {
        content = content.replace(/<div class="livre-header">Rencontres au Clair de Lune<\/div>/, '<div class="livre-header">A Romantic Immersion</div>');
    }
    // In Spanish
    if (filename === 'livre-es.html') {
        content = content.replace(/<div class="livre-header">Rencontres au Clair de Lune<\/div>/, '<div class="livre-header">Una inmersión romántica</div>');
    }

    fs.writeFileSync(filename, content, 'utf8');
    console.log("Processed " + filename);
}
