const fs = require('fs');

const files = ['livre.html', 'livre-en.html', 'livre-es.html'];
let output = '';

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    const cssMatch = lines.findIndex(l => l.includes('dust-filigree'));
    const cssHTML = lines.findIndex(l => l.includes('class="dust-filigree"'));
    output += `${f} CSS: ${cssMatch + 1}, HTML: ${cssHTML + 1}\n`;

    // Extracted HTML
    if (cssHTML !== -1) {
        output += `HTML Context:\n${lines.slice(cssHTML - 5, cssHTML + 5).join('\n')}\n`;
    }
});

fs.writeFileSync('dust_lines.txt', output, 'utf8');
console.log('Wrote dust_lines.txt');
