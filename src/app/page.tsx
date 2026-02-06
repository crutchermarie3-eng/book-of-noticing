export default function HomePage() {
  const COLORS = {
    paper: "#f4f1ec",
    ink: "#1f2933",
    slate: "#5b6770",
    forest: "#2f4f3e",
    forestHover: "#263f32",
    clay: "#b08968",
    line: "rgba(31,41,51,0.09)",
    border: "rgba(31,41,51,0.10)",
    card: "rgba(255,255,255,0.92)",
    tile: "rgba(255,255,255,0.72)",
  };

  return (
    <main className="nb-page">
      <div className="nb-wrap">
        <header className="nb-top">
          <div className="nb-mark" aria-hidden />
          <div className="nb-kicker">The Noticing Book</div>
        </header>

        <section className="nb-card">
          <h1 className="nb-title">The Noticing Book</h1>

          <p className="nb-sub">
            A quiet place to record what you see, notice patterns, and support growth over time.
          </p>

          <div className="nb-actions">
            <a className="nb-btn nb-btnPrimary" href="/noticing">
              Begin to Notice <span aria-hidden>→</span>
            </a>

            <a className="nb-btn nb-btnSecondary" href="/noticed">
              The Noticed <span aria-hidden>→</span>
            </a>
          </div>

          <div className="nb-divider" aria-hidden />

          <div className="nb-grid">
            <div className="nb-tile">
              <div className="nb-tileTitle">Local-first</div>
              <div className="nb-tileBody">Your notes stay on your device.</div>
            </div>

            <div className="nb-tile">
              <div className="nb-tileTitle">Patterns over time</div>
              <div className="nb-tileBody">Tags and gentle structure, not paperwork.</div>
            </div>

            <div className="nb-tile">
              <div className="nb-tileTitle">Useable summaries</div>
              <div className="nb-tileBody">Turn noticing into growth stories.</div>
            </div>
          </div>

          <footer className="nb-footer">
            <span>Made for quiet, consistent observation.</span>
            <span className="nb-dot" aria-hidden>
              •
            </span>
            <span>Privacy-minded</span>
            <span className="nb-dot" aria-hidden>
              •
            </span>
            <span className="nb-olive">Grounded by design</span>
          </footer>
        </section>
      </div>

      <style>{`
        /* Page background: warm paper + subtle depth + soft texture */
        .nb-page{
          min-height:100vh;
          display:grid;
          place-items:center;
          padding:48px 24px;
          background:
            radial-gradient(1200px 600px at 20% 20%, rgba(47,79,62,0.08), transparent 55%),
            radial-gradient(900px 520px at 85% 25%, rgba(176,137,104,0.08), transparent 55%),
            radial-gradient(800px 600px at 50% 100%, rgba(31,41,51,0.05), transparent 55%),
            ${COLORS.paper};
          position:relative;
          overflow:hidden;
        }
        .nb-page:before{
          content:"";
          position:absolute;
          inset:-40px;
          background-image: radial-gradient(rgba(31,41,51,0.08) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity:0.12;
          pointer-events:none;
          filter: blur(0.2px);
        }
        .nb-wrap{
          position:relative;
          width:100%;
          max-width:820px; /* tighter = more premium */
        }

        /* Top label */
        .nb-top{
          display:flex;
          align-items:center;
          gap:12px;
          margin:0 0 18px 0;
        }

