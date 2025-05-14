/// Enhanced JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Scroll behavior for navigation
    const nav = document.querySelector('nav');
    const scrollDown = document.querySelector('.scroll-down');
    const aboutSection = document.getElementById('about');
    const features = document.querySelectorAll('.feature');
    
    // Setup the header slideshow
    setupHeaderSlideshow();
    
    // Mobile navigation setup
    const navLinks = document.querySelector('.nav-links');
    
    
    // Add mobile navigation toggle if it doesn't exist
    if (!document.querySelector('.mobile-nav-toggle')) {
        const navbar = document.querySelector('.navbar-container');
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.appendChild(mobileNavToggle);
        
        // Add mobile navigation toggle functionality
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Get the current page URL to highlight active nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links li a');
    
    // Mark current page in navigation
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Scroll event listener for various effects
    window.addEventListener('scroll', function() {
        // Shrink navbar on scroll
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Add animation to features when scrolled into view
        features.forEach(feature => {
            const featurePosition = feature.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (featurePosition < screenPosition) {
                feature.classList.add('animated');
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }
        });
        
        // Handle contact button visibility
        handleContactButtonVisibility();
    });
    
    // Scroll to About section when scroll-down arrow is clicked
    if (scrollDown && aboutSection) {
        scrollDown.addEventListener('click', function() {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Contact button functionality
    const contactButton = document.getElementById('contact-button');
    const footer = document.querySelector('footer');
    
    function handleContactButtonVisibility() {
        if (contactButton && footer) {
            const footerRect = footer.getBoundingClientRect();
            
            if (footerRect.top <= window.innerHeight) {
                contactButton.classList.add('hidden');
            } else {
                contactButton.classList.remove('hidden');
            }
        }
    }
    
    // Initial contact button check
    handleContactButtonVisibility();
    
    // Scroll to footer when button is clicked
    if (contactButton && footer) {
        contactButton.addEventListener('click', function() {
            footer.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add hover effect for feature boxes
    features.forEach(feature => {
        // Set initial state with opacity 0 and translated down
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger the initial animation check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
    
    // Add counter animation for years in business
    const yearText = document.querySelector('.about-text p:first-child');
    if (yearText) {
        const yearContent = yearText.innerHTML;
        const yearMatch = yearContent.match(/(\d+) years/);
        
        if (yearMatch && yearMatch[1]) {
            const years = parseInt(yearMatch[1]);
            
            // Create a span for the counter
            const newText = yearContent.replace(`${years} years`, `<span id="year-counter">0</span> years`);
            yearText.innerHTML = newText;
            
            // Set up intersection observer to start counter when visible
            const counter = document.getElementById('year-counter');
            if (counter) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Start counter
                            let count = 0;
                            const interval = setInterval(() => {
                                counter.innerText = count;
                                if (count >= years) {
                                    clearInterval(interval);
                                }
                                count++;
                            }, 60);
                            // Stop observing after animation
                            observer.unobserve(counter);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(counter);
            }
        }
    }
    
    // Set up slideshow functionality for the header
function setupHeaderSlideshow() {
    const slides = document.querySelectorAll('.header-slideshow div');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Function to show next slide
    function showNextSlide() {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide (loop back to first if at the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 7 seconds
    setInterval(showNextSlide, 4000);
}
});