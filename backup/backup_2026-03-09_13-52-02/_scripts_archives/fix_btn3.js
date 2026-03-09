const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    let count = 0;
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let orig = content;

        // Force .back-hub-btn display: none !important inside max-width: 900px if it exists
        // Actually, let's just REPLACE all instances of back-hub-btn related to display logic
        
        // Remove ALL existing <!-- Definitive Back Button Logic ---> blocks (from our previous script)
        content = content.replace(/<!-- Definitive Back Button Logic -->(.|\n|\r)*?<\/style>/g, '');
        
        // Remove old desktop PWA logic from previous previous script if any
        content = content.replace(/<!-- PWA Back Button Logic -->(.|\n|\r)*?<\/style>/g, '');
        
        // Ensure there is absolutely NO inline styles on elements or weird css that tells it to display outside of our control
        
        // Look for the main declaration
        const styleBlock = 
    <!-- STRICT BACK BUTTON HYGIENE -->
    <style>
        /* BASE: ALWAYS HIDDEN BY DEFAULT */
        .back-hub-btn, a.back-hub-btn, #back-hub-btn {
            display: none !important;
        }

        /* 
           ONLY SHOW on DESKTOP (min-width: 901px) 
           AND ONLY IF PWA (display-mode: standalone) 
        */
        @media (display-mode: standalone) and (min-width: 901px) {
            .back-hub-btn, a.back-hub-btn, #back-hub-btn {
                display: flex !important;
            }
        }

        /* 
           ABSOLUTE KILL SWITCH FOR MOBILE: 
           Never show on screens <= 900px, regardless of PWA 
        */
        @media (max-width: 900px) {
            .back-hub-btn, a.back-hub-btn, #back-hub-btn {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
                pointer-events: none !important;
            }
        }
    </style>
;
        // Inject before </head> or </style> or top of body. Wait, as seen, livre.html has no </head> ? No, it has </head> at line 2119? Wait, no, livre.html didn't match grep for </head>. Let's inject it right before <body
        if (content.includes('</head>')) {
            content = content.replace('</head>', styleBlock + '\n</head>');
        } else if (content.includes('<body')) {
            content = content.replace(/<body/i, styleBlock + '\n<body');
        }

        if (content !== orig) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
            console.log("Updated: " + file);
        }
    }
    console.log("Total files updated in univers-livre: " + count);
}
