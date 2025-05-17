// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Update active link
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Contact form submission (basic handling)
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Placeholder for form submission logic (e.g., API call)
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Carousel logic for infinite scrolling
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;

    // Set up initial positioning
    function setupCarousel() {
        // Set the width of the carousel container
        carousel.style.width = `${totalSlides * 100}%`;
        
        // Set the width of each slide
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });
        
        // Set initial position
        updateCarouselPosition();
    }

    // Update the carousel position based on currentIndex
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    }

    // Handle carousel slide transitions
    function goToSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex = index;
        
        // Ensure index is within bounds (circular)
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        
        updateCarouselPosition();
        
        // Reset transitioning flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Match this with the CSS transition time
    }

    // Handle arrow clicks
    document.querySelector('.right-arrow').addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    document.querySelector('.left-arrow').addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Handle swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            goToSlide(currentIndex + 1); // Swipe left
        } else if (touchEndX - touchStartX > 50) {
            goToSlide(currentIndex - 1); // Swipe right
        }
    });

    // Auto-advance carousel
    function startAutoSlide() {
        return setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    let autoSlideInterval = startAutoSlide();

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = startAutoSlide();
    });

    // Initialize carousel
    setupCarousel();
});