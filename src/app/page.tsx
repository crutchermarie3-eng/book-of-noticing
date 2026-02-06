export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "56px 20px",
        background: "#f4f1ec",
        backgroundImage:
          "radial-gradient(900px 420px at 10% 10%, rgba(47,79,62,0.05), transparent 45%)," +
          "radial-gradient(700px 360px at 85% 20%, rgba(176,137,104,0.04), transparent 45%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 780 }}>
        <section
          style={{
            background: "rgba(255,255,255,0.94)",
            borderRadius: 24,
            padding: "48px 52px 42px",
            border: "1px solid rgba(31,41,51,0.10)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.14)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Owl mark */}
          <svg
            aria-hidden
            width="96"
            height="96"
            viewBox="0 0 120 120"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              opacity: 0.14,
              pointerEvents: "none",
            }}
          >
            <path
              d="M30 48
                 C30 28, 90 28, 90 48
                 C90 70, 72 82, 60 92
                 C48 82, 30 70, 30 48 Z"
              fill="none"
              stroke="#5b6770"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="48" cy="52" r="4" fill="#5b6770" />
            <circle cx="72" cy="52" r="4" fill="#5b6770" />
          </svg>

          {/* Small stamp */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              aria-hidden
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background: "rgba(47,79,62,0.10)",
                border: "1px solid rgba(31,41,51,0.10)",
              }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 750,
                letterSpacing: 0.7,
                textTransform: "uppercase",
                color: "#5b6770",
              }}
            >
              The Noticing Book
            </div>
          </div>

          {/* Title + rule */}
          <div style={{ marginBottom: 14 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 48,
                lineHeight: 1.02,
                color: "#1f2933",
                fontWeight: 700,
                letterSpacing: -0.6,
                textAlign: "left",
              }}
            >
              The Noticing Book
            </h1>

            <div
              aria-hidden
              style={{
                height: 8,
                width: 120,
                marginTop: 14,
                borderBottom: "2px solid rgba(31,41,51,0.08)",
                opacity: 0.9,
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            style={{
              color: "#5b6770",
              fontSize: 17,
              lineHeight: 1.75,
              marginTop: 18,
              marginBottom: 22,
              maxWidth: 640,
              textAlign: "left",
            }}
          >
            A quiet place to record what you see, notice patterns, and support growth over time.
          </p>

          {/* Actions */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
            <a
              href="/noticing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 999,
                background: "#2f4f3e",
                color: "#ffffff",
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 10px 28px rgba(47,79,62,0.18)",
              }}
            >
              Begin to Notice <span aria-hidden>→</span>
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
                color: "#1f2933",
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid #b08968",
              }}
            >
              The Noticed <span aria-hidden>→</span>
            </a>
          </div>

          {/* Divider */}
          <div
            aria-hidden
            style={{
              height: 1,
              width: "100%",
              background: "rgba(31,41,51,0.06)",
              marginBottom: 20,
            }}
          />

          {/* Feature tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
              marginBottom: 20,
            }}
          >
            {[
              { title: "Local-first", body: "Notes stay on your device." },
              { title: "Patterns over time", body: "Light structure, useful insights." },
              { title: "Useable summaries", body: "Turn noticing into clear next steps." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: "rgba(255,255,255,0.86)",
                  borderRadius: 14,
                  padding: 16,
                  border: "1px solid rgba(176,137,104,0.22)",
                  minHeight: 86,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1f2933", marginBottom: 6 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 14, color: "#5b6770", lineHeight: 1.5 }}>{f.body}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ color: "#5b6770", fontSize: 13, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span>Made for quiet, consistent observation.</span>
            <span style={{ color: "#b08968" }}>•</span>
            <span>Privacy-minded</span>
            <span style={{ color: "#b08968" }}>•</span>
            <span style={{ color: "#6b7f62" }}>Grounded by design</span>
          </div>
        </section>
      </div>
    </main>
  );
}
