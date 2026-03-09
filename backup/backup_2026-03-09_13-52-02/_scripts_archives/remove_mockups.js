const fs = require('fs');

const filesToProcess = ['fiche-technique.html', 'ficha-tecnica.html', 'technical-specifications.html'];

for (let filename of filesToProcess) {
    let content = fs.readFileSync(filename, 'utf8');

    // Remove the mockup-container completely
    content = content.replace(/<div class="mockup-container"[\s\S]*?<\/div>/, '');

    fs.writeFileSync(filename, content, 'utf8');
    console.log("Processed " + filename);
}
