export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
        background: "#f4f1ec",
        // soft depth (no gradients that feel minty)
        backgroundImage:
          "radial-gradient(1200px 600px at 20% 20%, rgba(47,79,62,0.07), transparent 55%)," +
          "radial-gradient(900px 520px at 85% 25%, rgba(176,137,104,0.07), transparent 55%)," +
          "radial-gradient(800px 600px at 50% 100%, rgba(31,41,51,0.05), transparent 55%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 820 }}>
        {/* Small top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              background: "rgba(255,255,255,0.70)",
              border: "1px solid rgba(31,41,51,0.10)",
              boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "#5b6770",
            }}
          >
            The Noticing Book
          </div>
        </div>

        {/* Card */}
        <section
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: 24,
            padding: "56px 56px 48px",
            border: "1px solid rgba(31,41,51,0.10)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.14)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 650,
              letterSpacing: -0.7,
              color: "#1f2933",
              lineHeight: 1.05,
              textAlign: "left",
            }}
          >
            The Noticing Book
          </h1>

          <p
            style={{
              marginTop: 18,
              marginBottom: 30,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#5b6770",
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
              marginBottom: 26,
              justifyContent: "flex-start",
            }}
          >
            <a
              href="/noticing"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "#2f4f3e",
                color: "#ffffff",
                fontWeight: 650,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 8px 18px rgba(47,79,62,0.16)",
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
                fontWeight: 650,
                textDecoration: "none",
                border: "1px solid rgba(176,137,104,0.65)",
              }}
            >
              The Noticed →
            </a>
          </div>

          {/* Divider */}
          <div
