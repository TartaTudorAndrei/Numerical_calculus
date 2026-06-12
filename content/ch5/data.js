const ch5Data = [
    {
        "id": "c8-nonlinear-systems",
        "title": "Newton's Method for Systems",
        "content": `
            <h3>Newton's Method for Systems</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                How do we solve multiple nonlinear equations at once (e.g., $x^2 + y^2 = 4$ and $e^x + y = 1$)? We use a multi-dimensional version of Newton's method. Instead of just a slope, we use a matrix of slopes called the <strong>Jacobian</strong>. We approximate our curved surfaces with flat tangent planes and find where they intersect.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                <p>We want to find a vector $X = [x_1, x_2, \\dots, x_n]^T$ that solves $F(X) = 0$, where $F$ is a vector of functions.</p>
                The iteration is:
                \\[ X^{(k+1)} = X^{(k)} + S^{(k)} \\]
                Where $S^{(k)}$ is the solution to the linear system:
                \\[ J(X^{(k)}) S^{(k)} = -F(X^{(k)}) \\]
                $J$ is the <strong>Jacobian matrix</strong>, where $J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$.
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
                    <li>$F(x,y) = \\begin{pmatrix} x^2 + y^2 - 3 \\\\ x + y - 2 \\end{pmatrix}$.</li>
                    <li>$J(x,y) = \\begin{pmatrix} 2x & 2y \\\\ 1 & 1 \\end{pmatrix}$.</li>
                    <li>At guess $(1, 1)$: $F = \\begin{pmatrix} -1 \\\\ 0 \\end{pmatrix}$, $J = \\begin{pmatrix} 2 & 2 \\\\ 1 & 1 \\end{pmatrix}$.</li>
                    <li>Wait! This Jacobian is singular (det=0). This tells us our guess is at a "bad" spot where the tangent planes are parallel. We'd need a different $X^{(0)}$.</li>
                </ol>
            </div>
        `
    },
    {
        "id": "c8-interpolation-intro",
        "title": "Polynomial Interpolation",
        "content": `
            <h3>Interpolation: Connecting the Dots</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                If you have a set of data points (like temperature readings over time), how do you guess what happened <em>between</em> the readings? **Interpolation** creates a smooth curve (a polynomial) that passes exactly through every single point. It's the most basic way to turn discrete data into a continuous function.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                Given $n+1$ distinct points $(x_0, y_0), (x_1, y_1), \\dots, (x_n, y_n)$, there exists a **unique** polynomial $P_n(x)$ of degree at most $n$ such that:
                \\[ P_n(x_i) = y_i \\quad \\text{for all } i = 0, \\dots, n \\]
            </div>

            <h3>Lagrange Form</h3>
            <div class="box algorithm">
                <span class="box-title">Lagrange Basis</span>
                We build the polynomial as a sum of "basis" functions: $P_n(x) = \\sum y_i L_i(x)$.
                The trick is that $L_i(x)$ is designed to be **1** at $x_i$ and **0** at all other points:
                \\[ L_i(x) = \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j} \\]
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Points: (1, 2) and (3, 4). ($n=1$, a line).
                <ol>
                    <li>$L_0(x) = \\frac{x - 3}{1 - 3} = \\frac{x-3}{-2}$.</li>
                    <li>$L_1(x) = \\frac{x - 1}{3 - 1} = \\frac{x-1}{2}$.</li>
                    <li>$P_1(x) = 2 L_0(x) + 4 L_1(x) = 2\\frac{x-3}{-2} + 4\\frac{x-1}{2} = -(x-3) + 2(x-1) = x + 1$.</li>
                </ol>
                The line is $y = x + 1$. Check: $1+1=2$ and $3+1=4$. Correct!
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall: Runge's Phenomenon</span>
                You might think "more points = better fit." But for high-degree polynomials, the curve often starts "wiggling" wildly near the edges. This is called **Runge's Phenomenon**. In practice, we rarely use polynomials of degree higher than 5-10.
            </div>
        `
    }
];