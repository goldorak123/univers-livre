const fs = require('fs');

const css = `
  /* PREMIUM CTA STYLING (Subtle Glow & Shine) */
  <style>
  .cta-premium {
    background: linear-gradient(135deg, rgba(201, 162, 77, 0.15) 0%, rgba(201, 162, 77, 0.3) 100%) !important;
    color: #fff !important;
    border: 1px solid rgba(201, 162, 77, 0.8) !important;
    box-shadow: 0 0 20px rgba(201, 162, 77, 0.2) !important;
    font-weight: 600 !important;
    position: relative !important;
    overflow: hidden !important;
    text-shadow: 0 1px 3px rgba(0,0,0,0.8) !important;
  }

  .cta-premium::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: -150% !important;
    width: 50% !important;
    height: 100% !important;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent) !important;
    transform: skewX(-20deg) !important;
    animation: shine-effect 5s infinite cubic-bezier(0.16, 1, 0.3, 1) !important;
    pointer-events: none !important;
  }

  @keyframes shine-effect {
    0% { left: -150%; }
    15% { left: 200%; }
    100% { left: 200%; }
  }

  /* Sur ordinateur: amplifier le volume d'or au survol */
  @media (hover: hover) {
    .cta-premium:hover {
      background: linear-gradient(135deg, rgba(201, 162, 77, 0.25) 0%, rgba(201, 162, 77, 0.5) 100%) !important;
      box-shadow: 0 0 35px rgba(201, 162, 77, 0.4) !important;
      transform: translateY(-2px) !important;
      border-color: var(--gold-bright, #eec165) !important;
    }
  }
  </style>
</head>
`;

const files = [
    {
        path: 'livre.html',
        oldBtn: `              <a href="extrait.html" class="cta-main"
                style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">
                LIRE UN EXTRAIT GRATUIT
              </a>`,
        newBtn: `              <a href="extrait.html" class="cta-main cta-premium">
                LIRE UN EXTRAIT GRATUIT
              </a>`
    },
    {
        path: 'livre-en.html',
        oldBtn: `              <a href="extrait-en.html" class="cta-main"
                style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">
                READ A FREE EXCERPT
              </a>`,
        newBtn: `              <a href="extrait-en.html" class="cta-main cta-premium">
                READ A FREE EXCERPT
              </a>`
    },
    {
        path: 'livre-es.html',
        oldBtn: `              <a href="extrait-es.html" class="cta-main"
                style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">
                LEER UN EXTRACTO GRATUITO
              </a>`,
        newBtn: `              <a href="extrait-es.html" class="cta-main cta-premium">
                LEER UN EXTRACTO GRATUITO
              </a>`
    }
];

files.forEach(f => {
    let content = fs.readFileSync(f.path, 'utf8');

    // Replace the style inline by the premium class
    if (content.includes(f.oldBtn)) {
        content = content.replace(f.oldBtn, f.newBtn);
    } else {
        // Fallback for whitespace
        const regex = new RegExp('<a href="extrait.*?class="cta-main"\\s*style=".*?"[\\s\\S]*?<\\/a>');
        const match = content.match(regex);
        if (match) {
            content = content.replace(match[0], f.newBtn);
        }
    }

    // Add CSS
    if (!content.includes('cta-premium')) {
        content = content.replace('</head>', css);
    }

    fs.writeFileSync(f.path, content);
    console.log('Improved ' + f.path);
});
