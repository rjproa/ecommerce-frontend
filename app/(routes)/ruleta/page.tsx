"use client";

import { useState, useRef } from "react";
import dynamic from 'next/dynamic';

// ── JSON de premios ──────────────────────────────────────────────
const PREMIOS = [
  { id: 1, label: "1 punto", puntos: 1, color: "#F9E4EC" },
  { id: 2, label: "2 puntos", puntos: 2, color: "#E8D5F0" },
  { id: 3, label: "0 puntos", puntos: 0, color: "#E8D5F8" },
  { id: 4, label: "5 puntos", puntos: 5, color: "#C2E0F0" },
  { id: 5, label: "0 puntos", puntos: 0, color: "#C2E0F0" },
  { id: 6, label: "Gratis", puntos: 0, color: "#D5EAF0" },
  { id: 7, label: "20 puntos", puntos: 20, color: "#F0EAD5" },
];

const COLORES_TEXTO = ["#C2185B", "#7B1FA2", "#0277BD", "#E65100"];

// ── Tipos ────────────────────────────────────────────────────────
interface UserData {
  documentId: string;
  nombre: string;
  habilitado: boolean;
  puntos: number;
  codigo: string;
}

// ── Utilidad: leer userData ──────────────────────────────────────
function getUserData(): UserData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Componente Ruleta SVG ────────────────────────────────────────
function SpinWheel({
  premios,
  rotation,
}: {
  premios: typeof PREMIOS;
  rotation: number;
}) {
  const cx = 200;
  const cy = 200;
  const r = 180;
  const n = premios.length;
  const angleStep = (2 * Math.PI) / n;

  const slices = premios.map((p, i) => {
    const startAngle = i * angleStep - Math.PI / 2;
    const endAngle = startAngle + angleStep;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const midAngle = startAngle + angleStep / 2;
    const labelR = r * 0.62;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelR * Math.sin(midAngle);
    const labelDeg = (midAngle * 180) / Math.PI + 90;

    const d = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${r} ${r} 0 0 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return { d, color: p.color, textColor: COLORES_TEXTO[i % COLORES_TEXTO.length], lx, ly, labelDeg, label: p.label };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0s",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Sombra exterior */}
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00000020" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Aro exterior decorativo */}
      <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#E8C4D4" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke="#F3DDE8" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Sectores */}
      <g filter="url(#shadow)">
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.d} fill={s.color} stroke="#fff" strokeWidth="2" />
            <text
              x={s.lx}
              y={s.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              fontWeight="600"
              fill={s.textColor}
              transform={`rotate(${s.labelDeg}, ${s.lx}, ${s.ly})`}
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {/* Centro decorativo */}
      <circle cx={cx} cy={cy} r={28} fill="#fff" stroke="#E8C4D4" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={18} fill="#F9E4EC" />
      <circle cx={cx} cy={cy} r={8} fill="#C2185B" />
    </svg>
  );
}

// ── Componente principal (solo cliente) ─────────────────────────
function RuletaContent() {
  const [userData, setUserData] = useState<UserData | null>(() => getUserData());
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [premio, setPremio] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const currentRotation = useRef(0);

  const girar = async () => {
    if (spinning || !userData?.habilitado) return;
    setSpinning(true);
    setShowResult(false);
    setPremio(null);

    const n = PREMIOS.length;
    const sliceDeg = 360 / n;

    // Giros completos aleatorios + posición final aleatoria
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const randomSlice = Math.floor(Math.random() * n);
    const premioGanado = PREMIOS[randomSlice];

    // Para que la flecha (arriba = 0°) apunte al sector ganador
    const targetAngle = 360 - (randomSlice * sliceDeg + sliceDeg / 2);
    const totalRotation = extraSpins + targetAngle;
    const newRotation = currentRotation.current + totalRotation;

    // Aplicar animación via estilo inline del SVG
    const svgEl = document.getElementById("ruleta-svg-wrapper");
    if (svgEl) {
      const inner = svgEl.querySelector("svg") as SVGElement | null;
      if (inner) {
        inner.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 1)";
        inner.style.transform = `rotate(${newRotation}deg)`;
      }
    }

    currentRotation.current = newRotation;
    setRotation(newRotation);

    // Esperar a que termine la animación
    setTimeout(async () => {
      setSpinning(false);
      setPremio(premioGanado.label);
      setShowResult(true);

      // Actualizar en el backend
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/actualizar-despues-giro`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              documentId: userData.documentId,
              puntosGanados: premioGanado.puntos,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          // Actualizar localStorage
          const nuevoUserData = data.cliente;
          localStorage.setItem('userData', JSON.stringify(nuevoUserData));

          // Actualizar estado local
          setUserData(nuevoUserData);

          console.log('✅ Cliente actualizado:', nuevoUserData);
        } else {
          console.error('❌ Error al actualizar cliente:', data);
        }
      } catch (error) {
        console.error('💥 Error en la petición:', error);
      }
    }, 4200);
  };

  const habilitado = userData?.habilitado ?? false;

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-24"
      style={{
        background: "linear-gradient(160deg, #fff9fb 0%, #f8f0f5 50%, #fdf6f9 100%)",
      }}
    >
      {/* ── Header ── */}
      <div className="text-center mb-10 max-w-lg">
        <p
          className="tracking-[0.3em] text-xs mb-3"
          style={{ color: "#C2185B", textTransform: "uppercase" }}
        >
          S H A N T I
        </p>
        <h1
          className="text-4xl font-light mb-4"
          style={{ color: "#2d1a24", letterSpacing: "0.02em", fontWeight: "500" }}
        >
          Tu ruleta de premios
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "#8a6070" }}>
          Cada giro es una oportunidad. Acumula puntos y canjéalos en tus
          próximas compras — 1 punto equivale a S/ 1 de descuento.
        </p>
      </div>

      {/* ── Cómo funciona ── */}
      <div
        className="mb-10 max-w-md w-full rounded-2xl px-6 py-5"
        style={{
          background: "#fff",
          border: "1px solid #F0D9E5",
          boxShadow: "0 2px 20px #C2185B0d",
        }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-3 text-center"
          style={{ color: "#C2185B" }}
        >
          ¿Cómo funciona?
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "#5a3a48" }}>
          <li className="flex gap-2">
            <span style={{ color: "#C2185B" }}>①</span>
            Gira la ruleta y descubre tu premio.
          </li>
          <li className="flex gap-2">
            <span style={{ color: "#C2185B" }}>②</span>
            Los puntos se acumulan en tu cuenta — úsalos cuando quieras.
          </li>
          <li className="flex gap-2">
            <span style={{ color: "#C2185B" }}>③</span>
            Al pagar, descuenta tus puntos: si una prenda vale S/ 15 y tienes
            5 puntos, pagas solo S/ 10.
          </li>
          <li className="flex gap-2">
            <span style={{ color: "#C2185B" }}>④</span>
            Cada compra te da una nueva oportunidad de girar.
          </li>
        </ul>
      </div>

      {/* ── Ruleta ── */}
      <div className="relative flex flex-col items-center w-full max-w-sm">

        {/* Flecha indicadora */}
        <div className="relative z-10 mb-[-12px]">
          <svg width="28" height="36" viewBox="0 0 28 36">
            <defs>
              <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C2185B" />
                <stop offset="100%" stopColor="#880E4F" />
              </linearGradient>
            </defs>
            <polygon
              points="14,36 0,0 28,0"
              fill="url(#arrowGrad)"
              filter="drop-shadow(0 2px 4px #C2185B44)"
            />
          </svg>
        </div>

        {/* Contenedor SVG ruleta */}
        <div
          id="ruleta-svg-wrapper"
          className="w-72 h-72 sm:w-80 sm:h-80"
          style={{ filter: "drop-shadow(0 8px 32px #C2185B1a)" }}
        >
          <SpinWheel premios={PREMIOS} rotation={0} />
        </div>

        {/* Estado del usuario */}
        <div className="mt-4 text-sm" style={{ color: "#8a6070" }}>
          {userData ? (
            <span>
              Hola, <strong>{userData.nombre}</strong> · Puntos acumulados:{" "}
              <strong style={{ color: "#C2185B" }}>{userData.puntos}</strong>
            </span>
          ) : (
            <span>Cargando...</span>
          )}
        </div>

        {/* Botón girar */}
        <button
          onClick={girar}
          disabled={!habilitado || spinning}
          className="mt-6 px-10 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
          style={{
            background: habilitado && !spinning
              ? "linear-gradient(135deg, #C2185B, #880E4F)"
              : "#e0c4cf",
            color: habilitado && !spinning ? "#fff" : "#b08898",
            cursor: habilitado && !spinning ? "pointer" : "not-allowed",
            border: "none",
            boxShadow: habilitado && !spinning
              ? "0 4px 20px #C2185B44"
              : "none",
            letterSpacing: "0.15em",
          }}
        >
          {spinning ? "Girando..." : habilitado ? "Girar ruleta" : "Sin chances disponibles"}
        </button>

        {/* Mensaje si no habilitado */}
        {!habilitado && userData && (
          <p className="mt-3 text-xs text-center" style={{ color: "#b08898" }}>
            Realiza una compra para obtener tu próxima oportunidad de jugar.
          </p>
        )}
      </div>

      {/* ── Resultado ── */}
      {showResult && premio && (
        <div
          className="mt-10 text-center px-8 py-6 rounded-2xl max-w-xs w-full"
          style={{
            background: "#fff",
            border: "1px solid #F0D9E5",
            boxShadow: "0 4px 32px #C2185B18",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#C2185B" }}>
            ¡Felicitaciones!
          </p>
          <p className="text-2xl font-light mb-1" style={{ color: "#2d1a24" }}>
            {premio}
          </p>
          <p className="text-xs" style={{ color: "#8a6070" }}>
            Tu premio ha sido registrado en tu cuenta.
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Export con dynamic (sin SSR) ─────────────────────────────────
export default dynamic(() => Promise.resolve(RuletaContent), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #fff9fb 0%, #f8f0f5 50%, #fdf6f9 100%)",
      }}
    >
      <div className="text-center">
        <svg className="animate-spin h-12 w-12 mx-auto mb-4" viewBox="0 0 24 24" style={{ color: "#C2185B" }}>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p style={{ color: "#8a6070" }}>Cargando ruleta...</p>
      </div>
    </div>
  )
});