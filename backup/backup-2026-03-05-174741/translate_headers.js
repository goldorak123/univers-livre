const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';

const translations = {
    '-en.html': 'Meetings in the Moonlight',
    '-es.html': 'Encuentros a la luz de la luna'
};

fs.readdirSync(directoryPath).forEach(file => {
    if (!file.endsWith('.html')) return;

    let isEnglish = file.endsWith('-en.html');
    let isSpanish = file.endsWith('-es.html');

    if (isEnglish || isSpanish) {
        let filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        let targetText = isEnglish ? translations['-en.html'] : translations['-es.html'];

        // Replace in .livre-header block
        content = content.replace(/<div class="livre-header">Rencontres au Clair de Lune<\/div>/g, `<div class="livre-header">${targetText}</div>`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Translated subtitle in ${file} to ${targetText}`);
    }
});
