(function () {
    const root = document.documentElement;
    const storageKey = 'cv-theme';
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Theme ---------- */
    const saved = localStorage.getItem(storageKey);
    root.setAttribute('data-theme', saved || (media.matches ? 'dark' : 'light'));

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            root.classList.add('theme-fade');
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem(storageKey, next);
            setTimeout(() => root.classList.remove('theme-fade'), 400);
        });
    }

    media.addEventListener('change', (e) => {
        if (!localStorage.getItem(storageKey)) {
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Reading progress + header shadow ---------- */
    const progress = document.getElementById('progress');
    const header = document.querySelector('.site-header');
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            if (progress) progress.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%';
            if (header) header.classList.toggle('scrolled', doc.scrollTop > 8);
            ticking = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll('.entry, .skills, ul.plain, .footer-title');
    if (!reducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((items) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.classList.add('visible');
                    revealObserver.unobserve(item.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

        revealTargets.forEach((el) => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    /* ---------- Active nav link ---------- */
    const navLinks = Array.from(document.querySelectorAll('.site-header nav a[href^="#"]'));
    const sections = navLinks
        .map((a) => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((items) => {
            items.forEach((item) => {
                if (item.isIntersecting) {
                    navLinks.forEach((a) =>
                        a.classList.toggle('active', a.getAttribute('href') === '#' + item.target.id)
                    );
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });

        sections.forEach((s) => navObserver.observe(s));
    }
})();
