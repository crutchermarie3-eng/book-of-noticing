export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 32,
        background: "linear-gradient(#f8fafc, #ecfdf5)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 20px 40px rgba(15,23,42,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          The Noticing Book
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#475569",
            marginBottom: 32,
          }}
        >
          A quiet place to record what you see, notice patterns, and support growth over time.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <a
            href="/noticing"
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              background: "#047857",
              color: "white",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Begin to Notice →
          </a>

          <a
            href="/noticed"
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              border: "1px solid #cbd5e1",
              color: "#334155",
              textDecoration: "none",
              background: "white",
            }}
          >
            The Noticed →
          </a>
        </div>
      </div>
    </main>
  );
}
