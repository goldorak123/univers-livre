const fs = require('fs');
const path = require('path');

function archiveServiceWorkers(dir) {
    const archiveDir = path.join(dir, '_scripts_archives');

    const files = fs.readdirSync(dir);
    for (const file of files) {
        // Find all sw-*.js and manifest-*.json EXCEPT the active ones
        if ((file.startsWith('sw-') && file.endsWith('.js') && file !== 'sw-v41.js') ||
            (file.startsWith('manifest-v') && file !== 'manifest.json')) {
            fs.renameSync(path.join(dir, file), path.join(archiveDir, file));
            console.log(`Moved obsolete PWA file: ${file}`);
        }
    }
}

archiveServiceWorkers('c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre');
