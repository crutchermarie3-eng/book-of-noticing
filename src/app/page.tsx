export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 40,
        background: "#f4f1ec", // warm paper
      }}
    >
      <div style={{ width: "100%", maxWidth: 880 }}>
        <section
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: 22,
            padding: "56px 56px 48px",
            border: "1px solid rgba(31,41,51,0.12)",
            boxShadow: "0 22px 44px rgba(0,0,0,0.12)",
          }}
        >
          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: -0.6,
              color: "#1f2933", // charcoal
              lineHeight: 1.05,
              textAlign: "left",
            }}
          >
            The Noticing Book
          </h1>

          {/* Subtitle */}
          <p
            style={{
              marginTop: 18,
              marginBottom: 32,
              fontSize: 18,
              lineHeight: 1.65,
              color: "#5b6770", // muted slate
              maxWidth: 640,
              textAlign: "left",
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
              marginBottom: 28,
            }}
          >
            <a
              href="/noticing"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "#2f4f3e", // forest
                color: "white",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 22px rgba(47,79,62,0.20)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              Begin to Notice →
            </a>

            <a
              href="/noticed"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "transparent",
                color: "#1f2933",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid #b08968", // clay
              }}
            >
              The Noticed →
            </a>
          </div>

          {/* Divider */}
          <div
            aria-hidden
            style={{
              height: 1,
              width: "100%",
              background: "rgba(31,41,51,0.12)",
              margin: "18px 0 26px",
            }}
          />

          {/* Descriptors */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: 16,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(31,41,51,0.12)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2933", marginBottom: 6 }}>
                Local-first
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "#5b6770" }}>
                Your notes stay on your device.
              </div>
            </div>

            <div
              style={{
                borderRadius: 18,
                padding: 16,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(31,41,51,0.12)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2933", marginBottom: 6 }}>
                Patterns over time
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "#5b6770" }}>
                Tags and gentle structure, not paperwork.
              </div>
            </div>

            <div
              style={{
                borderRadius: 18,
                padding: 16,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(31,41,51,0.12)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2933", marginBottom: 6 }}>
                Useable summaries
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "#5b6770" }}>
                Turn noticing into growth stories.
              </div>
            </div>
          </div>

          {/* Footer whisper */}
          <div
            style={{
              marginTop: 28,
              fontSize: 13,
              color: "#5b6770",
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span>Made for quiet, consistent observation.</span>
            <span aria-hidden style={{ color: "#b08968" }}>
              •
            </span>
            <span>Privacy-minded</span>
            <span aria-hidden style={{ color: "#b08968" }}>
              •
            </span>
            <span style={{ color: "#6b7f62" }}>Grounded by design</span>
          </div>
        </section>
      </div>
    </main>
  );
}
