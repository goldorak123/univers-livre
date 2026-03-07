const fs = require('fs');

const pagesGroups = [
    { fr: 'livre.html', en: 'livre-en.html', es: 'livre-es.html' },
    { fr: 'media.html', en: 'media-en.html', es: 'media-es.html' },
    { fr: 'contact.html', en: 'contact-en.html', es: 'contact-es.html' },
    { fr: 'resume.html', en: 'resume-en.html', es: 'resume-es.html' },
    { fr: 'distribution.html', en: 'distribution-en.html', es: 'distribution-es.html' },
    { fr: 'faq.html', en: 'faq-en.html', es: 'faq-es.html' },
    { fr: 'fiche-technique.html', en: 'technical-specifications.html', es: 'ficha-tecnica.html' }
];

function getSelector(group, lang) {
    let frClass = lang === 'fr' ? 'class="active"' : '';
    let enClass = lang === 'en' ? 'class="active"' : '';
    let esClass = lang === 'es' ? 'class="active"' : '';

    return `
<!-- INJECTED LANG SELECTOR -->
<div style="position: absolute; top: 0; left: 0; right: 0; z-index: 999;">
  <div class="lang-selector">
    <a href="${group.fr}" ${frClass}>FR</a>
    <span class="sep">|</span>
    <a href="${group.en}" ${enClass}>EN</a>
    <span class="sep">|</span>
    <a href="${group.es}" ${esClass}>ES</a>
  </div>
</div>
<!-- /INJECTED LANG SELECTOR -->`;
}

let count = 0;

for (const group of pagesGroups) {
    for (const lang of ['fr', 'en', 'es']) {
        const file = group[lang];
        if (!fs.existsSync(file)) {
            console.log('Skipping missing file', file);
            continue;
        }

        let content = fs.readFileSync(file, 'utf8');

        // Check if already injected
        if (content.includes('INJECTED LANG SELECTOR') || content.includes('class="lang-selector"')) {
            console.log(file + ' already has lang selector');
            continue;
        }

        // Inject right after <body...>
        const bodyRegex = /<body[^>]*>/i;
        const match = bodyRegex.exec(content);
        if (match) {
            const insertion = match[0] + '\n' + getSelector(group, lang);
            content = content.replace(match[0], insertion);
            fs.writeFileSync(file, content, 'utf8');
            console.log('Injected to', file);
            count++;
        } else {
            console.log('Could not find body tag in', file);
        }
    }
}

console.log('Total files injected:', count);
