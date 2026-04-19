// ============ HAMBURGER MENU TOGGLE ============
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            if (navMenu && hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============ CONTACT FORM HANDLING ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            showFormMessage('Please fill all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic - accepts 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            showFormMessage('Please enter a valid phone number', 'error');
            return;
        }

        // Simulate form submission (in real scenario, this would send to server)
        console.log('Form submitted:', formData);

        // Show success message
        showFormMessage('Thank you for your message! We will contact you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Optional: Actually send to server using fetch
        // sendFormToServer(formData);
    });
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Optional: Send form data to server
// function sendFormToServer(formData) {
//     fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             showFormMessage('Message sent successfully!', 'success');
//         } else {
//             showFormMessage('Error sending message. Please try again.', 'error');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         showFormMessage('Error sending message. Please try again.', 'error');
//     });
// }

// ============ ACTIVE NAV LINK HIGHLIGHTING ============
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Match current page
        if (currentPage.includes(href) || 
            (currentPage.endsWith('/') && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
window.addEventListener('load', setActiveNavLink);

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.about-card, .program-card, .stat-card, .value-card, ' +
        '.facility-item, .recruiter-card, .support-item, ' +
        '.story-card, .contact-info-card, .faq-item'
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// ============ SMOOTH PAGE TRANSITIONS ============
function addPageTransition() {
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Check if it's an internal link
            if (!href.includes('http') && !href.startsWith('#')) {
                // Optional: Add page transition effect
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.3s ease';
            }
        });
    });
}

window.addEventListener('pageshow', function() {
    document.body.style.opacity = '1';
});

addPageTransition();

// ============ MOBILE RESPONSIVE ADJUSTMENTS ============
function adjustForMobile() {
    if (window.innerWidth <= 768) {
        // Adjust navbar for mobile
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.style.padding = '1rem';
        }
    }
}

window.addEventListener('resize', adjustForMobile);
window.addEventListener('load', adjustForMobile);

// ============ ACCESSIBILITY IMPROVEMENTS ============
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    z-index: 100;
`;

skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});

skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

// Keyboard navigation for menu
const navMenu = document.getElementById('navMenu');
if (navMenu) {
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight' && index < navItems.length - 1) {
                    navItems[index + 1].querySelector('.nav-link').focus();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    navItems[index - 1].querySelector('.nav-link').focus();
                }
            });
        }
    });
}

// ============ UTILITY FUNCTIONS ============
// Debounce function for resize events
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('Sharada Pvt ITI College - Website loaded successfully!');
