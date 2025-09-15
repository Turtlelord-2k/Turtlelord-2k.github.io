// Portfolio Website JavaScript
// Author: Bhushan Ravikumar
// Theme: Robotics & Medical Device Engineering

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initSkillBars();
    initCounters();
    initContactForm();
    initScrollEffects();
    initParallax();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation and scroll effects
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card, .contact-item, .about-stats');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add staggered animation delays
    document.querySelectorAll('.about-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.animationDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Skill bars animation
function initSkillBars() {
    // This will be triggered by the intersection observer
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Counter animations
function initCounters() {
    // This will be triggered by the intersection observer
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;
            
            if (target % 1 === 0) {
                counter.textContent = Math.floor(current);
            } else {
                counter.textContent = current.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Create mailto link with form data
                const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
                const body = encodeURIComponent(
                    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
                );
                const mailtoLink = `mailto:ravik039@umn.edu?subject=${subject}&body=${body}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message prepared! Your email client should open shortly.', 'success');
            }, 1000);
        });
    }
}

// Scroll effects and parallax
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const robot = document.querySelector('.robot-body');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            // Parallax for robot
            if (robot) {
                robot.style.transform = `translateY(${rate * 0.3}px)`;
            }
            
            // Parallax for floating elements
            floatingElements.forEach((element, index) => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 1;
                const yPos = -(scrolled * speed * 0.1);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        }
    });
}

function initParallax() {
    // Additional parallax effects
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: #10b981;
                color: white;
            }
            
            .notification-error {
                background: #dc2626;
                color: white;
            }
            
            .notification-info {
                background: #2563eb;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Prevent flash of unstyled content
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization
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

// Throttle scroll events for better performance
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

// Enhanced robot animations
function initRobotAnimations() {
    const robot = document.querySelector('.robot-body');
    const eyes = document.querySelectorAll('.robot-eye');
    const buttons = document.querySelectorAll('.robot-button');
    
    if (robot) {
        // Mouse follow effect for robot eyes
        document.addEventListener('mousemove', throttle(function(e) {
            const robotRect = robot.getBoundingClientRect();
            const robotCenterX = robotRect.left + robotRect.width / 2;
            const robotCenterY = robotRect.top + robotRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = mouseX - robotCenterX;
            const deltaY = mouseY - robotCenterY;
            
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100);
            
            const eyeX = Math.cos(angle) * distance;
            const eyeY = Math.sin(angle) * distance;
            
            eyes.forEach(eye => {
                eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
            });
        }, 50));
        
        // Random button flashing
        setInterval(() => {
            const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
            if (randomButton) {
                randomButton.style.animation = 'none';
                randomButton.offsetHeight; // Trigger reflow
                randomButton.style.animation = 'buttonPulse 0.5s ease';
            }
        }, 3000);
    }
}

// Initialize robot animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initRobotAnimations, 1000);
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
        
        element.addEventListener('mousedown', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if not present
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
});

// Add print styles optimization
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements when printing
    const elementsToHide = document.querySelectorAll('.nav-toggle, .floating-elements, .scroll-indicator');
    elementsToHide.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const elementsToShow = document.querySelectorAll('.nav-toggle, .floating-elements, .scroll-indicator');
    elementsToShow.forEach(el => {
        el.style.display = '';
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Console welcome message
console.log(`
🤖 Welcome to Bhushan Ravikumar's Portfolio!
🔬 Robotics & Medical Device Engineer
📧 Contact: ravik039@umn.edu
🔗 LinkedIn: linkedin.com/in/bhushanrk
💻 GitHub: github.com/Turtlelord-2k

Built with ❤️ and lots of ☕
`);
