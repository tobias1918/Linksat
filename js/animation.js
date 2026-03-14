
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.slide-up, .slide-right, .slide-left').forEach((el) => {
        observer.observe(el);
    });
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (!this.getAttribute('href').startsWith('http')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const offset = 90; // Ajuste en píxeles

            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
// Animación de contadores para DGO
function animateNumbers() {
    const counters = document.querySelectorAll('.dgo-counter-numero, .dgo-numero-compacto');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps aprox
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Observador de intersección para activar la animación cuando la sección sea visible
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const dgoSection = document.querySelector('.section-dgo-unificada');
if (dgoSection) {
    observer.observe(dgoSection);
}






