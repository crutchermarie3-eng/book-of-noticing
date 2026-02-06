export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 32,
        background: "#f6f7f4",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, width: "100%" }}>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 500,
            marginBottom: 14,
            color: "#4f6f63",
            letterSpacing: "0.4px",
          }}
        >
          The Noticing Book
        </h1>

        <p
          style={{
            opacity: 0.75,
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 16,
          }}
        >
          A quiet place to record what you see, notice patterns, and support
          growth over time.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/noticing"
            style={{
              padding: "11px 22px",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 500,
              background: "#e7efe9",
              color: "#3f5f55",
              border: "1px solid rgba(79,111,99,0.25)",
            }}
          >
            Begin to Notice →
          </a>

          <a
            href="/noticed"
            style={{
              padding: "11px 22px",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 500,
              background: "#f3f6f4",
              color: "#4f6f63",
              border: "1px solid rgba(79,111,99,0.2)",
            }}
          >
            The Noticed →
          </a>
        </div>
      </div>
    </main>
  );
}
