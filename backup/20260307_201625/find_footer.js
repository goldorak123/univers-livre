const fs = require('fs');
const files = ['distribution-es.html', 'livre.html'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    const txt = fs.readFileSync(f, 'utf8');

    const idx = txt.indexOf('faq');
    if (idx !== -1) {
        console.log(`\n--- HTML Context ${f} ---`);
        console.log(txt.substring(Math.max(0, idx - 200), idx + 200));
    }
});
