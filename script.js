document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL-IN ANIMATION LOGIC ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });

    // --- EXPERIENCE SLIDER LOGIC ---
    const slider = document.querySelector('.experience-slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentIndex = 0;
        let slideInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { goToSlide(index); resetInterval(); });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        const goToSlide = (index) => {
            slider.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        };

        const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
        const startInterval = () => slideInterval = setInterval(nextSlide, 5000);
        const resetInterval = () => { clearInterval(slideInterval); startInterval(); };

        const sliderContainer = document.querySelector('.experience-slider-container');
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => startInterval());
        startInterval();
    }

    // --- PROJECT MODAL LOGIC ---
    const modal = document.getElementById('project-modal');
    if (modal) {
        const projectLinks = document.querySelectorAll('.project-link');
        const closeModalBtn = document.querySelector('.modal-close');

        projectLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('modal-title').textContent = link.dataset.title;
                document.getElementById('modal-description').textContent = link.dataset.description;
                document.getElementById('modal-tech').textContent = link.dataset.tech;
                document.getElementById('modal-link').href = link.dataset.link;
                modal.classList.add('visible');
                document.body.classList.add('modal-open');
            });
        });

        const closeModal = () => {
            modal.classList.remove('visible');
            document.body.classList.remove('modal-open');
        };

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- BACK TO TOP BUTTON LOGIC ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }

    // --- NEW: THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // On load, check for saved theme and apply it
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
});