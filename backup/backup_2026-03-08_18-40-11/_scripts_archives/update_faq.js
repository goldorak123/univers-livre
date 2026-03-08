const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\universdaniel\\\\public',
    'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre'
];

const appendFR = '<br><br><strong>Note pour les utilisateurs Apple :</strong> La méthode est différente sur iOS. Il faut cliquer sur le bouton "Installer l\\'App" dès qu\\'il apparaît après avoir chargé le site sur Chrome ou Safari.';
const appendEN = '<br><br><strong>Note for Apple users:</strong> The method is different on iOS. You must click the "Install App" button as soon as it appears after loading the site on Chrome or Safari.';
const appendES = '<br><br><strong>Nota para los usuarios de Apple:</strong> El método es diferente en iOS. Debe hacer clic en el botón "Instalar App" tan pronto como aparezca después de cargar el sitio en Chrome o Safari.';

let modifiedCount = 0;

dirs.forEach(dir => {
    const files = fs.readdirSync(dir).filter(f => f.startsWith('faq') && f.endsWith('.html') && !f.includes('_15dbc6e'));

    files.forEach(file => {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        let initialContent = content;

        if (content.indexOf('iOS') !== -1 && content.indexOf('Safari') !== -1) {
            console.log('Skipping ' + file + ' in ' + dir + ' (Already contains Apple instruction)');
            return;
        }

        if (file.indexOf('-en') !== -1) {
            content = content.replace(/and\s*<a\s*href="https:\/\/mon-univers\.ca"[^>]*>mon-univers\.ca<\/a>\./g, function (match) { return match + appendEN; });
        } else if (file.indexOf('-es') !== -1) {
            content = content.replace(/y\s*<a\s*href="https:\/\/mon-univers\.ca"[^>]*>mon-univers\.ca<\/a>\./g, function (match) { return match + appendES; });
        } else {
            content = content.replace(/et\s*<a\s*href="https:\/\/mon-univers\.ca"[^>]*>mon-univers\.ca<\/a>\./g, function (match) { return match + appendFR; });
        }

        if (content !== initialContent) {
            fs.writeFileSync(path.join(dir, file), content, 'utf8');
            console.log('Updated ' + file + ' in ' + dir);
            modifiedCount++;
        } else {
            console.log('COULD NOT UPDATE ' + file + ' in ' + dir + ' (Match not found)');
        }
    });
});

console.log('Done! Files updated: ' + modifiedCount);
