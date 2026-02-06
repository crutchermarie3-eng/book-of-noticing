export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 40,
        background: "#f4f1ec",
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        <section
          style={{
            background: "rgba(255,255,255,0.90)",
            borderRadius: 22,
            padding: "56px 56px 44px",
            border: "1px solid rgba(31,41,51,0.12)",
            boxShadow: "0 22px 44px rgba(0,0,0,0.12)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 650,
              letterSpacing: -0.6,
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

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 26 }}>
            <a
              className="btnPrimary"
              href="/noticing"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "#2f4f3e",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 22px rgba(47,79,62,0.20)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Begin to Notice <span aria-hidden>→</span>
            </a>

            <a
              className="btnSecondary"
              href="/noticed"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "transparent",
                color: "#1f2933",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid #b08968",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              The Noticed <span aria-hidden>→</span>
            </a>
          </div>

          <div
            aria-hidden
            style={{
              height: 1,
              width: "100%",
              background: "rgba(31,41,51,0.12)",
              margin: "18px 0 26px",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {[
              { title: "Local-first", body: "Your notes stay on your device." },
              { title: "Patterns over time", body: "Tags and gentle structure, not paperwork." },
              { title: "Useable summaries", body: "Turn noticing into growth stories." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  borderRadius: 18,
                  padding: 16,
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(31,41,51,0.12)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2933", marginBottom: 6 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "#5b6770" }}>{f.body}</div>
              </div>
            ))}
          </div>

          <style>{`
            .btnPrimary, .btnSecondary {
              transition: transform 120ms ease, background 120ms ease, box-shadow 120ms ease;
            }
            .btnPrimary:hover {
              background: #263f32;
              transform: translateY(-1px);
              box-shadow: 0 12px 26px rgba(47,79,62,0.22);
            }
            .btnSecondary:hover {
              background: rgba(176,137,104,0.10);
              transform: translateY(-1px);
            }
            @media (max-width: 700px) {
              section { padding: 36px 24px !important; }
              h1 { font-size: 42px !important; }
            }
          `}</style>
        </section>
      </div>
    </main>
  );
}
