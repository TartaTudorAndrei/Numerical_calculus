const ch1Data = [
    {
        "id": "c2-special-matrices",
        "title": "Special Types of Matrices",
        "content": `
            <h3>Special Types of Matrices</h3>
            
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Why do we care about matrix "types"? In numerical analysis, general matrices are expensive to process. Special structures like diagonal dominance often guarantee that iterative solvers will converge and that the matrix is invertible, making them a "safe haven" for computation.
            </div>

            <p>Let $\\mathcal{M}_{m,n}(\\mathbb{R})$ denote the set of $m \\times n$ matrices with real entries. For square matrices, we write $\\mathcal{M}_n(\\mathbb{R}) = \\mathcal{M}_{n,n}(\\mathbb{R})$.</p>
            
            <div class="box definition">
                <span class="box-title">Definition 1: Diagonally Dominant Matrix</span>
                <p><strong>Setup:</strong> Given a square matrix $A \\in \\mathcal{M}_n(\\mathbb{R})$, we compare each diagonal element to the rest of its row.</p>
                A matrix is <strong>diagonally dominant</strong> if the magnitude of the diagonal entry in each row is at least as large as the sum of the magnitudes of all other entries in that row:
                \\[ |a_{ii}| \\ge \\sum_{j \\ne i} |a_{ij}|, \\quad i = 1, \\dots, n \\]
                Equivalently, this can be expressed as:
                \\[ 2|a_{ii}| \\ge \\sum_{j=1}^n |a_{ij}| \\]
            </div>

            <div class="box definition">
                <span class="box-title">Definition 2: Strictly Diagonally Dominant (SDD)</span>
                A matrix is <strong>strictly diagonally dominant</strong> if the diagonal entry is <em>strictly larger</em> than the sum of the other entries for every row:
                \\[ |a_{ii}| > \\sum_{j \\ne i} |a_{ij}|, \\quad i = 1, \\dots, n \\]
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Let's check for SDD in a $3 \\times 3$ matrix:
                \\[ A = \\begin{pmatrix} 4 & 1 & 2 \\\\ 1 & 5 & 1 \\\\ 2 & 1 & 4 \\end{pmatrix} \\]
                <ol>
                    <li><strong>Row 1:</strong> $|a_{11}| = 4$. Others: $|1| + |2| = 3$. Since $4 > 3$, Row 1 is SDD.</li>
                    <li><strong>Row 2:</strong> $|a_{22}| = 5$. Others: $|1| + |1| = 2$. Since $5 > 2$, Row 2 is SDD.</li>
                    <li><strong>Row 3:</strong> $|a_{33}| = 4$. Others: $|2| + |1| = 3$. Since $4 > 3$, Row 3 is SDD.</li>
                </ol>
                Conclusion: $A$ is <strong>strictly diagonally dominant</strong>.
            </div>

            <div class="box remark">
                <span class="box-title">Numerical Consideration</span>
                Strict diagonal dominance is a sufficient condition for a matrix to be <strong>nonsingular</strong> (invertible). This is useful because we can often tell if a system $Ax=b$ has a unique solution just by looking at the coefficients!
            </div>
        `
    },
    {
        "id": "c2-positive-definite",
        "title": "Positive Definite Matrices",
        "content": `
            <h3>Positive Definite Matrices</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                A positive definite matrix is the matrix equivalent of a positive number. Just as $x^2 > 0$ for $x \\ne 0$, a positive definite matrix $A$ ensures that $x^T Ax > 0$. Geometrically, this means the matrix always "points" in a similar direction as the input vector, and it's a key requirement for algorithms like Cholesky factorization.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Positive Definite</span>
                <p><strong>Setup:</strong> Let $A \\in \\mathcal{M}_n(\\mathbb{R})$ be a symmetric matrix. We want to know the sign of the scalar result of the quadratic form $X^T AX$.</p>
                A matrix $A$ is <strong>positive definite</strong> if:
                \\[ X^T AX > 0, \\quad \\forall X \\in \\mathbb{R}^n, X \\ne 0 \\]
                It is <strong>positive semidefinite</strong> if $X^T AX \\ge 0$ for all $X$.
                For $X=(x_1,\\dots,x_n)^T$, the quadratic form is:
                \\[ X^TAX = \\sum_{i=1}^n\\sum_{j=1}^n a_{ij}x_ix_j \\]
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Key Properties</span>
                If $A$ is positive definite, then:
                <ol>
                    <li>$A$ is nonsingular (invertible).</li>
                    <li>All diagonal entries are positive: $a_{ii} > 0$.</li>
                    <li>All eigenvalues of $A$ are strictly positive.</li>
                </ol>
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li><strong>Proving Nonsingularity:</strong>
                        <ol type="a">
                            <li>Assume $AX = 0$ for some vector $X$.</li>
                            <li>Multiply by $X^T$ on the left: $X^T AX = X^T(0) = 0$.</li>
                            <li>By the definition of positive definiteness, $X^T AX = 0$ implies $X = 0$.</li>
                            <li>Since the only solution to $AX=0$ is $X=0$, $A$ must be nonsingular.</li>
                        </ol>
                    </li>
                    <li><strong>Proving Positive Diagonal Entries:</strong>
                        <ol type="a">
                            <li>Let $e_i$ be the $i$-th standard basis vector (e.g., $e_1 = [1, 0, \\dots, 0]^T$).</li>
                            <li>Compute the product $e_i^T A e_i$. This extracts the $i$-th diagonal element: $a_{ii}$.</li>
                            <li>Since $e_i \\ne 0$, we must have $e_i^T A e_i > 0$ by definition.</li>
                            <li>Therefore, $a_{ii} > 0$ for all $i$.</li>
                        </ol>
                    </li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Is $A = \\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}$ positive definite? <br>
                Test with $X = (x_1, x_2)^T$:
                \\[ X^T AX = 2x_1^2 - 2x_1x_2 + 2x_2^2 \\]
                We can rewrite this by completing the square:
                \\[ X^T AX = x_1^2 + (x_1 - x_2)^2 + x_2^2 \\]
                Since this is a sum of squares, it is $\\ge 0$. It is only zero if $x_1=0, x_2=0$, and $(x_1-x_2)=0$. Thus, $A$ is <strong>positive definite</strong>.
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall</span>
                Don't assume that because all entries of a matrix are positive, the matrix is positive definite! For example, $\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$ has all positive entries, but its eigenvalues include $-1$, so it is <strong>not</strong> positive definite.
            </div>
        `
    },
    {
        "id": "c2-norms",
        "title": "Vector and Matrix Norms",
        "content": `
            <h3>Vector and Matrix Norms</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                How do we measure the "size" of a vector or a matrix? In 1D, we use absolute value. In higher dimensions, we use <strong>norms</strong>. Norms are crucial for measuring errors and determining if an algorithm is converging toward the right answer.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Vector Norm</span>
                <p><strong>Setup:</strong> A norm $\\| \\cdot \\|$ is a function that maps a vector $X \\in \\mathbb{R}^n$ to a non-negative real number.</p>
                To be a valid norm, it must satisfy:
                <ol>
                    <li><strong>Positivity:</strong> $\\|X\\| \\ge 0$, and $\\|X\\| = 0 \\iff X = 0$.</li>
                    <li><strong>Homogeneity:</strong> $\\|\\alpha X\\| = |\\alpha| \\|X\\|$ for any scalar $\\alpha$.</li>
                    <li><strong>Triangle Inequality:</strong> $\\|X+Y\\| \\le \\|X\\| + \\|Y\\|$.</li>
                </ol>
            </div>
            
            <p>Common Vector Norms for $X = (x_1, \\dots, x_n)^T$:</p>
            <ul>
                <li><strong>$L_1$ norm (Manhattan):</strong> $\\|X\\|_1 = \\sum_{i=1}^n |x_i|$.</li>
                <li><strong>$L_2$ norm (Euclidean):</strong> $\\|X\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}$.</li>
                <li><strong>$L_\\infty$ norm (Maximum):</strong> $\\|X\\|_\\infty = \\max_{1 \\le i \\le n} |x_i|$.</li>
            </ul>

            <div class="box definition">
                <span class="box-title">Definition: Induced Matrix Norm</span>
                <p><strong>Setup:</strong> Given a vector norm, the <strong>induced matrix norm</strong> measures the maximum possible "stretch" a matrix $A$ applies to any vector $X$.</p>
                \\[ \\|A\\| = \\max_{X \\ne 0} \\frac{\\|AX\\|}{\\|X\\|} = \\max_{\\|X\\|=1} \\|AX\\| \\]
            </div>

            <div class="box theorem">
                <span class="box-title">Practical Formulas</span>
                Computing the maximum "stretch" from the definition is hard. Instead, we use these row/column sum formulas:
                <ul>
                    <li><strong>$L_1$ Induced Norm (Column Sum):</strong> $\\|A\\|_1 = \\max_{1 \\le j \\le n} \\sum_{i=1}^n |a_{ij}|$.</li>
                    <li><strong>$L_\\infty$ Induced Norm (Row Sum):</strong> $\\|A\\|_\\infty = \\max_{1 \\le i \\le n} \\sum_{j=1}^n |a_{ij}|$.</li>
                    <li><strong>$L_2$ Induced Norm (Spectral):</strong> $\\|A\\|_2 = \\sqrt{\\rho(A^T A)}$.</li>
                </ul>
            </div>

            <div class="box error">
                <span class="box-title">Common Mistake</span>
                A frequent error is mixing up the $L_1$ and $L_\\infty$ matrix norms. Remember: <strong>$L_1$ is the maximum column sum</strong>, while <strong>$L_\\infty$ is the maximum row sum</strong>.
            </div>
        `
    },
    {
        "id": "c3-spectral-radius",
        "title": "Spectral Radius & Symmetric Matrices",
        "content": `
            <h3>Spectral Radius & Symmetric Matrices</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                The <strong>spectral radius</strong> tells us the "magnitude" of the largest eigenvalue. It is the most important factor in determining whether iterative methods (like Jacobi or Gauss-Seidel) will converge. If the spectral radius is too large, errors will grow exponentially instead of shrinking.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Spectral Radius</span>
                <p><strong>Setup:</strong> Let $\\lambda_1, \\dots, \\lambda_n$ be the eigenvalues of a matrix $A$.</p>
                The spectral radius $\\rho(A)$ is the largest absolute value among all eigenvalues:
                \\[ \\rho(A) = \\max \\{|\\lambda_1|, \\dots, |\\lambda_n|\\} \\]
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Spectral Radius Bound</span>
                For <em>any</em> induced matrix norm $\\|A\\|$, the spectral radius is always a lower bound:
                \\[ \\rho(A) \\le \\|A\\| \\]
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li>Pick an eigenvalue $\\lambda$ such that $|\\lambda| = \\rho(A)$.</li>
                    <li>Let $X$ be the corresponding eigenvector, so $AX = \\lambda X$. Note $X \\ne 0$.</li>
                    <li>Take the norm of both sides: $\\|AX\\| = \\|\\lambda X\\|$.</li>
                    <li>By homogeneity of norms, $\\|\\lambda X\\| = |\\lambda| \\|X\\|$.</li>
                    <li>By the property of induced norms, $\\|AX\\| \\le \\|A\\| \\|X\\|$.</li>
                    <li>Combining these: $|\\lambda| \\|X\\| \\le \\|A\\| \\|X\\|$.</li>
                    <li>Divide by $\|X\\|$ (since $X \\ne 0$): $|\\lambda| \\le \\|A\\|$.</li>
                    <li>Since $|\\lambda| = \\rho(A)$, we conclude $\\rho(A) \\le \\|A\\|$.</li>
                </ol>
            </div>

            <h3>Symmetric Matrices</h3>
            <div class="box remark">
                <span class="box-title">Why Symmetry Matters</span>
                Symmetric matrices ($A = A^T$) are "well-behaved." Their eigenvalues are always real, and they can be decomposed into an orthonormal basis of eigenvectors. In many physical problems (like springs or circuits), the resulting matrices are naturally symmetric.
            </div>
        `
    },
    {
        "id": "c3-error-estimation",
        "title": "Error Estimation & Condition Number",
        "content": `
            <h3>Conditioning and Error Estimation</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                In the real world, we rarely have exact numbers. If our input $b$ is off by a tiny bit, how much will our answer $x$ change? If the answer changes a lot, we say the matrix is <strong>ill-conditioned</strong>. The <strong>condition number</strong> is the "amplification factor" for these errors.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Condition Number</span>
                <p><strong>Setup:</strong> Given an invertible matrix $A$ and an induced norm $\\| \\cdot \\|$.</p>
                The condition number $K(A)$ is defined as:
                \\[ K(A) = \\|A\\| \\cdot \\|A^{-1}\\| \\]
                Note: $K(A) \\ge 1$ always. A value close to 1 is "well-conditioned."
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Relative Error Bound</span>
                If we solve $Ax=b$ but have an error in the residual $r = b - A\\bar{x}$, the relative error in our solution is bounded by:
                \\[ \\frac{\\|x - \\bar{x}\\|}{\\|x\\|} \\le K(A) \\frac{\\|r\\|}{\\|b\\|} \\]
            </div>

            <div class="proof">
                <strong>Step-by-Step Derivation:</strong>
                <ol>
                    <li>Define the error as $e = x - \\bar{x}$.</li>
                    <li>The residual is $r = b - A\\bar{x} = Ax - A\\bar{x} = A(x - \\bar{x}) = Ae$.</li>
                    <li>Solve for the error: $e = A^{-1}r$.</li>
                    <li>Take the norm: $\\|e\\| \\le \\|A^{-1}\\| \\|r\\|$.</li>
                    <li>From $Ax=b$, we have $\\|b\\| \\le \\|A\\| \\|x\\|$, which implies $\\frac{1}{\\|x\\|} \\le \\frac{\\|A\\|}{\\|b\\|}$.</li>
                    <li>Multiply the inequalities: $\\frac{\\|e\\|}{\\|x\\|} \\le \\|A^{-1}\\| \\|r\\| \\cdot \\frac{\\|A\\|}{\\|b\\|}$.</li>
                    <li>Rearrange to see the condition number: $\\frac{\\|x - \\bar{x}\\|}{\\|x\\|} \\le (\\|A\\| \\|A^{-1}\\|) \\frac{\\|r\\|}{\\|b\\|}$.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example: Ill-conditioning</span>
                Consider $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1.0001 \\end{pmatrix}$. \n                Its inverse is $A^{-1} = \\begin{pmatrix} 10001 & -10000 \\\\ -10000 & 10000 \\end{pmatrix}$.\n                Using the $L_\\infty$ norm:\n                \\[ \\|A\\|_\\infty = 2.0001, \\quad \\|A^{-1}\\|_\\infty = 20001 \\]\n                \\[ K(A) \\approx 40,000 \\]\n                This means a tiny error in your data can be multiplied by **40,000** in your final result!
            </div>
        `
    }
];