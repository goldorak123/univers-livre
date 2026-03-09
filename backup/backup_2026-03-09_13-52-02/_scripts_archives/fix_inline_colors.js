const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('cv-secure'));

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // The inline style in footer-nav anchor tags has `color: #c9a24d !important;`
    // We will strip out this exact color rule so the external <style> block takes effect
    content = content.replace(/color:\s*#[0-9a-fA-F]{3,6}\s*!important;/g, (match, offset, string) => {
        // Only strip it if it's inside an style="" attribute likely related to footer nav
        // Actually, just to be safe, we can replace the specific #c9a24d !important 
        if (match.toLowerCase() === 'color: #c9a24d !important;') {
            return '';
        }
        return match;
    });

    // Some might have it without !important
    content = content.replace(/style="([^"]*)color:\s*#c9a24d\s*!important;\s*/gi, 'style="$1');
    content = content.replace(/style="([^"]*)color:\s*#c9a24d\s*;\s*/gi, 'style="$1');


    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Stripped inline color in: " + file);
        count++;
    }
}
console.log("Total files processed for inline color removal: " + count);
