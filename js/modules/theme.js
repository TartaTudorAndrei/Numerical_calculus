const ThemeModule = {
    init() {
        this.body = document.body;
        this.themeToggle = document.getElementById('theme-toggle');
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggle());
        }
        this.loadSavedTheme();
    },
    toggle() {
        if (this.body.classList.contains('light-theme')) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    },
    setTheme(theme) {
        if (theme === 'dark') {
            this.body.classList.remove('light-theme');
            this.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            this.body.classList.remove('dark-theme');
            this.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    },
    loadSavedTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            this.setTheme(saved);
        }
    }
};
