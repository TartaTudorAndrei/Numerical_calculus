const InteractiveModule = {
    init() {
        // This will be called whenever content is rendered to hook up interactive elements
        this.renderWidgets();
    },
    renderWidgets() {
        const containers = document.querySelectorAll('.interactive-widget');
        containers.forEach(container => {
            const type = container.dataset.type;
            if (type === 'gauss-seidel') {
                this.setupGaussSeidel(container);
            }
        });
    },
    setupGaussSeidel(container) {
        container.innerHTML = `
            <div class="widget-box">
                <h4>Interactive Gauss-Seidel Step</h4>
                <p>System: $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} x = \\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix}$</p>
                <div class="input-group">
                    <label>Start $x_1$: <input type="number" id="gs-x1" value="0" step="0.1"></label>
                    <label>Start $x_2$: <input type="number" id="gs-x2" value="0" step="0.1"></label>
                </div>
                <button class="nav-btn" id="gs-run">Run 1 Step</button>
                <div id="gs-result" style="margin-top: 1rem; font-weight: bold;"></div>
            </div>
        `;
        
        const btn = container.querySelector('#gs-run');
        const res = container.querySelector('#gs-result');
        const x1In = container.querySelector('#gs-x1');
        const x2In = container.querySelector('#gs-x2');
        
        btn.onclick = () => {
            const x1_0 = parseFloat(x1In.value);
            const x2_0 = parseFloat(x2In.value);
            
            const x1_1 = (3 - x2_0) / 2;
            const x2_1 = (3 - x1_1) / 2;
            
            res.innerHTML = `Result: $x^{(1)} = (${x1_1.toFixed(4)}, ${x2_1.toFixed(4)})^T$`;
            if (window.renderMathInElement) renderMathInElement(res);
        };
        
        if (window.renderMathInElement) renderMathInElement(container);
    }
};
