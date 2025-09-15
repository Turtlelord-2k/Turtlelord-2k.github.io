// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// DOM Elements
const navbar = $('.navbar');
const hamburger = $('.hamburger');
const navMenu = $('.nav-menu');
const navLinks = $$('.nav-link');
const heroTitle = $('.hero-title');
const typingText = $('.typing-text');

// Loading Screen
window.addEventListener('load', () => {
    const loading = $('.loading');
    if (loading) {
        setTimeout(() => {
<<<<<<< HEAD
            loading.classList.add('fade-out');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    }
=======
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
        'Systems Engineer',
        'Robotics Specialist',
        'Medical Device Expert',
        'Innovation Pioneer',
        'Technology Enthusiast'
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

    // Interactive robot eyes
    const leftEye = document.querySelector('.left-eye');
    const rightEye = document.querySelector('.right-eye');
    
    if (leftEye && rightEye) {
        document.addEventListener('mousemove', (e) => {
            const robot = document.querySelector('.robot-head');
            if (robot) {
                const rect = robot.getBoundingClientRect();
                const robotCenterX = rect.left + rect.width / 2;
                const robotCenterY = rect.top + rect.height / 2;
                
                const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
                const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - robotCenterX, 2) + Math.pow(e.clientY - robotCenterY, 2)) / 50);
                
                const eyeX = Math.cos(angle) * distance;
                const eyeY = Math.sin(angle) * distance;
                
                leftEye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
                rightEye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
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

    // Medical device heartbeat simulation
    function simulateHeartbeat() {
        const heartbeatLine = document.querySelector('.heartbeat-line');
        if (heartbeatLine) {
            setInterval(() => {
                heartbeatLine.style.animation = 'none';
                setTimeout(() => {
                    heartbeatLine.style.animation = 'heartbeatPulse 1.5s infinite';
                }, 50);
            }, 3000);
        }
    }
    simulateHeartbeat();

    // LED indicators random blinking
    function animateLEDs() {
        const leds = document.querySelectorAll('.led-indicator:not(.active)');
        setInterval(() => {
            leds.forEach(led => {
                if (Math.random() > 0.7) {
                    led.classList.add('active');
                    setTimeout(() => {
                        led.classList.remove('active');
                    }, 500);
                }
            });
        }, 2000);
    }
    animateLEDs();

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
    🤖 Welcome to Bhushan Ravikumar's Portfolio! 🤖
    
    Built with:
    - HTML5 & CSS3
    - Vanilla JavaScript
    - AOS (Animate On Scroll)
    - Font Awesome Icons
    - Google Fonts
    
    Features:
    - Responsive Design
    - Accessibility Features
    - Performance Optimized
    - Interactive Animations
    - Easter Egg (Try the Konami Code!)
    
    Contact: ravik039@umn.edu
    GitHub: github.com/Turtlelord-2k
    `);

    // Initialize all animations after page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
>>>>>>> parent of 225ac09 (Changed theme to medtach)
});

// Scroll Progress Bar
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    return progressBar;
};

const scrollProgress = createScrollProgress();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Navbar background change
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress
    const winHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled_percentage = (scrolled / winHeight) * 100;
    scrollProgress.style.width = scrolled_percentage + '%';
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const bars = $$('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = $$('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = $(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Particles Animation
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles
const particlesCanvas = $('#particles');
if (particlesCanvas) {
    new ParticleSystem(particlesCanvas);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('skill-progress')) {
                animateSkillBar(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = $$('.timeline-item, .project-card, .skill-category, .stat-item, .contact-item');
animatedElements.forEach(el => {
    el.classList.add('invisible');
    observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target < 10) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Skill Bar Animation
function animateSkillBar(element) {
    const width = element.getAttribute('data-width');
    element.style.width = width;
}

// Initialize skill bar animations
const skillBars = $$('.skill-progress');
skillBars.forEach(bar => {
    observer.observe(bar);
});

// Initialize counter animations
const counters = $$('.stat-number');
counters.forEach(counter => {
    observer.observe(counter);
});

// Typing Animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when hero section is visible
if (typingText) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = "Hi, I'm Bhushan Ravikumar";
                typeWriter(typingText, text, 100);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe($('.hero'));
}

// Contact Form Handling
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = $('.hero');
    const heroContent = $('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth reveal animation for sections
const revealElements = $$('section');
revealElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(section => {
    revealObserver.observe(section);
});

// Add floating animation to project cards
const projectCards = $$('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Add hover effects to timeline items
const timelineItems = $$('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-dot').style.transform = 'scale(1.5)';
        item.querySelector('.timeline-content').style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-dot').style.transform = 'scale(1)';
        item.querySelector('.timeline-content').style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
const buttons = $$('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add loading animation to images
    const images = $$('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// Add cursor trail effect
let mouseTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    updateTrail();
});

function updateTrail() {
    const existingTrails = $$('.mouse-trail');
    existingTrails.forEach(trail => trail.remove());
    
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, ${0.5 - index * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${point.x}px;
            top: ${point.y}px;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.style.opacity = '0';
                setTimeout(() => trail.remove(), 200);
            }
        }, 100);
    });
}
