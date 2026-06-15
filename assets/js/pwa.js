/* PWA: register the service worker and offer an "Install app" button. */
(function () {
    'use strict';
    if (!('serviceWorker' in navigator)) return;

    // Resolve the app base from the manifest link so it works in subfolders.
    const base = (window.BASE_URL || '').replace(/\/$/, '');

    window.addEventListener('load', () => {
        navigator.serviceWorker.register(base + '/sw.js').catch(() => {});
    });

    // Custom install prompt
    let deferredPrompt = null;
    const makeButton = () => {
        if (document.getElementById('pwaInstallBtn')) return document.getElementById('pwaInstallBtn');
        const btn = document.createElement('button');
        btn.id = 'pwaInstallBtn';
        btn.type = 'button';
        btn.innerHTML = '<i class="fa-solid fa-download"></i> Install app';
        btn.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:3000;border:none;cursor:pointer;' +
            'padding:.7rem 1.1rem;border-radius:999px;font-weight:700;color:#fff;' +
            'background:linear-gradient(135deg,#b5651d,#e09f3e);box-shadow:0 10px 24px rgba(181,101,29,.45);';
        btn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            btn.remove();
        });
        document.body.appendChild(btn);
        return btn;
    };

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        makeButton();
    });

    window.addEventListener('appinstalled', () => {
        const b = document.getElementById('pwaInstallBtn');
        if (b) b.remove();
    });
})();
