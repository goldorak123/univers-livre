const fs = require('fs');
const files = ['resume.html', 'resume-en.html', 'resume-es.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Increase pulling up to -90px on .content-card
        content = content.replace(/padding:\s*0\s+0\s+40px\s+0;\s*margin-top:\s*-50px;/, 'padding: 0 0 40px 0; margin-top: -90px;');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated layout spacing to -90px in ${file}`);
    }
}
