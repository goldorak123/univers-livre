const fs = require('fs');

const files = ['fiche-technique.html', 'ficha-tecnica.html', 'technical-specifications.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Fix desktop padding
        content = content.replace(/padding:\s*160px\s+40px\s+80px;/, 'padding: 40px 40px 40px;');

        // Fix mobile padding
        content = content.replace(/padding-top:\s*120px;/, 'padding-top: 20px;');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated padding in ${file}`);
    }
}
