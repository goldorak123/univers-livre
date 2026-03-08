const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove any previous block if it exists
    if (content.includes('<!-- FIX CTA MAIN UNDERLINE -->')) {
        content = content.replace(/<!-- FIX CTA MAIN UNDERLINE -->[\s\S]*?<\/style>/, '');
    }

    const styleBlock = `<!-- FIX CTA MAIN UNDERLINE -->
<style>
  /* Retirer le width: 100% qui allonge le bouton a 350px au lieu du texte */
  .hero-actions-container .cta-main {
    width: max-content !important;
  }

  /* Cacher le trait par defaut */
  .cta-main::after {
    width: 0 !important;
  }
  
  /* Sur desktop au hover Seulement (>=901px), afficher a 60% DE LA LARGEUR DU TEXTE ET ON GARDE L'OR ! */
  @media (hover: hover) and (min-width: 901px) {
    .cta-main:hover::after {
      width: 60% !important;
      background: var(--gold) !important;
    }
  }
</style>
</head>`;

    content = content.replace('</head>', styleBlock);

    // Bump PWA version from v45.pwa_fix to v46.pwa_fix
    content = content.replace(/v45\.pwa_fix/g, 'v46.pwa_fix').replace(/v=45_/g, 'v=46_');

    fs.writeFileSync(file, content);
    console.log('Fixed buttons (hover only + max-content) in ' + file);
});

// Update sw-v41.js cache name
let sw = fs.readFileSync('sw-v41.js', 'utf8');
sw = sw.replace(/simon-lero-v45-final/g, 'simon-lero-v46-final');
fs.writeFileSync('sw-v41.js', sw);
console.log('Updated sw-v41.js to v46');
