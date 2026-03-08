const fs = require('fs');

const css = `
  /* BOOK CTA BUTTON */
  <style>
  .book-cta-btn {
    display: flex !important;
    align-items: center;
    background: rgba(15, 15, 15, 0.8) !important;
    border: 1px solid rgba(200, 160, 80, 0.3) !important;
    border-radius: 6px !important;
    padding: 8px 20px 8px 8px !important;
    text-decoration: none !important;
    margin-bottom: 15px !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5) !important;
    width: max-content !important;
  }

  .book-cta-btn:hover {
    background: rgba(25, 25, 25, 0.95) !important;
    border-color: #d4af37 !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2) !important;
  }

  .book-cta-cover {
    width: 40px !important;
    height: 60px !important;
    margin-right: 15px !important;
    border-radius: 2px 4px 4px 2px !important;
    overflow: hidden !important;
    box-shadow: -2px 0 5px rgba(0,0,0,0.5), inset 2px 0 3px rgba(255,255,255,0.2) !important;
    transform: perspective(400px) rotateY(-15deg) !important;
    transition: transform 0.4s ease !important;
    flex-shrink: 0 !important;
  }

  .book-cta-btn:hover .book-cta-cover {
    transform: perspective(400px) rotateY(0deg) scale(1.05) !important;
  }

  .book-cta-cover img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .book-cta-content {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    text-align: left !important;
  }

  .book-cta-subtitle {
    font-family: 'Inter', sans-serif !important;
    font-size: 0.6rem !important;
    letter-spacing: 3px !important;
    color: #d4af37 !important;
    text-transform: uppercase !important;
    margin-bottom: 2px !important;
    line-height: 1 !important;
  }

  .book-cta-title {
    font-family: 'Cinzel', serif !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
    color: #fff !important;
    letter-spacing: 1px !important;
    line-height: 1.2 !important;
  }
  </style>
</head>
`;

const files = [
    {
        path: 'livre.html',
        oldBtn: '<a href="extrait.html" class="cta-main"\n                style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">\n                LIRE UN EXTRAIT GRATUIT\n              </a>',
        newBtn: `              <a href="extrait.html" class="book-cta-btn">
                <div class="book-cta-cover">
                  <img src="couverture-livre.png" alt="Couverture">
                </div>
                <div class="book-cta-content">
                  <span class="book-cta-subtitle">GRATUIT</span>
                  <span class="book-cta-title">LIRE UN EXTRAIT</span>
                </div>
              </a>`
    },
    {
        path: 'livre-en.html',
        oldBtn: '<a href="extrait-en.html" class="cta-main" style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">\n                READ A FREE EXCERPT\n              </a>',
        newBtn: `              <a href="extrait-en.html" class="book-cta-btn">
                <div class="book-cta-cover">
                  <img src="couverture-livre.png" alt="Cover">
                </div>
                <div class="book-cta-content">
                  <span class="book-cta-subtitle">FREE</span>
                  <span class="book-cta-title">READ EXCERPT</span>
                </div>
              </a>`
    },
    {
        path: 'livre-es.html',
        oldBtn: '<a href="extrait-es.html" class="cta-main" style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">\n                LEER UN EXTRACTO GRATUITO\n              </a>',
        newBtn: `              <a href="extrait-es.html" class="book-cta-btn">
                <div class="book-cta-cover">
                  <img src="couverture-livre.png" alt="Portada">
                </div>
                <div class="book-cta-content">
                  <span class="book-cta-subtitle">GRATIS</span>
                  <span class="book-cta-title">LEER EXTRACTO</span>
                </div>
              </a>`
    }
];

files.forEach(f => {
    let content = fs.readFileSync(f.path, 'utf8');

    // Mettre à jour le bouton
    if (content.includes(f.oldBtn)) {
        content = content.replace(f.oldBtn, f.newBtn);
    } else {
        // Fallback pour les espaces/sauts de ligne
        const regex = new RegExp('<a href="extrait.*?class="cta-main"[\\s\\S]*?<\\/a>');
        const match = content.match(regex);
        if (match && match[0].includes('EXTRAIT') || match && match[0].includes('EXCERPT') || match && match[0].includes('EXTRACTO')) {
            content = content.replace(match[0], f.newBtn);
        }
    }

    // Ajouter le CSS si pas déjà présent
    if (!content.includes('book-cta-btn')) {
        content = content.replace('</head>', css);
    }

    fs.writeFileSync(f.path, content);
    console.log('Updated ' + f.path);
});
