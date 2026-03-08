const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'backup' && file !== '.git') {
                processDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Find .pwa-install-hint rule
            const regex = /\.pwa-install-hint\s*\{([^}]*)\}/g;
            content = content.replace(regex, (match, body) => {
                let newBody = body;
                if (!newBody.includes('margin-top:')) {
                    newBody = '\n            margin-top: 15px;' + newBody;
                } else {
                    newBody = newBody.replace(/margin-top:\s*(-?\d+)px/g, (m, val) => {
                        return `margin-top: ${parseInt(val) + 15}px`;
                    });
                }
                changed = true;
                return `.pwa-install-hint {${newBody}}`;
            });

            // Also check for margin-top as inline style in case it's in HTML
            // .pwa-install-hint { margin-top: 2px;

            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    });
}

processDir('c:/Users/danie/OneDrive/Desktop/universdaniel/public');
processDir('c:/Users/danie/OneDrive/Desktop/univers-livre');
