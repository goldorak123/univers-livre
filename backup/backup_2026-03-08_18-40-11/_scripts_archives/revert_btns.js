const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Remove the enhancement injected previously
    content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT V2 -->[\s\S]*?<\/style>/g, '');
    content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT -->[\s\S]*?<\/style>/g, '');

    // Inject the simple text-only color override the user wanted
    const simpleColor = 
    <!-- SIMPLE FOOTER COLOR -->
    <style>
        .footer-nav a, .footer-nav-links a {
            color: #E2B24A !important; /* Brighter gold, solid contrast */
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
            opacity: 1 !important;
        }
    </style>
;
    // Clean old simple colors just in case
    content = content.replace(/<!-- SIMPLE FOOTER COLOR -->[\s\S]*?<\/style>/g, '');

    if (content.includes('</head>')) {
        content = content.replace('</head>', simpleColor + '\n</head>');
    } else if (content.includes('<body')) {
        content = content.replace(/<body/i, simpleColor + '\n<body');
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Reverted buttons on " + file);
    }
}
