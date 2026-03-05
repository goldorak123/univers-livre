const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\danie\\OneDrive\\Desktop\\univers-livre';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const pwaScript = `    <!-- PWA Installation Logic -->
    <script>
        // SYSTÈME DE GESTION PWA - FORCE UPDATE v42
        (async function() {
            const v = 'v42.pwa_fix';
            if (localStorage.getItem('pwa_v') !== v) {
                if ('serviceWorker' in navigator) {
                    try {
                        const regs = await navigator.serviceWorker.getRegistrations();
                        for (const r of regs) await r.unregister();
                    } catch(e) {}
                }
                if ('caches' in window) {
                    try {
                        const keys = await caches.keys();
                        for (const k of keys) await caches.delete(k);
                    } catch(e) {}
                }
                localStorage.clear();
                sessionStorage.clear();
                localStorage.setItem('pwa_v', v);
                window.location.reload(true);
            } else {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/sw-v41.js?v=42_' + Date.now(), {
                        updateViaCache: 'none'
                    }).catch(() => {});
                }
            }
        })();

        // LOGIQUE D'INSTALLATION
        window.installPWA = function() {
            if (window.deferredPrompt) {
                window.deferredPrompt.prompt();
                window.deferredPrompt.userChoice.then(() => {
                    window.deferredPrompt = null;
                });
            } else {
                console.log("Installation non disponible ou l'application est déjà installée.");
            }
        };
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            window.deferredPrompt = e;
        });

        // BIND BUTTONS AUTOMATICALLY
        document.addEventListener('DOMContentLoaded', () => {
            const btns = document.querySelectorAll('#installAppBtn, #install-btn');
            btns.forEach(btn => {
                btn.style.cursor = 'pointer';
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.installPWA();
                });
            });
        });
    </script>
</head>`;

let modifiedCounter = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    if (content.includes('function installPWA') || content.includes('window.installPWA = function')) {
        console.log('Skipping ' + file + ' (already has installPWA)');
        return;
    }

    if (content.includes('</head>')) {
        content = content.replace('</head>', pwaScript);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log('Fixed PWA logic in ' + file);
        modifiedCounter++;
    }
});

console.log('Done! Modified ' + modifiedCounter + ' files.');
