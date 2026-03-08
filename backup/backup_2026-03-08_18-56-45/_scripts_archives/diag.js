const fs = require('fs');
let content = fs.readFileSync('distribution.html', 'utf8');
let styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    let css = styleMatch[1];
    if (css.includes('distribution-container')) {
        console.log("Found distribution-container in CSS!");
    } else {
        console.log("distribution-container NOT FOUND in CSS!");
    }
    if (css.includes('body')) {
        let bodyMatches = css.match(/body\s*\{[^}]*\}/g);
        console.log("Body matches:", bodyMatches);
    }
    // Also check wrapper
    console.log("CSS classes defined:");
    let classes = [...css.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{/g)].map(m => m[1]);
    console.log(classes.join(', '));
}
