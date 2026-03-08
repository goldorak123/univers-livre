const fs = require('fs');
const path = require('path');

const dirs = [
    'c:/Users/danie/OneDrive/Desktop/universdaniel/public',
    'c:/Users/danie/OneDrive/Desktop/univers-livre'
];

const replacements = {
    'Ã³': 'ó', 'Ã¡': 'á', 'Ã©': 'é', 'Ã­': 'í', 'Ãº': 'ú', 'Ã±': 'ñ', 'Ã‘': 'Ñ',
    'Ãˆ': 'È', 'ÃŠ': 'Ê', 'Ã€': 'À', 'Ã§': 'ç', 'Ã´': 'ô', 'Ã¢': 'â', 'Ã®': 'î',
    'Ã¯': 'ï', 'Ã¹': 'ù', 'Ã»': 'û', 'Ã‰': 'É', 'Ã‡': 'Ç', 'Ã¿': 'ÿ', 'Ãœ': 'Ü',
    'Ã¼': 'ü', 'Â´': '´', 'Â«': '«', 'Â»': '»', 'â€™': '’', 'â€œ': '“', 'â€ ': '”',
    'â€”': '—', 'â€“': '–', 'â€¦': '…', 'Ã ': 'à', 'Ã¨': 'è', 'Ã ': 'à', 'Ã': 'à'
};

let count = 0;
for (const dir of dirs) {
    const files = fs.readdirSync(dir, { recursive: true });
    for (const f of files) {
        if (!f.endsWith('.html')) continue;
        const p = path.join(dir, f);
        try {
            let content = fs.readFileSync(p, 'utf8');
            let orig = content;
            for (const [bad, good] of Object.entries(replacements)) {
                content = content.split(bad).join(good);
            }
            if (content !== orig) {
                fs.writeFileSync(p, content, 'utf8');
                console.log('Fixed ' + p);
                count++;
            }
        } catch (e) {}
    }
}
console.log('Total fixed: ' + count);
