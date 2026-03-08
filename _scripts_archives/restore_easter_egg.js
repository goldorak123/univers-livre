const fs = require('fs');
const files = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Looking for the exact HTML layout I put for the footer:
    // <p class="footer-copyright"><a href="404.html"
    //      style="text-decoration: none; color: inherit; cursor: default;">&copy;</a> <span

    // In FR / Gen
    let regexOld1 = /<p class="footer-copyright">\s*<a href="404\.html"[^>]*>&copy;<\/a>\s*<span/g;
    if (content.match(regexOld1)) {
        content = content.replace(regexOld1, '<p class="footer-copyright"><a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">C</a>opyright &copy; <span');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Restored Easter Egg on 'C' in ${file}`);
    }
});
