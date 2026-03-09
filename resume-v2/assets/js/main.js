gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.querySelector('.preloader');
    const percentEl = document.querySelector('.percent');
    
    let progress = { value: 0 };
    
    const preloaderTimeline = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    initAnimations();
                }
            });
        }
    });

    preloaderTimeline.to(progress, {
        value: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate: () => {
            percentEl.textContent = `${Math.floor(progress.value)}%`;
        }
    });

    function initAnimations() {
        // Hero Content Animation
        gsap.from('.hero h1', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2
        });

        gsap.from('.hero p', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });

        gsap.from('.hero-action', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.7
        });

        // Section Title Animations
        document.querySelectorAll('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Portfolio Item Animations
        document.querySelectorAll('.portfolio-item').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                },
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        // Smooth Scrolling for Nav Links
        document.querySelectorAll('header nav a, .hero-action a, footer a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        gsap.to(window, {
                            duration: 1.5,
                            scrollTo: {
                                y: target,
                                offsetY: 80
                            },
                            ease: "power4.inOut"
                        });
                    }
                }
            });
        });
    }

    // Interactive Hover on Logo (Tilt Effect)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = logo.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            gsap.to(logo, {
                rotateY: x * 20,
                rotateX: -y * 20,
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }
});