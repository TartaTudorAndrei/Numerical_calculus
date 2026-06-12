const ch6Data = [
    {
        "id": "c9-newton-divided-diff",
        "title": "Newton Form & Divided Differences",
        "content": `
            <h3>Newton Form</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Imagine you've built a degree-5 polynomial for 6 data points, and then someone gives you a 7th point. With the Lagrange form, you'd have to start over from scratch! The **Newton Form** is better: it builds the polynomial "incrementally." Adding a new point just means adding one more term to your existing formula, saving time and computation.
            </div>

            <div class="box definition">
                <span class="box-title">The Newton Polynomial</span>
                \\[ P_n(x) = a_0 + a_1(x-x_0) + a_2(x-x_0)(x-x_1) + \\dots + a_n(x-x_0)\\dots(x-x_{n-1}) \\]
                The coefficients $a_k$ are calculated using **Divided Differences**, denoted by $f[x_0, \\dots, x_k]$.
            </div>

            <div class="box algorithm">
                <span class="box-title">Divided Difference Table</span>
                We calculate these values recursively:
                \\[ f[x_i, x_{i+1}] = \\frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i} \\]
                \\[ f[x_i, \\dots, x_{i+k}] = \\frac{f[x_{i+1}, \\dots, x_{i+k}] - f[x_i, \\dots, x_{i+k-1}]}{x_{i+k} - x_i} \\]
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Points: (0, 1), (1, 3), (2, 2).
                <ol>
                    <li><strong>Zeroth Diff:</strong> $f[x_0]=1, f[x_1]=3, f[x_2]=2$.</li>
                    <li><strong>First Diff:</strong> 
                        - $f[x_0, x_1] = (3-1)/(1-0) = 2$.
                        - $f[x_1, x_2] = (2-3)/(2-1) = -1$.
                    </li>
                    <li><strong>Second Diff:</strong>
                        - $f[x_0, x_1, x_2] = (-1 - 2)/(2 - 0) = -1.5$.
                    </li>
                </ol>
                Polynomial: $P_2(x) = 1 + 2(x-0) - 1.5(x-0)(x-1)$.
            </div>

            <h3>Hermite Interpolation</h3>
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Sometimes just passing through points isn't enough; you also want the curve to have a specific "direction" or slope at those points. **Hermite Interpolation** allows you to match both the function value and its derivative. This is why Hermite curves look much "smoother" than standard Lagrange curves.
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfall</span>
                In Hermite interpolation, remember that for $n+1$ points, you have $2n+2$ conditions (values + slopes). This means your resulting polynomial will be of degree $2n+1$. Don't be surprised if the math gets a bit long!
            </div>
        `
    }
];