"use client";

export default function CompanionPage() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <a href="/noticing" style={{ fontSize: 14, textDecoration: "underline" }}>
        ← Back to Noticing
      </a>

      <h1 style={{ fontSize: 32, marginTop: 12, marginBottom: 8 }}>
        The Spiral Companion
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.85 }}>
        A living curriculum. A map of human development. A quiet guide for what
        might come next.
      </p>

      <div style={{ marginTop: 24, lineHeight: 1.7 }}>
        <p>
          This space will hold the Spiral Companion curriculum so observations
          and patterns can meet thoughtful invitations.
        </p>

        <p>
          Over time, this will allow the system to suggest lessons, experiences,
          and supports that align with what is unfolding — not as prescriptions,
          but as possibilities.
        </p>

        <p style={{ opacity: 0.7 }}>(Curriculum integration coming soon.)</p>
      </div>
    </main>
  );
}
