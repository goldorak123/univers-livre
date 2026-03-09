const fs = require('fs');
const files = ['resume.html', 'resume-en.html', 'resume-es.html', 'contact.html', 'contact-en.html', 'contact-es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Fix resume pages - they currently have margin-top: -90px on .content-card
    if (file.startsWith('resume')) {
        if (content.match(/margin-top:\s*-90px;/)) {
            // Change it back down to -30px to give breathing room
            content = content.replace(/margin-top:\s*-90px;/g, 'margin-top: -30px;');
            dirty = true;
        }
    }

    // Fix contact pages - they were set to margin-top: -120px on .hero
    // Let's reduce that to -60px to push the form down just under the feather but not overlapping text
    if (file.startsWith('contact')) {
        if (content.match(/margin-top:\s*-120px;/)) {
            content = content.replace(/margin-top:\s*-120px;/g, 'margin-top: -60px;');
            dirty = true;
        }
    }

    if (dirty) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Adjusted margin down in ${file}`);
    }
});
