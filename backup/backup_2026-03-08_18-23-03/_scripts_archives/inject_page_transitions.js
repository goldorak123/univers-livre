const fs = require('fs');
const path = require('path');

const transitionBlock = `
<!-- SMOOTH PAGE TRANSITIONS -->
<style>
  body {
    animation: fadeInPage 0.6s ease-out forwards;
    opacity: 0;
  }
  @keyframes fadeInPage {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  body.fade-out {
    opacity: 0 !important;
    transition: opacity 0.4s ease-out !important;
  }
</style>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Fallback de securite
    setTimeout(() => { document.body.style.opacity = '1'; }, 700);

    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = this.getAttribute('target');
        
        // Ignorer les liens speciaux, ancres, externes, _blank
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('javascript:') || 
            target === '_blank' || 
            link.hasAttribute('download')) {
          return;
        }
        
        e.preventDefault();
        document.body.classList.add('fade-out');
        
        // Attendre que la transition se termine avant de changer de page
        setTimeout(() => {
          window.location.href = href;
        }, 400); 
      });
    });
  });

  // Correction pour la navigation "Précédent/Suivant" du navigateur (BFCache)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.body.classList.remove('fade-out');
      document.body.style.opacity = '1';
    }
  });
</script>
`;

function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'backup' && file !== '.git' && file !== 'node_modules') {
                processHtmlFiles(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Clean up old transition blocks if any exist
            if (content.includes('SMOOTH PAGE TRANSITIONS')) {
                content = content.replace(/<!-- SMOOTH PAGE TRANSITIONS -->[\s\S]*?<\/script>\s*/, '');
            }

            // We want to insert this right before </head> to ensure CSS loads early
            if (content.includes('</head>')) {
                content = content.replace('</head>', transitionBlock + '\n</head>');
                fs.writeFileSync(fullPath, content);
                console.log('Added transitions to: ' + fullPath);
            }
        }
    }
}

// Process both directories
try {
    console.log("Processing univers-livre...");
    processHtmlFiles('c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre');
    console.log("Processing universdaniel...");
    processHtmlFiles('c:\\Users\\danie\\OneDrive\\Desktop\\universdaniel\\public');
    console.log("Done.");
} catch (e) {
    console.error("Error modifying files", e);
}
