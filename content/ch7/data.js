const ch7Data = [
    {
        "id": "c10-bernstein-identities",
        "title": "Bernstein Polynomials",
        "content": String.raw`
            <h3>Bernstein Polynomials</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Bernstein polynomials are like "weights" that we use to pull a curve toward different control points. Instead of passing exactly through points, we use these polynomials to create curves that are "attracted" to points. They are the mathematical foundation of almost everything you see in digital design (fonts, cars, CGI).
            </div>

            <div class="box definition">
                <span class="box-title">Basis Definition</span>
                The Bernstein basis polynomials of degree $n$ are:
                \[ B_{i,n}(t) = \binom{n}{i} t^i (1-t)^{n-i}, \quad i = 0, \dots, n \]
                for $t \in [0, 1]$.
            </div>

            <div class="box theorem">
                <span class="box-title">Key Properties</span>
                <ol>
                    <li><strong>Partition of Unity:</strong> $\sum_{i=0}^n B_{i,n}(t) = 1$. This ensures the curve stays within the "convex hull" of its control points.</li>
                    <li><strong>Non-negativity:</strong> $B_{i,n}(t) \ge 0$ for all $t \in [0, 1]$.</li>
                    <li><strong>Endpoint Interpolation:</strong> The curve always starts at $P_0$ and ends at $P_n$.</li>
                </ol>
            </div>

            <div class="box theorem">
                <span class="box-title">Derivation of Identities</span>
                We can prove properties like the "Partition of Unity" using a generating function:
                \[ g(s) = (e^s t + (1-t))^n = \sum_{k=0}^n \binom{n}{k} e^{ks} t^k (1-t)^{n-k} \]
            </div>

            <div class="proof">
                <strong>Step-by-Step Proof:</strong>
                <ol>
                    <li><strong>Sum is 1:</strong> Evaluate $g(0) = (1t + 1 - t)^n = 1^n = 1$. This proves Partition of Unity.</li>
                    <li><strong>Expected value:</strong> Differentiate $g(s)$ and evaluate at $s=0$.
                        \[ g'(0) = n(e^s t + 1 - t)^{n-1} e^s t \Big|_{s=0} = nt \]
                        Also $g'(0) = \sum k p_{n,k}(t)$. Thus $\sum \frac{k}{n} p_{n,k}(t) = t$.
                    </li>
                </ol>
            </div>
        `
    },
    {
        "id": "c10-bezier-curves",
        "title": "Bézier Curves",
        "content": String.raw`
            <h3>Bézier Curves</h3>
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                A **Bézier Curve** is simply a weighted average of a set of control points, where the weights are the Bernstein polynomials. You can think of the control points as "magnets" pulling on a flexible string. The first and last points are the endpoints, while the others control the "stretch."
            </div>

            <div class="box algorithm">
                <span class="box-title">de Casteljau Algorithm</span>
                <p>This is the "geometric" way to draw a Bézier curve without using big formulas. It uses repeated linear interpolation.</p>
                <strong>Setup:</strong> Given points $P_0, \dots, P_n$.
                <ol>
                    <li>Initialize $P_{i,0} = P_i$.</li>
                    <li>Recursive step: $P_{i,r}(t) = (1-t)P_{i,r-1}(t) + tP_{i+1,r-1}(t)$.</li>
                    <li>Result: $B(t) = P_{0,n}(t)$.</li>
                </ol>
                <p>This splits every segment in ratio $t:1-t$, ensuring the point lies within the convex hull.</p>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example: Quadratic Bézier ($n=2$)</span>
                Points $P_0=(0,0), P_1=(2,4), P_2=(4,0)$. At $t=0.5$:
                <ol>
                    <li>Midpoint of $P_0P_1$: $P_{0,1} = 0.5(0,0) + 0.5(2,4) = (1,2)$.</li>
                    <li>Midpoint of $P_1P_2$: $P_{1,1} = 0.5(2,4) + 0.5(4,0) = (3,2)$.</li>
                    <li>The point on the curve is the midpoint of these new points: $B(0.5) = 0.5(1,2) + 0.5(3,2) = (2,2)$.</li>
                </ol>
            </div>
        `
    }
];