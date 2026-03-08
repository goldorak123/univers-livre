const fs = require('fs');
const files = ['livre-accueil-en.html', 'livre-accueil-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    let regexEnEs = /<p class="footer-copyright">&copy;\s*<span[^>]*id="current-year-footer"/g;
    if (content.match(regexEnEs)) {
        content = content.replace(regexEnEs, '<p class="footer-copyright"><a href="404.html" style="text-decoration: none; color: inherit; cursor: default;">C</a>opyright &copy; <span id="current-year-footer"');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Restored Easter Egg on 'C' in ${file}`);
    }
});
