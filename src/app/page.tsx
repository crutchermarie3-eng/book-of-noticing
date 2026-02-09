export default function HomePage() {
  const bg = "#f4f1ec";
  const paper = "rgba(255,255,255,0.90)";
  const ink = "#1f2933";
  const slate = "#5b6770";
  const forest = "#2f4f3e";
  const clay = "#b08968";
  const moss = "#6b7f62";

  const cardBorder = "1px solid rgba(31,41,51,0.10)";
  const tileBorder = "1px solid rgba(176,137,104,0.18)";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "76px 20px",
        background: `
          radial-gradient(1200px 700px at 18% 8%, rgba(47,79,62,0.10), rgba(244,241,236,0) 60%),
          radial-gradient(1000px 620px at 82% 0%, rgba(176,137,104,0.12), rgba(244,241,236,0) 55%),
          radial-gradient(900px 520px at 60% 110%, rgba(31,41,51,0.06), rgba(244,241,236,0) 55%),
          ${bg}
        `,
      }}
    >
      <div style={{ width: "100%", maxWidth: 920 }}>
        <section
          style={{
            background: `linear-gradient(180deg, ${paper}, rgba(255,255,255,0.86))`,
            borderRadius: 32,
            padding: "58px 60px 50px",
            border: cardBorder,
            boxShadow: "0 14px 40px rgba(0,0,0,0.09)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* soft “paper” depth */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(900px 520px at 28% 22%, rgba(31,41,51,0.045), rgba(255,255,255,0) 62%),
                radial-gradient(700px 480px at 85% 18%, rgba(47,79,62,0.05), rgba(255,255,255,0) 60%)
              `,
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />

          {/* Owl: quiet observer mark */}
          <svg
            aria-hidden="true"
            width="150"
            height="150"
            viewBox="0 0 160 160"
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              opacity: 0.10,
              pointerEvents: "none",
              transform: "rotate(-2deg)",
            }}
          >
            {/* body */}
            <path
              d="M48 66 C48 44 66 34 80 34 C94 34 112 44 112 66
                 C112 90 100 102 90 112 C86 116 83 121 80 128
                 C77 121 74 116 70 112 C60 102 48 90 48 66 Z"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* face mask */}
            <path
              d="M58 66 C58 55 68 48 80 48 C92 48 102 55 102 66
                 C102 79 92 86 80 86 C68 86 58 79 58 66 Z"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* brow line (gentle, not stern) */}
            <path
              d="M64 60 C70 56 76 55 80 55 C84 55 90 56 96 60"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* eyes */}
            <circle cx="70" cy="66" r="6.3" fill="none" stroke={slate} strokeWidth={2} />
            <circle cx="90" cy="66" r="6.3" fill="none" stroke={slate} strokeWidth={2} />
            <circle cx="70" cy="66" r="2.1" fill={slate} />
            <circle cx="90" cy="66" r="2.1" fill={slate} />
            {/* beak */}
            <path
              d="M80 70 L76.5 75.5 L80 77.5 L83.5 75.5 Z"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {/* perch hint */}
            <path
              d="M52 124 C68 120 92 120 108 124"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Top label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 42,
                height: 42,
                borderRadius: 18,
                background: "rgba(47,79,62,0.065)",
                border: "1px solid rgba(31,41,51,0.10)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 760,
                letterSpacing: 0.9,
                textTransform: "uppercase",
                color: slate,
              }}
            >
              The Spiral Companion&apos;s
            </div>
          </div>

          {/* Hero */}
          <h1
            style={{
              margin: 0,
              color: ink,
              fontSize: 56,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -1.0,
              textAlign: "left",
              position: "relative",
            }}
          >
            Noticing Book
          </h1>

          <div
            aria-hidden="true"
            style={{
              height: 10,
              width: 172,
              marginTop: 14,
              borderBottom: "2px solid rgba(31,41,51,0.08)",
              position: "relative",
            }}
          />

          <p
            style={{
              marginTop: 18,
              marginBottom: 26,
              maxWidth: 700,
              color: slate,
              fontSize: 18,
              lineHeight: 1.85,
              textAlign: "left",
              position: "relative",
            }}
          >
            A quiet place to record what you see, notice patterns, and support growth over time.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 26,
              position: "relative",
            }}
          >
            <a
              href="/noticing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 999,
                background: forest,
                color: "#ffffff",
                fontWeight: 760,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 22px rgba(47,79,62,0.18)",
              }}
            >
              Begin to Notice →
            </a>

            <a
              href="/noticed"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.58)",
                color: ink,
                fontWeight: 760,
                textDecoration: "none",
                border: "1px solid rgba(176,137,104,0.38)",
                boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
                backdropFilter: "blur(6px)",
              }}
            >
              The Noticed →
            </a>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              height: 1,
              width: "100%",
              background: "rgba(31,41,51,0.06)",
              marginBottom: 20,
              position: "relative",
            }}
          />

          {/* Feature tiles: responsive via CSS fallback using auto-fit */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginBottom: 18,
              position: "relative",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.78)",
                borderRadius: 20,
                padding: 18,
                border: tileBorder,
                minHeight: 96,
                boxShadow: "0 10px 22px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 840, color: ink, marginBottom: 6 }}>
                Local-first
              </div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.6 }}>
                Notes stay on your device.
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.78)",
                borderRadius: 20,
                padding: 18,
                border: tileBorder,
                minHeight: 96,
                boxShadow: "0 10px 22px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 840, color: ink, marginBottom: 6 }}>
                Patterns over time
              </div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.6 }}>
                Light structure, useful insight.
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.78)",
                borderRadius: 20,
                padding: 18,
                border: tileBorder,
                minHeight: 96,
                boxShadow: "0 10px 22px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 840, color: ink, marginBottom: 6 }}>
                Useful summaries
              </div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.6 }}>
                Turn noticing into clear next steps.
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div
            style={{
              color: slate,
              fontSize: 13,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            <span>Made for quiet, consistent observation.</span>
            <span style={{ color: clay }}>•</span>
            <span>Private by design</span>
            <span style={{ color: clay }}>•</span>
            <span style={{ color: moss }}>Watching without judgment</span>
          </div>
        </section>
      </div>
    </main>
  );
}


