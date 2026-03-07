const fs = require('fs');

['livre.html', 'livre-en.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    const txt = fs.readFileSync(f, 'utf8');
    console.log(`\n==== ${f} ====`);

    // Extract .hero block
    const heroIdx = txt.indexOf('.hero {');
    if (heroIdx !== -1) {
        console.log("--- .hero ---");
        console.log(txt.substring(heroIdx, txt.indexOf('}', heroIdx) + 1));
    }

    // Extract .hero-stage block
    const stageIdx = txt.indexOf('.hero-stage {');
    if (stageIdx !== -1) {
        console.log("--- .hero-stage ---");
        console.log(txt.substring(stageIdx, txt.indexOf('}', stageIdx) + 1));
    }

    // Extract .hero-stage media query block
    const queryIdx = txt.indexOf('.hero-stage {', stageIdx + 10);
    if (queryIdx !== -1) {
        console.log("--- @media .hero-stage ---");
        console.log(txt.substring(queryIdx, txt.indexOf('}', queryIdx) + 1));
    }
});
