"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Mostrar loader en cada cambio de ruta
    setVisible(true);

    // Esperar a que el DOM esté listo y las imágenes above-the-fold carguen
    const timer = setTimeout(() => {
      // Intentar esperar imágenes visibles
      const images = Array.from(document.querySelectorAll("img")) as HTMLImageElement[];
      const visibleImages = images.filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.top < window.innerHeight;
      });

      if (visibleImages.length === 0) {
        setVisible(false);
        return;
      }

      let loaded = 0;
      const total = visibleImages.length;

      const check = () => {
        loaded++;
        if (loaded >= total) setVisible(false);
      };

      visibleImages.forEach((img) => {
        if (img.complete) {
          check();
        } else {
          img.addEventListener("load", check, { once: true });
          img.addEventListener("error", check, { once: true });
        }
      });
    }, 100);

    // Fallback: quitar loader después de 3.5s máximo
    const fallback = setTimeout(() => setVisible(false), 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#faf7f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        animation: visible ? "none" : "loaderFadeOut 0.4s ease forwards",
        pointerEvents: "all",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300&display=swap');

        @keyframes loaderFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.97); }
        }

        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes dotsFlow {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40%            { transform: scale(1);   opacity: 1; }
        }

        .loader-logo {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2rem, 8vw, 2.8rem);
          letter-spacing: 0.45em;
          background: linear-gradient(90deg, #c4789a, #a0536e, #7a3050, #a0536e, #c4789a);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 2.5s linear infinite, pulse 2.5s ease-in-out infinite;
        }

        .loader-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .loader-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c4789a;
          animation: dotsFlow 1.4s ease-in-out infinite;
        }

        .loader-dot:nth-child(1) { animation-delay: 0s; }
        .loader-dot:nth-child(2) { animation-delay: 0.2s; }
        .loader-dot:nth-child(3) { animation-delay: 0.4s; }

        .loader-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #eadde5, transparent);
        }

        .loader-sub {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: #b8a0ac;
          text-transform: uppercase;
        }
      `}</style>

      {/* Logo */}
      <span className="loader-logo">SHANTI</span>

      {/* Línea decorativa */}
      <div className="loader-line" />

      {/* Dots */}
      <div className="loader-dots">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>

      {/* Subtexto */}
      <span className="loader-sub">Cargando</span>
    </div>
  );
}