const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';

const cssToAdd = `
        /* PWA Uniform Sub-Icons */
        .pwa-icon-item {
            cursor: pointer;
        }
        .pwa-icon-item:hover .pwa-icon-small {
            filter: drop-shadow(0 0 15px rgba(216, 178, 90, 0.8)) !important;
            transform: scale(1.05);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pwa-icon-item:hover .pwa-icon-label {
            color: var(--gold, #d8b25a);
            transition: color 0.3s ease;
        }
`;

function processFile(filePath) {
    let filename = path.basename(filePath);
    if (!filename.endsWith('.html') || filename.includes('backup') || (!filename.includes('-en') && !filename.includes('-es'))) {
        return 0;
    }

    let orig = fs.readFileSync(filePath, 'utf8');
    let content = orig;

    let hintText = filename.includes('-en') ? "Click to install app" : "Clic para instalar app";
    let titleText = filename.includes('-en') ? "Click to install app" : "Clic para instalar app";

    // 1. Give .pwa-icon-item the onclick
    content = content.replace(/<div class="pwa-icon-item"[^>]*>/g,
        `<div class="pwa-icon-item" onclick="if(typeof installPWA === 'function') installPWA();" title="${titleText}">`);

    // 2. Ensure main banner is perfect. In EN/ES it might look like class="pwa-text-banner" 
    // without the onclick, or with a broken one. Let's just find the banner and replace it completely if it doesn't have the onclick.
    // Actually, safer to just replace any pwa-text-banner tag
    if (filename.includes('-en')) {
        content = content.replace(/<img src="pwa-text-banner-en\.png"[^>]*class="pwa-text-banner"[^>]*>/g,
            `<img src="pwa-text-banner-en.png" alt="PWA Optimized" class="pwa-text-banner" onclick="if(typeof installPWA === 'function') installPWA();" title="${titleText}">`);
    } else if (filename.includes('-es')) {
        content = content.replace(/<img src="pwa-text-banner-es\.png"[^>]*class="pwa-text-banner"[^>]*>/g,
            `<img src="pwa-text-banner-es.png" alt="PWA Optimizado" class="pwa-text-banner" onclick="if(typeof installPWA === 'function') installPWA();" title="${titleText}">`);
    }

    // We also need to add the <div class="pwa-install-hint"> below the banner if it doesn't exist
    // Let's check if pwa-install-hint exists. If not, insert it after the banner.
    if (!content.includes('class="pwa-install-hint"')) {
        let bannerRegex = /<img src="pwa-text-banner-[a-z]{2}\.png"[^>]*class="pwa-text-banner"[^>]*>/;
        content = content.replace(bannerRegex, (match) => {
            return match + `\n                    <div class="pwa-install-hint" onclick="if(typeof installPWA === 'function') installPWA();">${hintText}</div>`;
        });
    } else {
        // Fix the hint text to the localized string and add onclick if missing
        content = content.replace(/<div class="pwa-install-hint"[^>]*>[^<]*<\/div>/g,
            `<div class="pwa-install-hint" onclick="if(typeof installPWA === 'function') installPWA();">${hintText}</div>`);
    }

    // 3. Add CSS if not present
    if (!content.includes('.pwa-icon-item:hover .pwa-icon-small')) {
        let cssRegex = /<\/style>/;
        if (cssRegex.test(content)) {
            content = content.replace('</style>', cssToAdd + '\n    </style>');
        }
    }

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated", filename);
        return 1;
    }
    return 0;
}

let count = 0;
fs.readdirSync(dir).forEach(f => {
    count += processFile(path.join(dir, f));
});
console.log(`PWA buttons activated on ${count} translated files in ${dir}`);
