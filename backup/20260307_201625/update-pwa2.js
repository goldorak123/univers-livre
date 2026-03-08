const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'backup' && file !== '.git' && file !== 'node_modules') {
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
                    newBody = '\n            margin-top: 17px;' + newBody;
                } else {
                    newBody = newBody.replace(/margin-top:\s*(-?\d+)px/g, (m, val) => {
                        let currentVal = parseInt(val);
                        // Only add if it hasn't been added yet (e.g., if it's 2px -> 17px)
                        if (currentVal < 15) {
                            return `margin-top: ${currentVal + 15}px`;
                        }
                        return m;
                    });
                }
                changed = true;
                return `.pwa-install-hint {${newBody}}`;
            });

            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    });
}

processDir('c:/Users/danie/OneDrive/Desktop/universdaniel/public');
processDir('c:/Users/danie/OneDrive/Desktop/univers-livre');
