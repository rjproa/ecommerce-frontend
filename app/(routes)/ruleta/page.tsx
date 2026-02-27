"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ── Premios por opción (índice 0 = opción 1) ─────────────────────
const PUNTOS_POR_OPCION = [1, 0, 2, 5, 2, 1, 1000, 10];
const LABELS_POR_OPCION = [
  "1 punto",
  "Sigue intentando",
  "2 puntos",
  "5 puntos",
  "2 puntos",
  "1 punto",
  "Prenda Gratis",
  "10 puntos",
];

function getAngleForOpcion(opcion: number): number {
  const centroSector = (opcion - 1) * 45 + 22.5;
  return (270 - centroSector + 90 + 360) % 360;
}

interface UserData {
  documentId: string;
  nombre: string;
  habilitado: boolean;
  puntos: number;
  codigo: string;
  opcion: number;
}

function getUserData(): UserData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function RuletaContent() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(() => getUserData());
  const [spinning, setSpinning] = useState(false);
  const [premio, setPremio] = useState<string | null>(null);
  const [puntosGanados, setPuntosGanados] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [yaGiro, setYaGiro] = useState(false);
  const currentRotation = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const habilitado = userData?.habilitado ?? false;

  const girar = async () => {
    if (spinning || !habilitado || yaGiro || !userData) return;
    setSpinning(true);
    setShowResult(false);
    setPremio(null);

    const opcion = userData.opcion ?? 1;
    const opcionIdx = opcion - 1;
    const puntos = PUNTOS_POR_OPCION[opcionIdx];
    const label = LABELS_POR_OPCION[opcionIdx];
    const targetAngle = getAngleForOpcion(opcion);
    const totalRotation = 20 * 360 + targetAngle;
    const newRotation = currentRotation.current + totalRotation;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 6s cubic-bezier(0.17, 0.67, 0.08, 1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    currentRotation.current = newRotation;

    setTimeout(async () => {
      setSpinning(false);
      setPremio(label);
      setPuntosGanados(puntos);
      setShowResult(true);
      setYaGiro(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/actualizar-despues-giro`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentId: userData.documentId,
              puntosGanados: puntos,
            }),
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          const nuevoUserData = { ...data.cliente, opcion: userData.opcion };
          localStorage.setItem("userData", JSON.stringify(nuevoUserData));
          setUserData(nuevoUserData);
        }
      } catch (err) {
        console.error("Error actualizando cliente:", err);
      }
    }, 6200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .ruleta-page {
          min-height: 100vh;
          background: #faf7f5;
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .ruleta-page::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, #f5e6ee 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ruleta-page::after {
          content: '';
          position: fixed;
          bottom: -150px;
          left: -150px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, #ede8f0 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 0 auto;
          padding: 60px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eyebrow {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.45em;
          color: #b07a95;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.1s forwards;
        }

        .main-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 8vw, 3.2rem);
          color: #2a1520;
          text-align: center;
          line-height: 1.15;
          margin-bottom: 16px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }

        .main-heading em {
          font-style: italic;
          color: #a0536e;
        }

        .subtitle {
          font-size: 13px;
          color: #8a7080;
          text-align: center;
          line-height: 1.7;
          max-width: 320px;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.3s forwards;
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid #eadde5;
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 13px;
          color: #5a3a4a;
          margin-bottom: 40px;
          box-shadow: 0 2px 16px rgba(160, 83, 110, 0.06);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .user-pill .pill-divider {
          width: 1px;
          height: 14px;
          background: #eadde5;
        }

        .user-pill .points {
          color: #a0536e;
          font-weight: 500;
        }

        .wheel-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.5s forwards;
        }

        .wheel-deco {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #f9eef4 0deg 45deg,
            #f3e8f5 45deg 90deg,
            #f9eef4 90deg 135deg,
            #f3e8f5 135deg 180deg,
            #f9eef4 180deg 225deg,
            #f3e8f5 225deg 270deg,
            #f9eef4 270deg 315deg,
            #f3e8f5 315deg 360deg
          );
          opacity: 0.5;
        }

        .arrow-wrap {
          position: relative;
          z-index: 20;
          margin-bottom: -16px;
          filter: drop-shadow(0 3px 8px rgba(160, 83, 110, 0.35));
        }

        .wheel-container {
          position: relative;
          width: 288px;
          height: 288px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            0 0 0 6px #fff,
            0 0 0 8px #eadde5,
            0 16px 48px rgba(160, 83, 110, 0.18),
            0 4px 12px rgba(0,0,0,0.06);
        }

        @media (min-width: 400px) {
          .wheel-container { width: 320px; height: 320px; }
          .wheel-deco { width: 380px; height: 380px; }
        }

        .wheel-inner {
          width: 100%;
          height: 100%;
          transform: rotate(0deg);
          will-change: transform;
        }

        .wheel-pin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #c4789a;
          box-shadow: 0 2px 8px rgba(160, 83, 110, 0.4);
          z-index: 10;
        }

        .spin-btn {
          position: relative;
          padding: 16px 52px;
          border-radius: 50px;
          border: none;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .spin-btn:not(:disabled) {
          background: linear-gradient(135deg, #c4789a 0%, #a0536e 100%);
          color: #fff;
          box-shadow: 0 8px 32px rgba(160, 83, 110, 0.35);
        }

        .spin-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(160, 83, 110, 0.45);
        }

        .spin-btn:disabled {
          background: #ede5e9;
          color: #c4aab5;
          cursor: not-allowed;
        }

        .spin-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .spin-btn:not(:disabled):hover::before { left: 100%; }

        .disabled-card {
          width: 100%;
          max-width: 360px;
          background: #fff;
          border: 1px solid #eadde5;
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(160, 83, 110, 0.07);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.6s forwards;
        }

        .disabled-card .card-icon {
          font-size: 2rem;
          margin-bottom: 16px;
          display: block;
        }

        .disabled-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 1.5rem;
          color: #2a1520;
          margin-bottom: 10px;
        }

        .disabled-card p {
          font-size: 13px;
          color: #8a7080;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .result-card {
          width: 100%;
          max-width: 360px;
          background: #fff;
          border: 1px solid #eadde5;
          border-radius: 24px;
          padding: 44px 32px;
          text-align: center;
          box-shadow: 0 8px 48px rgba(160, 83, 110, 0.12);
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .result-tag {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #a0536e;
          background: #fdf0f5;
          border: 1px solid #f0d8e4;
          border-radius: 50px;
          padding: 5px 16px;
          margin-bottom: 20px;
        }

        .prize-label {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 10vw, 2.8rem);
          color: #2a1520;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .prize-label-zero {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.4rem, 6vw, 2rem);
          color: #7a6070;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .prize-sub {
          font-size: 13px;
          color: #8a7080;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .result-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #eadde5, transparent);
          margin: 0 auto 24px;
        }

        .next-chance-text {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b8a0ac;
          margin-bottom: 16px;
        }

        .how-section {
          width: 100%;
          max-width: 400px;
          margin-top: 40px;
          padding: 32px 28px;
          background: #fff;
          border: 1px solid #eadde5;
          border-radius: 20px;
          box-shadow: 0 2px 16px rgba(160, 83, 110, 0.05);
          opacity: 0;
          animation: fadeUp 0.8s ease 0.7s forwards;
        }

        .how-title {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #b07a95;
          text-align: center;
          margin-bottom: 24px;
        }

        .how-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .how-list li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 13px;
          color: #6a5060;
          line-height: 1.6;
        }

        .how-num {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fdf0f5;
          border: 1px solid #f0d8e4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #a0536e;
          margin-top: 1px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #c4789a 0%, #a0536e 100%);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(160, 83, 110, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(160, 83, 110, 0.4);
        }

        .shimmer-text {
          background: linear-gradient(90deg, #c4789a, #a0536e, #c4789a);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 1.5s linear infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div className="ruleta-page mt-16">
        <div className="content-wrapper">

          {/* Header */}
          <p className="eyebrow">S · H · A · N · T · I</p>
          <h1 className="main-heading">
            Tu ruleta de<br /><em>premios</em>
          </h1>
          <p className="subtitle">
            Cada giro es una oportunidad única. Acumula puntos y canjéalos —{" "}
            <strong style={{ color: "#a0536e", fontWeight: 400 }}>1 punto = S/ 1 de descuento</strong>.
          </p>

          {/* User pill */}
          {userData && (
            <div className="user-pill">
              <span>Hola, <strong style={{ fontWeight: 500 }}>{userData.nombre}</strong></span>
              <div className="pill-divider" />
              <span>Puntos: <span className="points">{userData.puntos}</span></span>
            </div>
          )}

          {/* Wheel */}
          <div className="wheel-section">
            <div className="wheel-deco" />
            <div className="arrow-wrap">
              <svg width="26" height="34" viewBox="0 0 26 34" fill="none">
                <defs>
                  <linearGradient id="arrowGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c4789a" />
                    <stop offset="100%" stopColor="#7a3050" />
                  </linearGradient>
                </defs>
                <path d="M13 34 L1 6 Q13 0 25 6 Z" fill="url(#arrowGrad2)" />
                <circle cx="13" cy="7" r="4" fill="#fff" opacity="0.6" />
              </svg>
            </div>

            <div className="wheel-container">
              <div ref={wheelRef} className="wheel-inner">
                <Image
                  src="/ruleta.png"
                  alt="Ruleta de premios"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="wheel-pin" />
            </div>
          </div>

          {/* No habilitado */}
          {!habilitado && !yaGiro && (
            <div className="disabled-card">
              <span className="card-icon">🎡</span>
              <h3>Sin chances disponibles</h3>
              <p>
                Realiza una compra para obtener tu oportunidad de girar la ruleta.<br />
                <strong style={{ color: "#a0536e", fontWeight: 400 }}>Cada compra = 1 chance</strong>.
              </p>
              <button className="action-btn" onClick={() => router.push("/")}>
                Obtener chance
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Botón girar */}
          {habilitado && !yaGiro && (
            <button className="spin-btn" onClick={girar} disabled={spinning}>
              {spinning
                ? <span className="shimmer-text">Girando...</span>
                : "✦  Girar ruleta  ✦"
              }
            </button>
          )}

          {/* Resultado */}
          {showResult && premio !== null && puntosGanados !== null && (
            <div className="result-card">
              {puntosGanados > 0 ? (
                <>
                  <span className="result-tag">¡Felicitaciones!</span>
                  <p className="prize-label">{premio}</p>
                  <p className="prize-sub">
                    {puntosGanados >= 1000
                      ? "🎉 ¡Premio especial registrado en tu cuenta!"
                      : `+${puntosGanados} ${puntosGanados === 1 ? "punto añadido" : "puntos añadidos"} a tu cuenta.`}
                  </p>
                </>
              ) : (
                <>
                  <span className="result-tag">Esta vez no fue</span>
                  <p className="prize-label-zero">Sigue intentando 🌸</p>
                  <p className="prize-sub">
                    En tu próxima compra tendrás una nueva oportunidad.
                  </p>
                </>
              )}
              <div className="result-divider" />
              <p className="next-chance-text">Realiza otra compra para girar de nuevo</p>
              <button className="action-btn" onClick={() => router.push("/")}>
                Volver al inicio
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Cómo funciona */}
          {!showResult && (
            <div className="how-section">
              <p className="how-title">¿Cómo funciona?</p>
              <ul className="how-list">
                {[
                  "Gira la ruleta y descubre tu premio al instante.",
                  "Los puntos se acumulan en tu cuenta — úsalos cuando quieras.",
                  "Al pagar, canjea puntos: prenda de S/ 15 con 5 puntos = pagas solo S/ 10.",
                  "Cada compra te da una nueva oportunidad de girar.",
                ].map((text, i) => (
                  <li key={i}>
                    <span className="how-num">{i + 1}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(RuletaContent), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#faf7f5",
    }}>
      <div style={{ textAlign: "center" }}>
        <svg
          style={{ width: 40, height: 40, margin: "0 auto 16px", color: "#a0536e", animation: "spin 1s linear infinite" }}
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p style={{ color: "#8a7080", fontFamily: "serif", fontSize: 14 }}>Cargando ruleta...</p>
      </div>
    </div>
  ),
});