/* eslint-disable */
import React from "react";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .ss-footer * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .ss-footer {
          width: 100%;
          overflow-x: hidden;
        }

        .ss-footer-link {
          font-size: clamp(12.5px, 1.1vw, 13.5px); color: rgba(255,255,255,0.55);
          cursor: pointer; transition: color .18s;
          background: none; border: none; padding: 0;
          text-align: left; display: block;
          font-family: 'DM Sans', sans-serif;
        }
        .ss-footer-link:hover { color: rgba(255,255,255,0.95); }

        .ss-footer-col-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: .09em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 14px;
        }

        .ss-social-btn {
          width: clamp(30px, 8vw, 34px); height: clamp(30px, 8vw, 34px); border-radius: 9px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .2s; font-size: clamp(12px, 3vw, 14px);
        }
        .ss-social-btn:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); }

        .ss-bottom-btn {
          color: rgba(255,255,255,0.35); font-size: 12.5px; cursor: pointer;
          transition: color .18s; background: none; border: none; padding: 0;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .ss-bottom-btn:hover { color: rgba(255,255,255,0.7); }

        .ss-footer-main {
          max-width: 1160px;
          margin: 0 auto;
          padding: clamp(28px, 6vw, 36px) clamp(16px, 4vw, 24px) clamp(20px, 5vw, 28px);
          position: relative;
          z-index: 1;
        }

        .ss-footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: clamp(20px, 3vw, 32px);
          align-items: start;
        }

        .ss-footer-bottom-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 14px clamp(16px, 4vw, 24px);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
        }

        .ss-footer-brand-desc {
          font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.65;
          margin: 0 0 16px; max-width: 280px;
        }

        .ss-contact-row {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap;
        }
        .ss-contact-text {
          font-size: 13px; color: rgba(255,255,255,.55);
          word-break: break-word;
          min-width: 0;
        }

        .ss-sos-callout {
          margin-top: 4px; background: rgba(239,68,68,.15);
          border: 1px solid rgba(239,68,68,.25); border-radius: 10px;
          padding: 9px 12px;
        }

        .ss-copyright {
          font-size: 12.5px; color: rgba(255,255,255,.3);
        }

        .ss-bottom-links {
          display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
        }

        .ss-madewith {
          font-size: 12.5px; color: rgba(255,255,255,.3);
          display: flex; align-items: center; gap: 4px; white-space: nowrap;
        }

        /* ===========================================================
           BREAKPOINTS
        =========================================================== */

        /* Large desktops 1367px+ */
        @media (min-width: 1367px) {
          .ss-footer-main, .ss-footer-bottom-wrap { padding-left: 32px; padding-right: 32px; }
        }

        /* Tablets 768px - 1024px: 2-column grid, brand spans full width */
        @media (max-width: 1024px) {
          .ss-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .ss-footer-brand-col {
            grid-column: 1 / -1;
          }
          .ss-footer-brand-desc { max-width: 480px; }
        }

        /* Large phones 481px - 767px and Mobile 320px - 480px: single column */
        @media (max-width: 767px) {
          .ss-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ss-footer-brand-col { grid-column: auto; }
          .ss-footer-brand-desc { max-width: 100%; }

          .ss-footer-bottom-wrap {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }
          .ss-bottom-links {
            gap: 16px;
          }
        }

        /* Small phones 320px - 480px */
        @media (max-width: 480px) {
          .ss-footer-grid { gap: 24px; }
          .ss-footer-main { padding-bottom: 24px; }
          .ss-bottom-links {
            width: 100%;
            justify-content: flex-start;
            gap: 14px;
          }
          .ss-madewith { width: 100%; }
        }
      `}</style>

      <footer className="ss-footer" style={{
        background: "linear-gradient(135deg, #1a237e 0%, #1e3a8a 40%, #1d4ed8 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle purple glow blob for depth */}
        <div style={{ position: "absolute", top: -60, right: -40, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
        {/* Shimmer top line */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #60A5FA, #A78BFA 50%, #34D399 100%)", opacity: 0.7 }}/>

        {/* ── Main content — responsive grid ── */}
        <div className="ss-footer-main">
          <div className="ss-footer-grid">

            {/* Col 1 — Brand */}
            <div className="ss-footer-brand-col">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                  🛡️
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 800, color: "white" }}>Suraksha Sathi</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>Every Journey Deserves Safety</div>
                </div>
              </div>

              <p className="ss-footer-brand-desc">
                Empowering safe mobility for women using community reports, live insights and SOS alerts.
              </p>

              <div style={{ display: "flex", gap: 7 }}>
                {["𝕏", "📸", "💼", "⚙️"].map((s) => (
                  <div key={s} className="ss-social-btn">{s}</div>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <div className="ss-footer-col-title">Quick Links</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Home", "Route Finder", "Community", "About"].map((l) => (
                  <button key={l} className="ss-footer-link">{l}</button>
                ))}
              </div>
            </div>

            {/* Col 3 — Resources */}
            <div>
              <div className="ss-footer-col-title">Resources</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["OpenStreetMap", "OSRM Routing", "Privacy & Terms"].map((l) => (
                  <button key={l} className="ss-footer-link">{l}</button>
                ))}
              </div>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <div className="ss-footer-col-title">Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="ss-contact-row">
                  <span style={{ fontSize: 14, flexShrink: 0 }}>✉️</span>
                  <span className="ss-contact-text">hello@surakshasathi.com</span>
                </div>
                <div className="ss-contact-row">
                  <span style={{ fontSize: 14, flexShrink: 0 }}>📞</span>
                  <span className="ss-contact-text">+91 12345 67890</span>
                </div>
                {/* SOS micro-callout */}
                <div className="ss-sos-callout">
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#FCA5A5", marginBottom: 2 }}>🚨 Emergency SOS</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", lineHeight: 1.5 }}>One tap to alert your emergency contacts.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 1 }}>
          <div className="ss-footer-bottom-wrap">
            <div className="ss-copyright">
              © 2026 <span style={{ color: "rgba(255,255,255,.55)", fontWeight: 600 }}>Suraksha Sathi</span>. All rights reserved.
            </div>
            <div className="ss-bottom-links">
              <button className="ss-bottom-btn">Privacy Policy</button>
              <button className="ss-bottom-btn">Terms of Use</button>
              <span className="ss-madewith">
                Made with <span style={{ color: "#F87171" }}>❤</span> in India
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
