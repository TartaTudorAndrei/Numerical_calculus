const ch5Data = [
    {
        "id": "c8-nonlinear-systems",
        "title": "Newton's Method for Systems",
        "content": String.raw`
            <h3>Newton's Method for Systems</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                How do we solve multiple nonlinear equations at once (e.g., $x^2 + y^2 = 4$ and $e^x + y = 1$)? We use a multi-dimensional version of Newton's method. Instead of just a slope, we use a matrix of slopes called the <strong>Jacobian</strong>. We approximate our curved surfaces with flat tangent planes and find where they intersect.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                <p>We want to find a vector $X = [x_1, x_2, \dots, x_n]^T$ that solves $F(X) = 0$, where $F$ is a vector of functions.</p>
                The iteration is:
                \[ X^{(k+1)} = X^{(k)} + S^{(k)} \]
                Where $S^{(k)}$ is the solution to the linear system:
                \[ J(X^{(k)}) S^{(k)} = -F(X^{(k)}) \]
                $J$ is the <strong>Jacobian matrix</strong>, where $J_{ij} = \frac{\partial f_i}{\partial x_j}$.
            </div>

            <div class="box theorem">
                <span class="box-title">Derivation of the Update $S^{(k)}$</span>
                We linearize the vector function $F(X)$ around the current point $X^{(k)}$ using a multi-dimensional Taylor series:
                \[ F(X) \approx F(X^{(k)}) + J(X^{(k)})(X - X^{(k)}) \]
                Setting the linear approximation to zero ($F(X) = 0$):
                \[ J(X^{(k)}) \underbrace{(X - X^{(k)})}_{S^{(k)}} = -F(X^{(k)}) \]
                This leads to the system $J S = -F$ for the update step $S$.
            </div>

            <div class="box algorithm">
                <span class="box-title">Step-by-Step Procedure</span>
                <ol>
                    <li>Start with a guess $X^{(k)}$.</li>
                    <li>Evaluate the vector of functions $F(X^{(k)})$.</li>
                    <li>Calculate the Jacobian matrix $J(X^{(k)})$ by taking partial derivatives.</li>
                    <li>Solve the linear system $J S = -F$ for the update vector $S$. (Don't invert $J$; use LU or Gaussian elimination).</li>
                    <li>Update your guess: $X^{(k+1)} = X^{(k)} + S$.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Solve $x^2 + y^2 = 3$ and $x + y = 2$.
                <ol>
                    <li>$F(x,y) = \begin{pmatrix} x^2 + y^2 - 3 \\ x + y - 2 \end{pmatrix}$.</li>
                    <li>$J(x,y) = \begin{pmatrix} 2x & 2y \\ 1 & 1 \end{pmatrix}$.</li>
                    <li>At guess $(1, 1)$: $F = \begin{pmatrix} -1 \\ 0 \end{pmatrix}$, $J = \begin{pmatrix} 2 & 2 \\ 1 & 1 \end{pmatrix}$.</li>
                    <li>Wait! This Jacobian is singular (det=0). This tells us our guess is at a "bad" spot where the tangent planes are parallel. We'd need a different $X^{(0)}$.</li>
                </ol>
            </div>
        `
    },
    {
        "id": "c8-interpolation-intro",
        "title": "Polynomial Interpolation",
        "content": String.raw`
            <h3>Interpolation: Connecting the Dots</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                If you have a set of data points (like temperature readings over time), how do you guess what happened <em>between</em> the readings? **Interpolation** creates a smooth curve (a polynomial) that passes exactly through every single point. It's the most basic way to turn discrete data into a continuous function.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                Given $n+1$ distinct points $(x_0, y_0), (x_1, y_1), \dots, (x_n, y_n)$, there exists a **unique** polynomial $P_n(x)$ of degree at most $n$ such that:
                \[ P_n(x_i) = y_i \quad \text{for all } i = 0, \dots, n \]
            </div>

            <h3>Lagrange Form</h3>
            <div class="box algorithm">
                <span class="box-title">Lagrange Basis</span>
                We build the polynomial as a sum of "basis" functions: $P_n(x) = \sum y_i L_i(x)$.
                The trick is that $L_i(x)$ is designed to be **1** at $x_i$ and **0** at all other points:
                \[ L_i(x) = \prod_{j \ne i} \frac{x - x_j}{x_i - x_j} \]
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Points: (1, 2) and (3, 4). ($n=1$, a line).
                <ol>
                    <li>$L_0(x) = \frac{x - 3}{1 - 3} = \frac{x-3}{-2}$.</li>
                    <li>$L_1(x) = \frac{x - 1}{3 - 1} = \frac{x-1}{2}$.</li>
                    <li>$P_1(x) = 2 L_0(x) + 4 L_1(x) = 2\frac{x-3}{-2} + 4\frac{x-1}{2} = -(x-3) + 2(x-1) = x + 1$.</li>
                </ol>
                The line is $y = x + 1$. Check: $1+1=2$ and $3+1=4$. Correct!
            </div>
        `
    },
    {
        "id": "c8-interpolation-error",
        "title": "Interpolation Error",
        "content": String.raw`
            <h3>Interpolation Error Proof</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                How much can we trust our interpolating polynomial? The **Interpolation Error** formula tells us the gap between the true function and our approximation. It depends on two things: how "wiggly" the true function is (its derivatives) and how far we are from our known data points.
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: The Error Formula</span>
                If $f$ is $(n+1)$-times continuously differentiable, the error at any point $x$ is:
                \[ f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x-x_i) \]
                where $\xi$ is some point in the interval containing all $x_i$ and $x$.
            </div>

            <div class="proof">
                <span class="box-title">The Rolle's Theorem Proof</span>
                <br><strong>Step-by-Step Proof:</strong>
                <ol>
                    <li>Define the error $R_n(x) = f(x) - P_n(x)$.</li>
                    <li>Define an auxiliary function $Y(t) = R_n(t) - \frac{R_n(x)}{\ell(x)} \ell(t)$, where $\ell(t) = \prod (t-x_i)$.</li>
                    <li>$Y(t)$ has $n+2$ roots: the $n+1$ nodes $x_i$ and the point $x$.</li>
                    <li>By **Rolle's Theorem**, $Y'(t)$ has $n+1$ roots between them.</li>
                    <li>Repeating this, $Y^{(n+1)}(t)$ has at least 1 root, say $\xi$.</li>
                    <li>Differentiate $Y(t)$ $(n+1)$ times:
                        \[ 0 = Y^{(n+1)}(\xi) = f^{(n+1)}(\xi) - \frac{R_n(x)}{\ell(x)} (n+1)! \]
                    </li>
                    <li>Solve for $R_n(x)$ to get the theorem: $R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod (x-x_i)$.</li>
                </ol>
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall: Runge's Phenomenon</span>
                You might think "more points = better fit." But for high-degree polynomials with equally spaced points, the $\prod (x-x_i)$ term starts "wiggling" wildly near the edges. In practice, we use **Splines** or **Chebyshev nodes** to avoid this.
            </div>
        `
    }
];