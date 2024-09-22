document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS with your user ID
    if (typeof emailjs !== 'undefined') {
        emailjs.init('DZojhFh7ITojx93eX');  // Use your actual EmailJS user ID
    }

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            emailjs.sendForm('service_czd6kd3', 'emplate_0h89c3i', this)
                .then(function (response) {
                    alert('Your message was sent successfully!');
                    contactForm.reset();
                }, function (error) {
                    alert('Failed to send the message. Please try again.');
                });
        });
    }

    // Sticky mobile bar logic
    const mobileBar = document.getElementById('mobile-bar');
    const stickyOffset = mobileBar ? mobileBar.offsetTop : 0;

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

    // Hamburger menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenu.classList.toggle('show'); // Toggle the mobile menu visibility
        });

        // Close the mobile menu when clicking outside
        window.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
                mobileMenu.classList.remove('show');
            }
        });

        // Prevent clicks inside the menu from closing it
        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Carousel functionality
    const carousel = document.querySelector('.carousel-images');
    const carouselImages = document.querySelectorAll('.carousel-img');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let currentIndex = 0;
    const totalImages = carouselImages.length;
    const imagesToShow = 3;  // Showing 3 images at a time
    let imageWidth = carouselImages[0].clientWidth + 20; // Image width + margin/padding

    // Right arrow click event
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            if (currentIndex < totalImages - imagesToShow) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Left arrow click event
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

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
});
