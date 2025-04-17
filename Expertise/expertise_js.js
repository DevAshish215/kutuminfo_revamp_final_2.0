/**
 * Main initialization function called when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded in expertise_js.js");
    
    // Load components
    loadComponents();
    
    // Set up reveal animations
    setupIntersectionObserver();
    
    // Create particles for hero section
    createParticles();
});

/**
 * Helper function to determine the base path
 */
function getBasePath() {
    const currentPath = window.location.pathname;
    console.log("getBasePath called, current path:", currentPath);
    
    let basePath = '';
    if (currentPath.includes('/Services/') || 
        currentPath.includes('/Expertise/') || 
        currentPath.includes('/Products/')) {
        basePath = '../';
    }
    
    console.log("Returning base path:", basePath);
    return basePath;
}

/**
 * Loads navbar and footer components via fetch
 */
function loadComponents() {
    console.log("Loading components...");
    
    // Load navbar and footer components
    fetch('../navbar.html')
        .then(response => response.text())
        .then(data => {
            console.log("Navbar loaded successfully");
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Initialize navbar after it's loaded
            initNavbar();
            
            // Fix the logo path
            const logo = document.getElementById('navbar-logo');
            if (logo) {
                logo.src = "../images/logo kutumbinfo13.png";
                console.log("Logo path updated");
            }
            
            // Directly fix expertise links after navbar is loaded
            fixExpertiseLinks();
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            console.log("Footer loaded successfully");
            document.getElementById('footer-placeholder').innerHTML = data;
            
            // Fix footer logo path
            setTimeout(function() {
                const footerLogo = document.querySelector('.footer-logo img');
                if (footerLogo) {
                    footerLogo.src = "../images/logo kutumbinfo13.png";
                    console.log("Footer logo path updated");
                }
            }, 300);
        })
        .catch(error => console.error('Error loading footer:', error));
}

/**
 * Fix expertise links directly with hardcoded paths
 */
function fixExpertiseLinks() {
    console.log("Fixing expertise links...");
    
    // Get all expertise dropdown boxes
    const expertiseBoxes = document.querySelectorAll('.navbar .dropdown:nth-child(3) .dropdown-box');
    console.log("Found expertise boxes:", expertiseBoxes.length);
    
    if (expertiseBoxes.length > 0) {
        // Update the click handlers with direct paths
        const expertisePages = [
            'angular.html', 'react.html', 'vuejs.html', 'wordpress.html',
            'flutter.html', 'java.html', 'nodejs.html', 'php.html'
        ];
        
        // Try to use existing functions if available, or define new ones
        // Define local fallback functions first
        const localGoToFunctions = {
            goToAngular: function() {
                console.log("Using local goToAngular");
                window.location.href = '../Expertise/angular.html';
            },
            goToReact: function() {
                console.log("Using local goToReact");
                window.location.href = '../Expertise/react.html';
            },
            goToVuejs: function() {
                console.log("Using local goToVuejs");
                window.location.href = '../Expertise/vuejs.html';
            },
            goToWordpress: function() {
                console.log("Using local goToWordpress");
                window.location.href = '../Expertise/wordpress.html';
            },
            goToFlutter: function() {
                console.log("Using local goToFlutter");
                window.location.href = '../Expertise/flutter.html';
            },
            goToJava: function() {
                console.log("Using local goToJava");
                window.location.href = '../Expertise/java.html';
            },
            goToNodejs: function() {
                console.log("Using local goToNodejs");
                window.location.href = '../Expertise/nodejs.html';
            },
            goToPhp: function() {
                console.log("Using local goToPhp");
                window.location.href = '../Expertise/php.html';
            }
        };
        
        // Assign global versions to window if they don't exist
        if (typeof window.goToAngular !== 'function') window.goToAngular = localGoToFunctions.goToAngular;
        if (typeof window.goToReact !== 'function') window.goToReact = localGoToFunctions.goToReact;
        if (typeof window.goToVuejs !== 'function') window.goToVuejs = localGoToFunctions.goToVuejs;
        if (typeof window.goToWordpress !== 'function') window.goToWordpress = localGoToFunctions.goToWordpress;
        if (typeof window.goToFlutter !== 'function') window.goToFlutter = localGoToFunctions.goToFlutter;
        if (typeof window.goToJava !== 'function') window.goToJava = localGoToFunctions.goToJava;
        if (typeof window.goToNodejs !== 'function') window.goToNodejs = localGoToFunctions.goToNodejs;
        if (typeof window.goToPhp !== 'function') window.goToPhp = localGoToFunctions.goToPhp;
        
        console.log("Navigation functions ensured in global scope");
    }
}

/**
 * Initializes navbar functionality after it's loaded
 */
function initNavbar() {
    console.log("Initializing navbar...");
    
    // Initialize navbar functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('show');
            menuToggle.classList.toggle('open');
        });
        console.log("Menu toggle initialized");
    }
    
    // Initialize dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    console.log("Dropdowns initialized");
    
    // Make getBasePath available to navbar elements
    window.getBasePath = getBasePath;
    console.log("getBasePath function made global");
    
    // Set navbar logo click handler
    const navbarLogo = document.querySelector('.navbar .logo img');
    if (navbarLogo) {
        navbarLogo.addEventListener('click', function() {
            console.log("Logo clicked, navigating to index");
            window.location.href = "../index.html";
        });
        console.log("Logo click handler set");
    }
}

/**
 * Sets up intersection observers for reveal animations
 */
function setupIntersectionObserver() {
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay based on the item's index in its parent
                const items = Array.from(entry.target.parentElement.children);
                const index = items.indexOf(entry.target);
                entry.target.style.setProperty('--item-index', index);
                
                // Add active class after a small delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
                
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    revealItems.forEach(item => {
        itemObserver.observe(item);
    });
}

/**
 * Creates floating particle effects in the hero section
 */
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