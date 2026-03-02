"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Lock } from "lucide-react";

interface ProductImage {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

interface Product {
  id: number;
  slug: string;
  productName: string;
  price: number;
  images: ProductImage[];
}

type TipoEntrega = "shalom" | "tren" | "acuerdo" | "";
type TipoDocumento = "dni" | "carnetExtranjeria" | "";

// function ModalPedidoEnviado({ onClose }: { onClose: () => void }) {
//   const [progress, setProgress] = useState(100);
//   const DURATION = 4000;
//   const onCloseRef = useRef(onClose);

//   useEffect(() => {
//     onCloseRef.current = onClose;
//   }, [onClose]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const next = prev - (100 / (DURATION / 100));
//         if (next <= 0) {
//           clearInterval(interval);
//           setTimeout(() => onCloseRef.current(), 0);
//           return 0;
//         }
//         return next;
//       });
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center gap-5">
//         {/* Ícono */}
//         <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
//           <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//             <path d="M6 16l7 7L26 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </div>

//         <div>
//           <h3 className="text-xl font-light text-gray-900 mb-2">¡Pedido enviado!</h3>
//           <p className="text-sm text-gray-500 leading-relaxed">
//             Tu pedido fue enviado por WhatsApp con éxito.<br />
//             Nos pondremos en contacto contigo a la brevedad.
//           </p>
//         </div>

//         {/* Barra de progreso */}
//         <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
//           <div
//             className="h-full bg-gray-900 rounded-full transition-all duration-100 ease-linear"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <p className="text-xs text-gray-400">Serás redirigido automáticamente...</p>

//         {/* Botón cerrar */}
//         <button
//           onClick={onClose}
//           className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
//         >
//           Cerrar ahora
//         </button>
//       </div>
//     </div>
//   );
// }

// function ModalPedidoEnviado({ onClose, whatsappUrl }: { onClose: () => void; whatsappUrl: string }) {
//   const [progress, setProgress] = useState(100);
//   const DURATION = 4000;
//   const onCloseRef = useRef(onClose);

//   useEffect(() => {
//     onCloseRef.current = onClose;
//   }, [onClose]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const next = prev - (100 / (DURATION / 100));
//         if (next <= 0) {
//           clearInterval(interval);
//           setTimeout(() => onCloseRef.current(), 0);
//           return 0;
//         }
//         return next;
//       });
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center gap-5">

//         <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
//           <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//             <path d="M6 16l7 7L26 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </div>

//         <div>
//           <h3 className="text-xl font-light text-gray-900 mb-2">¡Pedido listo!</h3>
//           <p className="text-sm text-gray-500 leading-relaxed">
//             Tu pedido está preparado. Toca el botón para enviarlo por WhatsApp y confirmar tu compra.
//           </p>
//         </div>

//         {/* Botón WhatsApp */}
//         <a
//           href={whatsappUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full py-3.5 bg-green-500 text-white text-sm font-medium tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//             <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.036 23.964l6.292-1.648A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.002-1.366l-.358-.214-3.724.976.994-3.63-.234-.374A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
//           </svg>
//           Enviar por WhatsApp
//         </a>

//         {/* Barra de progreso */}
//         <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
//           <div
//             className="h-full bg-gray-900 rounded-full transition-all duration-100 ease-linear"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <p className="text-xs text-gray-400">La página se cerrará automáticamente...</p>

//         <button
//           onClick={() => onCloseRef.current()}
//           className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
//         >
//           Cerrar ahora
//         </button>
//       </div>
//     </div>
//   );
// }

function ModalPedidoEnviado({ onClose, whatsappUrl }: { onClose: () => void; whatsappUrl: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center gap-5">

        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l7 7L26 9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <h3 className="text-xl font-light text-gray-900 mb-2">¡Pedido listo!</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Toca el botón para enviarlo por WhatsApp y confirmar tu compra.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full py-3.5 bg-green-500 text-white text-sm font-medium tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.036 23.964l6.292-1.648A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.002-1.366l-.358-.214-3.724.976.994-3.63-.234-.374A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          Enviar por WhatsApp
        </a>

      </div>
    </div >
  );
}

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [tipoDoc, setTipoDoc] = useState<TipoDocumento>("");
  const [numDoc, setNumDoc] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const fetchCartProducts = useCallback(async () => {
    const slugs: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (slugs.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    try {
      const filters = slugs
        .map((slug, i) => `filters[$or][${i}][slug][$eq]=${slug}`)
        .join("&");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?${filters}&populate=*`
      );
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  const handleRemove = (slug: string) => {
    const cart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const updated = cart.filter((s) => s !== slug);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const getImageSrc = (images: ProductImage[]) => {
    const img = images?.[0];
    if (!img) return null;
    return img.url.startsWith("http")
      ? img.url
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.url}`;
  };

  const subtotal = products.reduce((sum, p) => sum + p.price, 0);

  const entregaLabels: Record<string, string> = {
    shalom: "Agencia Shalom",
    tren: "Estación del Tren",
    acuerdo: "Lugar público (previo acuerdo)",
  };

  const handlePagar = () => {
    const lineasProductos = products
      .map((p) => `• ${p.productName} — S/ ${p.price.toFixed(2)}`)
      .join("\n");

    const entregaTexto: Record<string, string> = {
      shalom: "Agencia Shalom",
      tren: "Estación del Tren",
      acuerdo: "Lugar público (previo acuerdo)",
    };

    const tipoDocTexto: Record<string, string> = {
      dni: "DNI",
      carnetExtranjeria: "Carnet de Extranjería",
    };

    const mensaje = `
🛍️ *NUEVO PEDIDO - SHANTI*
━━━━━━━━━━━━━━━━━━━━━━

👤 *DATOS DEL CLIENTE*
- Nombre: ${nombres} ${apellidos}
- Email: ${email || "No especificado"}
- Celular: ${celular}
- Documento: ${tipoDocTexto[tipoDoc] || "No especificado"} ${numDoc ? `- ${numDoc}` : ""}

🧺 *PRODUCTOS SELECCIONADOS*
${lineasProductos}

💰 *SUBTOTAL: S/ ${subtotal.toFixed(2)}*

🚚 *TIPO DE ENTREGA*
- ${entregaTexto[tipoEntrega]}

━━━━━━━━━━━━━━━━━━━━━━
¡Gracias por tu compra! Nos pondremos en contacto contigo a la brevedad para coordinar los detalles. 🌸
  `.trim();

    const url = `https://wa.me/51903452600?text=${encodeURIComponent(mensaje)}`;
    setWhatsappUrl(url);
    setModalVisible(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-8 mt-16">

      {/* Título */}
      <div className="mb-10 text-center">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 mb-3">
            CARRITO
          </h1>
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
        <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mt-6">
          Revisa tu pedido
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      )}

      {/* Carrito vacío */}
      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <p className="text-gray-400 font-light text-lg">Tu carrito está vacío</p>
          <button
            onClick={() => router.push("/catalogo")}
            className="mt-2 px-8 py-3 bg-gray-900 text-white text-sm tracking-widest uppercase rounded-full hover:bg-gray-800 transition-colors"
          >
            Ver catálogo
          </button>
        </div>
      )}

      {/* Contenido */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          {/* Tabla de productos */}
          <div>
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr] text-xs tracking-widest uppercase text-gray-400 pb-3 border-b border-gray-100">
              <span>Producto</span>
              <span className="text-center">Precio</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y divide-gray-100">
              {products.map((product) => {
                const imgSrc = getImageSrc(product.images);
                return (
                  <div key={product.slug} className="grid grid-cols-[2fr_1fr_1fr] items-center py-5 gap-4">
                    <div className="flex items-center gap-4">
                      {imgSrc && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                          <Image
                            src={imgSrc}
                            alt={product.productName}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-light text-gray-800 leading-snug">
                          {product.productName}
                        </p>
                        <button
                          onClick={() => handleRemove(product.slug)}
                          className="flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-red-400 transition-colors group"
                        >
                          <Trash2 size={11} className="group-hover:text-red-400" />
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 text-center">
                      S/ {product.price.toFixed(2)}
                    </p>

                    <p className="text-sm font-medium text-gray-900 text-right">
                      S/ {product.price.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs tracking-widest uppercase text-gray-400">Subtotal</span>
              <span className="text-lg font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Impuestos y envío calculados al finalizar la compra
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-gray-50 rounded-2xl p-6 h-fit space-y-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-700 font-medium">
              Ingresa tus datos
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Nombres"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
              />
              <input
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
              />
              <input
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="Celular"
                type="tel"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select
                value={tipoDoc}
                onChange={(e) => setTipoDoc(e.target.value as TipoDocumento)}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-gray-400 appearance-none"
              >
                <option value="" disabled>Tipo documento</option>
                <option value="dni">DNI</option>
                <option value="carnetExtranjeria">Carnet extranjería</option>
              </select>
              <input
                value={numDoc}
                onChange={(e) => setNumDoc(e.target.value)}
                placeholder="Nº Documento"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
              />
            </div>

            {/* Tipo de entrega */}
            <div>
              <h3 className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                Tipo de entrega
              </h3>
              <div className="flex flex-col gap-2">
                {(["shalom", "tren", "acuerdo"] as TipoEntrega[]).map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setTipoEntrega(tipo)}
                    className={`w-full py-3 px-4 rounded-xl text-sm text-left transition-all border ${tipoEntrega === tipo
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    {entregaLabels[tipo]}
                  </button>
                ))}
              </div>
            </div>

            {/* Términos */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-0.5 accent-gray-900"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                He leído y acepto los{" "}
                <span className="underline cursor-pointer hover:text-gray-800 transition-colors">
                  Términos y Condiciones
                </span>{" "}
                de compra del sitio web.
              </span>
            </label>

            {/* Botón pagar */}
            <button
              onClick={handlePagar}
              disabled={!aceptaTerminos || !tipoEntrega || !nombres || !celular}
              className="w-full py-4 bg-gray-900 text-white text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <Lock size={14} />
              Ir a pagar
            </button>
          </div>

        </div>
      )}
      {modalVisible && (
        <ModalPedidoEnviado
          whatsappUrl={whatsappUrl}
          onClose={() => {
            setModalVisible(false);
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));
            router.push("/");
          }}
        />
      )}
    </div>
  );
}