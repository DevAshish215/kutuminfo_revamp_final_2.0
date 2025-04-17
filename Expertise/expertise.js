// ============================
// Fetch and Insert Navbar
// ============================
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('../navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // After the navbar is loaded, attach event handlers to it
            initializeNavbarHandlers();
        });
    
    // Load footer
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
        
    // Initialize scroll animations after a short delay to ensure all elements are loaded
    setTimeout(initializeScrollAnimations, 500);
    
    // Create particles for hero section
    createParticles();
});

// Initialize navbar event handlers
function initializeNavbarHandlers() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }
}

// Initialize scroll reveal animations
function initializeScrollAnimations() {
    // Get all elements that need to be revealed on scroll
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // Create an Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer for items
    const itemObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply observers to elements
    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    revealItems.forEach(item => {
        itemObserver.observe(item);
    });
}

// Add particles to hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesContainer = document.querySelector('.particles-container');
    if (!heroSection || !particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 4 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.cssText = `
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation: floatParticle ${duration}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
} 