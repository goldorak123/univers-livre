const fs = require('fs');

let html = fs.readFileSync('distribution-en.html', 'utf8');

// 1. Language tag
html = html.replace('lang="fr"', 'lang="en"');

// 2. Meta tags
html = html.replace(
    /<meta name="description"[\s\S]*?>/,
    '<meta name="description"\n        content="Distribution network of \'Mon Univers\' by Simon Lero. Find my book on Amazon, Apple Books, Kobo, Google Play, Barnes & Noble, Indigo, Lulu, and my Shopify and Payhip stores.">'
);
html = html.replace(
    '<title>Réseau de Distribution — Simon Lero</title>',
    '<title>Distribution Network - Simon Lero</title>'
);
html = html.replace(
    '<link rel="canonical" href="https://www.simonlero.com/distribution.html">',
    '<link rel="canonical" href="https://www.simonlero.com/distribution-en.html">'
);

// 3. Lang Selector
html = html.replace('<a href="distribution.html" class="active">FR</a>', '<a href="distribution.html">FR</a>');
html = html.replace('<a href="distribution-en.html" >EN</a>', '<a href="distribution-en.html" class="active">EN</a>');

// 4. Back button
html = html.replace('aria-label="Retour à l\'accueil"', 'aria-label="Back to home"');

// 5. Headers & Texts
html = html.replace('<h1 class="titre-memoire">Réseau de Distribution</h1>', '<h1 class="titre-memoire">Distribution Network</h1>');

// THE MISSING HERO SUBTITLE TRANSLATION
html = html.replace(
    /"Rencontres au Clair de Lune" est référencé à travers un vaste réseau international\s*de librairies, plateformes numériques et bibliothèques\./g,
    '"Rencontres au Clair de Lune" is listed across a vast international network\n                of bookstores, digital platforms, and libraries.'
);

html = html.replace('<div class="section-title">Librairies & Plateformes</div>', '<div class="section-title">Bookstores & Platforms</div>');
html = html.replace('<div class="section-title">Distribution & Édition</div>', '<div class="section-title">Distribution & Publishing</div>');
html = html.replace('<div class="section-title">Partenaires Technologiques</div>', '<div class="section-title">Technology Partners</div>');

// 6. Footer button
html = html.replace("Installer l'App", "Install App");

// 7. Footer nav links
html = html.replace('<a href="livre-accueil.html">Accueil</a>', '<a href="livre-accueil-en.html">Home</a>');
html = html.replace('<a href="faq.html">FAQ</a>', '<a href="faq-en.html">FAQ</a>');
html = html.replace('<a href="media.html">Espace Media</a>', '<a href="media-en.html">Media</a>');
html = html.replace('<a href="contact.html">Me contacter</a>', '<a href="contact-en.html">Contact me</a>');

// 8. Copyright
html = html.replace(/Tous\s*droits\s*r&eacute;serv&eacute;s/g, 'All rights reserved');

fs.writeFileSync('distribution-en.html', html, 'utf8');
console.log('done translating distribution-en.html');
