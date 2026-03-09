document.addEventListener('DOMContentLoaded', () => {
    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Loader Animation
    const loader = document.querySelector('.loader');
    const loaderPercent = document.querySelector('.loader-percent');
    let count = 0;

    const interval = setInterval(() => {
        count++;
        loaderPercent.textContent = count + '%';
        if (count >= 100) {
            clearInterval(interval);
            gsap.to(loader, {
                y: '-100%',
                duration: 1,
                ease: 'expo.inOut',
                onComplete: () => {
                    loader.style.display = 'none';
                    animateHero();
                }
            });
        }
    }, 20);

    // Hero Animation
    function animateHero() {
        const tl = gsap.timeline();

        tl.from('.rayo-hero-image', {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        })
        .from('.mxd-hero-greeting', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=1')
        .from('.mxd-hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5')
        .from('.mxd-hero-meta > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5');

        // Floating Decorations Animation
        gsap.to('.hero-decor1, .hero-decor2, .hero-decor3', {
            y: 'random(-20, 20)',
            x: 'random(-10, 10)',
            rotation: 'random(-5, 5)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                amount: 1,
                from: "random"
            }
        });

        // Mouse Move Effect (mxd-move)
        const moveElements = document.querySelectorAll('.mxd-move');
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            moveElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const elCenterX = rect.left + rect.width / 2;
                const elCenterY = rect.top + rect.height / 2;
                
                // Move amount relative to distance from mouse
                const moveX = (mouseX - elCenterX) * 0.05;
                const moveY = (mouseY - elCenterY) * 0.05;
                
                gsap.to(el, {
                    x: moveX,
                    y: moveY,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Marquee-like Tag Animation
        gsap.to('.mxd-hero-tags .tag-row', {
            x: -300,
            scrollTrigger: {
                trigger: '.mxd-hero-tags',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // Scroll Animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.querySelectorAll('.container > *'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Marquee Continuous Scroll
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        // Clone for seamless loop
        marquee.innerHTML += marquee.innerHTML + marquee.innerHTML;
        
        gsap.to(marquee, {
            x: "-33.33%",
            repeat: -1,
            duration: 30,
            ease: 'none'
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: target,
                    duration: 1,
                    ease: 'power4.out'
                });
            }
        });
    });
});