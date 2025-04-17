// Prevent scroll position jump on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Ensure window loads at the exact position for refresh only
window.addEventListener('beforeunload', () => {
    // Store the current URL and scroll position
    sessionStorage.setItem('lastPage', window.location.href);
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Handle hash fragments for direct navigation to sections
function handleHashNavigation() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // For contact form or other important sections, make them visible immediately
            if (targetId === '#contact-form') {
                console.log("Contact form section detected in URL");
                
                // Force activate the section immediately to prevent animation delay
                targetElement.classList.add('active');
                const formItems = targetElement.querySelectorAll('.reveal-item');
                formItems.forEach(item => item.classList.add('active'));
                
                // Longer delay to ensure the DOM and all resources are fully loaded
                setTimeout(() => {
                    console.log("Scrolling to contact form after delay");
                    const headerHeight = document.querySelector('header') ? 
                        document.querySelector('header').offsetHeight : 0;
                    
                    // Scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20,
                        behavior: 'auto' // Use 'auto' instead of 'smooth' for more reliable scrolling
                    });
                    
                    // Double-check scroll position after a brief moment
                    setTimeout(() => {
                        // Make sure we're at the right position
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight - 20,
                            behavior: 'auto'
                        });
                    }, 200);
                }, 500); // Increased delay for better reliability
            }
        }
    }
}

// Helper function to determine the base path - moved to top level for better organization
function getBasePath() {
    const currentPath = window.location.pathname;
    console.log("getBasePath called in scripts.js, current path:", currentPath);
    
    if (currentPath.includes('/Services/') || 
        currentPath.includes('/Expertise/') || 
        currentPath.includes('/Products/')) {
        console.log("Returning '../'");
        return '../';
    } else {
        console.log("Returning empty string");
        return '';
    }
}

