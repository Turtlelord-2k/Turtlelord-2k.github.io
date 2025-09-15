// Portfolio Website JavaScript
// Bhushan Ravikumar - Robotics & Medical Device Engineer

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('loading-hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing animation for hero section
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = [
        'Medical Systems Engineer',
        'IoT Healthcare Specialist',
        'Contrast Delivery Expert',
        'Ambient Intelligence Developer',
        'V&V Testing Professional'
    ];
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation after loading screen
    setTimeout(() => {
        if (textArray.length) setTimeout(type, newTextDelay + 250);
    }, 2500);

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isFloat = target % 1 !== 0;
        
        function updateCounter() {
            start += increment;
            if (start >= target) {
                element.textContent = isFloat ? target.toFixed(1) : Math.ceil(target);
            } else {
                element.textContent = isFloat ? start.toFixed(1) : Math.ceil(start);
                requestAnimationFrame(updateCounter);
            }
        }
        updateCounter();
    }

    // Intersection Observer for counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // Floating particles animation
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--medical-green)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: floatUp ${Math.random() * 10 + 8}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${Math.random() * 0.7 + 0.3};
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add floating particles CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    createFloatingParticles();

    // Interactive medical system display
    const medicalDisplay = document.querySelector('.screen-display');
    
    if (medicalDisplay) {
        document.addEventListener('mousemove', (e) => {
            const system = document.querySelector('.system-monitor');
            if (system) {
                const rect = system.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
                const intensity = Math.min(1, distance / 200);
                
                // Update heartbeat speed based on mouse proximity
                const heartbeatTrace = document.querySelector('.heartbeat-trace::after');
                if (heartbeatTrace) {
                    const speed = 1.5 - (intensity * 0.5); // Faster when mouse is closer
                    medicalDisplay.style.setProperty('--heartbeat-speed', `${speed}s`);
                }
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline items stagger animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            const icon = method.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.color = 'var(--medical-green)';
        });
        
        method.addEventListener('mouseleave', () => {
            const icon = method.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.color = 'var(--text-accent)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Dynamic circuit pattern animation
    function animateCircuitPattern() {
        const circuitPattern = document.querySelector('.circuit-pattern');
        if (circuitPattern) {
            let angle = 0;
            setInterval(() => {
                angle += 0.5;
                circuitPattern.style.filter = `hue-rotate(${angle}deg)`;
            }, 100);
        }
    }
    animateCircuitPattern();

    // Contrast delivery system simulation
    function simulateContrastSystem() {
        const flowVisualization = document.querySelector('.flow-visualization');
        const pressureGauge = document.querySelector('.gauge-needle');
        
        if (flowVisualization) {
            setInterval(() => {
                flowVisualization.style.animation = 'none';
                setTimeout(() => {
                    flowVisualization.style.animation = 'contrastFlow 2s infinite';
                }, 50);
            }, 4000);
        }
        
        if (pressureGauge) {
            setInterval(() => {
                const randomRotation = 30 + Math.random() * 60; // Random between 30-90 degrees
                pressureGauge.style.transform = `translate(-50%, -100%) rotate(${randomRotation}deg)`;
            }, 2000);
        }
    }
    simulateContrastSystem();

    // Control buttons and IoT indicators simulation
    function animateControlSystems() {
        const controlButtons = document.querySelectorAll('.control-button:not(.active)');
        const injectionStatus = document.querySelectorAll('.injection-status:not(.active)');
        
        setInterval(() => {
            controlButtons.forEach(button => {
                if (Math.random() > 0.7) {
                    button.classList.add('active');
                    setTimeout(() => {
                        button.classList.remove('active');
                    }, 800);
                }
            });
            
            injectionStatus.forEach(status => {
                if (Math.random() > 0.8) {
                    status.classList.add('active');
                    setTimeout(() => {
                        status.classList.remove('active');
                    }, 1200);
                }
            });
        }, 2500);
    }
    animateControlSystems();

    // Glitch effect on hover for name
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.style.animation = 'glitchText 0.3s infinite';
        });
        
        glitchText.addEventListener('mouseleave', () => {
            glitchText.style.animation = 'glitchText 3s infinite';
        });
    }

    // Skill category icons rotation on hover
    const skillIcons = document.querySelectorAll('.skill-header i');
    skillIcons.forEach(icon => {
        const parent = icon.closest('.skill-category');
        parent.addEventListener('mouseenter', () => {
            icon.style.animation = 'skillIconRotate 1s linear infinite';
        });
        
        parent.addEventListener('mouseleave', () => {
            icon.style.animation = 'skillIconRotate 4s linear infinite';
        });
    });

    // Communication hub data flow animation
    function animateDataFlow() {
        const nodes = document.querySelectorAll('.node');
        const hubCenter = document.querySelector('.hub-center');
        
        if (nodes.length && hubCenter) {
            setInterval(() => {
                nodes.forEach((node, index) => {
                    setTimeout(() => {
                        // Create data packet
                        const dataPacket = document.createElement('div');
                        dataPacket.style.cssText = `
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            background: var(--medical-green);
                            border-radius: 50%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            box-shadow: 0 0 10px var(--medical-green);
                            z-index: 5;
                        `;
                        
                        node.appendChild(dataPacket);
                        
                        // Animate to center
                        dataPacket.animate([
                            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
                        ], {
                            duration: 1000,
                            easing: 'ease-out'
                        }).onfinish = () => {
                            dataPacket.remove();
                        };
                    }, index * 200);
                });
            }, 4000);
        }
    }
    animateDataFlow();

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Create special effect
        const body = document.body;
        body.style.animation = 'rainbow 2s infinite';
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = '🤖 SYSTEM OVERRIDE ACTIVATED! 🤖';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: var(--text-primary);
            padding: 2rem;
            border-radius: 15px;
            font-family: var(--font-primary);
            font-size: 1.5rem;
            z-index: 10000;
            box-shadow: var(--shadow-glow);
            animation: pulse 1s infinite;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            body.style.animation = '';
            message.remove();
            rainbowStyle.remove();
        }, 5000);
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(() => {
        // Scroll-based animations here
    }, 16));

    // Accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: var(--text-primary);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        
        // Disable complex animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Console message for developers
    console.log(`
    🏥 Welcome to Bhushan Ravikumar's Medical Technology Portfolio! 🏥
    
    Built with:
    - HTML5 & CSS3 (Medical Device Themed)
    - Vanilla JavaScript
    - AOS (Animate On Scroll)
    - Font Awesome Medical Icons
    - Google Fonts
    
    Features:
    - Medical System Animations
    - IoT Sensor Visualizations
    - Contrast Delivery Simulations
    - Responsive Design
    - Accessibility Features
    - Performance Optimized
    - Easter Egg (Try the Konami Code!)
    
    Specializing in:
    - Medical Device Systems Engineering
    - IoT Healthcare Solutions  
    - Ambient Intelligence Technology
    - V&V Testing & Validation
    
    Contact: ravik039@umn.edu
    GitHub: github.com/Turtlelord-2k
    `);

    // Initialize all animations after page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Service Worker for offline functionality (Progressive Web App features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
