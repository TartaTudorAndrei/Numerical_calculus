const app = {
    currentId: 'welcome',
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderNav();
        this.loadContentFromHash();
    },
    
    cacheDOM() {
        this.body = document.body;
        this.themeToggle = document.getElementById('theme-toggle');
        this.searchInput = document.getElementById('search-input');
        this.navLinks = document.getElementById('nav-links');
        this.articleBody = document.getElementById('article-body');
        this.breadcrumb = document.getElementById('breadcrumb');
        this.menuToggle = document.getElementById('menu-toggle');
        this.sidebar = document.getElementById('sidebar');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressBar = document.getElementById('progress-bar');
    },
    
    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.menuToggle.addEventListener('click', () => this.toggleMobileSidebar(true));
        this.mobileOverlay.addEventListener('click', () => this.toggleMobileSidebar(false));
        this.prevBtn.addEventListener('click', () => this.navigateStep(-1));
        this.nextBtn.addEventListener('click', () => this.navigateStep(1));
        window.addEventListener('hashchange', () => this.loadContentFromHash());
        window.addEventListener('scroll', () => this.updateScrollProgress());
    },

    updateScrollProgress() {
        if (!this.progressBar) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        this.progressBar.style.width = scrolled + "%";
    },
    
    toggleTheme() {
        if (this.body.classList.contains('light-theme')) {
            this.body.classList.remove('light-theme');
            this.body.classList.add('dark-theme');
        } else {
            this.body.classList.remove('dark-theme');
            this.body.classList.add('light-theme');
        }
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
    
    renderNav() {
        let html = '';
        courseData.chapters.forEach(ch => {
            html += `
                <div class="nav-chapter-container">
                    <button class="nav-chapter" 
                            data-id="${ch.id}" 
                            onclick="app.toggleChapter('${ch.id}')"
                            aria-expanded="false"
                            aria-controls="sections-${ch.id}">
                        <span>${ch.title}</span>
                        <span class="chevron" aria-hidden="true">▼</span>
                    </button>
                    <ul class="nav-sections" id="sections-${ch.id}" role="list">
            `;
            ch.sections.forEach(sec => {
                html += `
                    <li class="nav-section-item">
                        <button class="nav-section" 
                                data-id="${sec.id}" 
                                onclick="app.navigateTo('${sec.id}')"
                                role="link">
                            ${sec.title}
                        </button>
                    </li>
                `;
            });
            html += `
                    </ul>
                </div>
            `;
        });
        this.navLinks.innerHTML = html;
    },
    
    toggleChapter(chId) {
        const sectionsList = document.getElementById(`sections-${chId}`);
        const chapterBtn = document.querySelector(`.nav-chapter[data-id="${chId}"]`);
        if (!sectionsList || !chapterBtn) return;

        const isOpen = sectionsList.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.nav-sections').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-chapter').forEach(el => {
            el.classList.remove('active');
            el.setAttribute('aria-expanded', 'false');
        });
        
        if (!isOpen) {
            sectionsList.classList.add('active');
            chapterBtn.classList.add('active');
            chapterBtn.setAttribute('aria-expanded', 'true');
        }
    },
    
    navigateTo(id) {
        window.location.hash = id;
        this.toggleMobileSidebar(false);
    },
    
    navigateStep(direction) {
        const allIds = this.getLinearIds();
        const currentIndex = allIds.indexOf(this.currentId);
        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < allIds.length) {
            this.navigateTo(allIds[nextIndex]);
        }
    },
    
    getLinearIds() {
        const ids = ['welcome'];
        courseData.chapters.forEach(ch => {
            ch.sections.forEach(sec => {
                ids.push(sec.id);
            });
        });
        ids.push('audit', 'corrections');
        return ids;
    },
    
    loadContentFromHash() {
        const hash = window.location.hash.substring(1) || 'welcome';
        this.currentId = hash;
        
        // Update Active states in Nav
        document.querySelectorAll('.nav-section').forEach(el => el.classList.remove('active'));
        const activeSec = document.querySelector(`.nav-section[data-id="${hash}"]`);
        if (activeSec) activeSec.classList.add('active');
        
        if (hash === 'welcome') {
            this.renderWelcome();
        } else if (hash === 'audit') {
            this.renderAudit();
        } else if (hash === 'corrections') {
            this.renderCorrections();
        } else {
            this.renderSection(hash);
        }

        // Trigger fade-in
        if (this.articleBody) {
            this.articleBody.classList.remove('fade-in');
            void this.articleBody.offsetWidth; // trigger reflow
            this.articleBody.classList.add('fade-in');
        }
        
        // Update Footer Buttons
        const allIds = this.getLinearIds();
        const currentIndex = allIds.indexOf(hash);
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.disabled = currentIndex <= 0;
            this.nextBtn.disabled = currentIndex >= allIds.length - 1 || currentIndex === -1;
        }
        
        // Re-render math
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(this.articleBody || document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                throwOnError : false
            });
        }
        
        window.scrollTo(0, 0);
        this.updateScrollProgress();
    },
    
    renderWelcome() {
        this.breadcrumb.innerText = 'Home';
        this.articleBody.innerHTML = `
            <div id="welcome-screen">
                <h2>Welcome to the Numerical Calculus Study Guide</h2>
                <p>Select a chapter from the sidebar to begin. This guide contains complete course notes, theorems, algorithms, and examples.</p>
                <div class="quick-links">
                    <button class="nav-btn" onclick="app.navigateTo('c2-special-matrices')">Start with Matrices</button>
                    <button class="nav-btn" onclick="app.navigateTo('corrections')">View Corrections Log</button>
                </div>
            </div>
        `;
    },
    
    renderSection(id) {
        let foundSec = null;
        let foundCh = null;
        
        courseData.chapters.forEach(ch => {
            ch.sections.forEach(sec => {
                if (sec.id === id) {
                    foundSec = sec;
                    foundCh = ch;
                }
            });
        });
        
        if (foundSec) {
            this.breadcrumb.innerText = `${foundCh.title} / ${foundSec.title}`;
            this.articleBody.innerHTML = foundSec.content;
            
            // Ensure parent chapter is open
            const sectionsList = document.getElementById(`sections-${foundCh.id}`);
            if (sectionsList && !sectionsList.classList.contains('active')) {
                this.toggleChapter(foundCh.id);
            }
        } else {
            this.articleBody.innerHTML = `<h2>404 - Section Not Found</h2>`;
        }
    },
    
    renderAudit() {
        this.breadcrumb.innerText = 'Internal Tools / Content Audit';
        let html = `<h2>Content Audit</h2><p>This panel tracks the extraction and mapping of topics from raw LaTeX files into this study platform.</p><ul>`;
        if (courseData.audit) {
            courseData.audit.forEach(item => {
                html += `<li><strong>${item.source}:</strong> ${item.topics.join(', ')}</li>`;
            });
        }
        html += `</ul>`;
        this.articleBody.innerHTML = html;
    },
    
    renderCorrections() {
        this.breadcrumb.innerText = 'Internal Tools / Corrections Log';
        let html = `<h2>Corrections & Transcription Log</h2><p>Below is a log of notable mathematical adjustments, OCR cleanup, and normalization performed on the raw source files to ensure rigor.</p><table><thead><tr><th>Source</th><th>Original Issue/OCR Artifact</th><th>Corrected Version / Mathematical Rationale</th></tr></thead><tbody>`;
        if (courseData.corrections) {
            courseData.corrections.forEach(item => {
                html += `<tr><td><code>${item.file}</code></td><td>${item.original}</td><td>${item.corrected}</td></tr>`;
            });
        }
        html += `</tbody></table>`;
        this.articleBody.innerHTML = html;
    },
    
    handleSearch(query) {
        if (!query.trim()) {
            this.renderNav();
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        let html = '<ul class="search-results" role="listbox">';
        
        courseData.chapters.forEach(ch => {
            ch.sections.forEach(sec => {
                if (sec.title.toLowerCase().includes(lowerQuery) || sec.content.toLowerCase().includes(lowerQuery)) {
                    html += `
                        <li class="search-result-item" role="option">
                            <button class="search-link" onclick="app.navigateTo('${sec.id}')">
                                <small>${ch.title}</small><br><strong>${sec.title}</strong>
                            </button>
                        </li>
                    `;
                }
            });
        });
        
        html += '</ul>';
        this.navLinks.innerHTML = html;
    }
};

window.app = app;
app.init();
