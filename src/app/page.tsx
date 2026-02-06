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
        .nb-mark{
          width:40px;
          height:40px;
          border-radius:14px;
          background: rgba(255,255,255,0.70);
          border: 1px solid ${COLORS.border};
          box-shadow: 0 10px 22px rgba(0,0,0,0.08);
        }
        .nb-kicker{
          font-size:13px;
          font-weight:700;
          letter-spacing:0.6px;
          text-transform:uppercase;
          color:${COLORS.slate};
        }

        /* Card */
        .nb-card{
          background:${COLORS.card};
          border: 1px solid ${COLORS.border};
          border-radius:24px;
          padding:56px 56px 48px;
          box-shadow: 0 28px 60px rgba(0,0,0,0.14);
          backdrop-filter: blur(6px);
        }

        /* Typography */
        .nb-title{
          margin:0;
          font-size:52px;
          font-weight:650;
          letter-spacing:-0.7px;
          color:${COLORS.ink};
          line-height:1.05;
          text-align:left;
        }
        .nb-sub{
          margin:18px 0 30px 0;
          font-size:18px;
          line-height:1.7;
          color:${COLORS.slate};
          max-width:640px;
          text-align:left;
        }

        /* Buttons */
        .nb-actions{
          display:flex;
          gap:14px;
          flex-wrap:wrap;
          margin:0 0 26px 0;
        }
        .nb-btn{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:12px 24px;
          border-radius:999px;
          font-weight:650;
          text-decoration:none;
          transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease, border-color 120ms ease;
          will-change: transform;
        }
        .nb-btnPrimary{
          background:${COLORS.forest};
          color:white;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 18px rgba(47,79,62,0.16);
        }
        .nb-btnPrimary:hover{
          background:${COLORS.forestHover};
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(47,79,62,0.18);
        }
        .nb-btnSecondary{
          background: transparent;
          color:${COLORS.ink};
          border: 1px solid rgba(176,137,104,0.65);
        }
        .nb-btnSecondary:hover{
          background: rgba(176,137,104,0.10);
          transform: translateY(-1px);
        }

        /* Divider */
        .nb-divider{
          height:1px;
          width:100%;
          background:${COLORS.line};
          margin:18px 0 24px 0;
        }

        /* Feature tiles */
        .nb-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap:14px;
        }
        .nb-tile{
          background:${COLORS.tile};
          border: 1px solid rgba(176,137,104,0.22);
          border-radius:18px;
          padding:16px;
        }
        .nb-tileTitle{
          font-size:14px;
          font-weight:750;
          color:${COLORS.ink};
          margin:0 0 6px 0;
        }
        .nb-tileBody{
          font-size:14px;
          line-height:1.55;
          color:${COLORS.slate};
        }

        /* Footer */
        .nb-footer{
          margin-top:26px;
          font-size:13px;
          color:${COLORS.slate};
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          align-items:center;
          justify-content:flex-start;
        }
        .nb-dot{ color:${COLORS.clay}; }
        .nb-olive{ color:#6b7f62; }

        /* Responsive */
        @media (max-width: 760px){
          .nb-card{ padding:38px 24px 28px; }
          .nb-title{ font-size:40px; }
          .nb-sub{ font-size:17px; }
          .nb-grid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}