// DOM Content Loaded Event Handler
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded, checking for hash fragment");
    
    // Load navbar and footer components first
    loadComponents().then(() => {
        console.log("Components loaded, now handling hash navigation");
        
        // Handle hash fragments for direct section navigation (must be called after components are loaded)
        if (window.location.hash === '#contact-form') {
            // For contact form, we need special handling
            const contactForm = document.querySelector('#contact-form');
            if (contactForm) {
                // Make the section visible immediately
                contactForm.classList.add('active');
                const formItems = contactForm.querySelectorAll('.reveal-item');
                formItems.forEach(item => item.classList.add('active'));
                
                // Scroll after everything is loaded and visible
                setTimeout(() => {
                    const headerHeight = document.querySelector('header') ? 
                        document.querySelector('header').offsetHeight : 0;
                    
                    // Scroll to contact form
                    window.scrollTo({
                        top: contactForm.offsetTop - headerHeight - 20,
                        behavior: 'auto'
                    });
                }, 800); // Longer delay for cross-page navigation
            }
        } else {
            // Handle other hash fragments
            handleHashNavigation();
        }
    });
    
    // Restore scroll position only if it's the same page (refresh)
    const lastPage = sessionStorage.getItem('lastPage');
    const currentPage = window.location.href.split('#')[0]; // Ignore hash for comparison
    
    if (lastPage && lastPage.split('#')[0] === currentPage && sessionStorage.getItem('scrollPosition') && !window.location.hash) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
    } else if (!window.location.hash) {
        // If it's a new page without hash, scroll to top
        window.scrollTo(0, 0);
    }
    
    // Update the last page
    sessionStorage.setItem('lastPage', window.location.href);
    
    // Initialize all interactive elements once the DOM is loaded
    initializeCounters();
    initializeAnimations();
    initializeNavigation();
    
    // Initialize scroll animations with our new system
    initScrollAnimations();

    // Force counter initialization after a slight delay to ensure the elements are loaded
    setTimeout(() => {
        const counters = document.querySelectorAll(".counter");
        if (counters.length > 0) {
            counters.forEach(counter => animateCounter(counter));
        }
    }, 1000);

    // Scroll animation functionality - grouped for readability
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('reveal-section');
    });

    const weAreSubsections = document.querySelectorAll('.we-are-subsection');
    weAreSubsections.forEach(item => {
        item.classList.add('reveal-item');
    });

    const whyChooseUsItems = document.querySelectorAll('.why-choose-us-item');
    whyChooseUsItems.forEach(item => {
        item.classList.add('reveal-item');
    });

    const counterBoxes = document.querySelectorAll('.counter-box');
    counterBoxes.forEach(item => {
        item.classList.add('reveal-item');
    });

    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(item => {
        item.classList.add('reveal-item');
    });

    const domainBoxes = document.querySelectorAll('.domain-box');
    domainBoxes.forEach(item => {
        item.classList.add('reveal-item');
    });

    // Reveal elements when scrolled into view
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // How many pixels from the bottom of the viewport to start the animation

        // Animate sections
        const revealSections = document.querySelectorAll('.reveal-section:not(.active)');
        revealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if(sectionTop < windowHeight - revealPoint) {
                section.classList.add('active');
                
                // Trigger animations for child items with staggered delays
                const items = section.querySelectorAll('.reveal-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100 + (index * 100)); // Staggered delay based on index
                });
            }
        });
    }

    // Check on initial load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Using our new animation system, no need for these older functions
    setupCarousel();

    // Enhanced Animations for Index Page
    // Initialize enhanced reveal animations
    setTimeout(function() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('active');
            document.querySelectorAll('.hero .reveal-item').forEach(function(item, index) {
                setTimeout(function() {
                    item.classList.add('active');
                }, 300 * (index + 1));
            });
        }
    }, 200);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate proper offset based on header
                    const headerHeight = document.querySelector('header') ? 
                        document.querySelector('header').offsetHeight : 0;
                    
                    // Special handling for contact form
                    if (targetId === '#contact-form' || targetId.endsWith('#contact-form')) {
                        // Make sure the contact form is visible and active before scrolling
                        targetElement.classList.add('active');
                        const formItems = targetElement.querySelectorAll('.reveal-item');
                        formItems.forEach(item => item.classList.add('active'));
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL if on same page
                    if (!this.getAttribute('href').includes('.html') || this.getAttribute('href').startsWith('#')) {
                        history.pushState(null, null, targetId);
                    }
                }
            }
        });
    });
    
    // Add active class to Learn More buttons on hover for feedback
    const buttons = document.querySelectorAll('.learn-more-btn, .cta-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
    
    // Testimonials slider functionality
    initializeTestimonialSlider();
    
    // Add particles to hero section if on the homepage
    createParticles();
});

// Add hashchange event listener to handle navigation from different pages
window.addEventListener('hashchange', function() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // For contact form, ensure it's visible
            if (targetId === '#contact-form') {
                targetElement.classList.add('active');
                const formItems = targetElement.querySelectorAll('.reveal-item');
                formItems.forEach(item => item.classList.add('active'));
            }
            
            // Calculate proper offset based on header
            const headerHeight = document.querySelector('header') ? 
                document.querySelector('header').offsetHeight : 0;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    }
});

// ============================
// Component Loading Functions
// ============================
function loadComponents() {
    // Create promises for both navbar and footer loading
    const navbarPromise = fetchComponent(getBasePath() + "navbar.html", "navbar-placeholder")
        .then(() => {
            // Initialize navbar functionality after loaded
            initializeNavbarToggle();
            initializeDropdowns();
        });

    const footerPromise = fetchComponent(getBasePath() + "footer.html", "footer-placeholder");
    
    // Return promise that resolves when both are done
    return Promise.all([navbarPromise, footerPromise]);
}

function fetchComponent(url, targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return Promise.resolve();

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // Fix paths for images in Services directory
            if (window.location.pathname.includes('/Services/') && targetId === 'footer-placeholder') {
                // Add parent directory prefix to image paths in footer
                data = data.replace(/src="images\//g, 'src="../images/');
            }
            
            targetElement.innerHTML = data;
            return data;
        })
        .catch(error => {
            console.error(`Error loading ${url}:`, error);
        });
}

