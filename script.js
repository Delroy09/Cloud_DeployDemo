document.body.classList.add('js-enabled');

// Nav animation on load
anime({
    targets: 'nav',
    translateY: ['-50px', '0'],
    opacity: [0, 1],
    duration: 800,
    delay: 300,
    easing: 'easeOutQuad'
});

// Throttled scroll handler for nav
let ticking = false;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                nav.classList.add('frosted', 'compact');
            } else {
                nav.classList.remove('frosted', 'compact');
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Anime.js scroll reveals for cards
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            anime({
                targets: entry.target,
                translateY: ['30px', '0px'],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutQuad'
            });
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.card').forEach(card => cardObserver.observe(card));

// Anime.js scroll reveal for dotted trails
const trailObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            anime({
                targets: entry.target,
                scaleX: [0, 1],
                opacity: [0.25, 0.5],
                duration: 1000,
                easing: 'easeOutExpo'
            });
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.trail').forEach(trail => trailObserver.observe(trail));

// Confetti animation on reaching footer
const footerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const colors = ['#000000', '#ffffff'];
            
            // Simple burst from both corners
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 1 },
                colors: colors,
                disableForReducedMotion: true
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 1 },
                colors: colors,
                disableForReducedMotion: true
            });
            
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(document.querySelector('footer'));

// Glass style toggle functionality
const styleToggle = document.getElementById('styleToggle');
let isAppleGlass = false;

styleToggle.addEventListener('click', () => {
    isAppleGlass = !isAppleGlass;
    
    if (isAppleGlass) {
        document.body.classList.add('apple-glass');
        anime({
            targets: '.toggle-icon',
            rotate: '180deg',
            duration: 400,
            easing: 'easeOutQuad'
        });
    } else {
        document.body.classList.remove('apple-glass');
        anime({
            targets: '.toggle-icon',
            rotate: '0deg',
            duration: 400,
            easing: 'easeOutQuad'
        });
    }
});