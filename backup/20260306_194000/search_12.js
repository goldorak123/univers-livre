const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';

fs.readdirSync(directoryPath).forEach(file => {
    if (!file.endsWith('.html')) return;

    let filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Look for a 12 not inside an SVG path
    let lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('12') && !line.includes('stroke') && !line.includes('width') && !line.includes('grid') && !line.includes('href') && !line.includes('link') && !line.includes('padding') && !line.includes('margin') && !line.includes('gap') && !line.includes('font-size') && !line.includes('rem;') && !line.includes('px;')) {
            console.log(`Found '12' in ${file} on line ${index + 1}: ${line.trim()}`);
        }
    });
});
