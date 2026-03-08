const fs = require('fs');

['livre.html', 'livre-en.html', 'livre-es.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Make sure .hero-actions-container forces centered alignment on mobile and desktop
    // Wait, on desktop the user originally wanted them left aligned?
    // User says "sur livre.html et toutes les versions. centre bien les 2 boutons. vérifie aussi sur mobile"
    // So center everywhere.

    // We will change .hero-actions-container .cta-main to explicitly center
    let ctaCSS = `.hero-actions-container .cta-main {
      z-index: 2;
      width: 100%;
      max-width: 350px;
      text-align: center;
      justify-content: center;
      display: flex;
      margin-left: auto;
      margin-right: auto;
    }`;

    // replace the existing .hero-actions-container .cta-main block
    content = content.replace(/\.hero-actions-container \.cta-main\s*\{[^}]*\}/, ctaCSS);

    // Make sure .hero-actions-container aligns to center
    // Find the media query for desktop that aligns them left
    let desktopQueryOld = /\.hero-actions-container\s*\{\s*align-items:\s*flex-start;\s*\}/g;
    content = content.replace(desktopQueryOld, '.hero-actions-container { align-items: center; }');

    let desktopCtaOld = /\.hero-actions-container\s*\.cta-main\s*\{\s*width:\s*auto;\s*justify-content:\s*flex-start;\s*\}/g;
    content = content.replace(desktopCtaOld, '.hero-actions-container .cta-main { width: 100%; max-width: 350px; justify-content: center; }');

    // Also bump cache
    content = content.replace(/sw_version',\s*'\d+'/g, "sw_version', '1008'");
    content = content.replace(/v=\d+/g, 'v=1008');

    fs.writeFileSync(f, content, 'utf8');
    console.log('Centered in', f);
});

if (fs.existsSync('service-worker.js')) {
    let sw = fs.readFileSync('service-worker.js', 'utf8');
    sw = sw.replace(/CACHE_VERSION\s*=\s*'v\d+'/, "CACHE_VERSION = 'v1008'");
    fs.writeFileSync('service-worker.js', sw, 'utf8');
}
