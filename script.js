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
        gsap.from('.hero-content h1', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from('.hero-image-wrapper', {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        });

        // Marquee-like Tag Animation
        gsap.to('.tag-row', {
            x: -200,
            scrollTrigger: {
                trigger: '.hero-tags',
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