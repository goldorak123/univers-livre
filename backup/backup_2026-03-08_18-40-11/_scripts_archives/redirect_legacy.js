const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre-accueil-v') && f.endsWith('.html'));

files.forEach(f => {
    let fp = path.join(dir, f);
    let c = fs.readFileSync(fp, 'utf8');
    if (!c.includes('window.location.replace')) {
        c = c.replace(/<head>/i, '<head>\n    <!-- HARD REDIRECT FOR LEGACY PAGES -->\n    <script>\n        window.location.replace("/livre-accueil.html");\n    </script>\n');
        fs.writeFileSync(fp, c, 'utf8');
        console.log('Redirected ' + f);
    }
});
