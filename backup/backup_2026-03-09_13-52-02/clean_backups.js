const fs = require('fs');
const path = require('path');

function cleanBackupDir(dirPath, keepFolderName) {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === keepFolderName) continue;
        const fullPath = path.join(dirPath, entry.name);
        try {
            if (entry.isDirectory()) {
                fs.rmSync(fullPath, { recursive: true, force: true });
                console.log("Deleted directory: " + fullPath);
            } else {
                fs.unlinkSync(fullPath);
                console.log("Deleted file: " + fullPath);
            }
        } catch (e) {
            console.error("Could not delete " + fullPath);
        }
    }
}

console.log("Cleaning univers-livre/backup...");
cleanBackupDir('c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre\\backup', null);

console.log("Cleaning universdaniel/public/backup...");
cleanBackupDir('c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public\\backup', 'backup_2026-03-08_15-55-49');
