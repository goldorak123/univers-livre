const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));

const simpleColor = `
    <!-- SIMPLE FOOTER COLOR -->
    <style>
        .footer-nav a, .footer-nav-links a {
            color: #FFEA9E !important; /* Brighter gold, solid contrast */
            text-shadow: 0 4px 8px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.9), 0 0 15px rgba(255, 234, 158, 0.4) !important;
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

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

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
        console.log("Brightened: " + filePath);
        count++;
    }
}
console.log("Total files processed: " + count);
