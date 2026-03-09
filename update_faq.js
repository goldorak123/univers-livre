const fs = require('fs');

const data = [
    {
        file: 'faq.html',
        search: /Amazon ou Kobo après votre\s+lecture/,
        replace: 'Amazon, Kobo ou tous autres <a href="distribution.html" style="color:var(--gold); text-decoration: underline;">partenaires de distribution</a> après votre\n                    lecture'
    },
    {
        file: 'faq-en.html',
        search: /Amazon or Kobo after reading/,
        replace: 'Amazon, Kobo or any other <a href="distribution-en.html" style="color:var(--gold); text-decoration: underline;">distribution partners</a> after reading'
    },
    {
        file: 'faq-es.html',
        search: /Amazon o Kobo después de su lectura/,
        replace: 'Amazon, Kobo o cualquier otro <a href="distribution-es.html" style="color:var(--gold); text-decoration: underline;">socio de distribución</a> después de su lectura'
    }
];

data.forEach(item => {
    if (fs.existsSync(item.file)) {
        let content = fs.readFileSync(item.file, 'utf8');
        content = content.replace(item.search, item.replace);
        fs.writeFileSync(item.file, content, 'utf8');
        console.log(`Updated ${item.file}`);
    } else {
        console.log(`File not found: ${item.file}`);
    }
});
