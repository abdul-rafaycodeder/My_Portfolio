// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main-wrapper'),
    smooth: true,
    multiplier: 0.8,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const target = link.getAttribute('href');

        scroll.scrollTo(target, {
            offset: -80, // navbar height
            duration: 800,
            easing: [0.25, 0.00, 0.35, 1.00]
        });
    });
});


// Update ScrollTrigger when Locomotive Scroll updates
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods for the "#main-wrapper" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('#main-wrapper', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('#main-wrapper').style.transform ? "transform" : "fixed"
});

// Initialize GSAP animations when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.to('.hero-desc', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.to('.hero-btns', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Section header animations
    gsap.utils.toArray('.section-header').forEach(section => {
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from(section.querySelector('.section-subtitle'), {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    });

    // About section animations
    gsap.utils.toArray('.about-text').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.about-stats').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                scroller: '#main-wrapper',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Contact section animations
    gsap.utils.toArray('.contact-info').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.contact-form').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                scroller: '#main-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate skill tags on hover
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Animate social links on hover
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Animate stat numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            let current = 0;
            const increment = target / 50; // Adjust speed

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    stat.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCount, 30);
                }
            };

            // Start animation when section is in view
            ScrollTrigger.create({
                trigger: stat.closest('.about-section'),
                scroller: '#main-wrapper',
                start: 'top 70%',
                onEnter: updateCount,
                once: true
            });
        });
    }

    // Call stat animation function
    animateStats();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

        if (navLinks.style.display === 'flex') {
            gsap.from('.nav-links li', {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out'
            });

            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';

            navLinks.querySelectorAll('li').forEach(li => {
                li.style.margin = '10px 0';
            });
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Refresh ScrollTrigger when page loads
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});