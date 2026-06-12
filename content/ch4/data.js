const ch4Data = [
    {
        "id": "c6-bisection",
        "title": "The Bisection Method",
        "content": String.raw`
            <h3>The Bisection Method</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                The Bisection Method is the numerical version of "The Price is Right." If you know the root is between $A$ and $B$, you guess the middle. Depending on whether your guess is too high or too low, you throw away half of the interval and repeat. It is slow, but it is **guaranteed** to work as long as the function is continuous and changes sign.
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                <p><strong>Input:</strong> A continuous function $f(x)$ and an interval $[a, b]$ such that $f(a)$ and $f(b)$ have opposite signs ($f(a) \cdot f(b) < 0$).</p>
                <p><strong>Goal:</strong> Find $x^*$ such that $f(x^*) = 0$.</p>
            </div>

            <div class="box algorithm">
                <span class="box-title">Algorithm Steps</span>
                <ol>
                    <li>Calculate the midpoint: $c = (a + b) / 2$.</li>
                    <li>Evaluate $f(c)$.</li>
                    <li>If $f(c)$ is very close to zero, $c$ is your root!</li>
                    <li>If $f(a) \cdot f(c) < 0$, the root is in the left half. Set $b = c$.</li>
                    <li>If $f(c) \cdot f(b) < 0$, the root is in the right half. Set $a = c$.</li>
                    <li>Repeat until the interval is small enough.</li>
                </ol>
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Error Bound</span>
                After $n$ steps, the maximum possible error is:
                \[ |c_n - x^*| \le \frac{b - a}{2^{n+1}} \]
            </div>

            <div class="proof">
                <strong>Proof of Error Bound:</strong>
                <ol>
                    <li>The initial interval length is $L_0 = b-a$.</li>
                    <li>After 1 step, the interval is halved: $L_1 = (b-a)/2$.</li>
                    <li>After $n$ steps, the interval length is $L_n = \frac{b-a}{2^n}$.</li>
                    <li>The root $x^*$ and our guess $c_n$ are both inside this interval. The maximum distance between any two points in the interval is the length of the interval, but since $c_n$ is the midpoint, the max distance to the root is half the interval length: $\frac{L_n}{2} = \frac{b-a}{2^{n+1}}$.</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example</span>
                Find $\sqrt{2}$ by solving $f(x) = x^2 - 2 = 0$ on $[1, 2]$.
                <ul>
                    <li><strong>Step 1:</strong> $a=1, b=2, c=1.5$. $f(1.5) = 0.25$ (+). Since $f(1)=-1$ (-), new interval is $[1, 1.5]$.</li>
                    <li><strong>Step 2:</strong> $a=1, b=1.5, c=1.25$. $f(1.25) = -0.4375$ (-). Since $f(1.5)=0.25$ (+), new interval is $[1.25, 1.5]$.</li>
                </ul>
            </div>
        `
    },
    {
        "id": "c7-newton-method",
        "title": "Newton's Method",
        "content": String.raw`
            <h3>Newton's Method</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                If Bisection is a cautious walk, Newton's Method is a sprint. It uses the slope (derivative) of the function at your current guess to draw a tangent line. The point where that line hits the $x$-axis is your next, much better guess. When it works, it doubles the number of correct digits every single step!
            </div>

            <div class="box algorithm">
                <span class="box-title">The Formula</span>
                Starting from an initial guess $x_0$, we iterate:
                \[ x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} \]
            </div>

            <div class="box theorem">
                <span class="box-title">Step-by-Step Derivation</span>
                Where does the formula come from?
                <ol>
                    <li>Start with the Taylor expansion of $f(x)$ around our current guess $x_n$:
                        \[ f(x) \approx f(x_n) + f'(x_n)(x - x_n) \]
                    </li>
                    <li>We want to find where the function hits zero ($f(x) = 0$):
                        \[ 0 = f(x_n) + f'(x_n)(x - x_n) \]
                    </li>
                    <li>Solve for $x$:
                        \[ -f(x_n) = f'(x_n)(x - x_n) \]
                        \[ -\frac{f(x_n)}{f'(x_n)} = x - x_n \]
                        \[ x = x_n - \frac{f(x_n)}{f'(x_n)} \]
                    </li>
                    <li>This $x$ becomes our next iterate, $x_{n+1}$.</li>
                </ol>
            </div>

            <h3>Higher Order Methods</h3>
            <div class="box algorithm">
                <span class="box-title">Chebyshev's Method (Order 3)</span>
                Derivation from Taylor expansion of the inverse function $h(y) = f^{-1}(y)$:
                \[ x^* = h(0) = h(f(x)) + h'(f(x))(0-f(x)) + \frac{h''(f(x))}{2}(0-f(x))^2 \]
                Using $h' = 1/f'$ and $h'' = -f''/(f')^3$:
                \[ x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} - \frac{f(x_n)^2 f''(x_n)}{2(f'(x_n))^3} \]
            </div>

            <h3>Secant Method</h3>
            <p>What if you don't have the derivative? You can approximate it using the last two points (a secant line).</p>
            <div class="box algorithm">
                <span class="box-title">The Secant Formula</span>
                \[ x_{n+1} = x_n - f(x_n)\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} \]
            </div>

            <div class="box error">
                <span class="box-title">Common Pitfalls</span>
                <ul>
                    <li><strong>Zero Derivative:</strong> If $f'(x_n) = 0$, the formula breaks (you can't divide by zero). Geometrically, the tangent is horizontal and never hits the $x$-axis.</li>
                    <li><strong>Poor Starting Guess:</strong> If you start too far from the root, Newton's method can "shoot off" to infinity or get stuck in a loop.</li>
                </ul>
            </div>
        `
    },
    {
        "id": "c6-convergence-order",
        "title": "Convergence Analysis",
        "content": String.raw`
            <h3>Understanding Convergence Rates</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Convergence rate tells us how fast the error $e_n = |x_n - x^*|$ is shrinking. 
                - **Linear:** The error shrinks by a constant factor (like Bisection).
                - **Quadratic:** The error is squared every step (like Newton). If your error is $0.1$, it becomes $0.01$, then $0.0001$, then $0.00000001$. This is incredibly fast!
            </div>

            <div class="box definition">
                <span class="box-title">Setup</span>
                We say a method has **order of convergence $p$** if:
                \[ \lim_{n \to \infty} \frac{|e_{n+1}|}{|e_n|^p} = C \]
                Where $C$ is the asymptotic error constant.
            </div>

            <div class="box theorem">
                <span class="box-title">Theorem: Order of Fixed Point Iteration</span>
                Let $x^*$ be a fixed point of $F(x)$. If $F'(x^*) = F''(x^*) = \dots = F^{(p-1)}(x^*) = 0$ and $F^{(p)}(x^*) \ne 0$, the iteration $x_{n+1} = F(x_n)$ has order of convergence $p$.
            </div>

            <div class="proof">
                <strong>Proof (using Taylor Series):</strong>
                <ol>
                    <li>Taylor expand $F(x_n)$ around $x^*$:
                        \[ x_{n+1} = F(x^*) + F'(x^*)(x_n-x^*) + \dots + \frac{F^{(p)}(\xi)}{p!}(x_n-x^*)^p \]
                    </li>
                    <li>Since $F(x^*) = x^*$ and the first $p-1$ derivatives are zero:
                        \[ x_{n+1} - x^* = \frac{F^{(p)}(\xi)}{p!}(x_n-x^*)^p \]
                    </li>
                    <li>Define error $e_n = x_n - x^*$:
                        \[ e_{n+1} = \frac{F^{(p)}(\xi)}{p!} e_n^p \]
                    </li>
                    <li>The ratio $|e_{n+1}|/|e_n|^p$ tends to a constant $C = |F^{(p)}(x^*)|/p!$, confirming order $p$.</li>
                </ol>
            </div>

            <div class="box remark">
                <span class="box-title">Comparison Table</span>
                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #ccc;">
                        <th style="text-align:left; padding: 8px;">Method</th>
                        <th style="text-align:left; padding: 8px;">Order ($p$)</th>
                        <th style="text-align:left; padding: 8px;">Requirement</th>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Bisection</td>
                        <td style="padding: 8px;">1 (Linear)</td>
                        <td style="padding: 8px;">Sign change</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Secant</td>
                        <td style="padding: 8px;">1.618 (Superlinear)</td>
                        <td style="padding: 8px;">Two guesses</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Newton</td>
                        <td style="padding: 8px;">2 (Quadratic)</td>
                        <td style="padding: 8px;">Derivative $f'(x)$</td>
                    </tr>
                </table>
            </div>
        `
    }
];