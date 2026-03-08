const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        if (file.endsWith('.html') && !file.includes('v3') && file !== '404.html' && file !== 'livre-accueil.html' && file !== 'update.html') {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            if (content.includes('.header-livre {')) {
                // Replace background-size: 110%; with background-size: cover;
                content = content.replace(/background-size:\s*110%;/g, 'background-size: cover;');

                // Replace background-size: 115%; with background-size: cover;
                content = content.replace(/background-size:\s*115%;/g, 'background-size: cover;');

                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed header background in ' + file);
            }
        }
    });
});
