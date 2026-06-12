const SearchModule = {
    init(app) {
        this.app = app;
        this.searchInput = document.getElementById('search-input');
        this.navLinks = document.getElementById('nav-links');
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    },
    handleSearch(query) {
        if (!query) {
            this.app.renderNav();
            return;
        }
        
        const results = [];
        const q = query.toLowerCase();
        
        courseData.chapters.forEach(ch => {
            ch.sections.forEach(sec => {
                if (sec.title.toLowerCase().includes(q) || sec.content.toLowerCase().includes(q)) {
                    results.push({
                        chapter: ch.title,
                        section: sec.title,
                        id: sec.id
                    });
                }
            });
        });
        
        this.renderSearchResults(results);
    },
    renderSearchResults(results) {
        if (results.length === 0) {
            this.navLinks.innerHTML = '<div style="padding: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">No results found</div>';
            return;
        }
        
        let html = '<ul class="search-results">';
        results.forEach(res => {
            html += `
                <li class="search-result-item">
                    <button class="search-link" onclick="app.navigateTo('${res.id}')">
                        <small>${res.chapter}</small>
                        <strong>${res.section}</strong>
                    </button>
                </li>
            `;
        });
        html += '</ul>';
        this.navLinks.innerHTML = html;
    }
};
