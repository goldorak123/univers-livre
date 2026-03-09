const fs = require('fs');
const files = ['contact.html', 'contact-en.html', 'contact-es.html'];

files.forEach(file => {
    const filePath = `c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\${file}`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Find .titre-memoire { block and change text-align: left; to text-align: center;
        content = content.replace(/\.titre-memoire\s*{([\s\S]*?)text-align:\s*left;/g, '.titre-memoire {$1text-align: center;');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Centered titre-memoire in ${file}`);
    }
});
