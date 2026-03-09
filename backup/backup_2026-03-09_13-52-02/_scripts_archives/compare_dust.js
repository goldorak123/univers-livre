const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    const txt = fs.readFileSync(f, 'utf8');

    // Find the CSS block for .hero-actions-container::before or where poussiere-or.png is used
    const urlIdx = txt.indexOf("url('poussiere-or.png')");
    if (urlIdx !== -1) {
        // go back to the nearest class definition
        const classStart = txt.lastIndexOf('}', urlIdx) + 1;
        const classEnd = txt.indexOf('}', urlIdx) + 1;

        console.log(`\n==== CSS in ${f} ====`);
        console.log(txt.substring(classStart, classEnd).trim());
    }

    // Find HTML structure for hero-actions-container
    const htmlIdx = txt.indexOf('class="hero-actions-container"');
    if (htmlIdx !== -1) {
        const htmlEnd = txt.indexOf('</div>', htmlIdx + 200);
        console.log(`\n==== HTML in ${f} ====`);
        console.log(txt.substring(htmlIdx - 50, htmlEnd + 6).trim());
    }
});
