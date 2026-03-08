const fs = require('fs');
const files = ['faq.html', 'faq-en.html', 'faq-es.html'];

const cssSnippet = `
    /* --- LUXURY UNDERLINE SYSTEM --- */
    .footer-nav a::after,
    .footer-nav-links a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 1px;
        background: var(--gold);
        transition: all 0.4s ease;
        transform: translateX(-50%);
    }

    .footer-nav a:hover::after,
    .footer-nav-links a:hover::after {
        width: 60%;
    }
`;

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        if (!content.includes('LUXURY UNDERLINE SYSTEM')) {
            content = content.replace('</style>', cssSnippet + '\n</style>');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Added luxury underline system to ${file}`);
        } else {
            console.log(`Luxury underline system already exists in ${file}`);
        }
    }
}
