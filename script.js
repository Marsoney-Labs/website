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
const carousel = document.querySelector('.carousel-inner');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let currentIndex = 1; // Start at the first real slide (after cloned last slide)

// Clone first and last slides for infinite effect
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
carousel.appendChild(firstSlideClone);
carousel.insertBefore(lastSlideClone, slides[0]);

// Update carousel width and initial position
carousel.style.width = `${(totalSlides + 2) * 100}%`;
carousel.style.transform = `translateX(-${currentIndex * 100 / (totalSlides + 2)}%)`;

// Handle arrow clicks
document.querySelector('.right-arrow').addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
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
        currentIndex++; // Swipe left
        updateCarousel();
    } else if (touchEndX - touchStartX > 50) {
        currentIndex--; // Swipe right
        updateCarousel();
    }
});

// Update carousel position and handle infinite loop
function updateCarousel() {
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(-${currentIndex * 100 / (totalSlides + 2)}%)`;

    // Reset position for infinite loop
    if (currentIndex === totalSlides + 1) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = 1;
            carousel.style.transform = `translateX(-${currentIndex * 100 / (totalSlides + 2)}%)`;
        }, 500);
    } else if (currentIndex === 0) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = totalSlides;
            carousel.style.transform = `translateX(-${currentIndex * 100 / (totalSlides + 2)}%)`;
        }, 500);
    }
}