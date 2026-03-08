const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Add mobile-nav-bar class to injected div
    if (content.includes('<div style="position: absolute; top: 0; left: 0; right: 0; z-index: 999;">')) {
        content = content.replace(
            '<div style="position: absolute; top: 0; left: 0; right: 0; z-index: 999;">',
            '<div class="mobile-nav-bar" style="position: absolute; top: 0; left: 0; right: 0; z-index: 999;">'
        );
        changed = true;
    }

    // Also catch livre-accueil.html which uses <header class="top-nav">

    // Inject the CSS style just before </head> if it's not already there
    const styleInjection = `
  <style>
    @media (max-width: 900px) {
      .top-nav, .mobile-nav-bar {
        background-color: #000 !important;
        padding-bottom: 10px;
        padding-top: 10px;
      }
    }
  </style>
</head>`;

    if (!content.includes('.mobile-nav-bar {') && content.includes('</head>')) {
        content = content.replace('</head>', styleInjection);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        count++;
    }
}
console.log(`Total files updated: ${count}`);
