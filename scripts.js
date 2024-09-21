document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS with your user ID
    emailjs.init('YOUR_EMAILJS_USER_ID');  // Replace 'YOUR_EMAILJS_USER_ID' with your actual user ID

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function(response) {
                alert('Your message was sent successfully!');
                contactForm.reset();
            }, function(error) {
                alert('Failed to send the message. Please try again.');
            });
    });
});


    const mobileBar = document.getElementById('mobile-bar');
    const stickyOffset = mobileBar.offsetTop;

    function stickyMobileBar() {
        if (window.pageYOffset >= stickyOffset) {
            mobileBar.classList.add('sticky');
        } else {
            mobileBar.classList.remove('sticky');
        }
    }

    window.onscroll = function () {
        stickyMobileBar();
    };

    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('show'); // Toggle the mobile menu visibility
    });

    // Close the mobile menu when clicking outside
    window.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
            mobileMenu.classList.remove('show');
        }
    });
});

// Select carousel elements
const carousel = document.querySelector('.carousel-images');
const carouselImages = document.querySelectorAll('.carousel-img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Set initial index and image width
let currentIndex = 0;
const totalImages = carouselImages.length;
const imagesToShow = 3;  // Showing 3 images at a time
let imageWidth = carouselImages[0].clientWidth + 20; // Image width + margin/padding

// Right arrow click event
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalImages - imagesToShow) {
        currentIndex++;
        updateCarousel();
    }
});

// Left arrow click event
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Function to update the carousel's position
function updateCarousel() {
    const newTransformValue = -currentIndex * imageWidth;
    carousel.style.transform = `translateX(${newTransformValue}px)`;
}

// Update image width on window resize to ensure responsiveness
window.addEventListener('resize', () => {
    imageWidth = carouselImages[0].clientWidth + 20;
    updateCarousel();  // Recalculate and update the transform position
});
