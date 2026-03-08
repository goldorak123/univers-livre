const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // 1. Remove the entire <header class="hero"> or <div class="mockup-container"> containing the images
    // The structure is typically:
    // <header class="hero">
    //     <div class="mockup-container" ...>
    //         <img src="mockup-livre.png" ...>
    //     </div>
    // </header>
    // Or just <div class="mockup-container"...>...</div>
    // Let's use a regex to strip lines that have mockup-container and the img inside.
    const regexMockup1 = /<header class="hero">\s*<div class="mockup-container"[\s\S]*?<\/div>\s*<\/header>/g;
    content = content.replace(regexMockup1, '');

    const regexMockup2 = /<div class="mockup-container"[\s\S]*?<\/div>/g;
    content = content.replace(regexMockup2, '');

    // Some pages like livre.html have:
    // <header class="hero-stage">
    //   <div class="container">
    //     <div class="grid-stage">
    //       <div class="hero-presentation-grid">
    //         <div class="book-frame reveal"...>
    //           <img src="couverture-livre.png"...
    // Let's NOT remove couverture unless requested? "denlever toutes ces images, les sous titres et simon leron sontrop gros"
    // The user screenshot showed `mockup-livre.png` being removed.

    // 2. Fix the 9% opacity on .hero-background-title (if any)
    content = content.replace(/color:\s*rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/g, 'color: rgba(216, 178, 90, 0.09)');
    content = content.replace(/-webkit-text-stroke:\s*1px\s*rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)/g, '-webkit-text-stroke: 1px rgba(216, 178, 90, 0.09)');

    // 3. Update the Service Worker cache to v82
    content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=82');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Updated images and opacity in ${f}`);
    }
});
