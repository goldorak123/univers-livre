const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html'));

const enhancementStyle = `
    <!-- FOOTER NAV VISIBILITY ENHANCEMENT V2 -->
    <style>
        .footer-nav a {
            color: #FFDF8D !important; /* Even brighter gold, almost glowing white/yellow */
            text-shadow: 0 4px 15px rgba(0,0,0,1), 0 0 15px rgba(255, 223, 141, 0.8) !important;
            font-weight: 800 !important;
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
                background: linear-gradient(to bottom, rgba(5,5,5,0.98) 0%, rgba(0,0,0,1) 100%) !important;
                padding: 30px 15px !important;
                margin: 20px auto !important;
                width: 90% !important;
                max-width: 400px !important;
                border: 1px solid rgba(212, 162, 58, 0.6) !important; /* Brighter border */
                border-radius: 12px !important;
                box-shadow: 0 10px 40px rgba(0,0,0,1), inset 0 0 20px rgba(212, 162, 58, 0.1) !important;
            }
            
            .footer-nav a {
                font-size: 1.25rem !important; /* Slightly larger text */
                margin: 0 !important;
                text-align: center !important;
                width: 100% !important;
                padding: 15px !important; /* More padding for bigger hit area */
                background: rgba(212, 162, 58, 0.15) !important; /* Brighter inner background */
                border: 1px solid rgba(212, 162, 58, 0.4) !important; /* Brighter inner border */
                border-radius: 8px !important;
                backdrop-filter: blur(5px) !important; /* Blur the noisy background behind it just in case */
            }
        }
    </style>
`;

let changedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Remove old enhancements
    content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT -->[\s\S]*?<\/style>/g, '');
    content = content.replace(/<!-- FOOTER NAV VISIBILITY ENHANCEMENT V2 -->[\s\S]*?<\/style>/g, '');

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

console.log('Total files updated: ' + changedCount);
