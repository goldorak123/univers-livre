const fs = require('fs');
let content = fs.readFileSync('distribution.html', 'utf8');
let bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let bodyHtml = bodyMatch[1];
    // Find where .header-livre is
    let lines = bodyHtml.split('\n');
    let context = [];
    let found = false;
    for (let line of lines) {
        context.push(line.trim());
        if (context.length > 20) context.shift();
        if (line.includes('header-livre')) {
            found = true;
            break;
        }
    }
    console.log(JSON.stringify(context, null, 2));
}