// ============================
// Counter Animation Functions
// ============================
function initializeCounters() {
const counters = document.querySelectorAll(".counter");
const counterSection = document.querySelector(".counter-section");

    if (!counterSection || counters.length === 0) return;

    const counterObserver = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                counterObserver.unobserve(entries[0].target);
            }
        },
        { threshold: 0.5 }
    );

    counterObserver.observe(counterSection);
    
    // Also initialize counters on scroll in case observer doesn't trigger
    window.addEventListener('scroll', function checkCounters() {
        const counterSectionPosition = counterSection.getBoundingClientRect();
        if (counterSectionPosition.top < window.innerHeight && counterSectionPosition.bottom > 0) {
            counters.forEach(counter => animateCounter(counter));
            window.removeEventListener('scroll', checkCounters);
        }
    });
}

function animateCounter(counter) {
    // Always reset the counter when called
    counter.textContent = '0';
    
    const target = +counter.dataset.target;
    let current = 0;
    const duration = 5000; // 5 seconds duration for smoother counting
    const startTime = performance.now();
    
    // Use requestAnimationFrame for smoother animation
    function updateCounter(currentTime) {
        // Calculate progress (0 to 1)
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out function for smoother deceleration at the end
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Calculate current value with easing
        current = Math.floor(easedProgress * target);
        
        // Update the counter display
        counter.textContent = current;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure we end at the exact target value
            counter.textContent = target;
        }
    }
    
    // Start the animation
    requestAnimationFrame(updateCounter);
}

// ============================
// Animation Functions
// ============================
function initializeAnimations() {
    // We're now using the reveal system instead
}

// ============================
// Navigation Functions
// ============================
function initializeNavigation() {
    // No immediate initialization needed - just defining the public API
}

function initializeNavbarToggle() {
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (!menuToggle || !navbar) return;

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
        menuToggle.classList.toggle("open");

        // Toggle visibility of all sections when menu is open
        sections.forEach(section => {
            section.classList.toggle("hidden");
        });

        // Hide footer when menu is open
    if (footerPlaceholder) {
        footerPlaceholder.classList.toggle("hidden");
    }
});
}

function initializeDropdowns() {
    const dropdownLinks = document.querySelectorAll(".navbar .dropdown > a");

    dropdownLinks.forEach(dropdownLink => {
        dropdownLink.addEventListener("click", function(e) {
        e.preventDefault();
        const parentDropdown = this.parentElement;

            // Toggle this dropdown
        parentDropdown.classList.toggle("active");

        // Close other dropdowns
            document.querySelectorAll(".navbar .dropdown").forEach(dropdown => {
            if (dropdown !== parentDropdown) {
                dropdown.classList.remove("active");
            }
        });
    });
});
}

// ============================
// Navigation Handler Functions
// ============================
function handleHomeClick() {
    window.location.href = getBasePath() + "index.html";
}

function handleWhyKutumbinfoClick() {
    window.location.href = getBasePath() + "why_kutumbinfo.html";
}

function handleWebDevelopmentClick() {
    window.location.href = getBasePath() + "Services/web_dev.html";
}

function handleMobileAppDevClick() {
    window.location.href = getBasePath() + "Services/mob_app.html";
}

function handleCustomSoftDevClick() {
    window.location.href = getBasePath() + "Services/custom_soft.html";
}

function handleUIUXDesignClick() {
    window.location.href = getBasePath() + "Services/ui_ux_design.html";
}

function handleAPIdevClick() {
    window.location.href = getBasePath() + "Services/api_dev.html";
}

function handleMaintainanceSupportClick() {
    window.location.href = getBasePath() + "Services/maintain_support.html";
}

function handleWorkWithUsClick(scrollToContact = false) {
    if (scrollToContact) {
        window.location.href = getBasePath() + "work_with_us.html#contact-form";
    } else {
        window.location.href = getBasePath() + "work_with_us.html";
    }
}

