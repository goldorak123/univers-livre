const fs = require('fs');

const files = ['distribution.html', 'distribution-en.html', 'distribution-es.html'];

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Remove 'padding: 20px;' from body
        // Looking for:
        // body {
        //     padding: 20px;
        // }
        // We can just replace 'padding: 20px;' with '' inside the body block, or explicitly target it.
        content = content.replace(/body\s*\{\s*padding:\s*20px;\s*\}/, 'body {\n        /* padding removed to fix border around header */\n    }');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Removed body padding in ${file}`);
    }
}
