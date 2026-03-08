const fs = require('fs');

const files = ['contact.html', 'contact-en.html', 'contact-es.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // 1. Fix desktop .hero padding
        // From: padding: 180px 40px 100px;
        // To: padding: 60px 40px 60px;
        content = content.replace(/padding:\s*180px\s+40px\s+100px;/, 'padding: 60px 40px 60px;');

        // 2. Fix desktop .narrative-box margin
        // From: margin: 120px 0 40px;
        // To: margin: 40px 0 40px;
        content = content.replace(/margin:\s*120px\s+0\s+40px;/, 'margin: 40px 0 40px;');

        // 3. Optional mobile padding adjustment if needed
        // The mobile .hero has `padding: 40px 20px 20px;` and `.narrative-box` has `margin: 20px auto !important;`
        // We can tighten mobile .hero padding just a bit more: `padding: 20px 20px 20px;`
        content = content.replace(/padding:\s*40px\s+20px\s+20px;/, 'padding: 20px 20px 20px;');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated layout spacing in ${file}`);
    }
}
