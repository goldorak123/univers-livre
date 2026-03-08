const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html') && !f.includes('cv-secure'));

const simpleColor = `
    <!-- SIMPLE FOOTER COLOR -->
    <style>
        /* TARGETING ONLY THE 2 MAIN BUTTONS - DO NOT TOUCH FOOTER NAV LINKS */
        .footer-nav a {
            color: #d8b25a !important; /* Theme gold matching testimonials */
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
            opacity: 1 !important;
            font-size: calc(1.1rem - 2px) !important; /* Reduced by 2px as requested */
        }

        /* Reverting the 4 footer links explicitly to their default theme gold just in case */
        .footer-nav-links a {
            color: #c9a24d !important;
            text-shadow: none !important;
        }

        /* FIX THE TESTIMONIAL TITLE BREAKING */
        .testimonials-section h2 {
            -webkit-hyphens: none !important;
            -moz-hyphens: none !important;
            -ms-hyphens: none !important;
            hyphens: none !important;
            word-wrap: normal !important;
            overflow-wrap: normal !important;
        }
    </style>
`;

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    content = content.replace(/<!-- SIMPLE FOOTER COLOR -->[\s\S]*?<\/style>/g, '');

    if (content.includes('</head>')) {
        content = content.replace('</head>', simpleColor + '\n</head>');
    } else if (content.includes('<body')) {
        content = content.replace(/<body/i, simpleColor + '\n<body');
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated color and size in: " + file);
        count++;
    }
}
console.log("Total files processed: " + count);
