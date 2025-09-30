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