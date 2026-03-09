const fs = require('fs');
const files = ['distribution-en.html', 'distribution-es.html'];

files.forEach(file => {
    const filePath = `c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\${file}`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        const searchRegex = /\.section-title\s*\{\s*font-size:\s*2\.2rem;\s*margin-top:\s*40px;\s*margin-bottom:\s*40px;\s*\}/g;
        const replacement = `.section-title {\n                font-size: 1.3rem;\n                margin-top: 30px;\n                margin-bottom: 25px;\n            }`;

        content = content.replace(searchRegex, replacement);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated mobile section-title size in ${file}`);
    }
});
