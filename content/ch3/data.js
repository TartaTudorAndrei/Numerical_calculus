const ch3Data = [
    {
        "id": "c5-least-squares-intro",
        "title": "The Least Squares Problem",
        "content": String.raw`
            <h3>The Least Squares Problem</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                What do you do when you have more equations than variables ($Ax=b$ where $A$ is tall)? Usually, there is no solution that hits every point exactly. The **Least Squares Method** finds the "best possible" solution by minimizing the distance (the error) between the data points and your model. Geometrically, we are projecting the vector $b$ onto the subspace spanned by the columns of $A$.
            </div>

            <div class="box definition">
                <span class="box-title">The Residual Vector</span>
                We want to solve $Ax=b$ where $A \in \mathbb{R}^{m \times n}$ and $m > n$. Since an exact solution usually doesn't exist, we minimize the residual $r = b - Ax$ in the $L_2$ norm:
                \[ \min_x \|Ax - b\|_2^2 \]
            </div>

            <div class="box theorem">
                <span class="box-title">Derivation of the Normal Equations</span>
                <ol>
                    <li>Let $f(x) = \|Ax - b\|_2^2 = (Ax - b)^T (Ax - b)$.</li>
                    <li>Expand: $f(x) = (x^T A^T - b^T)(Ax - b) = x^T A^T A x - 2x^T A^T b + b^T b$.</li>
                    <li>Gradient: $\nabla f(x) = 2A^T A x - 2A^T b$.</li>
                    <li>Set to zero: $2A^T A x = 2A^T b$.</li>
                    <li>Result: $A^T A x = A^T b$.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Fit a line to (1, 2), (2, 3), (3, 5).
                <ul>
                    <li>$n = 3$</li>
                    <li>$\sum x = 6, \sum y = 10, \sum x^2 = 14, \sum xy = 23$</li>
                </ul>
                The Normal Equations are:
                \[ 14a + 6b = 23 \]
                \[ 6a + 3b = 10 \]
                Solving this system gives $a = 1.5, b = 1/3$. The best fit line is $y = 1.5x + 0.333$.
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall</span>
                While the Normal Equations are easy to write down, they are often <strong>numerically unstable</strong>. Computing $A^T A$ can make an already difficult problem much worse because it "squares" the condition number!
            </div>
        `
    },
    {
        "id": "c5-qr-least-squares",
        "title": "QR Factorization for Least Squares",
        "content": String.raw`
            <h3>QR Factorization for Least Squares</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                If the Normal Equations are unstable, how do we solve Least Squares safely? We use **QR Factorization**. This method uses orthogonal rotations ($Q$) to transform the problem into an upper triangular one ($R$) without ever having to compute $A^T A$. Orthogonal matrices are "perfect" for computers because they preserve lengths and don't amplify errors.
            </div>

            <div class="box theorem">
                <span class="box-title">Algorithm Setup</span>
                <ol>
                    <li>Factor $A = QR$, where $Q$ is an orthogonal matrix ($Q^T Q = I$) and $R$ is upper triangular.</li>
                    <li>Substitute into $Ax = b$: $QRx = b$.</li>
                    <li>Multiply both sides by $Q^T$: $Rx = Q^T b$.</li>
                    <li>Solve the triangular system $Rx = d$ (where $d = Q^T b$) using backward substitution.</li>
                </ol>
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: QR Minimizer Proof</span>
                If $A = QR$, the solution to $Rx = Q^T b$ minimizes $\|Ax-b\|_2$.
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li>Recall that orthogonal matrices preserve the $L_2$ norm: $\|Qv\|_2 = \|v\|_2$.</li>
                    <li>Substitute $A=QR$ into the residual: $\|QRx - b\|_2 = \|Q(Rx - Q^T b)\|_2$.</li>
                    <li>Note that $Q$ is $m \times m$. We can partition $R = \begin{pmatrix} R_1 \\ 0 \end{pmatrix}$ and $Q^T b = \begin{pmatrix} d_1 \\ d_2 \end{pmatrix}$.</li>
                    <li>$\|Ax-b\|_2^2 = \|R_1 x - d_1\|_2^2 + \|d_2\|_2^2$.</li>
                    <li>To minimize this, we must set $R_1 x - d_1 = 0$.</li>
                    <li>Thus, the minimizer satisfies $R_1 x = d_1$.</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">Numerical Choice</span>
                Use <strong>Normal Equations</strong> for small, hand-calculated problems. Always use <strong>QR</strong> (or SVD) for real-world software and large datasets to preserve precision.
            </div>
        `
    }
];