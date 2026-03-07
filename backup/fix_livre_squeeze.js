const fs = require('fs');
let content = fs.readFileSync('livre.html', 'utf8');

const regex = /\.titre-memoire\s*\{\s*font-size:\s*2\.2rem;\s*letter-spacing:\s*0\.05em;\s*\}/g;
content = content.replace(regex,
    `.titre-memoire {
        font-size: 2.2rem;
        letter-spacing: 0.05em;
        transform: scaleX(0.75);
        transform-origin: center;
        display: inline-block;
      }`);

content = content.replace(/service-worker\.js\?v=\d+/g, 'service-worker.js?v=95');
fs.writeFileSync('livre.html', content, 'utf8');
