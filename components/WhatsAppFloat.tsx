"use client";

import { useState, useEffect } from "react";

const MENSAJES = [
  "¿Tienes alguna consulta? 🌸",
  "¿En qué puedo ayudarte? 💖",
  "¡Estoy aquí para ayudarte! 🎀",
  "¿Buscas algo especial? ✨",
  "¿Tienes dudas sobre tu pedido?",
];

const WHATSAPP_URL = "https://wa.me/51903452600?text=Hola!%20Me%20gustaría%20consultar%20sobre%20un%20producto";

export default function WhatsAppFloat() {
  const [mensajeIdx, setMensajeIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  // Mostrar componente tras 1.5s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Mostrar burbuja tras 3s y rotarla cada 6s
  useEffect(() => {
    const t = setTimeout(() => {
      setBubbleVisible(true);
      const interval = setInterval(() => {
        setBubbleVisible(false);
        setTimeout(() => {
          setMensajeIdx((prev) => (prev + 1) % MENSAJES.length);
          setBubbleVisible(true);
        }, 700);
      }, 6000);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-14 right-10 z-50 flex flex-col items-end gap-2">

      {/* Burbuja de mensaje */}
      <div
        className={`transition-all duration-300 ${bubbleVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
          }`}
      >
        <div className="relative bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-lg border border-gray-100 max-w-[200px]">
          <p className="text-xs text-gray-600 leading-relaxed whitespace-nowrap">
            {MENSAJES[mensajeIdx]}
          </p>
          {/* Triángulo */}
          <div className="absolute -bottom-1.5 right-3 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      </div>

      {/* Botón */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />

        {/* Logo WhatsApp */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.036 23.964l6.292-1.648A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.002-1.366l-.358-.214-3.724.976.994-3.63-.234-.374A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
      </a>

    </div>
  );
}