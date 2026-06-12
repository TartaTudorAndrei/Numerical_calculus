const courseData = {
    "chapters": [
        {
            "id": "ch1",
            "title": "Numerical Linear Algebra Foundations",
            "sections": ch1Data
        },
        {
            "id": "ch2",
            "title": "Systems of Linear Equations",
            "sections": ch2Data
        },
        {
            "id": "ch3",
            "title": "The Least Squares Method",
            "sections": ch3Data
        },
        {
            "id": "ch4",
            "title": "Nonlinear Equations",
            "sections": ch4Data
        },
        {
            "id": "ch5",
            "title": "Nonlinear Systems & Interpolation",
            "sections": ch5Data
        },
        {
            "id": "ch6",
            "title": "Advanced Interpolation",
            "sections": ch6Data
        },
        {
            "id": "ch7",
            "title": "Bernstein, Bézier & Quadrature",
            "sections": ch7Data
        },
        {
            "id": "ch8",
            "title": "Quadrature Formulas",
            "sections": ch8Data
        }
    ],
    "audit": [
        {
            "source": "c2.tex",
            "topics": [
                "SDD Proof",
                "SPD Constructing Proof",
                "Frobenius Submultiplicativity"
            ]
        },
        {
            "source": "c3.tex",
            "topics": [
                "Spectral Radius Bound Proof",
                "Rayleigh Proof",
                "2-norm derivation",
                "Kahan Details"
            ]
        },
        {
            "source": "c4.tex",
            "topics": [
                "Jordan Block Convergence Proof",
                "Jacobi/GS/SOR Detailed Derivations"
            ]
        },
        {
            "source": "c5.tex",
            "topics": [
                "Normal Equation Derivation",
                "QR Minimizer Proof"
            ]
        },
        {
            "source": "c6.tex",
            "topics": [
                "Order Examples",
                "Fixed Point Order Proof",
                "Bisection Error Bound Proof"
            ]
        },
        {
            "source": "c7.tex",
            "topics": [
                "Newton Taylor Proof",
                "Chebyshev Derivation"
            ]
        },
        {
            "source": "c8.tex",
            "topics": [
                "Newton System m_k logic",
                "Interpolation Error Rolle Proof"
            ]
        },
        {
            "source": "c9.tex",
            "topics": [
                "Newton Induction Proof",
                "Hermite Repeated Nodes"
            ]
        },
        {
            "source": "c10.tex",
            "topics": [
                "Bernstein Identities g(s) Proof",
                "de Casteljau Steps"
            ]
        },
        {
            "source": "c11.tex",
            "topics": [
                "Interpolatory Quadrature",
                "Gaussian Quadrature",
                "Midpoint Formula",
                "Trapezoidal Formula",
                "Simpson Formula",
                "Newton-Cotes Formulas"
            ]
        }
    ],
    "corrections": [
        {
            "file": "c11.tex",
            "original": "Missing definition of $p_i(t)$ in Newton-Cotes",
            "corrected": "Implicitly defined by the Lagrange product expansion over parameter $t$."
        }
    ]
};