const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove any previous block if it exists
    if (content.includes('<!-- FIX CTA MAIN UNDERLINE -->')) {
        content = content.replace(/<!-- FIX CTA MAIN UNDERLINE -->[\s\S]*?<\/style>/, '');
    }

    const styleBlock = `<!-- FIX CTA MAIN UNDERLINE -->
<style>
  /* Cacher le trait par defaut */
  .cta-main::after {
    width: 0 !important;
  }
  
  /* Sur desktop au hover Seulement (>=901px), afficher a 60% */
  @media (hover: hover) and (min-width: 901px) {
    .cta-main:hover::after {
      width: 60% !important;
      background: var(--gold) !important;
    }
  }
</style>
</head>`;

    content = content.replace('</head>', styleBlock);

    fs.writeFileSync(file, content);
    console.log('Fixed buttons (hover only) in ' + file);
});
