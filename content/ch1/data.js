const ch1Data = [
    {
        "id": "c2-special-matrices",
        "title": "Special Types of Matrices",
        "content": String.raw`
            <h3>Special Types of Matrices</h3>
            
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Why do we care about matrix "types"? In numerical analysis, general matrices are expensive to process. Special structures like diagonal dominance often guarantee that iterative solvers will converge and that the matrix is invertible, making them a "safe haven" for computation.
            </div>

            <p>Let $\mathcal{M}_{m,n}(\mathbb{R})$ denote the set of $m \times n$ matrices with real entries. For square matrices, we write $\mathcal{M}_n(\mathbb{R}) = \mathcal{M}_{n,n}(\mathbb{R})$.</p>
            
            <div class="box definition">
                <span class="box-title">Definition 1: Diagonally Dominant Matrix</span>
                <p><strong>Setup:</strong> Given a square matrix $A \in \mathcal{M}_n(\mathbb{R})$, we compare each diagonal element to the rest of its row.</p>
                A matrix is <strong>diagonally dominant</strong> if the magnitude of the diagonal entry in each row is at least as large as the sum of the magnitudes of all other entries in that row:
                \[ |a_{ii}| \ge \sum_{j \ne i} |a_{ij}|, \quad i = 1, \dots, n \]
                Equivalently, this can be expressed as:
                \[ 2|a_{ii}| \ge \sum_{j=1}^n |a_{ij}| \]
            </div>

            <div class="box definition">
                <span class="box-title">Definition 2: Strictly Diagonally Dominant (SDD)</span>
                A matrix is <strong>strictly diagonally dominant</strong> if the diagonal entry is <em>strictly larger</em> than the sum of the other entries for every row:
                \[ |a_{ii}| > \sum_{j \ne i} |a_{ij}|, \quad i = 1, \dots, n \]
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Let's check for SDD in a $3 \times 3$ matrix:
                \[ A = \begin{pmatrix} 4 & 1 & 2 \\ 1 & 5 & 1 \\ 2 & 1 & 4 \end{pmatrix} \]
                <ol>
                    <li><strong>Row 1:</strong> $|a_{11}| = 4$. Others: $|1| + |2| = 3$. Since $4 > 3$, Row 1 is SDD.</li>
                    <li><strong>Row 2:</strong> $|a_{22}| = 5$. Others: $|1| + |1| = 2$. Since $5 > 2$, Row 2 is SDD.</li>
                    <li><strong>Row 3:</strong> $|a_{33}| = 4$. Others: $|2| + |1| = 3$. Since $4 > 3$, Row 3 is SDD.</li>
                </ol>
                Conclusion: $A$ is <strong>strictly diagonally dominant</strong>.
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: SDD and Nonsingularity</span>
                If $A$ is strictly diagonally dominant, then $A$ is nonsingular ($\det A \ne 0$).
            </div>

            <div class="proof">
                <strong>Proof (by contradiction):</strong>
                <ol>
                    <li>Assume $A$ is singular. Then the system $AX = 0$ has a non-zero solution $X = (x_1, \dots, x_n)^T$.</li>
                    <li>Let $x_k$ be the component of $X$ with the largest magnitude ($|x_k| = \|X\|_\infty > 0$).</li>
                    <li>The $k$-th row of $AX = 0$ gives: $\sum_{j=1}^n a_{kj}x_j = 0$.</li>
                    <li>Rearrange to isolate the diagonal: $a_{kk}x_k = -\sum_{j \ne k} a_{kj}x_j$.</li>
                    <li>Take absolute values and use the triangle inequality:
                        \[ |a_{kk}||x_k| \le \sum_{j \ne k} |a_{kj}||x_j| \]
                    </li>
                    <li>Since $|x_j| \le |x_k|$, we have:
                        \[ |a_{kk}||x_k| \le |x_k| \sum_{j \ne k} |a_{kj}| \]
                    </li>
                    <li>Divide by $|x_k|$: $|a_{kk}| \le \sum_{j \ne k} |a_{kj}|$.</li>
                    <li>This contradicts the SDD definition ($|a_{kk}| > \sum |a_{kj}|$). Thus, $A$ must be nonsingular.</li>
                </ol>
            </div>
        `
    },
    {
        "id": "c2-positive-definite",
        "title": "Positive Definite Matrices",
        "content": String.raw`
            <h3>Positive Definite Matrices</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                A positive definite matrix is the matrix equivalent of a positive number. Just as $x^2 > 0$ for $x \ne 0$, a positive definite matrix $A$ ensures that $x^T Ax > 0$. Geometrically, this means the matrix always "points" in a similar direction as the input vector, and it's a key requirement for algorithms like Cholesky factorization.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Positive Definite</span>
                <p><strong>Setup:</strong> Let $A \in \mathcal{M}_n(\mathbb{R})$ be a symmetric matrix. We want to know the sign of the scalar result of the quadratic form $X^T AX$.</p>
                A matrix $A$ is <strong>positive definite</strong> if:
                \[ X^T AX > 0, \quad \forall X \in \mathbb{R}^n, X \ne 0 \]
                It is <strong>positive semidefinite</strong> if $X^T AX \ge 0$ for all $X$.
                For $X=(x_1,\dots,x_n)^T$, the quadratic form is:
                \[ X^TAX = \sum_{i=1}^n\sum_{j=1}^n a_{ij}x_ix_j \]
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

            <div class="box remark">
                <span class="box-title">Important Observations</span>
                <ul>
                    <li><strong>Converse is false:</strong> Having all $a_{kk} > 0$ does not imply positive definiteness. <br>
                    Example: $A = \begin{pmatrix} 1 & 10 \\ 10 & 1 \end{pmatrix}$ has $a_{11}=1, a_{22}=1$, but for $X = (1, -1)^T$, $X^TAX = 1 - 20 + 1 = -18 < 0$.</li>
                    <li><strong>SPD Eigenvalues:</strong> If $A$ is Symmetric Positive Definite (SPD), all its eigenvalues are real and positive.</li>
                    <li><strong>Non-symmetric PD:</strong> If $A$ is positive definite but not symmetric, eigenvalues can be complex. <br>
                    Example: $A = \begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix}$. Quadratic form: $x_1(x_1+x_2) + x_2(-x_1+x_2) = x_1^2 + x_2^2 > 0$. <br>
                    Eigenvalues: $\det(A-\lambda I) = (1-\lambda)^2 + 1 = 0 \implies \lambda = 1 \pm i$.</li>
                </ul>
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li><strong>Proving Nonsingularity:</strong>
                        <ol type="a">
                            <li>Assume $AX = 0$ for some vector $X \ne 0$.</li>
                            <li>Multiply by $X^T$ on the left: $X^T AX = X^T(0) = 0$.</li>
                            <li>This contradicts $X^TAX > 0$. Thus $X=0$ is the only solution, so $A$ is nonsingular.</li>
                        </ol>
                    </li>
                    <li><strong>Proving Positive Diagonal Entries:</strong>
                        <ol type="a">
                            <li>Let $e_i$ be the $i$-th standard basis vector (e.g., $e_1 = [1, 0, \dots, 0]^T$).</li>
                            <li>Compute the product $e_i^T A e_i$. This extracts the $i$-th diagonal element: $a_{ii}$.</li>
                            <li>Since $e_i \ne 0$, we must have $e_i^T A e_i > 0$ by definition.</li>
                            <li>Therefore, $a_{ii} > 0$ for all $i$.</li>
                        </ol>
                    </li>
                </ol>
            </div>

            <h3>Constructing SPD Matrices</h3>
            <div class="box theorem">
                <span class="box-title">Theorem: Constructing SPD Matrices</span>
                To obtain an SPD matrix from any random nonsingular matrix $B$, compute $A = B^T B$. This $A$ is always symmetric and positive definite.
            </div>

            <div class="proof">
                <strong>Proof:</strong>
                <ol>
                    <li><strong>Symmetry:</strong> $(B^T B)^T = B^T (B^T)^T = B^T B$.</li>
                    <li><strong>Positive Definiteness:</strong> $X^T (B^T B) X = (BX)^T (BX) = \|BX\|_2^2$.</li>
                    <li>Since $B$ is nonsingular and $X \ne 0$, it follows that $BX \ne 0$.</li>
                    <li>Thus, $\|BX\|_2^2 > 0$, so $A$ is positive definite.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Is $A = \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}$ positive definite? <br>
                Test with $X = (x_1, x_2)^T$:
                \[ X^T AX = 2x_1^2 - 2x_1x_2 + 2x_2^2 \]
                We can rewrite this by completing the square:
                \[ X^T AX = x_1^2 + (x_1 - x_2)^2 + x_2^2 \]
                Since this is a sum of squares, it is $\ge 0$. It is only zero if $x_1=0, x_2=0$, and $(x_1-x_2)=0$. Thus, $A$ is <strong>positive definite</strong>.
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall</span>
                Don't assume that because all entries of a matrix are positive, the matrix is positive definite! For example, $\begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$ has all positive entries, but its eigenvalues include $-1$, so it is <strong>not</strong> positive definite.
            </div>
        `
    },
    {
        "id": "c2-norms",
        "title": "Vector and Matrix Norms",
        "content": String.raw`
            <h3>Vector and Matrix Norms</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                How do we measure the "size" of a vector or a matrix? In 1D, we use absolute value. In higher dimensions, we use <strong>norms</strong>. Norms are crucial for measuring errors and determining if an algorithm is converging toward the right answer.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Vector Norm</span>
                <p><strong>Setup:</strong> A norm $\| \cdot \|$ is a function that maps a vector $X \in \mathbb{R}^n$ to a non-negative real number.</p>
                To be a valid norm, it must satisfy:
                <ol>
                    <li><strong>Positivity:</strong> $\|X\| \ge 0$, and $\|X\| = 0 \iff X = 0$.</li>
                    <li><strong>Homogeneity:</strong> $\|\alpha X\| = |\alpha| \|X\|$ for any scalar $\alpha$.</li>
                    <li><strong>Triangle Inequality:</strong> $\|X+Y\| \le \|X\| + \|Y\|$.</li>
                </ol>
            </div>
            
            <p>Common Vector Norms for $X = (x_1, \dots, x_n)^T$:</p>
            <ul>
                <li><strong>$L_1$ norm (Manhattan):</strong> $\|X\|_1 = \sum_{i=1}^n |x_i|$.</li>
                <li><strong>$L_2$ norm (Euclidean):</strong> $\|X\|_2 = \sqrt{\sum_{i=1}^n x_i^2}$.</li>
                <li><strong>$L_\infty$ norm (Maximum):</strong> $\|X\|_\infty = \max_{1 \le i \le n} |x_i|$.</li>
            </ul>

            <div class="box definition">
                <span class="box-title">Definition: Induced Matrix Norm</span>
                <p><strong>Setup:</strong> Given a vector norm, the <strong>induced matrix norm</strong> measures the maximum possible "stretch" a matrix $A$ applies to any vector $X$.</p>
                \[ \|A\| = \max_{X \ne 0} \frac{\|AX\|}{\|X\|} = \max_{\|X\|=1} \|AX\| \]
            </div>

            <div class="box theorem">
                <span class="box-title">Practical Formulas</span>
                Computing the maximum "stretch" from the definition is hard. Instead, we use these row/column sum formulas:
                <ul>
                    <li><strong>$L_1$ Induced Norm (Column Sum):</strong> $\|A\|_1 = \max_{1 \le j \le n} \sum_{i=1}^n |a_{ij}|$.</li>
                    <li><strong>$L_\infty$ Induced Norm (Row Sum):</strong> $\|A\|_\infty = \max_{1 \le i \le n} \sum_{j=1}^n |a_{ij}|$.</li>
                    <li><strong>$L_2$ Induced Norm (Spectral):</strong> $\|A\|_2 = \sqrt{\rho(A^T A)}$.</li>
                </ul>
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Submultiplicativity</span>
                For any induced matrix norm, $\|AB\| \le \|A\| \|B\|$.
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li>By definition, $\|(AB)X\| = \|A(BX)\|$.</li>
                    <li>Using the induced norm property $\|AY\| \le \|A\|\|Y\|$, let $Y = BX$:
                        \[ \|A(BX)\| \le \|A\| \|BX\| \]
                    </li>
                    <li>Apply the property again to $\|BX\|$:
                        \[ \|BX\| \le \|B\| \|X\| \]
                    </li>
                    <li>Combine: $\|(AB)X\| \le \|A\| \|B\| \|X\|$.</li>
                    <li>Divide by $\|X\|$ and take the maximum over $X$ to get $\|AB\| \le \|A\| \|B\|$.</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">The Frobenius Norm</span>
                The <strong>Frobenius norm</strong> $\|A\|_F = \sqrt{\sum a_{ij}^2}$ is NOT an induced norm, but it is still submultiplicative.
            </div>

            <div class="box example">
                <span class="box-title">Step-by-Step Example: Matrix Norms</span>
                Consider the matrix $A = \begin{pmatrix} 1 & -2 \\ -3 & 4 \end{pmatrix}$. Let's compute its 1-norm, infinity norm, and Frobenius norm.<br><br>
                <strong>Step 1: Compute the 1-norm (Max Column Sum)</strong>
                <ol>
                    <li>Column 1 absolute sum: $|1| + |-3| = 1 + 3 = 4$</li>
                    <li>Column 2 absolute sum: $|-2| + |4| = 2 + 4 = 6$</li>
                    <li>$\|A\|_1 = \max(4, 6) = 6$</li>
                </ol>
                <strong>Step 2: Compute the Infinity norm (Max Row Sum)</strong>
                <ol>
                    <li>Row 1 absolute sum: $|1| + |-2| = 1 + 2 = 3$</li>
                    <li>Row 2 absolute sum: $|-3| + |4| = 3 + 4 = 7$</li>
                    <li>$\|A\|_\infty = \max(3, 7) = 7$</li>
                </ol>
                <strong>Step 3: Compute the Frobenius norm</strong>
                <ol>
                    <li>Sum of squares of all elements: $1^2 + (-2)^2 + (-3)^2 + 4^2$</li>
                    <li>$= 1 + 4 + 9 + 16 = 30$</li>
                    <li>$\|A\|_F = \sqrt{30} \approx 5.477$</li>
                </ol>
            </div>

            <div class="box error">
                <span class="box-title">Common Mistake</span>
                A frequent error is mixing up the $L_1$ and $L_\infty$ matrix norms. Remember: <strong>$L_1$ is the maximum column sum</strong>, while <strong>$L_\infty$ is the maximum row sum</strong>.
            </div>
        `
    },
    {
        "id": "c3-spectral-radius",
        "title": "Spectral Radius & Symmetric Matrices",
        "content": String.raw`
            <h3>Spectral Radius & Symmetric Matrices</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                The <strong>spectral radius</strong> tells us the "magnitude" of the largest eigenvalue. It is the most important factor in determining whether iterative methods (like Jacobi or Gauss-Seidel) will converge. If the spectral radius is too large, errors will grow exponentially instead of shrinking.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Spectral Radius</span>
                <p><strong>Setup:</strong> Let $\lambda_1, \dots, \lambda_n$ be the eigenvalues of a matrix $A$.</p>
                The spectral radius $\rho(A)$ is the largest absolute value among all eigenvalues:
                \[ \rho(A) = \max \{|\lambda_1|, \dots, |\lambda_n|\} \]
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Spectral Radius Bound</span>
                For <em>any</em> induced matrix norm $\|A\|$, the spectral radius is always a lower bound:
                \[ \rho(A) \le \|A\| \]
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li>Pick an eigenvalue $\lambda$ such that $|\lambda| = \rho(A)$.</li>
                    <li>Let $X$ be the corresponding eigenvector, so $AX = \lambda X$. Note $X \ne 0$.</li>
                    <li>Take the norm of both sides: $\|AX\| = \|\lambda X\|$.</li>
                    <li>By homogeneity of norms, $\|\lambda X\| = |\lambda| \|X\|$.</li>
                    <li>By the property of induced norms, $\|AX\| \le \|A\| \|X\|$.</li>
                    <li>Combining these: $|\lambda| \|X\| \le \|A\| \|X\|$.</li>
                    <li>Divide by $\|X\|$ (since $X \ne 0$): $|\lambda| \le \|A\|$.</li>
                    <li>Since $|\lambda| = \rho(A)$, we conclude $\rho(A) \le \|A\|$.</li>
                </ol>
            </div>

            <h3>Symmetric Matrices</h3>
            <div class="box remark">
                <span class="box-title">Why Symmetry Matters</span>
                Symmetric matrices ($A = A^T$) are "well-behaved." Their eigenvalues are always real, and they can be decomposed into an orthonormal basis of eigenvectors. In many physical problems (like springs or circuits), the resulting matrices are naturally symmetric.
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Rayleigh Quotient Bound</span>
                Let $A$ be symmetric with eigenvalues $\lambda_1 \le \dots \le \lambda_n$. Then for any $X$ with $\|X\|_2=1$:
                \[ \lambda_1 \le X^T AX \le \lambda_n = \rho(A) \]
            </div>

            <div class="proof">
                <strong>Proof of Rayleigh Bound:</strong>
                <ol>
                    <li>Since $A$ is symmetric, $A = Q \Lambda Q^T$ for orthogonal $Q$ and diagonal $\Lambda$.</li>
                    <li>Let $Y = Q^T X$. Since $Q$ is orthogonal, $\|Y\|_2 = \|X\|_2 = 1$.</li>
                    <li>$X^T AX = X^T Q \Lambda Q^T X = Y^T \Lambda Y = \sum_{i=1}^n \lambda_i y_i^2$.</li>
                    <li>Since $y_i^2 \ge 0$ and $\sum y_i^2 = 1$, the sum is a weighted average of $\lambda_i$.</li>
                    <li>Thus $\lambda_{\min} \le \sum \lambda_i y_i^2 \le \lambda_{\max}$, which is $\lambda_1 \le X^T AX \le \lambda_n$.</li>
                </ol>
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Formula for the 2-norm</span>
                For any matrix $A$, $\|A\|_2 = \sqrt{\rho(A^T A)}$. If $A$ is symmetric, $\|A\|_2 = \rho(A)$.
            </div>
            <div class="proof">
                <strong>Proof Idea:</strong>
                <ol>
                    <li>$\|AX\|_2^2 = (AX)^T(AX) = X^T(A^T A)X$.</li>
                    <li>Let $B = A^T A$. $B$ is symmetric and positive semidefinite.</li>
                    <li>By the Rayleigh bound, $X^T B X \le \rho(B)$ for $\|X\|_2=1$. Thus $\|A\|_2^2 \le \rho(A^T A)$.</li>
                    <li>The maximum is attained when $X$ is the eigenvector of $A^T A$ corresponding to $\rho(A^T A)$.</li>
                    <li>Thus $\|A\|_2 = \sqrt{\rho(A^T A)}$.</li>
                </ol>
            </div>
        `
    },
    {
        "id": "c3-error-estimation",
        "title": "Error Estimation & Condition Number",
        "content": String.raw`
            <h3>Conditioning and Error Estimation</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                In the real world, we rarely have exact numbers. If our input $b$ is off by a tiny bit, how much will our answer $x$ change? If the answer changes a lot, we say the matrix is <strong>ill-conditioned</strong>. The <strong>condition number</strong> is the "amplification factor" for these errors.
            </div>

            <div class="box definition">
                <span class="box-title">Definition: Condition Number</span>
                <p><strong>Setup:</strong> Given an invertible matrix $A$ and an induced norm $\| \cdot \|$.</p>
                The condition number $K(A)$ is defined as:
                \[ K(A) = \|A\| \cdot \|A^{-1}\| \]
                Note: $K(A) \ge 1$ always. A value close to 1 is "well-conditioned."
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Relative Error Bound</span>
                If we solve $Ax=b$ but have an error in the residual $r = b - A\bar{x}$, the relative error in our solution is bounded by:
                \[ \frac{\|x - \bar{x}\|}{\|x\|} \le K(A) \frac{\|r\|}{\|b\|} \]
            </div>

            <div class="proof">
                <strong>Step-by-Step Derivation:</strong>
                <ol>
                    <li>Define the error as $e = x - \bar{x}$.</li>
                    <li>The residual is $r = b - A\bar{x} = Ax - A\bar{x} = A(x - \bar{x}) = Ae$.</li>
                    <li>Solve for the error: $e = A^{-1}r$.</li>
                    <li>Take the norm: $\|e\| \le \|A^{-1}\| \|r\|$.</li>
                    <li>From $Ax=b$, we have $\|b\| \le \|A\| \|x\|$, which implies $\frac{1}{\|x\|} \le \frac{\|A\|}{\|b\|}$.</li>
                    <li>Multiply the inequalities: $\frac{\|e\|}{\|x\|} \le \|A^{-1}\| \|r\| \cdot \frac{\|A\|}{\|b\|}$.</li>
                    <li>Rearrange to see the condition number: $\frac{\|x - \bar{x}\|}{\|x\|} \le (\|A\| \|A^{-1}\|) \frac{\|r\|}{\|b\|}$.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example: Ill-conditioning (Kahan details)</span>
                Consider $A = \begin{pmatrix} 1 & 1 \\ 1.0001 & 1 \end{pmatrix}, \quad b = \begin{pmatrix} 2 \\ 2.0001 \end{pmatrix}$.
                The exact solution is $x = [1, 1]^T$. 
                If we use an approximation $\bar{x} = [2, 0]^T$, the residual is:
                \[ r = b - A\bar{x} = \begin{pmatrix} 2 \\ 2.0001 \end{pmatrix} - \begin{pmatrix} 2 \\ 2.0002 \end{pmatrix} = \begin{pmatrix} 0 \\ -0.0001 \end{pmatrix} \]
                Its inverse is $A^{-1} = \begin{pmatrix} -10000 & 10000 \\ 10001 & -10000 \end{pmatrix}$.
                Using the $L_\infty$ norm:
                \[ \|A\|_\infty = 2.0001, \quad \|A^{-1}\|_\infty = 20001 \]
                \[ K(A) \approx 40,000 \]
                The residual is tiny ($\|r\|_\infty = 10^{-4}$), but the error is huge ($\|x-\bar{x}\|_\infty = 1$). 
                This happens because of the large condition number. A tiny error in your data can be multiplied by **40,000** in your final result!
            </div>

            <h3>Stability and Orthogonal Matrices</h3>
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Why do we love orthogonal matrices (where $Q^T Q = I$)? Because they preserve the "size" of vectors. They don't stretch or squash space, which means they don't amplify errors.
            </div>
            <p><strong>Result:</strong> Orthogonal matrices are perfectly stable with a condition number $K_2(Q) = 1$.</p>
            <div class="proof">
                <strong>Proof:</strong>
                <ol>
                    <li>$K_2(Q) = \|Q\|_2 \|Q^{-1}\|_2 = \|Q\|_2 \|Q^T\|_2$.</li>
                    <li>$\|Q\|_2 = \sqrt{\rho(Q^T Q)} = \sqrt{\rho(I)} = 1$.</li>
                    <li>Similarly, $\|Q^T\|_2 = 1$.</li>
                    <li>Thus, $K_2(Q) = 1 \cdot 1 = 1$.</li>
                </ol>
            </div>

            <h3>Solvers for Ill-conditioned Systems</h3>
            <p>If you must solve a system with a high condition number, standard Gaussian elimination might fail. Here are some strategies:</p>
            <ol>
                <li><strong>Preconditioning:</strong> Transform the system into $M^{-1}Ax = M^{-1}b$ where $M^{-1}A$ has a much lower condition number.</li>
                <li><strong>QR Decomposition:</strong> Using $A = QR$ is often more stable than solving the normal equations directly. Note $K_2(A) = K_2(R)$.</li>
                <li><strong>SVD (Singular Value Decomposition):</strong> The ultimate tool for ill-conditioned systems. It allows you to "ignore" the components of the solution that are most affected by noise.</li>
            </ol>
        `
    }
];