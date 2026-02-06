export default function HomePage() {
  const COLORS = {
    bg: "#f4f1ec",          // warm paper
    card: "rgba(255,255,255,0.90)",
    text: "#1f2933",        // charcoal
    subtext: "#5b6770",     // muted slate
    border: "rgba(31,41,51,0.10)",
    forest: "#2f4f3e",      // deep forest
    forestHover: "#263f32",
    clay: "#b08968",        // warm clay accent
    olive: "#6b7f62",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 40,
        background: COLORS.bg,
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        {/* Small top label (quiet, firm) */}
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
              background: "rgba(255,255,255,0.75)",
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.5,
              color: COLORS.subtext,
              textTransform: "uppercase",
            }}
          >
            The Noticing Book
          </div>
        </div>

        {/* Card */}
        <section
          style={{
            background: COLORS.card,
            borderRadius: 22,
            padding: "56px 56px 44px",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 22px 44px rgba(0,0,0,0.12)",
          }}
        >
          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 650,
              letterSpacing: -0.6,
              color: COLORS.text,
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
              marginBottom: 30,
              fontSize: 18,
              lineHeight: 1.7,
              color: COLORS.subtext,
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
              flexWrap: "wrap",
              gap: 14,
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 26,
            }}
          >
            <a
              href="/noticing"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: COLORS.forest,
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 10px 22px rgba(47,79,62,0.20)",
                border: "1px solid rgba(255,255,255,0.18)",
                transition: "transform 120ms ease, background 120ms ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = COLORS.forestHover;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = COLORS.forest;
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0px)";
              }}
            >
              Begin to Notice <span aria-hidden>→</span>
            </a>

            <a
              href="/noticed"
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: "transparent",
                color: COLORS.text,
                fontWeight: 600,
                textDecoration: "none",
                border: `1px solid ${COLORS.clay}`,
                transition: "transform 120ms ease, background 120ms ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(176,137,104,0.10)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0px)";
              }}
            >
              The Noticed <span aria-hidden>→</span>
            </a>
          </div>

          {/* Divider line (quiet structure) */}
          <div
            aria-hidden
            style={{
              height: 1,
              width: "100%",
              background: "rgba(31,41,51,0.12)",
              margin: "18px 0 26px",
            }}
          />

          {/* Descriptors / Feature tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                title: "Local-first",
                body: "Your notes stay on your device.",
              },
              {
                title: "Patterns over time",
                body: "Tags and gentle structure, not paperwork.",
              },
              {
                title: "Useable summaries",
                body: "Turn noticing into growth stories.",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  borderRadius: 18,
                  padding: 16,
                  background: "rgba(255,255,255,0.65)",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: COLORS.subtext }}>
                  {f.body}
                </div>
              </div>
            ))}
          </div>

          {/* Footer whisper */}
          <div
            style={{
              marginTop: 28,
              fontSize: 13,
              color: COLORS.subtext,
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <span>Made for quiet, consistent observation.</span>
            <span aria-hidden style={{ color: COLORS.clay }}>
              •
            </span>
            <span>Privacy-minded</span>
            <span aria-hidden style={{ color: COLORS.clay }}>
              •
            </span>
            <span style={{ color: COLORS.olive }}>Grounded by design</span>
          </div>
        </section>
      </div>
    </main>
  );
}
