const ch7Data = [
    {
        "id": "c10-bernstein-identities",
        "title": "Bernstein Polynomials",
        "content": `
            <h3>Bernstein Polynomials</h3>

            <div class="box intuition">
                <span class="box-title">Intuition</span>
                Bernstein polynomials are like "weights" that we use to pull a curve toward different control points. Instead of passing exactly through points, we use these polynomials to create curves that are "attracted" to points. They are the mathematical foundation of almost everything you see in digital design (fonts, cars, CGI).
            </div>

            <div class="box definition">
                <span class="box-title">Basis Definition</span>
                The Bernstein basis polynomials of degree $n$ are:
                \\[ B_{i,n}(t) = \\binom{n}{i} t^i (1-t)^{n-i}, \\quad i = 0, \\dots, n \\]
                for $t \\in [0, 1]$.
            </div>

            <div class="box theorem">
                <span class="box-title">Key Properties</span>
                <ol>
                    <li><strong>Partition of Unity:</strong> $\\sum_{i=0}^n B_{i,n}(t) = 1$. This ensures the curve stays within a reasonable range.</li>
                    <li><strong>Non-negativity:</strong> $B_{i,n}(t) \\ge 0$ for all $t \\in [0, 1]$.</li>
                    <li><strong>Symmetry:</strong> $B_{i,n}(t) = B_{n-i,n}(1-t)$.</li>
                </ol>
            </div>

            <h3>Bézier Curves</h3>
            <div class="box intuition">
                <span class="box-title">Intuition</span>
                A **Bézier Curve** is simply a weighted average of a set of control points, where the weights are the Bernstein polynomials. You can think of the control points as "magnets" pulling on a flexible string. The first and last points are the endpoints, while the others control the "stretch."
            </div>

            <div class="box algorithm">
                <span class="box-title">de Casteljau's Algorithm</span>
                <p>This is the "geometric" way to draw a Bézier curve without using big formulas. It uses repeated linear interpolation.</p>
                <strong>Setup:</strong> Given points $P_0, \\dots, P_n$.
                <ol>
                    <li>Pick a value $t \\in [0, 1]$.</li>
                    <li>Find the point that is $t$-percent along each line segment connecting the points.</li>
                    <li>Connect these new points with lines.</li>
                    <li>Repeat until you are left with a single point. That point is on the curve!</li>
                </ol>
            </div>

            <div class="box example">
                <span class="box-title">Mini Example: Quadratic Bézier ($n=2$)</span>
                Points $P_0=(0,0), P_1=(2,4), P_2=(4,0)$. At $t=0.5$:
                <ol>
                    <li>Midpoint of $P_0P_1$: $M_1 = 0.5(0,0) + 0.5(2,4) = (1,2)$.</li>
                    <li>Midpoint of $P_1P_2$: $M_2 = 0.5(2,4) + 0.5(4,0) = (3,2)$.</li>
                    <li>The point on the curve is the midpoint of $M_1M_2$: $B(0.5) = 0.5(1,2) + 0.5(3,2) = (2,2)$.</li>
                </ol>
            </div>
        `
    }
];