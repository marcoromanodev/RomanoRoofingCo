document.addEventListener("DOMContentLoaded", function () {
    function adjustHeaderOffset() {
        const header = document.querySelector('.header');
        if (header) {
            const headerHeight = header.offsetHeight;
            const extraOffset = 10;
            document.documentElement.style.setProperty('--header-height', `${headerHeight + extraOffset}px`);
        }
    }
    adjustHeaderOffset();
    window.addEventListener('resize', adjustHeaderOffset);
    window.addEventListener('load', adjustHeaderOffset);

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

    // Hamburger menu and responsive navigation
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const desktopNav = document.querySelector('.desktop-nav');
    const logoContainer = document.querySelector('.logo-container');

    // Switch to hamburger menu if the logo overlaps navigation links
    function updateNavDisplay() {
        if (!desktopNav || !hamburger || !logoContainer) return;
        const navRect = desktopNav.getBoundingClientRect();
        const logoRect = logoContainer.getBoundingClientRect();

        if (navRect.left < logoRect.right + 20) {
            desktopNav.style.display = 'none';
            hamburger.style.display = 'block';
        } else {
            desktopNav.style.display = 'block';
            hamburger.style.display = 'none';
        }
    }

    updateNavDisplay();
    window.addEventListener('resize', updateNavDisplay);
    window.addEventListener('load', updateNavDisplay);

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenu.classList.toggle('show'); // Toggle the mobile menu visibility
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', function (e) {
                e.stopPropagation();
                mobileMenu.classList.remove('show');
            });
        }

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
    const carouselItems = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const imagesToShow = 1;  // Show one image at a time
    const maxIndex = totalItems - imagesToShow;
    let imageWidth = carouselItems[0].clientWidth;

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
        imageWidth = carouselItems[0].clientWidth;
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
