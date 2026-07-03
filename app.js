(function () {
    const root = document.documentElement;
    const storageKey = 'cv-theme';
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const saved = localStorage.getItem(storageKey);
    const initial = saved || (media.matches ? 'dark' : 'light');
    root.setAttribute('data-theme', initial);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem(storageKey, next);
        });
    }

    media.addEventListener('change', (e) => {
        if (!localStorage.getItem(storageKey)) {
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
