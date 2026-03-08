const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const skipFiles = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html', '404.html'];

let count = 0;
for (const file of files) {
    if (skipFiles.includes(file) || file.startsWith('livre-accueil-v')) continue;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('titre-memoire')) continue;

    // We will use absolute pixels to guarantee they are small enough, bypassing any generic root rem scaling issues
    // Simon Lero = 10px (~0.6rem but hardcoded)
    content = content.replace(/(\.auteur-header\s*\{[^}]*?font-size:\s*)(0\.45rem|0\.5rem|0\.55rem|10px);/g, '$110px;');

    // Sub-title = 13px 
    content = content.replace(/(\.livre-header\s*\{[^}]*?font-size:\s*)(0\.65rem|0\.7rem|0\.75rem|13px);/g, '$113px;');

    // bump html cache version variable
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1001'");
    content = content.replace(/v=\d+/g, 'v=1001');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
}
console.log('Shrunk fonts and bumped cache in ' + count + ' files');

// also bump the service worker file itself
if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1001'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
    console.log('Bumped service worker file to v1001');
}
