const fs = require('fs');

const files = ['distribution.html', 'distribution-en.html', 'distribution-es.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // 1. Fix desktop .hero padding
        // From: padding: 180px 40px 100px;
        // To: padding: 60px 40px 60px;
        content = content.replace(/padding:\s*180px\s+40px\s+100px;/, 'padding: 60px 40px 60px;');

        // 2. Fix desktop .hero-subtitle margin-top
        // From: margin-top: 40px;
        // To: margin-top: 10px;
        content = content.replace(/\.hero-subtitle\s*\{[\s\S]*?margin-top:\s*40px;/, (match) => match.replace('margin-top: 40px;', 'margin-top: 10px;'));

        // 3. Optional mobile .hero padding adjustment if needed
        // Assuming mobile .hero has `padding: 40px 20px 20px;` (from previous patterns)
        content = content.replace(/padding:\s*40px\s+20px\s+20px;/, 'padding: 20px 20px 20px;');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated layout spacing in ${file}`);
    }
}
