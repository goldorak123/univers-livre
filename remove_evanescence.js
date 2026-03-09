const fs = require('fs');

const replaces = [
    {
        file: 'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\livre.html',
        search: /capturer l'évanescence des souvenirs/g,
        replace: "capturer les souvenirs"
    },
    {
        file: 'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\livre-en.html',
        search: /capture the evanescence of memories/g,
        replace: "capture memories"
    },
    {
        file: 'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\livre-es.html',
        search: /capturar la evanescencia de los recuerdos/g,
        replace: "capturar los recuerdos"
    }
];

replaces.forEach(item => {
    try {
        let content = fs.readFileSync(item.file, 'utf8');
        content = content.replace(item.search, item.replace);
        fs.writeFileSync(item.file, content, 'utf8');
        console.log(`Updated ${item.file}`);
    } catch (e) {
        console.error(`Error updating ${item.file}:`, e);
    }
});
