// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initHeroAnimations();
    initProgressBars();
    initCounterAnimations();
    initParallaxEffects();
    initButtonAnimations();
    initMockupAnimations();
});

// Enhanced Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect with enhanced styling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    });

    // Mobile menu toggle with animation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Enhanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('pricing-card')) {
                    animatePricingCard(entry.target);
                } else if (entry.target.classList.contains('step-card')) {
                    animateStepCard(entry.target);
                } else if (entry.target.classList.contains('testimonial-card')) {
                    animateTestimonialCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(`
        .pricing-card, 
        .step-card, 
        .testimonial-card, 
        .feature-large,
        .trust-section,
        .cta-section
    `);
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Enhanced hero animations
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const heroStats = document.querySelector('.hero-stats');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    // Staggered animation for hero elements
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroVisual) {
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 400);
    }

    // Animate hero buttons with delay
    heroButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });

    // Set initial states
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
        heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    heroButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Progress bar animations
function initProgressBars() {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.analytics-card').forEach(card => {
        progressObserver.observe(card);
    });
}

// Enhanced counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
    if (isNaN(target)) return;
    
    const suffix = element.textContent.replace(/[0-9.]/g, '');
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second at 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Parallax effects for hero section
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const dashboardMockup = document.querySelector('.dashboard-mockup');
        
        if (heroSection && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        if (dashboardMockup && scrolled < window.innerHeight) {
            const rate = scrolled * 0.2;
            dashboardMockup.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Enhanced button animations
function initButtonAnimations() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            // Ripple effect
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Button press animation
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // Handle button actions
            handleButtonActions(button);
        }
    });
    
    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function handleButtonActions(button) {
    const text = button.textContent.toLowerCase();
    
    if (text.includes('start free trial') || text.includes('get started')) {
        scrollToSection('pricing');
    } else if (text.includes('watch demo') || text.includes('schedule demo')) {
        scrollToSection('features');
    } else if (text.includes('contact sales')) {
        // Could trigger a contact modal
        console.log('Contact sales clicked');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 72;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mockup animations
function initMockupAnimations() {
    // Animate chart bars
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach((bar, index) => {
        bar.style.animationDelay = `${0.5 + (index * 0.1)}s`;
    });

    // Animate tabs interaction
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        tab.addEventListener('mouseenter', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Floating animation for mockups
    const mockups = document.querySelectorAll('.dashboard-mockup, .feature-mockup');
    mockups.forEach(mockup => {
        mockup.addEventListener('mouseenter', () => {
            mockup.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        mockup.addEventListener('mouseleave', () => {
            mockup.style.transform = '';
        });
    });
}

// Specific animation functions for different card types
function animatePricingCard(card) {
    const features = card.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Set initial state for features
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        feature.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

function animateStepCard(card) {
    const stepNumber = card.querySelector('.step-number');
    const stepContent = card.querySelector('.step-content');
    
    if (stepNumber) {
        stepNumber.style.transform = 'scale(1.1)';
        setTimeout(() => {
            stepNumber.style.transform = 'scale(1)';
        }, 300);
    }
    
    if (stepContent) {
        stepContent.style.opacity = '1';
        stepContent.style.transform = 'translateY(0)';
    }
}

function animateTestimonialCard(card) {
    const content = card.querySelector('.testimonial-content');
    const author = card.querySelector('.testimonial-author');
    
    if (content) {
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (author) {
        setTimeout(() => {
            author.style.opacity = '1';
            author.style.transform = 'translateX(0)';
        }, 400);
    }
}

// Enhanced hover effects
document.addEventListener('mouseover', function(e) {
    // Pricing card hover effect
    if (e.target.closest('.pricing-card')) {
        const card = e.target.closest('.pricing-card');
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        }
    }
    
    // Feature card hover effect
    if (e.target.closest('.feature-large')) {
        const icon = e.target.closest('.feature-large').querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    // Reset pricing card
    if (e.target.closest('.pricing-card')) {
        const card = e.target.closest('.pricing-card');
        if (!card.classList.contains('featured')) {
            card.style.transform = '';
        }
    }
    
    // Reset feature icon
    if (e.target.closest('.feature-large')) {
        const icon = e.target.closest('.feature-large').querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = '';
        }
    }
});

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.8';
    document.body.style.transform = 'scale(0.98)';
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Loading states for interactive elements
function addLoadingState(element) {
    element.classList.add('loading');
    setTimeout(() => {
        element.classList.remove('loading');
    }, 1500);
}

// Initialize loading animations on page load
window.addEventListener('load', function() {
    const loadingElements = document.querySelectorAll('.dashboard-mockup, .feature-mockup');
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            addLoadingState(element);
        }, index * 200);
    });
});