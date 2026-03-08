const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    const txt = fs.readFileSync(f, 'utf8');

    console.log(`\n--- ${f} ---`);
    console.log('Includes .poussiere-doree styling?', txt.includes('.poussiere-doree'));
    console.log('Includes <div class="poussiere-doree"> element?', txt.includes('"poussiere-doree"'));

    // Find where the element is in the HTML
    const htmlIdx = txt.indexOf('class="poussiere-doree"');
    if (htmlIdx !== -1) {
        console.log('HTML Context:');
        console.log(txt.substring(htmlIdx - 100, htmlIdx + 100));
    }

    // Look at where in the DOM it is placed (e.g. inside what parent?)
});
