const ch8Data = [
    {
        "id": "c11-quadrature",
        "title": "Numerical Integration (Quadrature)",
        "content": `
            <h3>Quadrature: Finding the Area</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Numerical integration (quadrature) is about finding the area under a curve. Since we often can't find an exact antiderivative, we approximate the curve with simple shapes like rectangles or trapezoids whose areas are easy to calculate.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                We want to approximate the integral:
                \\[ \\mathcal{I}(f) = \\int_a^b f(x)\\,dx \\]
                We use a sum of weighted function values:
                \\[ \\mathcal{I}_n(f) = \\sum_{i=0}^n w_i f(x_i) \\]
            </div>

            <div class="box definition">
                <span class="box-title">Degree of Exactness</span>
                A quadrature formula has a <strong>degree of exactness $r$</strong> if it gives the <em>perfectly correct</em> answer for every polynomial of degree $r$ or less, but fails for at least one polynomial of degree $r+1$.
            </div>

            <h3>Newton-Cotes Formulas</h3>
            <div class="box algorithm">
                <span class="box-title">Common Formulas</span>
                These use equally spaced points.
                <ul>
                    <li><strong>Trapezoidal Rule ($n=1$):</strong> Approximates the function with a line. 
                        \\[ I \\approx \\frac{b-a}{2}[f(a) + f(b)] \\]
                    </li>
                    <li><strong>Simpson's Rule ($n=2$):</strong> Approximates the function with a parabola.
                        \\[ I \\approx \\frac{b-a}{6}[f(a) + 4f(m) + f(b)] \\]
                        (where $m$ is the midpoint).
                    </li>
                </ul>
            </div>

            <div class="box theorem">
                <span class="box-title">Composite Rules</span>
                <p><strong>Intuition:</strong> One big trapezoid is often a bad guess. Instead, we chop the interval into $M$ small pieces and apply the formula to each piece.</p>
                As $M$ increases (more pieces), the approximation gets much more accurate.
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Estimate $\\int_0^1 x^2 \\, dx$ using the Trapezoidal Rule ($n=1$).
                <ol>
                    <li>$a=0, b=1, f(x)=x^2$.</li>
                    <li>Formula: $\\frac{1-0}{2}[f(0) + f(1)] = 0.5[0 + 1] = 0.5$.</li>
                    <li>Exact answer is $1/3 \\approx 0.333$. Our error is $0.167$.</li>
                    <li>Using Simpson's Rule: $\\frac{1-0}{6}[f(0) + 4f(0.5) + f(1)] = \\frac{1}{6}[0 + 4(0.25) + 1] = \\frac{2}{6} = 0.333$.</li>
                    <li>Simpson's rule is **exact** here because it's designed to be perfect for parabolas!</li>
                </ol>
            </div>
        `
    }
];