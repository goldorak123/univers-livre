const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre',
    'c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public'
];

let changedCount = 0;

const styleBlock = `
    <!-- STRICT BACK BUTTON HYGIENE V2 -->
    <style>
        /* ABSOLUTE KILL SWITCH FOR MOBILE: 
           Never show on screens <= 900px, regardless of PWA */
        @media (max-width: 900px) {
            .back-hub-btn, a.back-hub-btn, a[class*="back-hub-btn"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                z-index: -9999 !important;
            }
        }

        /* ONLY SHOW on DESKTOP (min-width: 901px) AND ONLY IF PWA */
        @media (display-mode: standalone) and (min-width: 901px) {
            .back-hub-btn, a.back-hub-btn, a[class*="back-hub-btn"] {
                display: flex !important;
            }
        }
        
        /* Default hide for non-PWA desktop just in case */
        @media (min-width: 901px) {
            .back-hub-btn:not(:window-inactive) {
                /* We rely on the standalone query above to override this. But default to none. */
                display: none;
            }
        }
    </style>
`;

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let orig = content;

        // Clean up previously injected CSS rules from my attempts
        content = content.replace(/<!-- STRICT BACK BUTTON HYGIENE -->[\s\S]*?<\/style>/g, '');
        content = content.replace(/<!-- Definitive Back Button Logic -->[\s\S]*?<\/style>/g, '');
        content = content.replace(/<!-- PWA Back Button Logic -->[\s\S]*?<\/style>/g, '');

        // Make double sure we inject it properly
        if (content.includes('</head>')) {
            content = content.replace('</head>', styleBlock + '\n</head>');
        } else if (content.includes('<body')) {
            // Some files (like maybe livre.html) didn't easily match </head> due to something weird, so insert before body
            content = content.replace(/<body/i, styleBlock + '\n<body');
        } else {
            content += styleBlock; // Append at the very end just in case
        }

        if (content !== orig) {
            fs.writeFileSync(filePath, content, 'utf8');
            changedCount++;
            console.log("Updated: " + filePath);
        }
    }
}
console.log('Total files updated: ' + changedCount);
