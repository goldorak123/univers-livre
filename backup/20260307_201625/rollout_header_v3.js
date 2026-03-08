const fs = require('fs');
const path = require('path');

const cssToInject = [
    '    /* ================= NOUVEL ENTÊTE LUXE ================= */',
    '    .header-livre {',
    '        font-family: "Playfair Display", serif;',
    '        background-image: url("entete-texture.jpg");',
    '        background-size: 110%;',
    '        background-position: center bottom;',
    '        background-repeat: no-repeat;',
    '        height: 380px;',
    '        width: 100%;',
    '        position: relative;',
    '        display: flex;',
    '        align-items: center;',
    '        justify-content: center;',
    '        border-bottom: none;',
    '        margin-bottom: 0px;',
    '        overflow: hidden;',
    '    }',
    '',
    '    .header-livre::after {',
    '        content: "";',
    '        position: absolute;',
    '        inset: 0;',
    '        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 1) 100%);',
    '        pointer-events: none;',
    '    }',
    '',
    '    .titre-memoire {',
    '        font-family: "Playfair Display", serif;',
    '        color: #d4a23a;',
    '        font-size: clamp(3rem, 10vw, 5.5rem);',
    '        font-weight: 900;',
    '        letter-spacing: 0.15em;',
    '        text-transform: uppercase;',
    '        margin: 0;',
    '        text-align: center;',
    '        position: relative;',
    '        z-index: 10;',
    '        padding: 5px 20px;',
    '        background: linear-gradient(to bottom, #f1d57e 0%, #d4a23a 50%, #a67c00 100%);',
    '        -webkit-background-clip: text;',
    '        -webkit-text-fill-color: transparent;',
    '        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8));',
    '    }',
    '',
    '    @media (max-width: 768px) {',
    '        .header-livre {',
    '            height: 250px;',
    '            background-size: 115%;',
    '        }',
    '',
    '        .titre-memoire {',
    '            font-size: 2.2rem;',
    '            letter-spacing: 0.05em;',
    '        }',
    '',
    '        .auteur-header {',
    '            font-size: 0.75rem;',
    '            letter-spacing: 5px;',
    '            margin-bottom: 0px;',
    '        }',
    '',
    '        .livre-header {',
    '            font-size: 1rem;',
    '            letter-spacing: 1px;',
    '            margin-top: 2px;',
    '        }',
    '    }',
    '',
    '    .auteur-header {',
    '        font-family: "Inter", sans-serif;',
    '        font-size: 1.1rem;',
    '        letter-spacing: 8px;',
    '        text-transform: uppercase;',
    '        color: #ffffff;',
    '        text-align: center;',
    '        margin-bottom: 2px;',
    '        z-index: 10;',
    '        position: relative;',
    '    }',
    '',
    '    .livre-header {',
    '        font-family: "Cinzel", serif;',
    '        font-size: 1.4rem;',
    '        letter-spacing: 3px;',
    '        color: #ffffff;',
    '        text-align: center;',
    '        margin-top: 5px;',
    '        font-style: italic;',
    '        z-index: 10;',
    '        position: relative;',
    '    }',
    '    ',
    '    .overlay-content {',
    '        position: relative;',
    '        z-index: 10;',
    '        display: flex;',
    '        flex-direction: column;',
    '        align-items: center;',
    '    }',
    '</style>'
].join('\n');

const filesToProcess = fs.readdirSync('.').filter(f => f.endsWith('.html') && !['404.html', 'livre-accueil.html', 'resume.html'].includes(f));

for (let filename of filesToProcess) {
    let content = fs.readFileSync(filename, 'utf8');

    // Skip if already processed
    if (content.includes('class="header-livre"')) {
        console.log("Skipping " + filename + " (already processed)");
        continue;
    }

    if (!content.match(/<header class="hero(?:-stage)?">/)) {
        console.log("Skipping " + filename + " (no hero header)");
        continue;
    }

    if (!content.includes('family=Playfair+Display')) {
        content = content.replace('family=Cinzel:wght@400;700;900&family=Inter', 'family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter');
    }

    const titleMatch = content.match(/<h1 class="hero-[^>]*>([\s\S]*?)<\/h1>/);
    let cleanTitle = "TITRE";
    if (titleMatch) {
        cleanTitle = titleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanTitle.toLowerCase() === 'foire aux questions') cleanTitle = 'Foire aux Questions';
    } else {
        console.log("Warning: No h1 title found in " + filename);
    }
    console.log("Processing " + filename + " with title: " + cleanTitle);

    content = content.replace(/<div class="hero-background-title(?:.*?)">[\s\S]*?<\/div>\s*/g, '');
    content = content.replace(/<h1 class="hero-[^>]*>[\s\S]*?<\/h1>\s*/, '');

    const styleEndIdx = content.lastIndexOf('</style>');
    if (styleEndIdx !== -1) {
        content = content.substring(0, styleEndIdx) + '\n' + cssToInject + content.substring(styleEndIdx + 8);
    }

    const newHeaderBlock = [
        '    <header class="header-livre">',
        '        <div class="overlay-content">',
        '            <div class="auteur-header">SIMON LERO</div>',
        '            <h1 class="titre-memoire">' + cleanTitle + '</h1>',
        '            <div class="livre-header">Rencontres au Clair de Lune</div>',
        '        </div>',
        '    </header>'
    ].join('\n');

    content = content.replace(/(<header class="hero(?:-stage)?(?:[^">]*)">)/, newHeaderBlock + '\n\n$1');

    content = content.replace(/\.hero\s*\{\s*padding:\s*[0-9A-Za-z\s]+;/g, '.hero { padding: 40px 20px 20px;');
    content = content.replace(/\.hero-stage\s*\{\s*min-height:\s*100vh;\s*padding-top:\s*[0-9A-Za-z\s]+;/g, '.hero-stage { min-height: auto; padding-top: 40px;');

    fs.writeFileSync(filename, content, 'utf8');
}
console.log("Rollout script complete.");
