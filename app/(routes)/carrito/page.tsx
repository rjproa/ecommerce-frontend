"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Jost:wght@300;400&display=swap');

        .construction-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #faf7f5;
          font-family: 'Jost', sans-serif;
          padding: 40px 24px;
          position: relative;
          overflow: hidden;
        }

        .construction-page::before {
          content: '';
          position: fixed;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, #f5e6ee 0%, transparent 70%);
          pointer-events: none;
        }

        .construction-page::after {
          content: '';
          position: fixed;
          bottom: -150px; left: -150px;
          width: 450px; height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, #ede8f0 0%, transparent 70%);
          pointer-events: none;
        }

        .inner {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 420px;
          animation: fadeUp 0.9s ease forwards;
        }

        .eyebrow {
          font-size: 10px;
          letter-spacing: 0.45em;
          color: #b07a95;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #fdf0f5;
          border: 1px solid #f0d8e4;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          font-size: 1.8rem;
        }

        .heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 8vw, 2.8rem);
          color: #2a1520;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .heading em {
          font-style: italic;
          color: #a0536e;
        }

        .description {
          font-size: 13px;
          color: #8a7080;
          line-height: 1.75;
          margin-bottom: 40px;
        }

        .divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #eadde5, transparent);
          margin: 0 auto 40px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 40px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #c4789a 0%, #a0536e 100%);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(160, 83, 110, 0.32);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(160, 83, 110, 0.42);
        }

        .back-btn:active {
          transform: translateY(0);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="construction-page">
        <div className="inner">
          <p className="eyebrow">S · H · A · N · T · I</p>

          <div className="icon-wrap">🛠️</div>

          <h1 className="heading">
            Página en<br /><em>construcción</em>
          </h1>

          <p className="description">
            Estamos trabajando para traerte algo increíble.<br />
            Vuelve pronto — valdrá la pena la espera.
          </p>

          <div className="divider" />

          <button className="back-btn" onClick={() => router.push("/")}>
            Volver al inicio
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}