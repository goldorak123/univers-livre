const fs = require('fs');

const frHtml = fs.readFileSync('media.html', 'utf8');
const enHtml = fs.readFileSync('media-en.html', 'utf8');

const headMatchFr = frHtml.match(/<head>[\s\S]*?<\/head>/);
const headFr = headMatchFr[0];

const headMatchEn = enHtml.match(/<head>[\s\S]*?<\/head>/);
const headEn = headMatchEn[0];

// we want to keep the title in English
const titleEn = headEn.match(/<title>.*?<\/title>/)[0];
// keeping the media-en specific things, but copying styles
const stylesFr = frHtml.match(/<style>[\s\S]*?<\/style>/g);

// replace all styles in enHtml with styles from frHtml
let newEnHtml = enHtml;
const oldStylesEn = enHtml.match(/<style>[\s\S]*?<\/style>/g);
if (oldStylesEn) {
    oldStylesEn.forEach(style => {
        newEnHtml = newEnHtml.replace(style, '');
    });
}

// insert styles right before </head>
newEnHtml = newEnHtml.replace('</head>', stylesFr.join('\n\n') + '\n</head>');

fs.writeFileSync('media-en.html', newEnHtml, 'utf8');
console.log('CSS synced to media-en.html');
