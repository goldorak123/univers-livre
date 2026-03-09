const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre',
    'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\universdaniel\\\\public'
];

const injectStyle = `
    <!-- HARMONISATION PWA MOBILE - STRICT -->
    <style>
        @media (max-width: 900px) {
            .pwa-text-banner {
                height: 130px !important;
                width: auto !important;
                filter: drop-shadow(0 0 25px rgba(216, 178, 90, 0.9)) !important;
            }
            .pwa-icon-small {
                height: 95px !important;
                width: auto !important;
                filter: drop-shadow(0 0 25px rgba(216, 178, 90, 0.9)) !important;
            }
        }
    </style>
</head>`;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file.endsWith('.html') && !file.includes('_backup') && !file.includes('_old')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Prevent multiple injections
            if (!content.includes('HARMONISATION PWA MOBILE - STRICT')) {
                // We do a regex replace to catch </head> regardless of exact spacing, though simple string replacement usually works
                content = content.replace(/<\/head>/i, injectStyle);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated PWA mobile size in ${filePath}`);
            } else {
                console.log(`Already harmonized: ${filePath}`);
            }
        }
    });
});
