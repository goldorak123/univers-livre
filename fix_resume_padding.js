const fs = require('fs');
const files = ['resume.html', 'resume-en.html', 'resume-es.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // 1. In .content-card, replace 'padding: 40px 0;' with 'padding: 0 0 40px 0; margin-top: -30px; position: relative; z-index: 20;'
        content = content.replace(/padding:\s*40px\s+0;/, 'padding: 0 0 40px 0; margin-top: -50px; position: relative; z-index: 20;');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated layout spacing in ${file}`);
    }
}
