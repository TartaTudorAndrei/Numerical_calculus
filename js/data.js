const courseData = {
    chapters: [
        {
            id: 'ch1',
            title: 'Numerical Linear Algebra Foundations',
            sections: [
                {
                    id: 'c2-special-matrices',
                    title: 'Special Types of Matrices',
                    content: `
                        <h3>Special Types of Matrices</h3>
                        <p>$\\mathcal{M}_{m,n}(\\mathbb{R})$ denotes the set of $m \\times n$ matrices with real entries. For square matrices, we write $\\mathcal{M}_n(\\mathbb{R}) = \\mathcal{M}_{n,n}(\\mathbb{R})$.</p>
                        
                        <div class="box definition">
                            <span class="box-title">Definition 1: Diagonally Dominant Matrix</span>
                            A matrix $A \\in \\mathcal{M}_n(\\mathbb{R})$ is <strong>diagonally dominant</strong> if:
                            \\[ |a_{ii}| \\ge \\sum_{j \\ne i} |a_{ij}|, \\quad i = 1, \\dots, n \\]
                            Equivalently, this can be expressed as:
                            \\[ 2|a_{ii}| \\ge \\sum_{j=1}^n |a_{ij}| \\]
                        </div>

                        <div class="box definition">
                            <span class="box-title">Definition 2: Strictly Diagonally Dominant (SDD)</span>
                            A matrix is <strong>strictly diagonally dominant</strong> if the inequality is strict for all rows:
                            \\[ |a_{ii}| > \\sum_{j \\ne i} |a_{ij}| \\]
                        </div>

                        <div class="box example">
                            <span class="box-title">Examples</span>
                            1. The matrix 
                            \\[ \\begin{pmatrix} -3 & 2 & 0 \\\\ 1 & 3 & 1 \\\\ 2 & 1 & 4 \\end{pmatrix} \\]
                            is strictly diagonally dominant. <br>
                            2. The matrix
                            \\[ \\begin{pmatrix} -3 & -1 & 1 \\\\ -1 & 2 & 0 \\\\ 1 & -2 & -3 \\end{pmatrix} \\]
                            is diagonally dominant, but <strong>not</strong> strictly diagonally dominant (check the third row: $|-3| = |-1| + |-2|$).
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Theorem 1: Nonsingularity of SDD Matrices</span>
                            A strictly diagonally dominant matrix is nonsingular ($\\det A \\ne 0$).
                        </div>
                        <div class="proof">
                            <strong>Proof by Contradiction:</strong>
                            <ol>
                                <li>Suppose the linear system $AX=0$ has a nonzero solution $x = (x_1, \\dots, x_n)^T$.</li>
                                <li>Let $k$ be an index such that $|x_k| = \\max_{1 \\le j \\le n} |x_j|$. Since $x \\ne 0$, we must have $|x_k| > 0$.</li>
                                <li>The $k$-th equation of the system $AX=0$ is:
                                \\[ \\sum_{j=1}^n a_{kj}x_j = 0 \\implies a_{kk}x_k = -\\sum_{j \\ne k} a_{kj}x_j \\]</li>
                                <li>Taking absolute values and applying the triangle inequality:
                                \\[ |a_{kk}||x_k| = \\left| \\sum_{j \\ne k} a_{kj}x_j \\right| \\le \\sum_{j \\ne k} |a_{kj}||x_j| \\]</li>
                                <li>Since $|x_k|$ is the maximum absolute value, $|x_j| \\le |x_k|$ for all $j$. Thus:
                                \\[ |a_{kk}||x_k| \\le \\left( \\sum_{j \\ne k} |a_{kj}| \\right) |x_k| \\]</li>
                                <li>Since $|x_k| > 0$, we can divide both sides by $|x_k|$ to obtain:
                                \\[ |a_{kk}| \\le \\sum_{j \\ne k} |a_{kj}| \\]</li>
                                <li>This inequality directly contradicts the definition of strict diagonal dominance ($|a_{kk}| > \\sum_{j \\ne k} |a_{kj}|$).</li>
                                <li>Therefore, our initial assumption was false. $AX=0$ has only the trivial solution $X=0$, meaning $A$ is nonsingular.</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c2-positive-definite',
                    title: 'Positive Definite Matrices',
                    content: `
                        <h3>Positive Definite Matrices</h3>
                        <div class="box definition">
                            <span class="box-title">Definition: Positive Definite</span>
                            A matrix $A \\in \\mathcal{M}_n(\\mathbb{R})$ is <strong>positive definite</strong> if:
                            \\[ X^T AX > 0, \\quad \\forall X \\in \\mathbb{R}^n, X \\ne 0 \\]
                            It is <strong>positive semidefinite</strong> if $X^T AX \\ge 0$ for all $X$.
                            For $X=(x_1,\\dots,x_n)^T$, the quadratic form is expanded as:
                            \\[ X^TAX = \\sum_{i=1}^n\\sum_{j=1}^n a_{ij}x_ix_j \\]
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Theorem 2: Properties of Positive Definite Matrices</span>
                            If a matrix $A$ is positive definite, then:
                            <ol>
                                <li>$A$ is nonsingular.</li>
                                <li>The diagonal entries are positive: $a_{kk} > 0$ for all $k = 1, \\dots, n$.</li>
                            </ol>
                        </div>
                        <div class="proof">
                            <strong>Proof:</strong>
                            <ol>
                                <li><strong>Nonsingularity:</strong> If $AX=0$ for some $X \\ne 0$, then $X^TAX = X^T(0) = 0$, which contradicts the definition ($X^TAX > 0$). Thus, $X=0$ is the only solution, and $A$ is nonsingular.</li>
                                <li><strong>Diagonal Entries:</strong> Let $e_k$ be the $k$-th standard basis vector (1 at index $k$, 0 elsewhere). Then $e_k^T A e_k = a_{kk}$. Since $e_k \\ne 0$, we must have $a_{kk} > 0$.</li>
                            </ol>
                        </div>

                        <div class="box remark">
                            <span class="box-title">Important Observations</span>
                            <ul>
                                <li><strong>Converse is false:</strong> Having all $a_{kk} > 0$ does not imply positive definiteness. <br>
                                Example: $A = \\begin{pmatrix} 1 & 10 \\\\ 10 & 1 \\end{pmatrix}$ has $a_{11}=1, a_{22}=1$, but for $X = (1, -1)^T$, $X^TAX = 1 - 20 + 1 = -18 < 0$.</li>
                                <li><strong>SPD Eigenvalues:</strong> If $A$ is Symmetric Positive Definite (SPD), all its eigenvalues are real and positive.</li>
                                <li><strong>Non-symmetric PD:</strong> If $A$ is positive definite but not symmetric, eigenvalues can be complex. <br>
                                Example: $A = \\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix}$. Quadratic form: $x_1(x_1+x_2) + x_2(-x_1+x_2) = x_1^2 + x_2^2 > 0$. <br>
                                Eigenvalues: $\\det(A-\\lambda I) = (1-\\lambda)^2 + 1 = 0 \\implies \\lambda = 1 \\pm i$.</li>
                            </ul>
                        </div>

                        <h3>Constructing SPD Matrices</h3>
                        <p>To obtain an SPD matrix from any random nonsingular matrix $B$, compute $B^T B$ or $BB^T$.</p>
                        <div class="proof">
                            <strong>Derivation:</strong>
                            <ol>
                                <li><strong>Symmetry:</strong> $(B^T B)^T = B^T (B^T)^T = B^T B$.</li>
                                <li><strong>Positive Definiteness:</strong> $X^T (B^T B) X = (BX)^T (BX) = \\|BX\\|_2^2$.</li>
                                <li>Since $B$ is nonsingular, $BX = 0 \\iff X = 0$.</li>
                                <li>For any $X \\ne 0$, $BX \\ne 0$, so $\\|BX\\|_2^2 = \\sum (BX)_i^2 > 0$.</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c2-norms',
                    title: 'Vector and Matrix Norms',
                    content: `
                        <h3>Vector Norms</h3>
                        <div class="box definition">
                            A <strong>vector norm</strong> $\\| \\cdot \\|$ is a function $\\mathbb{R}^n \\to \\mathbb{R}$ satisfying:
                            <ol>
                                <li>$\\|X\\| \\ge 0$ and $\\|X\\| = 0 \\iff X = 0$</li>
                                <li>$\\|\\alpha X\\| = |\\alpha| \\|X\\|$ for all $\\alpha \\in \\mathbb{R}$</li>
                                <li>$\\|X+Y\\| \\le \\|X\\| + \\|Y\\|$ (Triangle Inequality)</li>
                            </ol>
                        </div>
                        
                        <p>Common norms for $X = (x_1, \\dots, x_n)^T$:</p>
                        <ul>
                            <li><strong>Euclidean ($L_2$):</strong> $\\|X\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}$</li>
                            <li><strong>$L_1$ norm:</strong> $\\|X\\|_1 = \\sum_{i=1}^n |x_i|$</li>
                            <li><strong>$L_\\infty$ norm:</strong> $\\|X\\|_\\infty = \\max_{1 \\le i \\le n} |x_i|$</li>
                            <li><strong>$L_p$ norm ($p \\ge 1$):</strong> $\\|X\\|_p = (\\sum |x_i|^p)^{1/p}$</li>
                            <li><strong>Elliptic norm:</strong> $\\|X\\|_A = \\sqrt{X^T AX}$ (where $A$ is SPD)</li>
                        </ul>

                        <h3>Matrix Norms</h3>
                        <div class="box definition">
                            The <strong>induced (natural) matrix norm</strong> associated with a vector norm is:
                            \\[ \\|A\\| = \\sup_{X \\ne 0} \\frac{\\|AX\\|}{\\|X\\|} = \\max_{\\|X\\|=1} \\|AX\\| \\]
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Common Induced Norm Formulas</span>
                            <ul>
                                <li><strong>Infinity norm (Max Row Sum):</strong> $\\|A\\|_\\infty = \\max_{1 \\le i \\le m} \\sum_{j=1}^n |a_{ij}|$</li>
                                <li><strong>1-norm (Max Column Sum):</strong> $\\|A\\|_1 = \\max_{1 \\le j \\le n} \\sum_{i=1}^m |a_{ij}|$</li>
                                <li><strong>2-norm (Spectral norm):</strong> $\\|A\\|_2 = \\sqrt{\\rho(A^T A)}$</li>
                            </ul>
                        </div>

                        <h3>Frobenius Norm</h3>
                        \\[ \\|A\\|_F = \\sqrt{\\sum \\sum a_{ij}^2} = \\sqrt{\\text{Tr}(A^T A)} \\]
                        <strong>Note:</strong> The Frobenius norm is <strong>not</strong> an induced norm, but it is <strong>submultiplicative</strong>: $\\|AB\\|_F \\le \\|A\\|_F \\|B\\|_F$.

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: Matrix Norms</span>
                            Consider the matrix $A = \\begin{pmatrix} 1 & -2 \\\\ -3 & 4 \\end{pmatrix}$. Let's compute its 1-norm, infinity norm, and Frobenius norm.<br><br>
                            <strong>Step 1: Compute the 1-norm (Max Column Sum)</strong>
                            <ol>
                                <li>Column 1 absolute sum: $|1| + |-3| = 1 + 3 = 4$</li>
                                <li>Column 2 absolute sum: $|-2| + |4| = 2 + 4 = 6$</li>
                                <li>$\\|A\\|_1 = \\max(4, 6) = 6$</li>
                            </ol>
                            <strong>Step 2: Compute the Infinity norm (Max Row Sum)</strong>
                            <ol>
                                <li>Row 1 absolute sum: $|1| + |-2| = 1 + 2 = 3$</li>
                                <li>Row 2 absolute sum: $|-3| + |4| = 3 + 4 = 7$</li>
                                <li>$\\|A\\|_\\infty = \\max(3, 7) = 7$</li>
                            </ol>
                            <strong>Step 3: Compute the Frobenius norm</strong>
                            <ol>
                                <li>Sum of squares of all elements: $1^2 + (-2)^2 + (-3)^2 + 4^2$</li>
                                <li>$= 1 + 4 + 9 + 16 = 30$</li>
                                <li>$\\|A\\|_F = \\sqrt{30} \\approx 5.477$</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c3-spectral-radius',
                    title: 'Spectral Radius & Symmetric Matrices',
                    content: `
                        <h3>Spectral Radius</h3>
                        <div class="box definition">
                            The <strong>spectral radius</strong> $\\rho(A)$ is the maximum absolute value of the eigenvalues:
                            \\[ \\rho(A) = \\max \\{|\\lambda_1|, \\dots, |\\lambda_n|\\} \\]
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Theorem 3.1: Spectral Radius Bound</span>
                            For any induced (natural) norm, $\\rho(A) \\le \\|A\\|$.
                        </div>
                        <div class="proof">
                            <strong>Proof:</strong>
                            <ol>
                                <li>Let $\\lambda_0$ be an eigenvalue such that $|\\lambda_0| = \\rho(A)$.</li>
                                <li>Let $X_0 \\ne 0$ be a corresponding eigenvector: $AX_0 = \\lambda_0 X_0$.</li>
                                <li>By the definition of the induced norm:
                                \\[ \\|A\\| = \\sup_{X \\ne 0} \\frac{\\|AX\\|}{\\|X\\|} \\ge \\frac{\\|AX_0\\|}{\\|X_0\\|} = \\frac{\\|\\lambda_0 X_0\\|}{\\|X_0\\|} = \\frac{|\\lambda_0|\\|X_0\\|}{\\|X_0\\|} = |\\lambda_0| = \\rho(A) \\]</li>
                            </ol>
                        </div>

                        <h3>Symmetric Matrix Properties</h3>
                        <p>If $A$ is symmetric ($A = A^T$):</p>
                        <ol>
                            <li>All eigenvalues are real.</li>
                            <li>$A$ is orthogonally diagonalizable: $A = Q \\Lambda Q^T$, where $Q^{-1} = Q^T$ and $\\Lambda$ is diagonal.</li>
                            <li>$A^T A$ is always symmetric and positive semidefinite (eigenvalues $\\ge 0$).</li>
                        </ol>

                        <div class="box theorem">
                            <span class="box-title">Theorem 3.2: Rayleigh Quotient Bound</span>
                            Let $B$ be symmetric with eigenvalues $\\lambda_1 \\le \\dots \\le \\lambda_n$. Then for any $x$ with $\\|x\\|_2=1$:
                            \\[ x^T B x \\le \\lambda_n = \\rho(B) \\]
                        </div>
                        <div class="proof">
                            <strong>Proof:</strong>
                            <ol>
                                <li>Since $B$ is symmetric, $B = Q \\Lambda Q^T$ for orthogonal $Q$.</li>
                                <li>Let $y = Q^T x$. Since $Q$ is orthogonal, $\\|y\\|_2 = \\|x\\|_2 = 1$.</li>
                                <li>$x^T B x = x^T Q \\Lambda Q^T x = y^T \\Lambda y = \\sum_{i=1}^n \\lambda_i y_i^2$.</li>
                                <li>Since $y_i^2 \\ge 0$ and $\\lambda_i \\le \\lambda_n$:
                                \\[ \\sum_{i=1}^n \\lambda_i y_i^2 \\le \\lambda_n \\sum_{i=1}^n y_i^2 = \\lambda_n(1) = \\lambda_n = \\rho(B) \\]</li>
                            </ol>
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Theorem 3.3: Formula for the 2-norm</span>
                            For any matrix $A$, $\|A\|_2 = \\sqrt{\\rho(A^T A)}$.
                        </div>
                        <div class="proof">
                            <strong>Proof Idea:</strong>
                            <ol>
                                <li>$\\|AX\\|_2^2 = (AX)^T(AX) = X^T(A^T A)X$.</li>
                                <li>Let $B = A^T A$. $B$ is symmetric and positive semidefinite.</li>
                                <li>By Theorem 3.2, $X^T B X \\le \\rho(B)$ for $\\|X\\|_2=1$. Thus $\\|A\\|_2^2 \\le \\rho(A^T A)$.</li>
                                <li>Now let $u$ be the eigenvector of $A^T A$ for $\\lambda_{\\max}$. Then $\\|Au\\|_2^2 = u^T A^T A u = \\lambda_{\\max} u^T u = \\rho(A^T A)$.</li>
                                <li>Thus the maximum is attained, and $\\|A\\|_2 = \\sqrt{\\rho(A^T A)}$.</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c3-error-estimation',
                    title: 'Error Estimation & Condition Number',
                    content: `
                        <h3>Conditioning of Linear Systems</h3>
                        <p>Consider $Ax=b$. Let $\\bar{x}$ be an approximation and $r = b - A\\bar{x}$ the residual. Note that $r = A(x - \\bar{x})$.</p>
                        
                        <div class="box theorem">
                            <span class="box-title">Theorem 3.4: Relative Error Bound</span>
                            For any natural norm:
                            \\[ \\frac{\\|x - \\bar{x}\\|}{\\|x\\|} \\le K(A) \\frac{\\|r\\|}{\\|b\\|} \\]
                            where $K(A) = \\|A\\| \\|A^{-1}\\|$ is the <strong>condition number</strong>.
                        </div>
                        <div class="proof">
                            <strong>Proof:</strong>
                            <ol>
                                <li>$x - \\bar{x} = A^{-1} r \\implies \\|x - \\bar{x}\\| \\le \\|A^{-1}\\| \\|r\\|$.</li>
                                <li>$b = Ax \\implies \\|b\\| \\le \\|A\\| \\|x\\| \\implies \\frac{1}{\\|x\\|} \\le \\frac{\\|A\\|}{\\|b\\|}$.</li>
                                <li>Multiplying these inequalities: $\\frac{\\|x - \\bar{x}\\|}{\\|x\\|} \\le \\|A^{-1}\\| \\|r\\| \\frac{\\|A\\|}{\\|b\\|} = K(A) \\frac{\\|r\\|}{\\|b\\|}$.</li>
                            </ol>
                        </div>

                        <div class="box remark">
                            <span class="box-title">Kahan Example (Ill-conditioning)</span>
                            Matrix $A = \\begin{pmatrix} 1 & 1 \\\\ 1.0001 & 1 \\end{pmatrix}, b = \\begin{pmatrix} 2 \\\\ 2.0001 \\end{pmatrix}$. Exact $x = (1, 1)^T$. <br>
                            Approx $\\bar{x} = (2, 0)^T \\implies r = (0, -0.0002)^T$. $\\|r\\|_\\infty = 0.0002$. <br>
                            Relative error $\\|x - \\bar{x}\\|_\\infty = 1$. <br>
                            $A^{-1} = \\begin{pmatrix} -10000 & 10000 \\\\ 10001 & -10000 \\end{pmatrix} \\implies K_\\infty(A) = 2.0001 \\times 20001 = 40004$. <br>
                            High $K(A)$ means small residual does NOT imply small error.
                        </div>

                        <h3>Stability and Orthogonal Matrices</h3>
                        <p><strong>Result:</strong> Orthogonal matrices have $K_2(Q) = 1$.</p>
                        <div class="proof">
                            $K_2(Q) = \\|Q\\|_2 \\|Q^{-1}\\|_2 = \\|Q\\|_2 \\|Q^T\\|_2$. <br>
                            $\\|Q\\|_2 = \\sqrt{\\rho(Q^T Q)} = \\sqrt{\\rho(I)} = 1$. Similarly $\\|Q^T\\|_2 = 1$. <br>
                            Thus, orthogonal transformations are perfectly stable.
                        </div>

                        <h3>Solvers for Ill-conditioned Systems</h3>
                        <ol>
                            <li><strong>Preconditioning:</strong> Solve $M^{-1}Ax = M^{-1}b$ to lower the condition number.</li>
                            <li><strong>QR Decomposition:</strong> $A = QR$ where $Q$ is orthogonal. $K_2(A) = K_2(R)$.</li>
                            <li><strong>SVD:</strong> $A = UDV^T$. Singular values $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$. $K_2(A) = \\sigma_{\\max} / \\sigma_{\\min}$.</li>
                        </ol>
                    `
                }
            ]
        },
        {
            id: 'ch2',
            title: 'Systems of Linear Equations',
            sections: [
                {
                    id: 'c4-lu-decomposition',
                    title: 'LU Decomposition & Factorizations',
                    content: `
                        <h3>LU Decomposition</h3>
                        <p>Factor $A = L \\cdot U$, where $L$ is lower triangular and $U$ is upper triangular.</p>
                        
                        <div class="box definition">
                            <span class="box-title">Types of Factorizations</span>
                            <ul>
                                <li><strong>Doolittle:</strong> $l_{ii}=1$ (unit lower triangular).</li>
                                <li><strong>Crout:</strong> $u_{ii}=1$ (unit upper triangular).</li>
                                <li><strong>Cholesky:</strong> $A = LL^T$ (for SPD matrices).</li>
                            </ul>
                        </div>

                        <div class="box example">
                            <span class="box-title">Full Step-by-Step Example</span>
                            Solve $\\begin{pmatrix} 2 & 3 & 1 \\\\ 4 & 7 & 7 \\\\ -2 & 4 & 5 \\end{pmatrix} x = \\begin{pmatrix} 1 \\\\ 11 \\\\ 4 \\end{pmatrix}$.
                            <br><br>
                            <strong>Step 1: Finding $L$ and $U$</strong>
                            <br>Start with $U = A$ and $L = I$:
                            <ol>
                                <li>
                                    <strong>Eliminate column 1:</strong><br>
                                    Multiplier $l_{21} = \\frac{4}{2} = 2$. Row 2 $\\leftarrow$ Row 2 $- 2 \\times$ Row 1.<br>
                                    Multiplier $l_{31} = \\frac{-2}{2} = -1$. Row 3 $\\leftarrow$ Row 3 $- (-1) \\times$ Row 1.<br>
                                    Resulting matrix: $\\begin{pmatrix} 2 & 3 & 1 \\\\ 0 & 1 & 5 \\\\ 0 & 7 & 6 \\end{pmatrix}$.
                                </li>
                                <li>
                                    <strong>Eliminate column 2:</strong><br>
                                    Multiplier $l_{32} = \\frac{7}{1} = 7$. Row 3 $\\leftarrow$ Row 3 $- 7 \\times$ Row 2.<br>
                                    Resulting $U = \\begin{pmatrix} 2 & 3 & 1 \\\\ 0 & 1 & 5 \\\\ 0 & 0 & -29 \\end{pmatrix}$.
                                </li>
                            </ol>
                            Construct $L$ using the multipliers: $L = \\begin{pmatrix} 1 & 0 & 0 \\\\ l_{21} & 1 & 0 \\\\ l_{31} & l_{32} & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & 7 & 1 \\end{pmatrix}$.
                            <br><br>
                            <strong>Step 2: Forward Substitution ($Ly = b$)</strong>
                            \\[ y_1 = 1 \\]
                            \\[ 2(1) + y_2 = 11 \\implies y_2 = 9 \\]
                            \\[ -1(1) + 7(9) + y_3 = 4 \\implies y_3 = 4 - 62 = -58 \\]
                            <strong>Step 3: Backward Substitution ($Ux = y$)</strong>
                            \\[ -29x_3 = -58 \\implies x_3 = 2 \\]
                            \\[ 1x_2 + 5(2) = 9 \\implies x_2 = -1 \\]
                            \\[ 2x_1 + 3(-1) + 1(2) = 1 \\implies x_1 = 1 \\]
                            Solution: $x = (1, -1, 2)^T$.
                        </div>
                    `
                },
                {
                    id: 'c4-pivoting',
                    title: 'Pivoting & Stability',
                    content: `
                        <h3>Pivoting for Stability</h3>
                        <p>Small diagonal entries cause large multipliers, leading to rounding errors.</p>
                        <div class="box example">
                            $A = \\begin{pmatrix} 10^{-20} & 1 \\\\ 1 & 1 \\end{pmatrix}$. $K(A) \\approx 4$.
                            <ul>
                                <li><strong>No Pivoting:</strong> $L = \\begin{pmatrix} 1 & 0 \\\\ 10^{20} & 1 \\end{pmatrix}, U = \\begin{pmatrix} 10^{-20} & 1 \\\\ 0 & -10^{20} \\end{pmatrix}$. The $10^{20}$ term dwarfs all others, losing precision.</li>
                                <li><strong>Partial Pivoting:</strong> Swap rows to get $\\begin{pmatrix} 1 & 1 \\\\ 10^{-20} & 1 \\end{pmatrix}$. $L = \\begin{pmatrix} 1 & 0 \\\\ 10^{-20} & 1 \\end{pmatrix}, U = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1-10^{-20} \\end{pmatrix}$. Stable!</li>
                            </ul>
                        </div>
                    `
                },
                {
                    id: 'c4-iterative-methods',
                    title: 'Iterative Methods (Jacobi, GS, SOR)',
                    content: `
                        <h3>General Framework</h3>
                        <p>Split $A = M - N$ where $M$ is invertible. The iteration is $x^{(k+1)} = M^{-1}Nx^{(k)} + M^{-1}b$. <br>
                        Convergence happens $\\iff \\rho(M^{-1}N) < 1$.</p>

                        <div class="box theorem">
                            <span class="box-title">Jordan Block Convergence Logic</span>
                            To prove $A_1^k \\to 0$ if $\\rho(A_1) < 1$:
                            <ol>
                                <li>$A_1 = X J X^{-1}$. $A_1^k = X J^k X^{-1}$.</li>
                                <li>A Jordan block $J_1 = \\lambda I + F$. $J_1^k = \\sum_{j=0}^{\\text{size}-1} \\binom{k}{j} \\lambda^{k-j} F^j$.</li>
                                <li>If $|\\lambda| < 1$, the term $\\binom{k}{j} \\lambda^{k-j}$ tends to $0$ as $k \\to \\infty$.</li>
                                <li>Thus $J^k \\to 0$, and $A_1^k \\to 0$.</li>
                            </ol>
                        </div>

                        <h3>Method Derivations</h3>
                        <p>Let $A = D + L + U$ (Diagonal, strictly Lower, strictly Upper).</p>

                        <div class="box algorithm">
                            <span class="box-title">Jacobi Method</span>
                            Split: $M = D, N = -(L+U)$. <br>
                            Iteration: $x^{(k+1)} = -D^{-1}(L+U)x^{(k)} + D^{-1}b$. <br>
                            Matrix: $A_J = I - D^{-1}A$.
                        </div>

                        <div class="box algorithm">
                            <span class="box-title">Gauss-Seidel (GS)</span>
                            Split: $M = D+L, N = -U$. <br>
                            Iteration: $x^{(k+1)} = -(D+L)^{-1}Ux^{(k)} + (D+L)^{-1}b$. <br>
                            Advantage: Uses updated values $x_j^{(k+1)}$ for $j < i$ immediately.
                        </div>

                        <div class="box algorithm">
                            <span class="box-title">SOR (Successive Over-Relaxation)</span>
                            Interpolate GS with parameter $\\omega$: $x^{(k+1)} = (1-\\omega)x^{(k)} + \\omega x^{(GS)}$. <br>
                            Split: $M = \\frac{1}{\\omega}(D+\\omega L), N = \\frac{1}{\\omega}((1-\\omega)D - \\omega U)$. <br>
                            Optimal $\\omega = 1 + [\\mu / (1 + \\sqrt{1-\\mu^2})]^2$ where $\\mu = \\rho(A_J)$.
                        </div>

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: Jacobi & Gauss-Seidel</span>
                            Solve the system $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix}$ starting with $x^{(0)} = (0, 0)^T$.<br><br>
                            The equations are:
                            \\[ 2x_1 + x_2 = 3 \\implies x_1 = \\frac{1}{2}(3 - x_2) \\]
                            \\[ x_1 + 2x_2 = 3 \\implies x_2 = \\frac{1}{2}(3 - x_1) \\]
                            <strong>Jacobi Method (Step 1):</strong>
                            <ol>
                                <li>$x_1^{(1)} = \\frac{1}{2}(3 - x_2^{(0)}) = \\frac{1}{2}(3 - 0) = 1.5$</li>
                                <li>$x_2^{(1)} = \\frac{1}{2}(3 - x_1^{(0)}) = \\frac{1}{2}(3 - 0) = 1.5$</li>
                            </ol>
                            So $x^{(1)} = (1.5, 1.5)^T$.<br><br>
                            <strong>Gauss-Seidel Method (Step 1):</strong>
                            <ol>
                                <li>$x_1^{(1)} = \\frac{1}{2}(3 - x_2^{(0)}) = \\frac{1}{2}(3 - 0) = 1.5$</li>
                                <li>For $x_2^{(1)}$, use the newly computed $x_1^{(1)}$: <br>$x_2^{(1)} = \\frac{1}{2}(3 - x_1^{(1)}) = \\frac{1}{2}(3 - 1.5) = \\frac{1.5}{2} = 0.75$</li>
                            </ol>
                            So $x^{(1)} = (1.5, 0.75)^T$.
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch3',
            title: 'The Least Squares Method',
            sections: [
                {
                    id: 'c5-least-squares-intro',
                    title: 'The Least Squares Problem',
                    content: `
                        <h3>Problem Statement</h3>
                        <p>Find $f(x) = ax + b$ minimizing $S(a, b) = \\sum_{i=1}^n (y_i - (ax_i + b))^2$.</p>

                        <div class="box theorem">
                            <span class="box-title">Derivation of Normal Equations</span>
                            We seek the minimum by setting partial derivatives to zero:
                            <ol>
                                <li>$\\frac{\\partial S}{\\partial a} = \\sum 2(y_i - ax_i - b)(-x_i) = 0 \\implies a \\sum x_i^2 + b \\sum x_i = \\sum x_i y_i$</li>
                                <li>$\\frac{\\partial S}{\\partial b} = \\sum 2(y_i - ax_i - b)(-1) = 0 \\implies a \\sum x_i + b \\cdot n = \\sum y_i$</li>
                            </ol>
                            In matrix form, this is $A^T A \\tilde{x} = A^T y$.
                        </div>

                        <div class="box example">
                            <span class="box-title">Regression Line Example</span>
                            Data points $(x_i, y_i)$: (20,30), (22,35), (25,40), (23,38), (27,45). <br><br>
                            <strong>Step 1: Calculate the sums</strong>
                            <ul>
                                <li>$n = 5$</li>
                                <li>$\\sum x_i = 20 + 22 + 25 + 23 + 27 = 117$</li>
                                <li>$\\sum y_i = 30 + 35 + 40 + 38 + 45 = 188$</li>
                                <li>$\\sum x_i^2 = 20^2 + 22^2 + 25^2 + 23^2 + 27^2 = 400 + 484 + 625 + 529 + 729 = 2767$</li>
                                <li>$\\sum x_i y_i = 20(30) + 22(35) + 25(40) + 23(38) + 27(45) = 600 + 770 + 1000 + 874 + 1215 = 4459$</li>
                            </ul>
                            <strong>Step 2: Set up the Normal Equations</strong>
                            \\[ \\begin{pmatrix} \\sum x_i^2 & \\sum x_i \\\\ \\sum x_i & n \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} \\sum x_i y_i \\\\ \\sum y_i \\end{pmatrix} \\]
                            \\[ \\begin{pmatrix} 2767 & 117 \\\\ 117 & 5 \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} 4459 \\\\ 188 \\end{pmatrix} \\]
                            <strong>Step 3: Solve the system</strong>
                            \\[ a = \\frac{n\\sum x_i y_i - (\\sum x_i)(\\sum y_i)}{n\\sum x_i^2 - (\\sum x_i)^2} = \\frac{5(4459) - (117)(188)}{5(2767) - (117)^2} = \\frac{22295 - 21996}{13835 - 13689} = \\frac{299}{146} \\approx 2.047 \\]
                            \\[ b = \\frac{1}{n} \\left( \\sum y_i - a \\sum x_i \\right) = \\frac{1}{5} \\left( 188 - \\frac{299}{146}(117) \\right) = \\frac{1}{5} \\left( \\frac{27448 - 34983}{146} \\right) = -\\frac{1507}{146} \\approx -10.32 \\]
                            Line equation: $y = 2.047x - 10.32$.
                        </div>
                    `
                },
                {
                    id: 'c5-qr-least-squares',
                    title: 'QR Factorization for Least Squares',
                    content: `
                        <h3>Why QR?</h3>
                        <p>Computing $A^T A$ is numerically unstable ($K_2(A^T A) = K_2(A)^2$). QR is better.</p>

                        <div class="box theorem">
                            <span class="box-title">Proof: QR Gives the Minimizer</span>
                            Any vector $v$ can be decomposed as $v = QQ^T v + (I - QQ^T) v$ (Projection + Orthogonal component). <br>
                            By Pythagoras: $\\|v\\|_2^2 = \\|QQ^T v\\|_2^2 + \\|(I - QQ^T) v\\|_2^2$. <br>
                            Let $v = Ax - y = QRx - y$. <br>
                            $\\|QRx - y\\|_2^2 = \\|Q(Rx - Q^T y)\\|_2^2 + \\|(QQ^T - I) y\\|_2^2$. <br>
                            Since $Q$ preserves norm: $\\|QRx - y\\|_2^2 = \\|Rx - Q^T y\\|_2^2 + \\|(QQ^T - I) y\\|_2^2$. <br>
                            The second term is constant. The first term is minimized (to 0) when $Rx = Q^T y$.
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch4',
            title: 'Nonlinear Equations',
            sections: [
                {
                    id: 'c6-convergence-order',
                    title: 'Convergence Analysis',
                    content: `
                        <h3>Order of Convergence Examples</h3>
                        <ul>
                            <li><strong>Linear ($p=1$):</strong> $x_{n+1} = x_n/2$. Error $e_{n+1} = e_n/2$. Ratio $e_{n+1}/e_n = 1/2$.</li>
                            <li><strong>Quadratic ($p=2$):</strong> $x_{n+1} = x_n^2$ for $x_0 \\in (0,1)$. Error $e_{n+1} = e_n^2$. Ratio $e_{n+1}/e_n^2 = 1$.</li>
                        </ul>

                        <div class="box theorem">
                            <span class="box-title">Proof: Order of Fixed Point Iteration</span>
                            Let $F$ have a fixed point $x^*$. If $F'(x^*) = \\dots = F^{(p-1)}(x^*) = 0$ and $F^{(p)}(x^*) \\ne 0$:
                            <ol>
                                <li>Taylor expand $F(x_n)$ about $x^*$:
                                \\[ x_{n+1} = F(x^*) + F'(x^*)(x_n-x^*) + \\dots + \\frac{F^{(p)}(\\xi)}{p!}(x_n-x^*)^p \\]</li>
                                <li>Since $F(x^*) = x^*$ and higher derivatives are zero:
                                \\[ x_{n+1} - x^* = \\frac{F^{(p)}(\\xi)}{p!}(x_n-x^*)^p \\]</li>
                                <li>Ratio: $\\lim_{n \\to \\infty} \\frac{|e_{n+1}|}{|e_n|^p} = \\frac{|F^{(p)}(x^*)|}{p!} = C$. Order is $p$.</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c6-bisection',
                    title: 'Bisection Method',
                    content: `
                        <h3>Bisection Method</h3>
                        <p>Repeat interval halving where $f(a)f(b) < 0$.</p>
                        <div class="box theorem">
                            <span class="box-title">Proof: Error Bound</span>
                            Interval size at step $n$ is $(b-a)/2^n$. <br>
                            Since the root $x^*$ and iterate $c_n$ are both in $[a_n, b_n]$:
                            \\[ |c_n - x^*| \\le \\frac{b_n - a_n}{2} = \\frac{b-a}{2^{n+1}} \\]
                            This ensures convergence, though slow.
                        </div>

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: Bisection Method</span>
                            Find the root of $f(x) = x^2 - 2$ on $[1, 2]$ to approximate $\\sqrt{2}$.<br><br>
                            <strong>Initialization:</strong> $a_0 = 1$, $b_0 = 2$. $f(1) = 1^2 - 2 = -1 < 0$ and $f(2) = 2^2 - 2 = 2 > 0$.<br><br>
                            <strong>Step 1:</strong>
                            <ol>
                                <li>Midpoint: $c_0 = \\frac{1 + 2}{2} = 1.5$</li>
                                <li>Evaluate: $f(1.5) = (1.5)^2 - 2 = 2.25 - 2 = 0.25 > 0$</li>
                                <li>Since $f(a_0)$ and $f(c_0)$ have opposite signs ($-1$ and $0.25$), the new interval is $[a_1, b_1] = [1, 1.5]$.</li>
                            </ol>
                            <strong>Step 2:</strong>
                            <ol>
                                <li>Midpoint: $c_1 = \\frac{1 + 1.5}{2} = 1.25$</li>
                                <li>Evaluate: $f(1.25) = (1.25)^2 - 2 = 1.5625 - 2 = -0.4375 < 0$</li>
                                <li>Since $f(c_1)$ and $f(b_1)$ have opposite signs ($-0.4375$ and $0.25$), the new interval is $[a_2, b_2] = [1.25, 1.5]$.</li>
                            </ol>
                            After 2 steps, the root is bracketed in $[1.25, 1.5]$.
                        </div>
                    `
                },
                {
                    id: 'c7-newton-method',
                    title: "Newton's Method",
                    content: `
                        <h3>Newton's Method</h3>
                        \\[ x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)} \\]
                        <p><strong>Geometric Meaning:</strong> $x_{n+1}$ is the intersection of the tangent line at $(x_n, f(x_n))$ with the $x$-axis.</p>

                        <div class="box theorem">
                            <span class="box-title">Proof Idea (Case 1: $f', f'' > 0$)</span>
                            <ol>
                                <li>Let $x_0 > x^*$. Use Taylor expansion: $0 = f(x^*) = f(x_n) + f'(x_n)(x^* - x_n) + \\frac{f''(t)}{2}(x^* - x_n)^2$.</li>
                                <li>Rearrange: $x^* - (x_n - \\frac{f(x_n)}{f'(x_n)}) = -\\frac{f''(t)}{2f'(x_n)}(x^* - x_n)^2$.</li>
                                <li>Thus $x^* - x_{n+1} = -\\frac{f''(t)}{2f'(x_n)} e_n^2$.</li>
                                <li>Since $f'', f' > 0$, $x_{n+1} > x^*$. The sequence is decreasing and bounded, thus converges.</li>
                            </ol>
                        </div>

                        <h3>Chebyshev Method</h3>
                        <p>Higher order method derived from $h = f^{-1}$ Taylor expansion.</p>
                        <div class="proof">
                            $x^* = h(0) = h(f(x)) + h'(f(x))(0-f(x)) + \\frac{h''(f(x))}{2}(0-f(x))^2 + \\dots$ <br>
                            $a_1(x) = h'(f(x)) = 1/f'(x)$. <br>
                            $a_2(x) = h''(f(x)) = (a_1'(x))/f'(x) = -f''(x)/(f'(x))^3$. <br>
                            For $p=2$, $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)} - \\frac{f(x_n)^2 f''(x_n)}{2(f'(x_n))^3}$. (Order 3).
                        </div>

                        <h3>Secant Method</h3>
                        \\[ x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} \\]
                        <p>Approximates the derivative using the secant line through the last two iterates.</p>

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: Newton, Secant & Chebyshev</span>
                            Find the root of $f(x) = x^2 - 2$ with $f'(x) = 2x$ and $f''(x) = 2$.<br><br>
                            <strong>Newton's Method (Start $x_0 = 1.5$):</strong>
                            <ol>
                                <li>$f(1.5) = 2.25 - 2 = 0.25$, $f'(1.5) = 2(1.5) = 3$</li>
                                <li>$x_1 = 1.5 - \\frac{0.25}{3} = 1.5 - 0.0833 = 1.4167$</li>
                            </ol>
                            <strong>Secant Method (Start $x_0 = 1, x_1 = 1.5$):</strong>
                            <ol>
                                <li>$f(1) = -1$, $f(1.5) = 0.25$</li>
                                <li>$x_2 = 1.5 - (0.25)\\frac{1.5 - 1}{0.25 - (-1)} = 1.5 - 0.25\\frac{0.5}{1.25} = 1.5 - 0.1 = 1.4$</li>
                            </ol>
                            <strong>Chebyshev Method (Start $x_0 = 1.5$):</strong>
                            <ol>
                                <li>Recall $x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)} - \\frac{f(x_0)^2 f''(x_0)}{2(f'(x_0))^3}$</li>
                                <li>$x_1 = 1.5 - \\frac{0.25}{3} - \\frac{(0.25)^2 (2)}{2(3)^3} = 1.5 - 0.0833 - \\frac{0.125}{54} = 1.4167 - 0.0023 = 1.4144$</li>
                            </ol>
                        </div>


                        <h3>False Position Method (Regula Falsi)</h3>
                        <p>Generates an approximation using a secant line but bracketed by points with opposite signs.</p>
                        <div class="box example">
                            <span class="box-title">Regula Falsi Example</span>
                            Find the root of $f(x) = 2x^3 - 4x^2 + 3x$ on $[-1, 1]$.<br><br>
                            <strong>Step 1: Check interval endpoints</strong>
                            <ul>
                                <li>$x_0 = -1 \implies f(x_0) = 2(-1)^3 - 4(-1)^2 + 3(-1) = -2 - 4 - 3 = -9$</li>
                                <li>$x_1 = 1 \implies f(x_1) = 2(1)^3 - 4(1)^2 + 3(1) = 2 - 4 + 3 = 1$</li>
                            </ul>
                            Since $f(x_0)f(x_1) = (-9)(1) = -9 < 0$, the root is bracketed.
                            <br><br>
                            <strong>Step 2: Calculate the next iterate $x_2$</strong>
                            \\[ x_2 = \\frac{x_0 f(x_1) - x_1 f(x_0)}{f(x_1) - f(x_0)} = \\frac{-1(1) - 1(-9)}{1 - (-9)} = \\frac{-1 + 9}{10} = \\frac{8}{10} = 0.8 \\]
                            <strong>Step 3: Evaluate function at new point to determine next interval</strong>
                            \\[ f(x_2) = f(0.8) = 2(0.8)^3 - 4(0.8)^2 + 3(0.8) = 2(0.512) - 4(0.64) + 2.4 = 1.024 - 2.56 + 2.4 = 0.864 \\]
                            Because $f(x_0) = -9$ and $f(x_2) = 0.864$ have opposite signs, the new bracket is $[-1, 0.8]$.
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch5',
            title: 'Nonlinear Systems & Interpolation',
            sections: [
                {
                    id: 'c8-nonlinear-systems',
                    title: 'Nonlinear Systems',
                    content: `
                        <h3>Newton's Method for Systems</h3>
                        \\[ x^{(k+1)} = x^{(k)} + m^{(k)} \\text{ where } J(x^{(k)}) m^{(k)} = -F(x^{(k)}) \\]
                        $J$ is the Jacobian matrix.
                        <div class="box example">
                            <span class="box-title">Newton System Example</span>
                            Solve $\\{x^2+y^2=3, e^x+y=1\\}$ starting at $(x^{(0)}, y^{(0)}) = (1,0)$.<br><br>
                            <strong>Step 1: Define $F(x,y)$ and evaluate at $(1,0)$</strong>
                            \\[ F(x,y) = \\begin{pmatrix} x^2+y^2-3 \\\\ e^x+y-1 \\end{pmatrix} \\implies F(1,0) = \\begin{pmatrix} 1^2+0^2-3 \\\\ e^1+0-1 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ e-1 \\end{pmatrix} \\]
                            <strong>Step 2: Evaluate the Jacobian $J$ at $(1,0)$</strong>
                            \\[ J(x,y) = \\begin{pmatrix} 2x & 2y \\\\ e^x & 1 \\end{pmatrix} \\implies J(1,0) = \\begin{pmatrix} 2(1) & 2(0) \\\\ e^1 & 1 \\end{pmatrix} = \\begin{pmatrix} 2 & 0 \\\\ e & 1 \\end{pmatrix} \\]
                            <strong>Step 3: Solve the linear system $J w^{(0)} = -F$</strong>
                            \\[ \\begin{pmatrix} 2 & 0 \\\\ e & 1 \\end{pmatrix} \\begin{pmatrix} w_1^{(0)} \\\\ w_2^{(0)} \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1-e \\end{pmatrix} \\]
                            Using forward substitution:
                            <ol>
                                <li>$2w_1^{(0)} = 2 \\implies w_1^{(0)} = 1$</li>
                                <li>$e(1) + w_2^{(0)} = 1 - e \\implies w_2^{(0)} = 1 - 2e$</li>
                            </ol>
                            <strong>Step 4: Update the vector</strong>
                            \\[ \\begin{pmatrix} x^{(1)} \\\\ y^{(1)} \\end{pmatrix} = \\begin{pmatrix} x^{(0)} \\\\ y^{(0)} \\end{pmatrix} + \\begin{pmatrix} w_1^{(0)} \\\\ w_2^{(0)} \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + \\begin{pmatrix} 1 \\\\ 1-2e \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1-2e \\end{pmatrix} \\]
                        </div>
                    `
                },
                {
                    id: 'c8-interpolation-error',
                    title: 'Interpolation Error',
                    content: `
                        <h3>Interpolation Error Proof</h3>
                        <div class="box theorem">
                            $f(x) - P_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!} \\prod (x-x_i)$.
                        </div>
                        <div class="proof">
                            Define $Y(t) = R_n(t) - \\frac{R_n(x)}{\\ell(x)} \\ell(t)$. <br>
                            $Y(t)$ has $n+2$ roots (at $x_i$ and $x$). <br>
                            By Rolle's theorem, $Y'(t)$ has $n+1$ roots, ..., $Y^{(n+1)}(t)$ has 1 root $\\xi$. <br>
                            $0 = Y^{(n+1)}(\\xi) = f^{(n+1)}(\\xi) - \\frac{R_n(x)}{\\ell(x)} (n+1)!$. <br>
                            Solving for $R_n(x)$ gives the theorem.
                        </div>

                        <h3>Lagrange Interpolation</h3>
                        <div class="box example">
                            <span class="box-title">Lagrange Interpolation Example</span>
                            Find the interpolating polynomial through $(0,1), (1,3), (2,2)$.<br><br>
                            <strong>Step 1: Calculate the basis polynomials $L_i(x)$</strong>
                            <ol>
                                <li>$L_0(x) = \\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)} = \\frac{(x-1)(x-2)}{(0-1)(0-2)} = \\frac{x^2 - 3x + 2}{2}$</li>
                                <li>$L_1(x) = \\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)} = \\frac{(x-0)(x-2)}{(1-0)(1-2)} = \\frac{x^2 - 2x}{-1} = -x^2 + 2x$</li>
                                <li>$L_2(x) = \\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)} = \\frac{(x-0)(x-1)}{(2-0)(2-1)} = \\frac{x^2 - x}{2}$</li>
                            </ol>
                            <strong>Step 2: Construct the polynomial $P_2(x) = \\sum y_i L_i(x)$</strong>
                            \\[ P_2(x) = 1 \\cdot \\frac{x^2 - 3x + 2}{2} + 3(-x^2 + 2x) + 2 \\cdot \\frac{x^2 - x}{2} \\]
                            <strong>Step 3: Algebraic Simplification</strong>
                            \\[ P_2(x) = \\left(\\frac{1}{2}x^2 - \\frac{3}{2}x + 1\\right) - 3x^2 + 6x + x^2 - x \\]
                            Combine like terms:
                            \\[ P_2(x) = \\left(\\frac{1}{2} - 3 + 1\\right)x^2 + \\left(-\\frac{3}{2} + 6 - 1\\right)x + 1 = -\\frac{3}{2}x^2 + \\frac{7}{2}x + 1 \\]
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch6',
            title: 'Advanced Interpolation',
            sections: [
                {
                    id: 'c9-newton-divided-diff',
                    title: 'Newton Form',
                    content: `
                        <h3>Newton Divided Differences</h3>
                        \\[ P_n(x) = a_0 + a_1(x-x_0) + a_2(x-x_0)(x-x_1) + \\dots \\]
                        <div class="box theorem">
                            <span class="box-title">Proof Idea for Coefficients</span>
                            Induction: $a_k = [x_0, \\dots, x_k; f]$. <br>
                            Base case $P_0(x_0) = a_0 = f(x_0)$. <br>
                            Assume $P_{k-1}$ is correct. $P_k(x) = P_{k-1}(x) + a_k \\prod_{j=0}^{k-1}(x-x_j)$. <br>
                            Evaluate at $x_k$: $f(x_k) = P_{k-1}(x_k) + a_k \\prod (x_k-x_j)$. <br>
                            This leads to the recursive divided difference formula.
                        </div>

                        <h3>Hermite Interpolation</h3>
                        <p>Matches both function values $f(x_i)$ and derivative values $f'(x_i)$ at $n+1$ nodes. There are $2n+2$ conditions, so the polynomial $H_{2n+1}(x)$ has degree at most $2n+1$.</p>
                        
                        <div class="box definition">
                            <span class="box-title">Basis Form</span>
                            \\[ H_{2n+1}(x) = \\sum_{i=0}^n h_i(x)f(x_i) + \\sum_{i=0}^n \\tilde{h}_i(x)f'(x_i) \\]
                            where the basis functions are defined using Lagrange basis $l_i(x)$:
                            \\[ h_i(x) = [1 - 2(x-x_i)l_i'(x_i)]l_i^2(x), \\quad \\tilde{h}_i(x) = (x-x_i)l_i^2(x) \\]
                        </div>

                        <div class="box remark">
                            <strong>Divided Difference Formulation:</strong> 
                            $H_{2n+1}$ can be constructed as a Newton polynomial using "repeated" nodes $(z_0, z_1, \\dots, z_{2n+1}) = (x_0, x_0, x_1, x_1, \\dots, x_n, x_n)$. <br>
                            The divided differences for repeated nodes are: $[x_i, x_i; f] = f'(x_i)$ and $[x_i, \\dots, x_i; f] = f^{(k)}(x_i)/k!$.
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Hermite Error Remainder</span>
                            \\[ R_{2n+1}(x) = f(x) - H_{2n+1}(x) = \\frac{f^{(2n+2)}(\\xi)}{(2n+2)!} \\prod_{i=0}^n (x - x_i)^2 \\]
                            The squared term $\\prod (x-x_i)^2$ reflects the "double" hit at each node.
                        </div>

                        <h3>Newton Divided Differences</h3>
                        <div class="box example">
                            <span class="box-title">Newton Interpolation Example</span>
                            Find the Newton polynomial for the points $(1,2), (2,3), (4,11)$.<br><br>
                            <strong>Step 1: Calculate the divided differences</strong>
                            <ul>
                                <li>0th order: $[x_0] = 2, \\quad [x_1] = 3, \\quad [x_2] = 11$</li>
                                <li>1st order: 
                                    \\[ [x_0, x_1] = \\frac{[x_1] - [x_0]}{x_1 - x_0} = \\frac{3 - 2}{2 - 1} = 1 \\]
                                    \\[ [x_1, x_2] = \\frac{[x_2] - [x_1]}{x_2 - x_1} = \\frac{11 - 3}{4 - 2} = \\frac{8}{2} = 4 \\]
                                </li>
                                <li>2nd order:
                                    \\[ [x_0, x_1, x_2] = \\frac{[x_1, x_2] - [x_0, x_1]}{x_2 - x_0} = \\frac{4 - 1}{4 - 1} = \\frac{3}{3} = 1 \\]
                                </li>
                            </ul>
                            <strong>Step 2: Construct the polynomial</strong>
                            \\[ P_2(x) = [x_0] + [x_0, x_1](x - x_0) + [x_0, x_1, x_2](x - x_0)(x - x_1) \\]
                            \\[ P_2(x) = 2 + 1(x - 1) + 1(x - 1)(x - 2) \\]
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch7',
            title: 'Bernstein, Bézier & Quadrature',
            sections: [
                {
                    id: 'c10-bernstein-identities',
                    title: 'Bernstein Polynomials',
                    content: `
                        <h3>Bernstein Basis Properties</h3>
                        \\[ \\sum_{k=0}^n p_{n,k}(t) = \\sum \\binom{n}{k} t^k (1-t)^{n-k} = (t + (1-t))^n = 1 \\]

                        <div class="box theorem">
                            <span class="box-title">Proof: Bernstein Identities</span>
                            Let $g(s) = (e^s t + (1-t))^n = \\sum \\binom{n}{k} e^{ks} t^k (1-t)^{n-k}$.
                            <ol>
                                <li>$g(0) = 1 \\implies B_n(1; t) = 1$.</li>
                                <li>$g'(0) = n(1)^{n-1} t = \\sum k p_{n,k} \\implies B_n(t; t) = \\sum \\frac{k}{n} p_{n,k} = t$.</li>
                                <li>$g''(0) = n(n-1)t^2 + nt = \\sum k^2 p_{n,k} \\implies B_n(t^2; t) = \\frac{n(n-1)t^2+nt}{n^2} = t^2 + \\frac{t(1-t)}{n}$.</li>
                            </ol>
                        </div>

                        <div class="box example">
                            <span class="box-title">Bernstein Polynomial Example</span>
                            Find the Bernstein polynomial of degree 2 for $f(t) = t^3$.<br><br>
                            <strong>Step 1: Evaluate $f(t)$ at the nodes $t_k = \\frac{k}{n}$ for $n=2$</strong>
                            <ul>
                                <li>$k=0: f(0) = 0^3 = 0$</li>
                                <li>$k=1: f\\left(\\frac{1}{2}\\right) = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$</li>
                                <li>$k=2: f(1) = 1^3 = 1$</li>
                            </ul>
                            <strong>Step 2: Construct the Bernstein polynomial $B_2(f; t)$</strong>
                            \\[ B_2(t^3; t) = \\sum_{k=0}^2 f\\left(\\frac{k}{2}\\right) \\binom{2}{k} t^k (1-t)^{2-k} \\]
                            \\[ B_2(t^3; t) = 0 \\cdot \\binom{2}{0} (1-t)^2 + \\frac{1}{8} \\binom{2}{1} t(1-t) + 1 \\cdot \\binom{2}{2} t^2 \\]
                            <strong>Step 3: Evaluate binomial coefficients and simplify</strong>
                            <ul>
                                <li>$\\binom{2}{0} = 1$</li>
                                <li>$\\binom{2}{1} = 2$</li>
                                <li>$\\binom{2}{2} = 1$</li>
                            </ul>
                            \\[ B_2(t^3; t) = 0 + \\frac{1}{8}(2)t(1-t) + 1(1)t^2 = \\frac{1}{4}t(1-t) + t^2 = t^2 + \\frac{t(1-t)}{4} \\]
                        </div>
                    `
                },
                {
                    id: 'c10-bezier-curves',
                    title: 'Bézier Curves',
                    content: `
                        <h3>de Casteljau Algorithm</h3>
                        <p>Stable recursion to evaluate Bézier curves.</p>
                        <div class="box algorithm">
                            1. Initialize $P_{i,0} = P_i$. <br>
                            2. Recursive step: $P_{i,r}(t) = (1-t)P_{i,r-1}(t) + tP_{i+1,r-1}(t)$. <br>
                            3. Result: $B(t) = P_{0,n}(t)$.
                        </div>
                        <p>This splits every segment in ratio $t:1-t$, ensuring the point lies within the convex hull.</p>

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: de Casteljau Algorithm</span>
                            Evaluate a degree-2 Bézier curve at $t = 0.5$ for control points $P_0=(0,0), P_1=(2,4), P_2=(4,0)$.<br><br>
                            <strong>Step 1: First level interpolation ($r=1$)</strong>
                            <ol>
                                <li>$P_{0,1} = (1-0.5)P_0 + 0.5P_1 = 0.5(0,0) + 0.5(2,4) = (1,2)$</li>
                                <li>$P_{1,1} = (1-0.5)P_1 + 0.5P_2 = 0.5(2,4) + 0.5(4,0) = (1,2) + (2,0) = (3,2)$</li>
                            </ol>
                            <strong>Step 2: Second level interpolation ($r=2$)</strong>
                            <ol>
                                <li>$B(0.5) = P_{0,2} = (1-0.5)P_{0,1} + 0.5P_{1,1} = 0.5(1,2) + 0.5(3,2) = (0.5, 1) + (1.5, 1) = (2,2)$</li>
                            </ol>
                            The point on the curve at $t=0.5$ is $(2,2)$.
                        </div>
                    `
                }
            ]
        },
        {
            id: 'ch8',
            title: 'Quadrature Formulas',
            sections: [
                {
                    id: 'c11-quadrature',
                    title: 'Interpolatory Quadrature',
                    content: `
                        <h3>Quadrature Formulas</h3>
                        <p>
                        \\[ \\int_a^b f(x)\\,dx \\approx ? \\]
                        If $f_n \\to f$, then
                        \\[ \\int_a^b f_n(u)\\,du \\to \\int_a^b f(x)\\,dx. \\]
                        </p>

                        <div class="box definition">
                            <span class="box-title">Quadrature Error</span>
                            Define \\[ \\mathcal{I}_n(f) \\approx \\mathcal{I}(f), \\]
                            where $\\mathcal{I}_n(f)$ is a quadrature formula.
                            The error is \\[ \\mathcal{E}_n(f) = \\mathcal{I}(f) - \\mathcal{I}_n(f). \\]
                            If $f$ is continuous on $[a,b]$, then
                            \\[ |\\mathcal{E}_n(f)| = \\left|\\int_a^b \\bigl(f(x)-f_n(x)\\bigr)\\,dx\\right| \\le \\int_a^b |f(x)-f_n(x)|\\,dx \\le (b-a)\\|f-f_n\\|_\\infty. \\]
                            If $\\|f-f_n\\|_\\infty < \\varepsilon$, then $|\\mathcal{E}_n(f)| < (b-a)\\varepsilon$.
                        </div>

                        <h3>Interpolatory Quadrature</h3>
                        <p>If $f$ is approximated by its interpolating polynomial (Lagrange or Hermite), then the quadrature formula is interpolatory.</p>

                        <div class="box definition">
                            <span class="box-title">Degree of Exactness</span>
                            The degree of exactness is the maximum integer $r \\ge 0$ such that
                            \\[ \\mathcal{I}_n(f) = \\mathcal{I}(f), \\qquad \\forall f\\in\\mathbb{P}_r. \\]
                        </div>

                        <div class="box theorem">
                            <span class="box-title">Theorem: Exactness of Interpolatory Quadrature</span>
                            Any interpolatory quadrature formula that uses $n+1$ distinct nodes has degree of exactness at least $n$.
                        </div>
                        <div class="proof">
                            <strong>Proof:</strong>
                            <ol>
                                <li>If $f\\in\\mathbb{P}_n$, then $f(x) = \\mathcal{L}_n(x)$, where $\\mathcal{L}_n$ is the Lagrange interpolating polynomial.</li>
                                <li>Then \\[ I(f) = \\int_a^b \\mathcal{L}_n(x)\\,dx = \\int_a^b \\left(\\sum_{i=0}^n f(x_i)\\mathcal{L}_i(x)\\right)\\,dx. \\]</li>
                                <li>Since \\[ A_i = \\int_a^b \\mathcal{L}_i(x)\\,dx, \\] we get \\[ I(f) = \\sum_{i=0}^n f(x_i)A_i = I_n(f), \\] hence \\[ E_n(f)=0. \\]</li>
                            </ol>
                        </div>

                        <div class="box remark">
                            <span class="box-title">Gaussian Quadrature</span>
                            The maximum degree of exactness of an interpolatory formula with $n+1$ nodes is $2n+1$ if nodes are chosen properly.<br>
                            For example, on $[-1,1]$, if the nodes are the roots of the Legendre polynomial $P_{n+1}(x)$, then
                            \\[ \\int_{-1}^1 P_k(x)P_m(x)\\,dx = \\delta_{km} = \\begin{cases} 1, & k=m,\\\\ 0, & k\\ne m. \\end{cases} \\]
                        </div>

                        <div class="box remark">
                            <span class="box-title">Interpolatory Quadrature Formulas</span>
                            If $f_n=\\mathcal{L}_n$ for nodes $a \\le x_0 < x_1 < \\dots < x_n \\le b$, then
                            \\[ J_n(f) = \\sum_{i=0}^n \\int \\mathcal{L}_i(x)\\,dx = \\sum_{i=0}^n \\alpha_i f(x_i), \\]
                            where $\\alpha_i$ are the coefficients and $x_i$ are the nodes.
                        </div>
                    `
                },
                {
                    id: 'c11-midpoint-trapezoidal-simpson',
                    title: 'Midpoint, Trapezoidal & Simpson',
                    content: `
                        <h3>Midpoint Formula</h3>
                        <p>For $f\\in \\mathcal{P}_1$, we have \\[ E_0(f)=\\frac{h^3}{3}f''(\\gamma)=0, \\] but $f''(\\gamma)$ cannot be $0$ for all polynomials of degree $2$. Therefore the formula cannot be exact for all polynomials of degree $2$.</p>

                        <div class="box definition">
                            <span class="box-title">Composite Midpoint Quadrature</span>
                            Apply the formula on $m$ subintervals of width \\[ H=\\frac{b-a}{m}, \\qquad m\\ge 1. \\]
                            Then \\[ x_k=a+\\frac{2k-1}{2}H, \\qquad k=1,\\dots,m. \\]
                            The composite midpoint rule is \\[ I_{(a,b)}(f)=\\sum_{k=1}^m f(x_k). \\]
                            Its error is \\[ E_{0,m}(f)=\\sum_{k=1}^m f''(\\gamma_k)\\left(\\frac{H}{2}\\right)^3\\frac{1}{3} = \\sum_{k=1}^m f''(\\gamma_k)\\frac{H^3}{24} = \\frac{b-a}{24}H^2 f''(\\gamma). \\]
                        </div>

                        <h3>Trapezoidal Formula</h3>
                        <div class="box theorem">
                            <span class="box-title">Derivation of Trapezoidal Formula</span>
                            For $m=1$, approximate $f$ by a linear polynomial with nodes $x_0=a$, $x_1=b$:
                            \\[ \\alpha_1(x)=\\frac{x-b}{a-b}f(a)+\\frac{x-a}{b-a}f(b). \\]
                            Then \\[ I_1(f)=\\int_a^b \\alpha_1(x)\\,dx = f(a)\\int_a^b \\frac{x-b}{a-b}\\,dx + f(b)\\int_a^b \\frac{x-a}{b-a}\\,dx. \\]
                            Evaluating, \\[ I_1(f)=\\frac{b-a}{2}\\bigl(f(a)+f(b)\\bigr). \\]
                        </div>
                        <p>If $f\\in C^2[a,b]$, then error is \\[ E_T(f)=-\\frac{h^2}{12}f''(\\xi), \\] where $h=b-a$ and $\\xi\\in(a,b)$.</p>

                        <h3>Simpson Formula</h3>
                        <p>The Cavalieri-Simpson formula uses $n=2$: \\[ x_0=a,\\qquad x_1=\\frac{a+b}{2},\\qquad x_2=b. \\]</p>
                        <div class="box definition">
                            <span class="box-title">Simpson Formula & Error</span>
                            The interpolating polynomial is $L_2$, and
                            \\[ I_S(f)=\\int_a^b L_2(x)\\,dx = \\frac{b-a}{6}\\left(f(a)+4f\\!\\left(\\frac{a+b}{2}\\right)+f(b)\\right). \\]
                            Its error is \\[ E_S(f)=-\\frac{h^5}{90}f^{(4)}(\\xi), \\qquad h=\\frac{b-a}{2}, \\qquad \\xi\\in(a,b). \\]
                            The degree of exactness is $3$.
                        </div>

                        <div class="box example">
                            <span class="box-title">Step-by-Step Example: Quadrature Rules</span>
                            Approximate $I = \\int_0^2 x^2 \\,dx$ using Midpoint, Trapezoidal, and Simpson's rule. Exact value is $[x^3/3]_0^2 = 8/3 \\approx 2.666$.<br><br>
                            <strong>1. Midpoint Rule</strong>
                            <ol>
                                <li>Interval is $[0, 2]$, midpoint is $x_1 = 1$.</li>
                                <li>$I_M = (b-a)f\\left(\\frac{a+b}{2}\\right) = 2 \\cdot f(1) = 2(1)^2 = 2$.</li>
                                <li>Error: $2.666 - 2 = 0.666$.</li>
                            </ol>
                            <strong>2. Trapezoidal Rule</strong>
                            <ol>
                                <li>$x_0 = 0, x_1 = 2$.</li>
                                <li>$I_T = \\frac{b-a}{2}(f(0) + f(2)) = \\frac{2}{2}(0^2 + 2^2) = 1(0 + 4) = 4$.</li>
                                <li>Error: $2.666 - 4 = -1.333$.</li>
                            </ol>
                            <strong>3. Simpson's Rule</strong>
                            <ol>
                                <li>$x_0 = 0, x_1 = 1, x_2 = 2$.</li>
                                <li>$I_S = \\frac{b-a}{6}(f(0) + 4f(1) + f(2)) = \\frac{2}{6}(0^2 + 4(1^2) + 2^2) = \\frac{1}{3}(0 + 4 + 4) = \\frac{8}{3} \\approx 2.666$.</li>
                                <li>Error: $0$ (Exact because Simpson's rule has degree of exactness 3, and $x^2$ is degree 2).</li>
                            </ol>
                        </div>
                    `
                },
                {
                    id: 'c11-newton-cotes',
                    title: 'Newton-Cotes Formulas',
                    content: `
                        <h3>Newton-Cotes Formulas</h3>
                        <p>Based on Lagrange interpolation with equally spaced nodes on $[a,b]$: \\[ x_k=x_0+kh,\\qquad k=0,\\dots,n. \\]</p>
                        <p>The midpoint, trapezoidal, and Simpson formulas are special instances for $n=0$, $n=1$, and $n=2$.</p>
                        <ul>
                            <li><strong>Closed formula:</strong> $x_0=a$, $x_n=b$, $h=\\frac{b-a}{n}$.</li>
                            <li><strong>Open formula:</strong> $x_0=a+h$, $x_n=b-h$, $h=\\frac{b-a}{n+2}$.</li>
                        </ul>

                        <div class="box theorem">
                            <span class="box-title">Newton-Cotes Variable Change</span>
                            In the closed case, use the change of variable \\[ x=a+th. \\]
                            Then \\[ x_k=a+kh,\\qquad \\frac{x-x_k}{x_j-x_k} = \\frac{a+th-(a+kh)}{a+jh-(a+kh)} = \\frac{t-k}{j-k}. \\]
                            Hence \\[ \\int_a^b L_n(x)\\,dx = \\sum_{i=0}^n f(x_i)\\int_{x_0}^{x_n}\\prod_{\\substack{k=0\\\\k\\ne i}}^n \\frac{x-x_k}{x_i-x_k}\\,dx = \\sum_{i=0}^n f(x_i)\\,h\\int_0^n \\prod_{\\substack{k=0\\\\k\\ne i}}^n \\frac{t-k}{i-k}\\,dt. \\]
                            Thus \\[ I_Q = h\\sum_{i=0}^n w_i f(x_i), \\]
                            where \\[ w_i = \\int_0^n \\prod_{\\substack{k=0\\\\k\\ne i}}^n \\frac{t-k}{i-k}\\,dt. \\]
                        </div>
                    `
                }
            ]
        }
    ],
    audit: [
        { source: 'c2.tex', topics: ['SDD Proof', 'SPD Constructing Proof', 'Frobenius Submultiplicativity'] },
        { source: 'c3.tex', topics: ['Spectral Radius Bound Proof', 'Rayleigh Proof', '2-norm derivation', 'Kahan Details'] },
        { source: 'c4.tex', topics: ['Jordan Block Convergence Proof', 'Jacobi/GS/SOR Detailed Derivations'] },
        { source: 'c5.tex', topics: ['Normal Equation Derivation', 'QR Minimizer Proof'] },
        { source: 'c6.tex', topics: ['Order Examples', 'Fixed Point Order Proof', 'Bisection Error Bound Proof'] },
        { source: 'c7.tex', topics: ['Newton Taylor Proof', 'Chebyshev Derivation'] },
        { source: 'c8.tex', topics: ['Newton System m_k logic', 'Interpolation Error Rolle Proof'] },
        { source: 'c9.tex', topics: ['Newton Induction Proof', 'Hermite Repeated Nodes'] },
        { source: 'c10.tex', topics: ['Bernstein Identities g(s) Proof', 'de Casteljau Steps'] },
        { source: 'c11.tex', topics: ['Interpolatory Quadrature', 'Gaussian Quadrature', 'Midpoint Formula', 'Trapezoidal Formula', 'Simpson Formula', 'Newton-Cotes Formulas'] }
    ],
    corrections: [
        { file: 'c11.tex', original: 'Missing definition of $p_i(t)$ in Newton-Cotes', corrected: 'Implicitly defined by the Lagrange product expansion over parameter $t$.' }
    ]
};
