export default function HomePage() {
  const bg = "#f4f1ec";
  const ink = "#1f2933";
  const slate = "#5b6770";
  const forest = "#2f4f3e";
  const clay = "#b08968";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "56px 20px",
        background: bg,
      }}
    >
      <div style={{ width: "100%", maxWidth: 820 }}>
        <section
          style={{
            background: "rgba(255,255,255,0.94)",
            borderRadius: 24,
            padding: "52px 56px 44px",
            border: "1px solid rgba(31,41,51,0.10)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.14)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Owl mark (single-line path to avoid build/parser issues) */}
          <svg
            aria-hidden="true"
            width="110"
            height="110"
            viewBox="0 0 120 120"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              opacity: 0.12,
              pointerEvents: "none",
            }}
          >
            <path
              d="M30 48 C30 28 90 28 90 48 C90 70 72 82 60 92 C48 82 30 70 30 48 Z"
              fill="none"
              stroke={slate}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="48" cy="52" r="4" fill={slate} />
            <circle cx="72" cy="52" r="4" fill={slate} />
          </svg>

          {/* Small top label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                background: "rgba(47,79,62,0.08)",
                border: "1px solid rgba(31,41,51,0.10)",
                boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                color: slate,
              }}
            >
              The Spiral Companion's
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              color: ink,
              fontSize: 52,
              lineHeight: 1.03,
              fontWeight: 750,
              letterSpacing: -0.8,
              textAlign: "left",
            }}
          >
            Noticing Book
          </h1>

          {/* Rule */}
          <div
            aria-hidden="true"
            style={{
              height: 10,
              width: 132,
              marginTop: 14,
              borderBottom: "2px solid rgba(31,41,51,0.08)",
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              marginTop: 18,
              marginBottom: 22,
              maxWidth: 640,
              color: slate,
              fontSize: 17,
              lineHeight: 1.75,
              textAlign: "left",
            }}
          >
            A quiet place to record what you see, notice patterns, and support growth over time.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
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
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 12px 28px rgba(47,79,62,0.18)",
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
                background: "transparent",
                color: ink,
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(176,137,104,0.55)",
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
            }}
          />

          {/* Feature tiles (written out explicitly = fewer surprises) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.86)",
                borderRadius: 14,
                padding: 16,
                border: "1px solid rgba(176,137,104,0.22)",
                minHeight: 90,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 6 }}>Local-first</div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.5 }}>Notes stay on your device.</div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.86)",
                borderRadius: 14,
                padding: 16,
                border: "1px solid rgba(176,137,104,0.22)",
                minHeight: 90,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 6 }}>
                Patterns over time
              </div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.5 }}>
                Light structure, useful insights.
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.86)",
                borderRadius: 14,
                padding: 16,
                border: "1px solid rgba(176,137,104,0.22)",
                minHeight: 90,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: ink, marginBottom: 6 }}>
                Useable summaries
              </div>
              <div style={{ fontSize: 14, color: slate, lineHeight: 1.5 }}>
                Turn noticing into clear next steps.
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div style={{ color: slate, fontSize: 13, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span>Made for quiet, consistent observation.</span>
            <span style={{ color: clay }}>•</span>
            <span>Privacy-minded</span>
            <span style={{ color: clay }}>•</span>
            <span style={{ color: "#6b7f62" }}>Grounded by design</span>
          </div>
        </section>
      </div>
    </main>
  );
}

