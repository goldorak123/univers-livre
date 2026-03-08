const fs = require('fs');
const files = ['livre.html', 'livre-en.html', 'livre-es.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // We need to change width: 60% !important; inside .cta-main:hover::after
    // Which was inside "FIX CTA MAIN UNDERLINE"

    if (content.includes('width: 60% !important;')) {
        content = content.replace('width: 60% !important;', 'width: calc((100% - 80px) * 0.6) !important;');
        fs.writeFileSync(file, content);
        console.log('Fixed ' + file);
    } else {
        console.log('Could not find width: 60% in ' + file);
    }
});
