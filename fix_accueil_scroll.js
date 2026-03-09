const fs = require('fs');
const files = ['livre-accueil.html', 'livre-accueil-en.html', 'livre-accueil-es.html'];

files.forEach(file => {
    const filePath = `c:\\\\Users\\\\danie\\\\OneDrive\\\\Desktop\\\\univers-livre\\\\${file}`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Mobile media query block replacement
        const target = `@media (max-width: 1366px) {
      body {
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
        min-height: 100dvh;
      }`;

        const replacement = `@media (max-width: 1366px) {
      html, body {
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
        min-height: 100dvh;
        max-width: 100vw;
      }`;

        content = content.replace(target, replacement);

        // Global body block replacement just in case
        const globalTarget = `    body {
      background: #000;
      color: #fff;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;`;

        const globalReplacement = `    html, body {
      background: #000;
      color: #fff;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      max-width: 100vw;`;

        content = content.replace(globalTarget, globalReplacement);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed horizontal scroll in ${file}`);
    }
});
