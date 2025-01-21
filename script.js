// Lightbox functionality
const images = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('close-lightbox');

// Open the lightbox with the clicked image
images.forEach(image => {
    image.addEventListener('click', function() {
        modal.style.display = 'flex';
        lightboxImage.src = this.src;
        caption.textContent = this.alt; // Show the alt text as the caption
    });
});

// Close the lightbox when the user clicks the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close lightbox when clicking outside the image
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Filter gallery items by category
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Select all anchor links
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor link behavior

        const targetId = this.getAttribute('href').substring(1); // Get the target ID
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // Smooth scrolling
            });
        }
    });
});

// Select all elements with the 'fade-in' class
const fadeElements = document.querySelectorAll('.fade-in');

// Function to handle the visibility check
function checkVisibility() {
    fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        
        // Check if the element is in the viewport (partially or fully)
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            element.classList.add('visible'); // Trigger fade-in
        }
    });
}

// Call the function when the page is loaded or scrolled
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Optionally, call the checkVisibility function right away for items already in view
checkVisibility();