const UIModule = {
    init(app) {
        this.app = app;
        this.progressBar = document.getElementById('progress-bar');
        this.sidebar = document.getElementById('sidebar');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.menuToggle = document.getElementById('menu-toggle');
        this.articleBody = document.getElementById('article-body');
        
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.toggleMobileSidebar(false));
        }
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMobileSidebar(true));
        }
        window.addEventListener('scroll', () => this.updateScrollProgress());
    },
    updateScrollProgress() {
        if (!this.progressBar) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        this.progressBar.style.width = scrolled + "%";
    },
    toggleMobileSidebar(open) {
        if (open) {
            this.sidebar.classList.add('open');
            this.mobileOverlay.classList.add('active');
            this.menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.sidebar.classList.remove('open');
            this.mobileOverlay.classList.remove('active');
            this.menuToggle.setAttribute('aria-expanded', 'false');
        }
    },
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    applyAnimations() {
        this.articleBody.classList.remove('fade-in');
        void this.articleBody.offsetWidth; // Trigger reflow
        this.articleBody.classList.add('fade-in');
    }
};
