// Get the button and footer elements
const contactButton = document.getElementById('contact-button');
const footer = document.querySelector('footer');

// Function to check if the footer is in view
function isFooterInView() {
    const footerRect = footer.getBoundingClientRect();
    return footerRect.top <= window.innerHeight;
}

// Function to handle scroll events
function handleScroll() {
    if (isFooterInView()) {
        contactButton.classList.add('hidden'); // Hide button when footer is in view
    } else {
        contactButton.classList.remove('hidden'); // Show button when footer is not in view
    }
}

// Scroll to footer when button is clicked
contactButton.addEventListener('click', () => {
    footer.scrollIntoView({ behavior: 'smooth' });
});

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Initial check in case the footer is already in view
handleScroll();