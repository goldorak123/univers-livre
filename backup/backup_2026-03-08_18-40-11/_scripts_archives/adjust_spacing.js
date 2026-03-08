const fs = require('fs');

['livre-en.html', 'livre-es.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Currently desktop is padding: 120px 0 40px; from the code
    // User wants to "descendre la photo... tout ce qui suit"
    // So we need to increase the top padding of hero-stage.
    // I'll change 120px to 180px for desktop.
    content = content.replace(/\\n\s*padding:\s*120px/g, '\\n            padding: 180px');

    // For mobile, it's currently padding: 40px 0 10px;
    // I'll change 40px to 80px for mobile.
    content = content.replace(/\\n\s*padding:\s*40px/g, '\\n                padding: 80px');

    // Also bumping cache version
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1007'");
    content = content.replace(/v=\d+/g, 'v=1007');

    if (content !== fs.readFileSync(f, 'utf8')) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Updated padding in', f);
    }
});

if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    if (sw.includes("v1006")) {
        sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1007'");
        fs.writeFileSync('service-worker.js', sw, 'utf8');
        console.log('Bumped SW');
    }
}
