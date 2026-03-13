document.addEventListener('DOMContentLoaded', () => {
    // GSAP 등록
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 로더 애니메이션
    const loadLayer = document.querySelector('.load');
    const pNum = document.querySelector('.p-num');
    let count = 0;

    const timer = setInterval(() => {
        count++;
        pNum.textContent = count + '%';
        if (count >= 100) {
            clearInterval(timer);
            gsap.to(loadLayer, {
                y: '-100%',
                duration: 1,
                ease: 'expo.inOut',
                onComplete: () => {
                    loadLayer.style.display = 'none';
                    animateHero();
                }
            });
        }
    }, 20);

    // 히어로 애니메이션
    function animateHero() {
        const tl = gsap.timeline();

        tl.from('.h-img', {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        })
        .from('.greet', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=1')
        .from('.h-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5')
        .from('.h-meta > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5');

        // 떠다니는 아이콘 애니메이션 (부드럽게 움직이는 효과)
        gsap.to('.icon1', {
            y: 30, // 위아래로 30픽셀 이동
            duration: 3, // 3초 동안 실행
            repeat: -1, // 무한 반복
            yoyo: true, // 갔다가 다시 돌아옴
            ease: 'sine.inOut' // 부드럽게 가속/감속
        });

        // 마우스 이동 효과 (move)
        const moveItem = document.querySelector('.move');
        window.addEventListener('mousemove', (e) => {
            if (!moveItem) return;
            const x = (e.clientX - window.innerWidth / 2) * 0.05;
            const y = (e.clientY - window.innerHeight / 2) * 0.05;
            
            gsap.to(moveItem, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // 태그 흐르기 애니메이션
        gsap.to('.tag-row', {
            x: -300,
            scrollTrigger: {
                trigger: '.h-tags',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // 스킬 섹션 애니메이션
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        const radius = 45;
        const circumference = 2 * Math.PI * radius; // 약 282.74

        skillItems.forEach(item => {
            const percent = parseInt(item.getAttribute('data-percent'));
            const bar = item.querySelector('.progress-bar');
            const counter = item.querySelector('.counter');
            
            // 초기 설정
            bar.style.strokeDasharray = circumference;
            bar.style.strokeDashoffset = circumference;

            // 스크롤 트리거 애니메이션
            ScrollTrigger.create({
                trigger: item,
                start: 'top 85%',
                onEnter: () => {
                    // 원형 바 애니메이션
                    gsap.to(bar, {
                        strokeDashoffset: circumference - (circumference * percent / 100),
                        duration: 2,
                        ease: 'power4.out'
                    });

                    // 숫자 카운트업 애니메이션
                    let count = { val: 0 };
                    gsap.to(count, {
                        val: percent,
                        duration: 2,
                        ease: 'power4.out',
                        onUpdate: () => {
                            counter.textContent = Math.floor(count.val);
                        }
                    });
                }
            });
        });
    }

    // 섹션 스크롤 등장 애니메이션
    gsap.utils.toArray('section').forEach(sec => {
        // 스킬 섹션은 별도 애니메이션 처리하므로 제외
        if (sec.classList.contains('tj-progress-section')) return;

        gsap.from(sec.querySelectorAll('.wrap > *'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: sec,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // 마키(흐르는 텍스트) 애니메이션
    const mqTxt = document.querySelector('.mq-txt');
    if (mqTxt) {
        mqTxt.innerHTML += mqTxt.innerHTML + mqTxt.innerHTML;
        gsap.to(mqTxt, {
            x: "-33.33%",
            repeat: -1,
            duration: 30,
            ease: 'none'
        });
    }

    // [NEW] 헤더 및 메뉴 제어 로직
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('m-btn');
    const body = document.body;

    // 스크롤 시 헤더 고정 효과
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-fixed');
        } else {
            header.classList.remove('header-fixed');
        }
    });

    // 오버레이 메뉴 토글
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }

    // 메뉴 링크 클릭 시 부드러운 스크롤 및 메뉴 닫기
    document.querySelectorAll('#ol-nav a, a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.startsWith('http')) return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            // 메뉴 닫기
            body.classList.remove('nav-open');

            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    duration: 1.5,
                    ease: 'expo.out'
                });
            }
        });
    });

    // 스킬 애니메이션 초기화 호출
    animateSkills();

    // 작품 슬라이더 애니메이션
    function initWorksSlider() {
        const wrapper = document.querySelector('.works-wrapper');
        const container = document.querySelector('.works-slider-container');
        if (!wrapper || !container) return;

        // 이동할 거리 계산 (전체 가로 길이 - 컨테이너 너비)
        const scrollAmount = wrapper.scrollWidth - container.offsetWidth;

        if (scrollAmount > 0) {
            gsap.to(wrapper, {
                x: -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: ".works-slider-container",
                    start: "top 20%",
                    end: () => `+=${scrollAmount}`,
                    pin: true, // 슬라이드 동안 섹션 고정
                    scrub: 1, // 스크롤에 맞춰 부드럽게 이동
                    invalidateOnRefresh: true
                }
            });
        }
    }

    initWorksSlider();
});