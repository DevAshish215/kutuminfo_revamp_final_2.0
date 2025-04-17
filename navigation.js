/**
 * Navigation helper functions
 * This file contains helper functions for navigation that will be used across all pages
 */

// Check for contact form navigation on page load
(function() {
    // This runs immediately when the script loads
    if (window.location.pathname.includes('/work_with_us.html') || 
        window.location.pathname.endsWith('/work_with_us.html')) {
        
        // Check if we should scroll to contact form (set by other pages)
        if (sessionStorage.getItem('scrollToContactForm') === 'true') {
            // Clear the flag
            sessionStorage.removeItem('scrollToContactForm');
            
            // We need to wait for the DOM to be fully loaded
            document.addEventListener('DOMContentLoaded', function() {
                // Give the page time to load
                setTimeout(function() {
                    // Find the contact form section
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                        // Force it to be visible
                        contactForm.classList.add('active');
                        
                        // Make all internal elements visible
                        const formItems = contactForm.querySelectorAll('.reveal-item');
                        formItems.forEach(item => item.classList.add('active'));
                        
                        // Scroll to it
                        const headerHeight = document.querySelector('header') ? 
                            document.querySelector('header').offsetHeight : 0;
                        
                        window.scrollTo({
                            top: contactForm.offsetTop - headerHeight - 20,
                            behavior: 'auto'
                        });
                    }
                }, 300);
            });
        }
    }
})();

/**
 * Scrolls the window to the top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
}

/**
 * Navigation utility functions
 */
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/Services/') || path.includes('/Expertise/') || path.includes('/Products/')) {
        return '../';
    }
    return './';
}

/**
 * Main navigation functions
 */
function handleHomeClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'index.html';
}

function handleWhyKutumbinfoClick() {
    window.location.href = getBasePath() + 'why_kutumbinfo.html';
}

function handleWorkWithUsClick() {
    window.location.href = getBasePath() + 'work_with_us.html';
}

/**
 * Services navigation functions
 */
function handleWebDevelopmentClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/web_dev.html';
}

function handleMobileAppDevClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/mob_app.html';
}

function handleCustomSoftDevClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/custom_soft.html';
}

function handleUIUXDesignClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/ui_ux_design.html';
}

function handleAPIdevClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/api_dev.html';
}

function handleMaintainanceSupportClick() {
    scrollToTop();
    window.location.href = getBasePath() + 'Services/maintain_support.html';
}

/**
 * Expertise navigation functions
 */
function goToAngular() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/angular.html';
}

function goToReact() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/react.html';
}

function goToVuejs() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/vuejs.html';
}

function goToWordpress() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/wordpress.html';
}

function goToFlutter() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/flutter.html';
}

function goToJava() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/java.html';
}

function goToNodejs() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/nodejs.html';
}

function goToPhp() {
    scrollToTop();
    window.location.href = getBasePath() + 'Expertise/php.html';
}

/**
 * Products navigation functions
 */
function goToNonFintech() {
    scrollToTop();
    window.location.href = getBasePath() + 'Products/non_fintech.html';
}

function goToFintech() {
    scrollToTop();
    window.location.href = getBasePath() + 'Products/fintech.html';
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Fix logo path based on current page
    const logo = document.getElementById('navbar-logo');
    if (logo) {
        logo.src = getBasePath() + 'images/logo kutumbinfo13.png';
    }
}); 