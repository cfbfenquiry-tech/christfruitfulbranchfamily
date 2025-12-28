// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auto-close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Slider Functionality
const slides = document.getElementById('slides');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let currentSlide = 0;
const slideCount = slides.children.length;

function showSlide(index) {
    if (index >= slideCount) index = 0;
    if (index < 0) index = slideCount - 1;
    slides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

prev.addEventListener('click', () => showSlide(currentSlide - 1));
next.addEventListener('click', () => showSlide(currentSlide + 1));

// Auto-advance slider every 5 seconds
setInterval(() => showSlide(currentSlide + 1), 5000);

// AJAX Form Submission with Honeypot Check
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = '';

    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot.value !== '') {
        feedback.textContent = 'Oops! Something went wrong. Please try again later.';
        feedback.className = 'error-message';
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formsubmit.co/ajax/info@christfruitfulbranch.org.ng', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success === "true") {
            feedback.textContent = 'Thank you! Your message has been sent successfully. God bless you!';
            feedback.className = 'success-message';
            form.reset();

            setTimeout(() => {
                window.location.href = '#hero';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (err) {
        feedback.textContent = 'Oops! Something went wrong. Please try again later.';
        feedback.className = 'error-message';
    }
});
