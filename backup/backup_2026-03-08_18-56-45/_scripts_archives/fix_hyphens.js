const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));

const hyphenationStyle = `
    <!-- GLOBAL HYPHENATION & TEXT WRAP FIX -->
    <style>
        /* Force hyphenation on ALL paragraphs, subtitles, and text blocks to prevent huge gaps in justified text */
        p, .hero-subtitle, .hero-summary, .hero-summary p, .author-info-large p, .testimonial-text, .text-block, [class*="subtitle"], [class*="text"] {
            -webkit-hyphens: auto !important;
            -moz-hyphens: auto !important;
            -ms-hyphens: auto !important;
            hyphens: auto !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
        }

        /* Specifically for mobile to avoid 2 words per line with giant spaces */
        @media (max-width: 900px) {
            h1, h2, h3, h4, .hero-title, .hero-subtitle {
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                -webkit-hyphens: auto !important;
                hyphens: auto !important;
            }
            
            p, .hero-summary, .hero-summary p, .text-content {
                text-align: left !important; /* Fallback from justify if hyphenation isn't enough, but justify is often requested, so let's keep justify but ensure hyphenation */
            }
            
            /* Actually, if justify creates too big gaps even with hyphens, we force left alignment on mobile for very tricky blocks, but user specifically asked to "activer la coupure de mots" (hyphenation). */
        }
    </style>
`;

let changedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    content = content.replace(/<!-- GLOBAL HYPHENATION & TEXT WRAP FIX -->[\s\S]*?<\/style>/g, '');

    if (content.includes('</head>')) {
        content = content.replace('</head>', hyphenationStyle + '\n</head>');
    } else if (content.includes('<body')) {
        content = content.replace(/<body/i, hyphenationStyle + '\n<body');
    } else {
        content += hyphenationStyle;
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log('Total files updated with hyphenation: ' + changedCount);
