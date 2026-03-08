const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html'));

const enhancementStyle = `
    <!-- FOOTER NAV VISIBILITY ENHANCEMENT -->
    <style>
        .footer-nav a {
            color: #eec165 !important; /* Brighter gold */
            text-shadow: 0 4px 15px rgba(0,0,0,0.9), 0 0 10px rgba(238,193,101,0.4) !important;
            font-weight: 700 !important;
            opacity: 1 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.15em !important;
        }

        @media (max-width: 900px) {
            .footer-nav {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 20px !important;
                background: linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(0,0,0,0.95) 100%) !important;
                padding: 30px 15px !important;
                margin: 20px auto !important;
                width: 90% !important;
                max-width: 400px !important;
                border: 1px solid rgba(201, 162, 77, 0.3) !important;
                border-radius: 12px !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
            }
            
            .footer-nav a {
                font-size: 1.15rem !important;
                margin: 0 !important;
                text-align: center !important;
                width: 100% !important;
                padding: 12px !important;
                background: rgba(201, 162, 77, 0.05) !important;
                border: 1px solid rgba(201, 162, 77, 0.15) !important;
                border-radius: 6px !important;
            }
        }
    </style>
`;

let changedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Clean up if I ran this before
    content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT -->[\s\S]*?<\/style>/g, '');

    // Inject
    if (content.includes('</head>')) {
        content = content.replace('</head>', enhancementStyle + '\n</head>');
    } else if (content.includes('<body')) {
        content = content.replace(/<body/i, enhancementStyle + '\n<body');
    } else {
        content += enhancementStyle;
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log('Total livre files updated: ' + changedCount);
