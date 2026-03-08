const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));

const spacingStyle = `
    <!-- STRICT MOBILE TEXT SPACING OVERRIDE -->
    <style>
        @media (max-width: 900px) {
            /* Forcing normal letter spacing and automatic hyphens on subtitles to prevent 2-words-per-line justify gaps */
            p, .hero-subtitle, .hero-summary, .author-info-large p, .testimonial-text, .text-block {
                letter-spacing: 0.02em !important;
                text-align: justify !important;
                -webkit-hyphens: auto !important;
                -moz-hyphens: auto !important;
                -ms-hyphens: auto !important;
                hyphens: auto !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
            }
        }
    </style>
`;

let changedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    content = content.replace(/<!-- STRICT MOBILE TEXT SPACING OVERRIDE -->[\s\S]*?<\/style>/g, '');

    if (content.includes('</head>')) {
        content = content.replace('</head>', spacingStyle + '\n</head>');
    } else if (content.includes('<body')) {
        content = content.replace(/<body/i, spacingStyle + '\n<body');
    } else {
        content += spacingStyle;
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log('Total files updated with spacing clamp: ' + changedCount);
