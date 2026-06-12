const ch8Data = [
    {
        "id": "c11-quadrature",
        "title": "Numerical Integration (Quadrature)",
        "content": String.raw`
            <h3>Quadrature: Finding the Area</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Numerical integration (quadrature) is about finding the area under a curve. Since we often can't find an exact antiderivative, we approximate the curve with simple shapes like rectangles or parabolas whose areas are easy to calculate.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                We want to approximate the integral:
                \[ \mathcal{I}(f) = \int_a^b f(x)\,dx \]
                We use a sum of weighted function values:
                \[ \mathcal{I}_n(f) = \sum_{i=0}^n w_i f(x_i) \]
                The error is defined as $\mathcal{E}_n(f) = \mathcal{I}(f) - \mathcal{I}_n(f)$.
            </div>

            <div class="box definition">
                <span class="box-title">Degree of Exactness</span>
                A quadrature formula has a <strong>degree of exactness $r$</strong> if it gives the <em>perfectly correct</em> answer for every polynomial of degree $r$ or less, but fails for at least one polynomial of degree $r+1$.
            </div>

            <div class="box theorem">
                <span class="box-title">Interpolatory Quadrature</span>
                If we build our formula by integrating a Lagrange interpolating polynomial $P_n(x)$, the formula is called **interpolatory**. Any such formula using $n+1$ nodes is guaranteed to have a degree of exactness of at least $n$.
            </div>

            <div class="box remark">
                <span class="box-title">Gaussian Quadrature</span>
                The maximum degree of exactness of an interpolatory formula with $n+1$ nodes is $2n+1$ if nodes are chosen properly.
                For example, on $[-1,1]$, if the nodes are the roots of the Legendre polynomial $P_{n+1}(x)$, then
                \[ \int_{-1}^1 P_k(x)P_m(x)\,dx = \delta_{km} \]
            </div>
        `
    },
    {
        "id": "c11-midpoint-trapezoidal-simpson",
        "title": "Midpoint, Trapezoidal & Simpson",
        "content": String.raw`
            <h3>Common Formulas</h3>

            <div class="box algorithm">
                <span class="box-title">Midpoint, Trapezoidal, and Simpson</span>
                These use equally spaced points.
                <ul>
                    <li><strong>Midpoint Rule ($n=0$):</strong> Approximates with a flat rectangle. Exact for degree 1.
                        \[ I \approx (b-a)f(m) \]
                    </li>
                    <li><strong>Trapezoidal Rule ($n=1$):</strong> Approximates the function with a line. Exact for degree 1.
                        \[ I \approx \frac{b-a}{2}[f(a) + f(b)] \]
                    </li>
                    <li><strong>Simpson's Rule ($n=2$):</strong> Approximates the function with a parabola. Exact for degree 3!
                        \[ I \approx \frac{b-a}{6}[f(a) + 4f(m) + f(b)] \]
                        (where $m$ is the midpoint).
                    </li>
                </ul>
            </div>

            <div class="box theorem">
                <span class="box-title">Composite Rules</span>
                <p><strong>Intuition:</strong> One big trapezoid is often a bad guess. Instead, we chop the interval into $M$ small pieces and apply the formula to each piece.</p>
                As $M$ increases (more pieces), the approximation gets much more accurate. For instance, the composite Trapezoidal error shrinks like $O(H^2)$.
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Estimate $\int_0^1 x^2 \, dx$ using the Trapezoidal Rule ($n=1$).
                <ol>
                    <li>$a=0, b=1, f(x)=x^2$.</li>
                    <li>Formula: $\frac{1-0}{2}[f(0) + f(1)] = 0.5[0 + 1] = 0.5$.</li>
                    <li>Exact answer is $1/3 \approx 0.333$. Our error is $0.167$.</li>
                    <li>Using Simpson's Rule: $\frac{1-0}{6}[f(0) + 4f(0.5) + f(1)] = \frac{1}{6}[0 + 4(0.25) + 1] = \frac{2}{6} = 0.333$.</li>
                    <li>Simpson's rule is **exact** here because it's designed to be perfect for parabolas!</li>
                </ol>
            </div>
        `
    },
    {
        "id": "c11-newton-cotes",
        "title": "Newton-Cotes Formulas",
        "content": String.raw`
            <h3>Newton-Cotes Formulas</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Newton-Cotes formulas are a general family of integration rules (which include Trapezoidal and Simpson). They are built by calculating the weights $w_i$ once for equally spaced points. Instead of integrating the function directly, we integrate the Lagrange basis polynomials.
            </div>

            <div class="box theorem">
                <span class="box-title">Weight Calculation (Variable Change)</span>
                For closed formulas with $h = (b-a)/n$:
                \[ I_n(f) = h \sum_{i=0}^n w_i f(x_i) \]
                To find the weights $w_i$, we use the change of variable $x = a + th$.
                <ol>
                    <li>The integral of the Lagrange basis $L_i(x)$ becomes:
                        \[ w_i = \int_0^n \prod_{j \ne i} \frac{t-j}{i-j} dt \]
                    </li>
                    <li>This allows us to pre-calculate universal weights for any interval $[a, b]$.</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">Practical Weights</span>
                <ol>
                    <li><strong>Trapezoidal ($n=1$):</strong> $w_0 = w_1 = 1/2$.</li>
                    <li><strong>Simpson ($n=2$):</strong> $w_0=1/6, w_1=4/6, w_2=1/6$.</li>
                </ol>
                Because these weights are independent of $f(x)$ and the interval endpoints, they are extremely efficient to use in software.
            </div>
        `
    }
];