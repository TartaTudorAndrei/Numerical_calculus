const ch2Data = [
    {
        id: 'c4-lu-decomposition',
        title: 'LU Decomposition & Factorizations',
        content: String.raw`
            <h3>LU Decomposition</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Solving $Ax=b$ directly can be hard. LU decomposition is like "factoring" a matrix into two simpler pieces: a Lower triangular ($L$) and an Upper triangular ($U$) matrix. Because triangular systems are very easy to solve (using substitution), we trade one hard problem for two easy ones.
            </div>

            <p>We factor $A = L \cdot U$. Once we have $L$ and $U$, solving $Ax=b$ becomes a two-step process:</p>
            <ol>
                <li>Solve $Ly = b$ for $y$ (Forward Substitution).</li>
                <li>Solve $Ux = y$ for $x$ (Backward Substitution).</li>
            </ol>
            
            <div class="box definition">
                <span class="box-title">Types of Factorizations</span>
                <ul>
                    <li><strong>Doolittle:</strong> $l_{ii}=1$. The lower matrix has ones on the diagonal.</li>
                    <li><strong>Crout:</strong> $u_{ii}=1$. The upper matrix has ones on the diagonal.</li>
                    <li><strong>Cholesky:</strong> $A = LL^T$. Used only for Symmetric Positive Definite (SPD) matrices. It is twice as fast as general LU!</li>
                </ul>
            </div>

            <div class="box example">
                <span class="box-title">Full Step-by-Step Example</span>
                Solve $\begin{pmatrix} 2 & 3 & 1 \\ 4 & 7 & 7 \\ -2 & 4 & 5 \end{pmatrix} x = \begin{pmatrix} 1 \\ 11 \\ 4 \end{pmatrix}$ using Doolittle LU.
                <br><br>
                <strong>Step 1: Finding $L$ and $U$</strong>
                <p>We use Gaussian elimination, keeping track of the multipliers.</p>
                <ol>
                    <li>
                        <strong>Column 1:</strong><br>
                        Goal: Zero out entries below $a_{11}=2$.<br>
                        - Multiplier $l_{21} = 4/2 = 2$. $R_2 \to R_2 - 2R_1$.<br>
                        - Multiplier $l_{31} = -2/2 = -1$. $R_3 \to R_3 - (-1)R_1$.<br>
                        Current $U$: $\begin{pmatrix} 2 & 3 & 1 \\ 0 & 1 & 5 \\ 0 & 7 & 6 \end{pmatrix}$.
                    </li>
                    <li>
                        <strong>Column 2:</strong><br>
                        Goal: Zero out entry below $a_{22}=1$.<br>
                        - Multiplier $l_{32} = 7/1 = 7$. $R_3 \to R_3 - 7R_2$.<br>
                        Final $U = \begin{pmatrix} 2 & 3 & 1 \\ 0 & 1 & 5 \\ 0 & 0 & -29 \end{pmatrix}$.
                    </li>
                </ol>
                Construct $L$ from multipliers: $L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & 7 & 1 \end{pmatrix}$.
                <br><br>
                <strong>Step 2: Forward Substitution ($Ly = b$)</strong>
                \[ \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & 7 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 11 \\ 4 \end{pmatrix} \]
                <ol>
                    <li>$y_1 = 1$</li>
                    <li>$2(1) + y_2 = 11 \implies y_2 = 9$</li>
                    <li>$-1(1) + 7(9) + y_3 = 4 \implies y_3 = -58$</li>
                </ol>
                <strong>Step 3: Backward Substitution ($Ux = y$)</strong>
                \[ \begin{pmatrix} 2 & 3 & 1 \\ 0 & 1 & 5 \\ 0 & 0 & -29 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 9 \\ -58 \end{pmatrix} \]
                <ol>
                    <li>$-29x_3 = -58 \implies x_3 = 2$</li>
                    <li>$1x_2 + 5(2) = 9 \implies x_2 = -1$</li>
                    <li>$2x_1 + 3(-1) + 1(2) = 1 \implies x_1 = 1$</li>
                </ol>
                Solution: $x = (1, -1, 2)^T$.
            </div>
        `
    },
    {
        id: 'c4-pivoting',
        title: 'Pivoting & Stability',
        content: String.raw`
            <h3>Pivoting for Stability</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Computers have limited precision. If you divide by a very small number (a "small pivot"), the resulting multiplier becomes huge. This huge multiplier can "swallow" smaller, important values in your matrix during row operations, leading to massive rounding errors. Pivoting prevents this by swapping rows to ensure we always divide by the largest possible number.
            </div>

            <div class="box example">
                <span class="box-title">Why we swap: Small Pivot Danger</span>
                Consider $A = \begin{pmatrix} 10^{-20} & 1 \\ 1 & 1 \end{pmatrix}$. 
                <ul>
                    <li><strong>Without Pivoting:</strong> The multiplier is $1 / 10^{-20} = 10^{20}$. When we compute $R_2 - 10^{20}R_1$, the bottom-right entry becomes $1 - 10^{20}$. Because $10^{20}$ is so large, the computer rounds this to just $-10^{20}$. We have lost the "1" entirely!</li>
                    <li><strong>With Partial Pivoting:</strong> We swap Row 1 and Row 2 to put the largest value on the diagonal: $\begin{pmatrix} 1 & 1 \\ 10^{-20} & 1 \end{pmatrix}$. Now the multiplier is $10^{-20}$, which is tiny. Row operations will preserve the precision of all entries.</li>
                </ul>
            </div>

            <div class="box remark">
                <span class="box-title">Numerical Consideration</span>
                <strong>Partial Pivoting</strong> swaps rows only. <strong>Full Pivoting</strong> swaps both rows and columns. While full pivoting is technically more stable, partial pivoting is almost always "good enough" and much cheaper to compute.
            </div>
        `
    },
    {
        id: 'c4-iterative-methods',
        title: 'Iterative Methods (Jacobi, GS, SOR)',
        content: String.raw`
            <h3>Iterative Methods</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                For massive matrices (like those in weather forecasting or AI), direct methods like LU are too slow and use too much memory. <strong>Iterative methods</strong> start with a guess and refine it over and over. They are perfect for "sparse" matrices where most entries are zero.
            </div>

            <p>The general framework is to split $A = M - N$, where $M$ is easy to invert. The iteration looks like:</p>
            \[ x^{(k+1)} = M^{-1}Nx^{(k)} + M^{-1}b \]

            <div class="box theorem">
                <span class="box-title">Theorem: Iterative Convergence</span>
                The iteration $x^{(k+1)} = Gx^{(k)} + c$ converges to the solution for any $x^{(0)}$ if and only if the spectral radius $\rho(G) < 1$.
            </div>

            <div class="proof">
                <strong>Proof (using Jordan Form):</strong>
                <ol>
                    <li>Define error $e^{(k)} = x^{(k)} - x^*$. Then $e^{(k)} = G^k e^{(0)}$.</li>
                    <li>We need to show $G^k \to 0$ as $k \to \infty$.</li>
                    <li>Decompose $G = XJX^{-1}$. Then $G^k = XJ^kX^{-1}$.</li>
                    <li>For a single Jordan block $J_i = \lambda I + F$:
                        \[ J_i^k = \sum_{j=0}^{m-1} \binom{k}{j} \lambda^{k-j} F^j \]
                    </li>
                    <li>As $k \to \infty$, if $|\lambda| < 1$, the term $\binom{k}{j} \lambda^{k-j} \to 0$.</li>
                    <li>Since every block $J_i$ goes to zero, $J^k \to 0$, and thus $G^k \to 0$.</li>
                </ol>
            </div>
            
            <h3>Method Derivations</h3>
            <p>Let $A = D + L + U$ (Diagonal, strictly Lower, strictly Upper).</p>

            <div class="box algorithm">
                <span class="box-title">1. Jacobi Method</span>
                <strong>Setup:</strong> Split $A = D + (L + U)$, where $D$ is the diagonal. <br>
                Solve $Dx = -(L+U)x + b$:
                \[ x^{(k+1)} = -D^{-1}(L+U)x^{(k)} + D^{-1}b \]
                Iteration matrix: $G_J = -D^{-1}(L+U)$. <br>
                <strong>Idea:</strong> Solve the $i$-th equation for $x_i$ using only values from the <em>previous</em> step.
                \[ x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j \ne i} a_{ij} x_j^{(k)} \right) \]
            </div>

            <div class="box algorithm">
                <span class="box-title">2. Gauss-Seidel (GS)</span>
                <strong>Setup:</strong> Solve $(D+L)x = -Ux + b$:
                \[ x^{(k+1)} = -(D+L)^{-1}Ux^{(k)} + (D+L)^{-1}b \]
                Iteration matrix: $G_{GS} = -(D+L)^{-1}U$. <br>
                <strong>Idea:</strong> Why wait for the next step? As soon as you calculate a new $x_i$, use it immediately for the rest of the current iteration.
                \[ x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)} \right) \]
                GS usually converges twice as fast as Jacobi!
            </div>

            <div class="box algorithm">
                <span class="box-title">3. SOR (Successive Over-Relaxation)</span>
                Multiply $Ax=b$ by $\omega$ and add $Dx$:
                \[ (D + \omega L)x = [(1-\omega)D - \omega U]x + \omega b \]
                \[ x^{(k+1)} = (D + \omega L)^{-1}[(1-\omega)D - \omega U]x^{(k)} + \omega(D + \omega L)^{-1}b \]
                <strong>Idea:</strong> "Over-correct" the Gauss-Seidel step. If GS moves the solution in a certain direction, SOR pushes it even further in that direction to get there faster.
                \[ x^{(k+1)} = (1-\omega)x^{(k)} + \omega x^{(GS)} \]
                $\omega$ is the relaxation parameter ($1 < \omega < 2$ for acceleration).
            </div>

            <div class="box example">
                <span class="box-title">Mini Example: Jacobi vs GS</span>
                Solve $2x_1 + x_2 = 3$ and $x_1 + 2x_2 = 3$ with $x^{(0)} = (0,0)^T$.
                <ol>
                    <li><strong>Jacobi:</strong>
                        - $x_1^{(1)} = (3 - x_2^{(0)})/2 = 1.5$
                        - $x_2^{(1)} = (3 - x_1^{(0)})/2 = 1.5$
                        Result: $(1.5, 1.5)$.
                    </li>
                    <li><strong>Gauss-Seidel:</strong>
                        - $x_1^{(1)} = (3 - x_2^{(0)})/2 = 1.5$
                        - $x_2^{(1)} = (3 - x_1^{(1)})/2 = (3 - 1.5)/2 = 0.75$
                        Result: $(1.5, 0.75)$. (Notice how much closer we got to the true solution $(1,1)$ in just one step!)
                    </li>
                </ol>
            </div>

            <div class="box error">
                <span class="box-title">Common Mistake</span>
                Don't forget that iterative methods only work if the matrix is "nice." A sufficient condition for convergence is that the matrix is <strong>strictly diagonally dominant</strong> or <strong>symmetric positive definite</strong>.
            </div>
        `
    }
];