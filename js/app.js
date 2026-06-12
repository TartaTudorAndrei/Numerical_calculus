const app = {
    currentId: 'welcome',
    allSections: [],

    init() {
        this.cacheDOM();
        this.flattenSections();
        
        ThemeModule.init();
        SearchModule.init(this);
        UIModule.init(this);
        
        this.bindEvents();
        this.renderNav();
        this.loadContentFromHash();
    },

    cacheDOM() {
        this.navLinks = document.getElementById('nav-links');
        this.articleBody = document.getElementById('article-body');
        this.breadcrumb = document.getElementById('breadcrumb');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
    },

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.navigateStep(-1));
        this.nextBtn.addEventListener('click', () => this.navigateStep(1));
        window.addEventListener('hashchange', () => this.loadContentFromHash());
    },

    flattenSections() {
        courseData.chapters.forEach(ch => {
            ch.sections.forEach(sec => {
                this.allSections.push({
                    ...sec,
                    chapterTitle: ch.title,
                    chapterId: ch.id
                });
            });
        });
        
        // Add audit and corrections as virtual sections
        this.allSections.push({
            id: 'audit',
            title: 'Content Audit',
            chapterTitle: 'Course Admin',
            content: this.generateAuditHTML()
        });
        this.allSections.push({
            id: 'corrections',
            title: 'Corrections Log',
            chapterTitle: 'Course Admin',
            content: this.generateCorrectionsHTML()
        });
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
        this.updateActiveNav();
    },

    toggleChapter(id) {
        const btn = document.querySelector(`.nav-chapter[data-id="${id}"]`);
        const list = document.getElementById(`sections-${id}`);
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        
        btn.setAttribute('aria-expanded', !isOpen);
        btn.classList.toggle('active', !isOpen);
        list.classList.toggle('active', !isOpen);
    },

    navigateTo(id) {
        window.location.hash = id;
        UIModule.toggleMobileSidebar(false);
    },

    navigateStep(step) {
        const currentIndex = this.allSections.findIndex(s => s.id === this.currentId);
        const nextIndex = currentIndex + step;
        if (nextIndex >= 0 && nextIndex < this.allSections.length) {
            this.navigateTo(this.allSections[nextIndex].id);
        }
    },

    loadContentFromHash() {
        const id = window.location.hash.replace('#', '') || 'welcome';
        this.renderContent(id);
        this.updateActiveNav();
    },

    renderContent(id) {
        this.currentId = id;
        const section = this.allSections.find(s => s.id === id);
        
        if (id === 'welcome') {
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
            this.breadcrumb.textContent = 'Home';
        } else if (section) {
            this.articleBody.innerHTML = section.content;
            this.breadcrumb.textContent = `${section.chapterTitle} / ${section.title}`;
            
            // Re-render KaTeX
            if (window.renderMathInElement) {
                renderMathInElement(this.articleBody, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ],
                    throwOnError : false
                });
            }

            // Initialize interactive elements
            if (window.InteractiveModule) {
                InteractiveModule.init();
            }
        }

        UIModule.applyAnimations();
        UIModule.scrollToTop();
        this.updateButtons();
    },

    updateActiveNav() {
        document.querySelectorAll('.nav-section').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.id === this.currentId);
        });

        // Auto-expand current chapter
        const currentSection = this.allSections.find(s => s.id === this.currentId);
        if (currentSection && currentSection.chapterId) {
            const btn = document.querySelector(`.nav-chapter[data-id="${currentSection.chapterId}"]`);
            if (btn && btn.getAttribute('aria-expanded') === 'false') {
                this.toggleChapter(currentSection.chapterId);
            }
        }
    },

    updateButtons() {
        const currentIndex = this.allSections.findIndex(s => s.id === this.currentId);
        this.prevBtn.disabled = currentIndex <= 0;
        this.nextBtn.disabled = currentIndex === -1 || currentIndex >= this.allSections.length - 1;
    },

    generateAuditHTML() {
        let html = '<h2>Content Audit</h2><div class="audit-list">';
        courseData.audit.forEach(item => {
            html += `
                <div class="box remark">
                    <span class="box-title">Source: ${item.source}</span>
                    <ul>${item.topics.map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
            `;
        });
        return html + '</div>';
    },

    generateCorrectionsHTML() {
        let html = '<h2>Corrections Log</h2>';
        courseData.corrections.forEach(item => {
            html += `
                <div class="box definition">
                    <span class="box-title">Correction: ${item.file}</span>
                    <p><strong>Original:</strong> ${item.original}</p>
                    <p><strong>Corrected:</strong> ${item.corrected}</p>
                </div>
            `;
        });
        return html;
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
