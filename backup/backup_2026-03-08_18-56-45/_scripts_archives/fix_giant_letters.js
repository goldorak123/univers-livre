const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // We want to replace the font-family of .hero-background-title to 'Playfair Display', serif
    // And ensure opacity is 9% (0.09)

    // A regex to match the .hero-background-title block securely
    // It usually looks like:
    // .hero-background-title {
    //    font-family: 'Inter', sans-serif;
    //    font-size: clamp(10rem, 30vw, 28rem);
    //    font-weight: 900;
    //    color: rgba(216, 178, 90, 0.09);
    //    -webkit-text-stroke: 1px rgba(216, 178, 90, 0.09);

    // We can do a string replace on font-family specifically for that block
    content = content.replace(
        /\.hero-background-title\s*\{([\s\S]*?)font-family:\s*['"]?(?:Inter|Cinzel)['"]?,\s*sans-serif;([\s\S]*?)\}/g,
        '.hero-background-title {$1font-family: "Playfair Display", serif;$2}'
    );

    // Some backups or edges might just have 'Inter', sans-serif !important
    content = content.replace(
        /\.hero-background-title\s*\{([\s\S]*?)font-family:\s*['"]?(?:Inter|Cinzel)['"]?,\s*sans-serif\s*!important;([\s\S]*?)\}/g,
        '.hero-background-title {$1font-family: "Playfair Display", serif !important;$2}'
    );

    // Let's just blindly make sure any "font-family: 'Inter', sans-serif;" inside .hero-background-title becomes Playfair.
    // Actually, safest is to match .hero-background-title { ... } block and replace 'Inter' with 'Playfair Display' inside it.

    // As for opacity 9%:
    content = content.replace(/color:\s*rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/g, 'color: rgba(216, 178, 90, 0.09)');
    content = content.replace(/-webkit-text-stroke:\s*1px\s*rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/g, '-webkit-text-stroke: 1px rgba(216, 178, 90, 0.09)');

    // For any random occurrences missed by the regex (maybe it's not Inter but something else?)
    // If it currently has font-family: 'Inter', sans-serif;
    // We'll write a manual replacer for the block:
    let blocks = content.split('.hero-background-title {');
    if (blocks.length > 1) {
        for (let i = 1; i < blocks.length; i++) {
            let endIndex = blocks[i].indexOf('}');
            if (endIndex !== -1) {
                let inner = blocks[i].substring(0, endIndex);
                inner = inner.replace(/font-family:\s*['"]?.+?['"]?,\s*(?:sans-)?serif;?/, 'font-family: "Playfair Display", serif;');
                blocks[i] = inner + blocks[i].substring(endIndex);
            }
        }
        content = blocks.join('.hero-background-title {');
    }

    // Bust cache to v92
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=92');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Successfully updated giant letters in ${f}`);
    }
});
