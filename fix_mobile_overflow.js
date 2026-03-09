const fs = require('fs');

const files = ['livre.html', 'livre-en.html', 'livre-es.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // 1. Bouton qui casse la mise en page
    if (content.includes('width: max-content !important;')) {
        content = content.replace(
            'width: max-content !important;',
            'width: fit-content !important;\n      max-width: 100% !important;\n      white-space: normal !important;\n      word-wrap: break-word !important;'
        );
    }

    // 2. Élimination formelle du scroll horizontal (100vw pose problème avec les barres de défilement)
    content = content.replace(/width: 100vw;/g, 'width: 100%;');

    // 3. Ajouter overflow: hidden sur .hero-actions-container et .hero-summary pour être absolument sûr
    if (!content.includes('overflow-x: hidden;') || !content.includes('max-width: 100%')) {
        // on ajoute au cas où, mais html, body ont déjà overflow-x: hidden
    }

    fs.writeFileSync(f, content);
    console.log('Fixed mobile layout for ' + f);
});
