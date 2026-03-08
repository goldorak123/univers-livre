const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('livre-accueil') && !f.startsWith('404'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // 50% Reduction:
    // .auteur-header was 0.75rem -> 50% = 0.375rem (let's use 0.4rem for readability)
    // .livre-header was 1rem -> 50% = 0.5rem

    // Variation 1: 6 spaces indentation
    content = content.replace(
        `      .auteur-header {
        font-size: 0.75rem;
        letter-spacing: 5px;
        margin-bottom: 0px;
      }`,
        `      .auteur-header {
        font-size: 0.4rem;
        letter-spacing: 2px;
        margin-bottom: 0px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`
    );

    // Variation 2: 4 spaces indentation
    content = content.replace(
        `    .auteur-header {
        font-size: 0.75rem;
        letter-spacing: 5px;
        margin-bottom: 0px;
    }`,
        `    .auteur-header {
        font-size: 0.4rem;
        letter-spacing: 2px;
        margin-bottom: 0px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }`
    );

    // Livre-header Variation 1: 6 spaces indentation
    content = content.replace(
        `      .livre-header {
        font-size: 1rem;
        letter-spacing: 1px;
        margin-top: 2px;
      }`,
        `      .livre-header {
        font-size: 0.5rem;
        letter-spacing: 1px;
        margin-top: 2px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      }`
    );

    // Livre-header Variation 2: 4 spaces indentation
    content = content.replace(
        `    .livre-header {
        font-size: 1rem;
        letter-spacing: 1px;
        margin-top: 2px;
    }`,
        `    .livre-header {
        font-size: 0.5rem;
        letter-spacing: 1px;
        margin-top: 2px;
        color: #ffffff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }`
    );

    // Ensure the main desktop version is also white (if it has color: #d4a23a;)
    content = content.replace(/color: #d4a23a;/g, 'color: #ffffff;');

    // Bust cache to v81
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=81');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully applied 50% reduction in ${f}`);
    }
});
