const ch3Data = [
    {
        "id": "c5-least-squares-intro",
        "title": "The Least Squares Problem",
        "content": `
            <h3>The Least Squares Problem</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                What do you do when you have more equations than variables ($Ax=b$ where $A$ is tall)? Usually, there is no solution that hits every point exactly. The **Least Squares Method** finds the "best possible" solution by minimizing the distance (the error) between the data points and your model. Geometrically, we are projecting the vector $b$ onto the subspace spanned by the columns of $A$.
            </div>

            <div class="box definition">
                <span class="box-title">Problem Statement (Linear Regression)</span>
                <p><strong>Setup:</strong> Given $n$ data points $(x_i, y_i)$, we want to find a line $f(x) = ax + b$ that fits them best.</p>
                We define the "error" (residual) for each point as $r_i = y_i - (ax_i + b)$. To find the best fit, we minimize the sum of the squares of these residuals:
                \\[ S(a, b) = \\sum_{i=1}^n (y_i - (ax_i + b))^2 \\]
            </div>

            <div class="box theorem">
                <span class="box-title">Derivation of Normal Equations</span>
                To minimize $S(a, b)$, we take partial derivatives with respect to $a$ and $b$ and set them to zero.
                <ol>
                    <li><strong>Differentiate with respect to $a$:</strong><br>
                        \\[ \\frac{\\partial S}{\\partial a} = \\sum_{i=1}^n 2(y_i - ax_i - b)(-x_i) = 0 \\]
                        Simplify: $\\sum (ax_i^2 + bx_i - x_iy_i) = 0 \\implies a \\sum x_i^2 + b \\sum x_i = \\sum x_i y_i$.
                    </li>
                    <li><strong>Differentiate with respect to $b$:</strong><br>
                        \\[ \\frac{\\partial S}{\\partial b} = \\sum_{i=1}^n 2(y_i - ax_i - b)(-1) = 0 \\]
                        Simplify: $\\sum (ax_i + b - y_i) = 0 \\implies a \\sum x_i + b \\cdot n = \\sum y_i$.
                    </li>
                </ol>
                In matrix form ($A^T A x = A^T y$), these are known as the <strong>Normal Equations</strong>.
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Fit a line to (1, 2), (2, 3), (3, 5).
                <ul>
                    <li>$n = 3$</li>
                    <li>$\\sum x = 6, \\sum y = 10, \\sum x^2 = 14, \\sum xy = 23$</li>
                </ul>
                The Normal Equations are:
                \\[ 14a + 6b = 23 \\]
                \\[ 6a + 3b = 10 \\]
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
        "content": `
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

            <div class="proof">
                <strong>Why QR preserves precision (Step-by-Step):</strong>
                <ol>
                    <li>Recall the condition number $K(A)$.</li>
                    <li>The Normal Equations use $A^T A$, so the condition number becomes $K(A^T A) = [K(A)]^2$.</li>
                    <li>If $K(A) = 10^4$, the Normal Equations have $K = 10^8$. You lose 8 digits of precision immediately!</li>
                    <li>Because $Q$ is orthogonal, it doesn't change the condition number: $K(QR) = K(R) = K(A)$.</li>
                    <li>Result: QR solves the same problem while keeping your data's precision intact.</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">Numerical Choice</span>
                Use <strong>Normal Equations</strong> for small, hand-calculated problems. Always use <strong>QR</strong> (or SVD) for real-world software and large datasets.
            </div>
        `
    }
];