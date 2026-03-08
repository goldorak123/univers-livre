const fs = require('fs');

const filesToProcess = ['fiche-technique.html', 'ficha-tecnica.html', 'technical-specifications.html'];

for (let filename of filesToProcess) {
    let content = fs.readFileSync(filename, 'utf8');

    // Remove the <p class="book-subtitle"> line
    content = content.replace(/<p class="book-subtitle">Simon Lero<\/p>\s*/g, '');

    // Remove the following <p> with gold-bright inline style and the title
    content = content.replace(/<p\s+style="color:\s*var\(--gold-bright\);\s*letter-spacing:\s*3px;\s*font-weight:\s*300;\s*opacity:\s*0\.8;\s*margin-bottom:\s*40px;\s*margin-left:\s*5px;">\s*[A-ZÀ-Ÿ\s]+<\/p>\s*/g, '');

    fs.writeFileSync(filename, content, 'utf8');
    console.log("Cleaned subtitles from " + filename);
}
