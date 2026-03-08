const fs = require('fs');

const files = [
    { path: 'livre.html', btn: '<a href="extrait.html" class="cta-main" style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">LIRE UN EXTRAIT GRATUIT</a>', replaceStr: '<a href="resume.html" class="cta-main">' },
    { path: 'livre-en.html', btn: '<a href="extrait-en.html" class="cta-main" style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">READ A FREE EXCERPT</a>', replaceStr: '<a href="resume-en.html" class="cta-main">' },
    { path: 'livre-es.html', btn: '<a href="extrait-es.html" class="cta-main" style="color: #fff; border-color: var(--gold); background: rgba(200,160,80,0.1);">LEER UN EXTRACTO GRATUITO</a>', replaceStr: '<a href="resume-es.html" class="cta-main">' }
];

files.forEach(f => {
    let content = fs.readFileSync(f.path, 'utf8');
    if (!content.includes('LIRE UN EXTRAIT GRATUIT') && !content.includes('READ A FREE EXCERPT') && !content.includes('LEER UN EXTRACTO GRATUITO')) {
        // We add the new button just before the resume button
        content = content.replace(f.replaceStr, f.btn + '\n              ' + f.replaceStr);
        fs.writeFileSync(f.path, content);
        console.log('Updated ' + f.path);
    }
});
