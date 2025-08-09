document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your public key
        emailjs.init('Y-XtDjX-x7GuFRumI');
    }

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            emailjs.sendForm('service_ae5o7qq', 'template_rd9i0ip', this)
                .then(function (response) {
                    // Show a "Message Sent!" popup (without refreshing the page)
                    alert('Message Sent!');
                    contactForm.reset(); // Clear the form fields
                }, function (error) {
                    alert('Failed to send the message. Please try again.');
                });
        });
    }

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

        // Highlight active link in mobile menu
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
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
    const maxIndex = totalImages - imagesToShow;
    let imageWidth = carouselImages[0].clientWidth + 20; // Image width + margin/padding

    // Right arrow click event
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        });
    }

    // Left arrow click event
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateCarousel();
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

    // Ensure mailto links trigger email client on desktop
    const emailLinks = document.querySelectorAll('a.email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', function () {
            window.location.href = this.href;
        });
    });
});
