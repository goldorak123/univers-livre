const fs = require('fs');
const path = require('path');

function archiveScripts(dir) {
    const archiveDir = path.join(dir, '_scripts_archives');
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir);
    }

    const files = fs.readdirSync(dir);
    for (const file of files) {
        // Exclude directories and the archive dir itself
        if (fs.statSync(path.join(dir, file)).isDirectory()) continue;

        let shouldMove = false;

        // Match specific patterns
        if (file.endsWith('.ps1')) shouldMove = true;
        if (file.endsWith('.diff')) shouldMove = true;

        // Match .txt except robots.txt
        if (file.endsWith('.txt') && file !== 'robots.txt' && !file.startsWith('bf45c') && !file.startsWith('google')) shouldMove = true;

        // Match js scripts
        if (file.endsWith('.js') && file !== 'service-worker.js' && !file.startsWith('sw-') && file !== 'do_backup.js' && file !== 'clean_workspace.js') {
            shouldMove = true;
        }

        // Match test html files
        if (file.startsWith('test_') && file.endsWith('.html')) shouldMove = true;

        if (shouldMove) {
            fs.renameSync(path.join(dir, file), path.join(archiveDir, file));
            console.log(`Moved ${file}`);
        }
    }
}

console.log("Archiving univers-livre scripts...");
archiveScripts('c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre');

console.log("Archiving universdaniel scripts...");
archiveScripts('c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public');

console.log("Cleanup complete!");