// Alternative approach using Intersection Observer for better performance
function setupIntersectionObserver() {
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of the element must be visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('active');
        
        // Animate children with staggered delay
        const items = target.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('active');
          }, 100 + (index * 100)); // Staggered delay based on index
        });
        
        // Unobserve after animation is triggered
        observer.unobserve(target);
      }
    });
  }, options);

  // Observe all sections
  const sections = document.querySelectorAll('.reveal-section');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Use Intersection Observer if supported, otherwise fallback
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    setupIntersectionObserver();
  } else {
    // Fallback to scroll event
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
  }
}

// ============================
// Carousel Functions
// ============================
function setupCarousel() {
    const testimonialsWrapper = document.querySelector('#testimonials .testimonials-wrapper');
    const testimonialItems = document.querySelectorAll('#testimonials .testimonial-item');
    
    if (!testimonialsWrapper || testimonialItems.length === 0) return;
    
    let currentIndex = 0;
    const itemsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
    const totalItems = testimonialItems.length;
    
    // Set initial width
    testimonialItems.forEach(item => {
        const width = 100 / itemsToShow;
        item.style.flex = `0 0 ${width}%`;
        item.style.maxWidth = `${width}%`;
    });
    
    // Create indicators/dots
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'testimonial-indicators';
    indicatorsContainer.style.textAlign = 'center';
    indicatorsContainer.style.marginTop = '20px';
    
    // Calculate number of pages
    const pages = Math.ceil(totalItems / itemsToShow);
    
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('span');
        dot.style.display = 'inline-block';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.margin = '0 5px';
        dot.style.backgroundColor = i === 0 ? '#8cc63f' : '#ccc';
        dot.style.borderRadius = '50%';
        dot.style.cursor = 'pointer';
        dot.dataset.index = i;
        
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            currentIndex = index * itemsToShow;
            updateCarousel();
        });
        
        indicatorsContainer.appendChild(dot);
    }
    
    // Add indicators to DOM
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
        testimonialsSection.appendChild(indicatorsContainer);
    }
    
    // Update carousel position
    function updateCarousel() {
        // Ensure currentIndex doesn't exceed bounds
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = totalItems - itemsToShow;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        
        // Calculate transform percentage
        const transformValue = -(currentIndex * (100 / itemsToShow));
        testimonialsWrapper.style.transform = `translateX(${transformValue}%)`;
        
        // Update indicator dots
        const currentPage = Math.floor(currentIndex / itemsToShow);
        const dots = document.querySelectorAll('.testimonial-indicators span');
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === currentPage ? '#8cc63f' : '#ccc';
        });
    }
    
    // Optional: Auto-scroll
    let autoScrollInterval = setInterval(() => {
        currentIndex += itemsToShow;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Pause auto-scroll on hover
    const carousel = document.querySelector('#testimonials .testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                currentIndex += itemsToShow;
                if (currentIndex >= totalItems) {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        if (newItemsToShow !== itemsToShow) {
            location.reload(); // Simple approach - reload to adjust layout
        }
    });
}

// Initialize Testimonials Slider
function initializeTestimonialSlider() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!dots.length || !cards.length) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // On mobile devices (when cards are stacked)
            if (window.innerWidth <= 992) {
                // Hide all cards
                cards.forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show only the selected card
                if (cards[index]) {
                    cards[index].style.display = 'block';
                }
            }
        });
    });
    
    // Initialize testimonials
    if (window.innerWidth <= 992 && cards.length > 0) {
        // On mobile, show only the first card initially
        for (let i = 1; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }
    }
    
    // Auto-rotate testimonials every 5 seconds
    let currentTestimonial = 0;
    setInterval(() => {
        if (dots.length > 0) {
            currentTestimonial = (currentTestimonial + 1) % dots.length;
            dots[currentTestimonial].click();
        }
    }, 5000);
}

// Create particles for hero section
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particlesContainer = document.querySelector('.particles-container');
    if (!heroSection || !particlesContainer) return;
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
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
        
        fragment.appendChild(particle);
    }
    
    // Append all particles at once for better performance
    particlesContainer.appendChild(fragment);
}
