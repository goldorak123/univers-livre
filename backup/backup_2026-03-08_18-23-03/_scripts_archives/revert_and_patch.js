const fs = require('fs');
const path = require('path');

const dirs = [
    'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre',
    'c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public'
];

const simpleColor = `
    <!-- SIMPLE FOOTER COLOR -->
    <style>
        .footer-nav a, .footer-nav-links a {
            color: #E2B24A !important; /* Brighter gold, solid contrast */
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
            opacity: 1 !important;
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

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let orig = content;

        // Remove the botched enhancement injected previously
        content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT V2 -->[\s\S]*?<\/style>/g, '');
        content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT -->[\s\S]*?<\/style>/g, '');
        content = content.replace(/<!-- SIMPLE FOOTER COLOR -->[\s\S]*?<\/style>/g, '');

        if (content.includes('</head>')) {
            content = content.replace('</head>', simpleColor + '\n</head>');
        } else if (content.includes('<body')) {
            content = content.replace(/<body/i, simpleColor + '\n<body');
        } else {
            content += simpleColor;
        }

        if (content !== orig) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Reverted & fixed: " + filePath);
            count++;
        }
    }
}
console.log("Total files processed: " + count);
