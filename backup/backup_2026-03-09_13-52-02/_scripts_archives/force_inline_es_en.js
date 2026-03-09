const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.startsWith('livre') && f.endsWith('.html') && !f.includes('cv-secure'));

let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let orig = content;

    // Specifically target the footer-nav anchors that have 1.1rem inline and replace with calc(1.1rem - 2px) 
    // AND ensure the color is #d8b25a

    // Pattern to catch the specific styles of the two buttons:
    const regex1 = /<a href="https:\/\/www\.mon-univers\.ca\/index\.html"([\s\S]*?)font-size:\s*1\.1rem;/g;
    content = content.replace(regex1, '<a href="https://www.mon-univers.ca/index.html"$1color: #d8b25a !important; font-size: calc(1.1rem - 2px);');

    const regex2 = /<a href="distribution.*?\.html"([\s\S]*?)font-size:\s*1\.1rem;/g;
    content = content.replace(regex2, '<a href="distribution-en.html"$1color: #d8b25a !important; font-size: calc(1.1rem - 2px);');

    // Make sure we also cover Spanish
    const regex3 = /<a href="distribution-es\.html"([\s\S]*?)font-size:\s*1\.1rem;/g;
    content = content.replace(regex3, '<a href="distribution-es.html"$1color: #d8b25a !important; font-size: calc(1.1rem - 2px);');

    // More generic fallback just for these buttons if the regexes fail to match precisely
    const generalRegex = /<div class="footer-nav">([\s\S]*?)<\/div>/g;
    content = content.replace(generalRegex, (match, inner) => {
        let newInner = inner.replace(/font-size:\s*1\.1rem;/g, 'color: #d8b25a !important; font-size: calc(1.1rem - 2px);');
        // If it got double-injected color because we did it twice, let's just make sure
        return '<div class="footer-nav">' + newInner + '</div>';
    });

    // Cleanup double injected colors from the generic replace and regex
    content = content.replace(/color:\s*#d8b25a !important;\s*color:\s*#d8b25a !important;/g, 'color: #d8b25a !important;');

    if (content !== orig) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Inline forced sizes/colors for " + file);
        count++;
    }
}

console.log("Total files forced: " + count);
