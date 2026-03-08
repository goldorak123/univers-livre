const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skipFiles = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html', '404.html'];

let count = 0;
for (const file of files) {
    if (skipFiles.includes(file) || file.startsWith('livre-accueil-v')) continue;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('titre-memoire')) continue;

    // We add !important to the mobile sizes to combat CSS ordering issues
    // Sub-title = 13px 
    content = content.replace(/(\.livre-header\s*\{[^}]*?font-size:\s*13px)(?! !important);/g, '$1 !important;');
    // Simon Lero = 10px 
    content = content.replace(/(\.auteur-header\s*\{[^}]*?font-size:\s*10px)(?! !important);/g, '$1 !important;');

    // Might as well protect the title too
    content = content.replace(/(\.titre-memoire\s*\{[^}]*?font-size:\s*2\.4rem)(?! !important);/g, '$1 !important;');

    // bump html cache version variable
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1002'");
    content = content.replace(/v=1001/g, 'v=1002');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
}
console.log('Forced fonts and bumped cache in ' + count + ' files');

// also bump the service worker file itself
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1002'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
    console.log('Bumped service worker file to v1002');
}
