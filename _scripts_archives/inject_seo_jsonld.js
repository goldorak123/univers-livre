const fs = require('fs');
const path = require('path');

const books = [
    {
        file: 'livre.html',
        lang: 'fr',
        name: 'Rencontres au Clair de Lune',
        url: 'https://www.simonlero.com/livre.html',
        desc: 'Alfred Sisley, vieil homme endurci, vit entouré de ses souvenirs. Il attend en silence un signe de son unique amour, véritable et durable. La rencontre avec Joey bouleverse ce fragile équilibre.'
    },
    {
        file: 'livre-en.html',
        lang: 'en',
        name: 'Encounters By Moonlight',
        url: 'https://www.simonlero.com/livre-en.html',
        desc: 'Alfred Sisley, a hardened old man, lives surrounded by his memories. He waits in silence for a sign of his one true, lasting love. His encounter with Joey shatters this fragile balance.'
    },
    {
        file: 'livre-es.html',
        lang: 'es',
        name: 'Encuentros a la luz de la luna',
        url: 'https://www.simonlero.com/livre-es.html',
        desc: 'Alfred Sisley, un anciano endurecido, vive rodeado de sus recuerdos. Espera en silencio una señal de su único amor verdadero y duradero. Su encuentro con Joey altera este frágil equilibrio.'
    }
];

books.forEach(book => {
    try {
        let content = fs.readFileSync(book.file, 'utf8');

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Book",
            "name": book.name,
            "author": {
                "@type": "Person",
                "name": "Simon Lero"
            },
            "url": book.url,
            "image": "https://www.simonlero.com/couverture-livre.png",
            "description": book.desc,
            "inLanguage": book.lang,
            "bookFormat": ["https://schema.org/EBook", "https://schema.org/Paperback"],
            "offers": [
                {
                    "@type": "Offer",
                    "url": "https://books2read.com/u/4jkM5X",
                    "availability": "https://schema.org/InStock"
                },
                {
                    "@type": "Offer",
                    "url": "https://simonlero.myshopify.com/",
                    "availability": "https://schema.org/InStock"
                },
                {
                    "@type": "Offer",
                    "url": "https://payhip.com/simonlero",
                    "availability": "https://schema.org/InStock"
                },
                {
                    "@type": "Offer",
                    "url": "https://www.lulu.com/search?q=simon+lero",
                    "availability": "https://schema.org/InStock"
                }
            ]
        };

        const scriptTag = `\n<!-- STRUCTURED DATA SEO FOR GOOGLE -->\n<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>\n`;

        // Clean up old if it exists
        if (content.includes('STRUCTURED DATA SEO FOR GOOGLE')) {
            content = content.replace(/<!-- STRUCTURED DATA SEO FOR GOOGLE -->[\s\S]*?<\/script>\s*/, '');
        }

        // Insert before </head>
        if (content.includes('</head>')) {
            content = content.replace('</head>', scriptTag + '</head>');

            // Bump PWA version
            content = content.replace(/v48\.pwa_fix/g, 'v49.pwa_fix').replace(/v=48_/g, 'v=49_');

            fs.writeFileSync(book.file, content);
            console.log('Injected JSON-LD SEO into ' + book.file);
        }

    } catch (e) {
        console.error("Error processing " + book.file, e);
    }
});

// Update sw-v41.js
let sw = fs.readFileSync('sw-v41.js', 'utf8');
sw = sw.replace(/simon-lero-v48-final/g, 'simon-lero-v49-final');
fs.writeFileSync('sw-v41.js', sw);
console.log('Updated sw-v41.js to v49');
