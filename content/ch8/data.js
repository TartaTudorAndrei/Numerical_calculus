const ch8Data = [
    {
        "id": "c11-quadrature",
        "title": "Numerical Integration (Quadrature)",
        "content": String.raw`
            <h3>Quadrature: Finding the Area</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Numerical integration (quadrature) is about finding the area under a curve. Since we often can't find an exact antiderivative algebraically, we approximate the curve with simple geometric shapes—like flat rectangles, straight lines (trapezoids), or parabolas—whose areas are easy to calculate using simple formulas.
            </div>

            <div class="box definition">
                <span class="box-title">Setup & Quadrature Error</span>
                We want to approximate the definite integral:
                \[ \mathcal{I}(f) = \int_a^b f(x)\,dx \]
                We do this using a sum of weighted function values evaluated at specific nodes $x_i$:
                \[ \mathcal{I}_n(f) = \sum_{i=0}^n w_i f(x_i) \]
                The error of our approximation is defined as $\mathcal{E}_n(f) = \mathcal{I}(f) - \mathcal{I}_n(f)$.
                <br><br>
                <strong>Error Bound:</strong> If $f_n(x)$ is the polynomial approximating $f(x)$, the maximum integration error is bounded by the maximum interpolation error:
                \[ |\mathcal{E}_n(f)| = \left|\int_a^b (f(x)-f_n(x))\,dx\right| \le \int_a^b |f(x)-f_n(x)|\,dx \le (b-a)\|f-f_n\|_\infty \]
            </div>

            <div class="box definition">
                <span class="box-title">Degree of Exactness</span>
                A quadrature formula has a <strong>degree of exactness $r$</strong> if it gives the <em>perfectly correct</em> answer (error exactly zero) for every polynomial of degree $r$ or less, but fails (non-zero error) for at least one polynomial of degree $r+1$.
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Interpolatory Quadrature Exactness</span>
                If we build our formula by integrating a Lagrange interpolating polynomial $P_n(x)$, the formula is called **interpolatory**. Any such formula using $n+1$ distinct nodes has a degree of exactness of at least $n$.
            </div>

            <div class="proof">
                <strong>Proof of Exactness:</strong>
                <ol>
                    <li>If $f(x)$ is a polynomial of degree $\le n$ (i.e., $f \in \mathbb{P}_n$), its Lagrange interpolating polynomial $\mathcal{L}_n(x)$ is perfectly equal to $f(x)$ everywhere.</li>
                    <li>Therefore, the true integral is:
                        \[ \mathcal{I}(f) = \int_a^b \mathcal{L}_n(x)\,dx = \int_a^b \left(\sum_{i=0}^n f(x_i) L_i(x)\right)\,dx \]
                    </li>
                    <li>By pulling the sum and constants out of the integral:
                        \[ \mathcal{I}(f) = \sum_{i=0}^n f(x_i) \int_a^b L_i(x)\,dx \]
                    </li>
                    <li>Let the weights be $w_i = \int_a^b L_i(x)\,dx$. Then $\mathcal{I}(f) = \sum_{i=0}^n w_i f(x_i) = \mathcal{I}_n(f)$. The error is $0$.</li>
                </ol>
            </div>

            <h3>Gaussian Quadrature</h3>
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Newton-Cotes formulas (like Trapezoidal and Simpson) force us to use equally spaced points. But what if we could choose the points $x_i$ strategically? **Gaussian Quadrature** does exactly this. By allowing the nodes to "float" to optimal positions, we can double our accuracy for free!
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Maximum Exactness (Gaussian Quadrature)</span>
                A Gaussian quadrature formula with $n+1$ carefully chosen nodes has a degree of exactness of **$2n+1$**. This is the absolute mathematical maximum possible for $n+1$ points!
                <br><br>
                <strong>How to find the nodes?</strong> On the interval $[-1, 1]$, the optimal nodes $x_0, \dots, x_n$ are the roots of the **Legendre polynomial** $P_{n+1}(x)$.
            </div>

            <div class="box example">
                <span class="box-title">Example: 2-Point Gaussian Quadrature</span>
                Let $n=1$ (2 points). Standard Trapezoidal rule (equally spaced) is exact up to degree 1.
                Gaussian quadrature will be exact up to degree $2(1)+1 = 3$.
                <ul>
                    <li>The 2nd Legendre polynomial is $P_2(x) = \frac{1}{2}(3x^2 - 1)$.</li>
                    <li>Its roots are $x_0 = -\frac{1}{\sqrt{3}}$ and $x_1 = \frac{1}{\sqrt{3}}$.</li>
                    <li>The weights are $w_0 = 1$ and $w_1 = 1$.</li>
                </ul>
                The amazing formula: $\int_{-1}^1 f(x) dx \approx f\left(-\frac{1}{\sqrt{3}}\right) + f\left(\frac{1}{\sqrt{3}}\right)$.<br>
                This perfectly integrates any cubic polynomial $ax^3+bx^2+cx+d$ using just two evaluations!
            </div>
        `
    },
    {
        "id": "c11-midpoint-trapezoidal-simpson",
        "title": "Midpoint, Trapezoidal & Simpson",
        "content": String.raw`
            <h3>Standard Formulas</h3>

            <div class="box algorithm">
                <span class="box-title">Basic Rules and Errors</span>
                These rules use equally spaced points over the interval $[a,b]$.
                <ul>
                    <li><strong>Midpoint Rule ($n=0$):</strong> Approximates with a flat horizontal line at the midpoint $m = \frac{a+b}{2}$.
                        \[ I \approx (b-a)f(m) \]
                        <strong>Error:</strong> $\mathcal{E} = \frac{(b-a)^3}{24}f''(\xi)$. Exact for degree 1 (lines).
                    </li>
                    <li><strong>Trapezoidal Rule ($n=1$):</strong> Approximates the function with a straight line between the endpoints. 
                        \[ I \approx \frac{b-a}{2}[f(a) + f(b)] \]
                        <strong>Error:</strong> $\mathcal{E} = -\frac{(b-a)^3}{12}f''(\xi)$. Exact for degree 1 (lines). Notice the error is roughly twice as large as the Midpoint rule!
                    </li>
                    <li><strong>Simpson's Rule ($n=2$):</strong> Approximates the function with a parabola through the endpoints and the midpoint. 
                        \[ I \approx \frac{b-a}{6}[f(a) + 4f(m) + f(b)] \]
                        <strong>Error:</strong> $\mathcal{E} = -\frac{(b-a)^5}{2880}f^{(4)}(\xi)$. Exact for degree 3 (cubics)!
                    </li>
                </ul>
            </div>

            <div class="box theorem">
                <span class="box-title">Composite Rules</span>
                <p><strong>Intuition:</strong> Fitting one giant parabola or trapezoid over a huge interval is a terrible idea. The curve will deviate massively. Instead, we chop the interval into $M$ small pieces (subintervals) of width $H = \frac{b-a}{M}$ and apply the simple formula to each small piece.</p>
                As $M$ increases, the approximation gets rapidly more accurate.
                <ul>
                    <li><strong>Composite Midpoint Error:</strong> $E_{0,m} = \frac{b-a}{24}H^2 f''(\gamma) = O(H^2)$.</li>
                    <li><strong>Composite Trapezoidal Error:</strong> $E_{T,m} = -\frac{b-a}{12}H^2 f''(\gamma) = O(H^2)$.</li>
                    <li><strong>Composite Simpson Error:</strong> $E_{S,m} = -\frac{b-a}{180}H^4 f^{(4)}(\gamma) = O(H^4)$. (Shrinks extremely fast!)</li>
                </ul>
            </div>

            <div class="box example">
                <span class="box-title">Step-by-Step Comparison Example</span>
                Approximate $I = \int_0^2 x^2 \,dx$. The exact value is $\left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} \approx 2.666$.<br><br>
                
                <strong>1. Midpoint Rule</strong>
                <ol>
                    <li>Interval is $[0, 2]$, midpoint is $m = 1$.</li>
                    <li>$I_M = (b-a)f(m) = 2 \cdot (1)^2 = 2$.</li>
                    <li>Error: $2.666 - 2 = 0.666$.</li>
                </ol>

                <strong>2. Trapezoidal Rule</strong>
                <ol>
                    <li>$x_0 = 0, x_1 = 2$.</li>
                    <li>$I_T = \frac{b-a}{2}(f(0) + f(2)) = \frac{2}{2}(0^2 + 2^2) = 1(0 + 4) = 4$.</li>
                    <li>Error: $2.666 - 4 = -1.333$. (Notice the error is roughly $-2 \times$ the Midpoint error, confirming our theory!)</li>
                </ol>

                <strong>3. Simpson's Rule</strong>
                <ol>
                    <li>$x_0 = 0, x_1 = 1, x_2 = 2$.</li>
                    <li>$I_S = \frac{b-a}{6}(f(0) + 4f(1) + f(2)) = \frac{2}{6}(0^2 + 4(1^2) + 2^2) = \frac{1}{3}(0 + 4 + 4) = \frac{8}{3} \approx 2.666$.</li>
                    <li>Error: $0$. (Exact because Simpson's rule has a degree of exactness of 3, and $x^2$ is only degree 2!).</li>
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
                Newton-Cotes formulas are a general family of integration rules (which formally include Trapezoidal and Simpson). They are built by calculating the weights $w_i$ once for equally spaced points. Instead of integrating the function directly, we integrate the Lagrange basis polynomials.
            </div>

            <div class="box definition">
                <span class="box-title">Closed vs Open Formulas</span>
                We use equally spaced nodes $x_k = x_0 + kh$.
                <ul>
                    <li><strong>Closed formulas:</strong> The endpoints $a$ and $b$ <em>are</em> included as nodes. $x_0 = a, x_n = b$, and the step size is $h = \frac{b-a}{n}$. (e.g., Trapezoidal, Simpson).</li>
                    <li><strong>Open formulas:</strong> The endpoints $a$ and $b$ <em>are NOT</em> included as nodes. $x_0 = a + h, x_n = b - h$, and the step size is $h = \frac{b-a}{n+2}$. (e.g., Midpoint rule).</li>
                </ul>
            </div>

            <div class="box theorem">
                <span class="box-title">Weight Calculation (Variable Change)</span>
                For closed formulas, the integral is:
                \[ I_n(f) = h \sum_{i=0}^n w_i f(x_i) \]
                To find the weights $w_i$, we use the change of variable $x = a + th$, so $dx = h\,dt$.
                <ol>
                    <li>The integral of the Lagrange basis polynomial $L_i(x)$ becomes a dimensionless integral over $t$:
                        \[ w_i = \int_0^n \prod_{\substack{k=0 \\ k \ne i}}^n \frac{t-k}{i-k} dt \]
                    </li>
                    <li>This is brilliant because it allows us to pre-calculate universal weights $w_i$ that work for <em>any</em> interval $[a, b]$!</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">Practical Weights Examples</span>
                Using the integral above, we compute:
                <ol>
                    <li><strong>For $n=1$ (Trapezoidal):</strong> $w_0 = 1/2, w_1 = 1/2$.</li>
                    <li><strong>For $n=2$ (Simpson):</strong> $w_0=1/3, w_1=4/3, w_2=1/3$. (Notice Simpson is usually written multiplied by $h/3$, so the sum is $\frac{1}{3}f_0 + \frac{4}{3}f_1 + \frac{1}{3}f_2$).</li>
                </ol>
                Because these numerical weights are independent of $f(x)$ and the interval endpoints, they are extremely efficient to hardcode into software algorithms.
            </div>
        `
    }
];
