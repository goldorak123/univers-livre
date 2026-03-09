const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove any previous block if it exists
    if (content.includes('<!-- FIX CTA MAIN UNDERLINE -->')) {
        content = content.replace(/<!-- FIX CTA MAIN UNDERLINE -->[\s\S]*?<\/style>/, '');
    }

    const styleBlock = `<!-- FIX CTA MAIN UNDERLINE -->
<style>
  /* Cacher le trait sur mobile (et annuler width:60% s'il y est) */
  .cta-main::after {
    width: 0 !important;
  }
  
  /* Sur desktop Seulement (>=901px), forcer a 60% permanent */
  @media (min-width: 901px) {
    .cta-main::after {
      width: 60% !important;
      background: var(--gold) !important;
    }
  }

  /* Sur desktop au hover, changer la couleur si on veut ou garder 60% */
  @media (hover: hover) {
    .cta-main:hover::after {
      width: 60% !important;
      background: #fff !important;
    }
  }
</style>
</head>`;

    content = content.replace('</head>', styleBlock);

    fs.writeFileSync(file, content);
    console.log('Fixed buttons in ' + file);
});
