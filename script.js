// ===================================
// FORJE PRIME - JavaScript
// Forjado na Excelência
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // SPARKS ANIMATION
    // ===================================
    function createSparks() {
        const container = document.getElementById('sparks');
        const sparkCount = 15;

        for (let i = 0; i < sparkCount; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'spark';
                spark.style.left = Math.random() * 100 + '%';
                spark.style.animationDuration = (Math.random() * 3 + 2) + 's';
                spark.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(spark);

                setTimeout(() => {
                    spark.remove();
                }, 5000);
            }, i * 300);
        }
    }

    // Recriar faíscas periodicamente
    createSparks();
    setInterval(createSparks, 8000);

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // MOBILE MENU
    // ===================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + suffix;
        }, 30);
    }

    // Intersection Observer para counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ===================================
    // RESULT COUNTERS
    // ===================================
    const resultCounters = document.querySelectorAll('.counter');
    const resultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current.toFixed(1);
                }, 30);

                resultObserver.unobserve(counter);
            }
        });
    });

    resultCounters.forEach(counter => {
        resultObserver.observe(counter);
    });

    // ===================================
    // SCROLL REVEAL ANIMATION
    // ===================================
    const revealElements = document.querySelectorAll(
        '.solution-card, .service-card, .process-step, .team-card, .result-card, .pain-item, .niche-item, .testimonial-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ===================================
    // WHATSAPP FLOAT BUTTON VISIBILITY
    // ===================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 500) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }

        lastScrollTop = scrollTop;
    });

    // Inicialmente escondido
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.visibility = 'hidden';
    whatsappFloat.style.transition = 'opacity 0.3s, visibility 0.3s, transform 0.3s';

    // ===================================
    // PARALLAX EFFECT (desktop only)
    // ===================================
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-bg img, .cta-bg img');

            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ===================================
    // HOVER EFFECTS ENHANCEMENT
    // ===================================
    const cards = document.querySelectorAll('.solution-card, .service-card, .result-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ===================================
    // LOADING ANIMATION
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===================================
    // CARROSSEL MOBILE - SEÇÃO NICHOS
    // ===================================
    (function initNichesCarousel() {
        const track = document.getElementById('nichesTrack');
        const dotsContainer = document.getElementById('nichesDots');
        if (!track || !dotsContainer) return;

        const items = track.querySelectorAll('.niche-item');
        if (items.length === 0) return;

        let currentIndex = 0;
        let autoScrollInterval;
        let isInteracting = false;
        let resumeTimeout;
        const isMobile = () => window.innerWidth <= 768;

        // Cria os dots dinamicamente
        function createDots() {
            dotsContainer.innerHTML = '';
            items.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    pauseAutoScroll();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            if (!isMobile()) return;
            currentIndex = index;
            const itemWidth = items[0].offsetWidth + 16; // largura + gap
            track.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
            updateDots();
        }

        function nextSlide() {
            if (!isMobile()) return;
            currentIndex = (currentIndex + 1) % items.length;
            goToSlide(currentIndex);
        }

        function startAutoScroll() {
            if (!isMobile()) return;
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => {
                if (!isInteracting) {
                    nextSlide();
                }
            }, 3000);
        }

        function pauseAutoScroll() {
            isInteracting = true;
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                isInteracting = false;
            }, 5000);
        }

        // Detecta scroll manual e atualiza o índice atual
        track.addEventListener('scroll', () => {
            if (!isMobile()) return;
            const itemWidth = items[0].offsetWidth + 16;
            const newIndex = Math.round(track.scrollLeft / itemWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
                currentIndex = newIndex;
                updateDots();
            }
        });

        // Eventos de touch para pausar auto-scroll
        track.addEventListener('touchstart', pauseAutoScroll, { passive: true });
        track.addEventListener('touchmove', pauseAutoScroll, { passive: true });
        track.addEventListener('touchend', () => {
            pauseAutoScroll();
        }, { passive: true });

        // Eventos de mouse para desktop (caso a janela seja redimensionada)
        track.addEventListener('mousedown', pauseAutoScroll);
        track.addEventListener('mouseenter', pauseAutoScroll);

        // Inicializa
        createDots();
        startAutoScroll();

        // Reinicia ao redimensionar
        window.addEventListener('resize', () => {
            if (isMobile()) {
                createDots();
                updateDots();
                startAutoScroll();
            } else {
                clearInterval(autoScrollInterval);
                dotsContainer.innerHTML = '';
                track.scrollTo({ left: 0, behavior: 'auto' });
            }
        });
    })();

    // ===================================
    // CONSOLE BRANDING
    // ===================================
    console.log('%c🔥 FORJE PRIME 🔥', 'font-size: 24px; font-weight: bold; color: #C9A961;');
    console.log('%cForjado na Excelência | Impérios em Ascensão', 'font-size: 14px; color: #D4662C;');
    console.log('%cContato: (22) 98823-1811', 'font-size: 12px; color: #888;');
});