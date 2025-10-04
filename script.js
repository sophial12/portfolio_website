const root = document.documentElement;
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const themeToggle = document.getElementById('themeToggle');
const yearTarget = document.getElementById('year');

const setTheme = theme => {
    root.dataset.theme = theme;
    try {
        localStorage.setItem('preferred-theme', theme);
    } catch (error) {
        // Ignore storage errors (e.g., privacy mode)
    }
};

const toggleTheme = () => {
    const isDark = root.dataset.theme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
};

const applyStoredTheme = () => {
    try {
        const stored = localStorage.getItem('preferred-theme');
        if (stored) {
            setTheme(stored);
        }
    } catch (error) {
        // Ignore storage errors
    }
};

const updateYear = () => {
    if (yearTarget) {
        yearTarget.textContent = new Date().getFullYear();
    }
};

const applyFilter = category => {
    portfolioCards.forEach(card => {
        const matches = card.dataset.category === category;
        card.classList.toggle('is-hidden', !matches);
    });
};

const updateFilterState = activeButton => {
    filterButtons.forEach(button => {
        const isActive = button === activeButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        updateFilterState(button);
        applyFilter(category);
    });
});

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

applyStoredTheme();
updateFilterState(document.querySelector('.filter-button.is-active'));
applyFilter('professional');
updateYear();

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
let currentIndex = 0;

function updateCarousel() {
  const width = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// === OPTIONAL: Auto-slide every 5s ===
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 5000);

// Pause auto-slide on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
});
