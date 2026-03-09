const fs = require('fs');

const cssToInject = `
        /* Effet Filigrane Cuir en bas à gauche */
        .leather-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            z-index: 5;
        }

        .leather-reveal-corner {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100vw;
            max-width: 1600px;
            height: 450px;
            /* Utilisation de l'image de cuir pur alignée à gauche */
            background: url('cuir-page-fond.jpg') center left / cover no-repeat;
            /* Le masque radial part du coin inférieur gauche */
            -webkit-mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 75%);
            mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 75%);
            pointer-events: none;
            mix-blend-mode: screen;
            /* Contraste pour mieux s'intégrer */
            filter: contrast(1.4) saturation(1.3) brightness(2.5);
        }

        .leather-reveal-corner-right {
            position: absolute;
            bottom: 0px;
            right: 0;
            width: 100vw;
            max-width: 1600px;
            height: 510px;
            background: url('cuir-page-fond.jpg') center right / cover no-repeat;
            -webkit-mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 75%);
            mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 75%);
            pointer-events: none;
            mix-blend-mode: screen;
            filter: contrast(1.4) saturation(1.3) brightness(2.5);
        }

`;

const htmlToInject = `
    <!-- FILIGRANE CUIR : Apparition dans les coins inférieurs -->
    <div class="leather-wrapper" aria-hidden="true">
        <div class="leather-reveal-corner"></div>
        <div class="leather-reveal-corner-right"></div>
    </div>

`;

const files = ['media.html', 'media-en.html', 'media-es.html'];

files.forEach(file => {
    const filePath = 'c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\' + file;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Éviter la double injection
        if (!content.includes('leather-reveal-corner')) {
            // Injecter le CSS
            content = content.replace('/* PWA Uniform Sub-Icons */', cssToInject + '        /* PWA Uniform Sub-Icons */');

            // Injecter le HTML
            content = content.replace('<footer class="footer-pwa">', htmlToInject + '    <footer class="footer-pwa">');

            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Injected leather filigree into ' + file);
        } else {
            console.log('Leather filigree already exists in ' + file);
        }
    }
});
