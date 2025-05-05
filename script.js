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