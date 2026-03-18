"use client";

import useGetProductBySlug from "@/api/getProductBySlug";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import Friends from "@/components/icons/Friends";

interface Colores {
  color: string;
  stock: number;
  nombreColor: string;
}

interface ProductImage {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

interface Product {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  price: number;
  isFeatured: boolean;
  colores: Colores[];
  images: ProductImage[];
  categoria: {
    nombreCategoria: string;
    slug: string;
  };
}

// Estructura: { [colorHex]: cantidad elegida }
type ColorSelection = Record<string, number>;

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { prendaSlug } = params;

  const { result, loading, error } = useGetProductBySlug(prendaSlug as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [colorSelection, setColorSelection] = useState<ColorSelection>({});

  const product: Product | null = result ? (result as Product[])[0] : null;

  // Stock total disponible (suma de colores con stock > 0)
  const totalStock = useMemo(() => {
    if (!product) return 0;
    return product.colores.reduce((acc, c) => acc + (c.stock > 0 ? c.stock : 0), 0);
  }, [product]);

  // Solo colores con stock > 0
  const availableColors = useMemo(() => {
    if (!product) return [];
    return product.colores.filter((c) => c.stock > 0);
  }, [product]);

  // Total de unidades ya asignadas a colores
  const totalAssigned = useMemo(
    () => Object.values(colorSelection).reduce((a, b) => a + b, 0),
    [colorSelection]
  );

  // Los botones se habilitan solo cuando la suma es exactamente igual a la cantidad
  const isReadyToAdd = quantity !== null && totalAssigned === quantity;

  const handleQuantityChange = (val: number) => {
    setQuantity(val);
    setColorSelection({}); // reiniciar al cambiar cantidad
  };

  const buildColorSummary = () => {
    if (!product) return "";
    return product.colores
      .filter((c) => (colorSelection[c.color] ?? 0) > 0)
      .map((c) => `${c.nombreColor} x${colorSelection[c.color]}`)
      .join(", ");
  };

  const handleAddToCart = () => {
    if (!product || !isReadyToAdd) return;

    // cart: array de slugs (compatible con estructura existente)
    const cart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.includes(product.slug)) {
      cart.push(product.slug);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }

    // cartDetails: detalle por slug { quantity, colors }
    const cartDetails = JSON.parse(localStorage.getItem("cartDetails") || "{}");
    cartDetails[product.slug] = {
      quantity,
      colors: product.colores
        .filter((c) => (colorSelection[c.color] ?? 0) > 0)
        .map((c) => ({
          color: c.color,
          nombreColor: c.nombreColor,
          cantidad: colorSelection[c.color],
        })),
    };
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappBuyHref = useMemo(() => {
    if (!product || !isReadyToAdd) return undefined;
    const colorSummary = buildColorSummary();
    return `https://wa.me/51903452600?text=${encodeURIComponent(
      `Hola!, quiero comprar este producto:\n\n` +
      `${product.productName}\n\n` +
      `- Precio: S/ ${product.price}\n` +
      `- Cantidad: ${quantity}\n` +
      `- Colores: ${colorSummary}\n` +
      `- https://shantiperu.vercel.app/prenda/${product.slug}\n\n`
    )}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isReadyToAdd, colorSelection, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">Producto no encontrado</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={
                product.images[selectedImage].url.startsWith("http")
                  ? product.images[selectedImage].url
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[selectedImage].url}`
              }
              alt={product.productName}
              fill
              className="object-contain p-4"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === index
                    ? "border-gray-900"
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <Image
                    src={
                      image.url.startsWith("http")
                        ? image.url
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
                    }
                    alt={`${product.productName} - imagen ${index + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Categoría */}
          <div className="text-sm text-gray-500 uppercase tracking-wider">
            {product.categoria.nombreCategoria}
          </div>

          {/* Nombre */}
          <h1 className="text-3xl md:text-4xl font-light text-gray-900">
            {product.productName}
          </h1>

          {/* Precio */}
          <div className="flex items-baseline gap-6">
            <span className="text-3xl font-bold text-gray-900">
              s/ {product.price}
            </span>
            <span className="text-sm text-gray-800 line-through">
              s/ {product.price + 10.9}
            </span>
            <span className="text-sm text-green-600 font-medium">
              Ahorra más de s/ 10
            </span>
          </div>

          {/* Descripción */}
          {product.description && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <span
                className={`${product.active
                  ? "hidden"
                  : "text-red-500 font-bold mt-4 block px-2"
                  }`}
              >
                AGOTADO
              </span>
            </div>
          )}

          {/* ── COLORES DISPONIBLES (solo informativo) ── */}
          {product.colores && product.colores.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
                Colores disponibles
              </p>
              <div className="flex items-center gap-10   flex-wrap">
                {product.colores.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="relative w-8 h-8">
                      <div
                        className={`w-8 h-8 rounded-full border border-gray-600 flex justify-center ${c.stock === 0 ? "opacity-70" : ""
                          }`}
                        style={{ backgroundColor: `#${c.color}` }}
                      >
                        {c.stock === 0 && (
                          <span className="text-2xl pb-2 text-black">X</span>
                        )}

                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 capitalize">
                      {c.nombreColor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CANTIDAD ── */}
          {product.active && totalStock > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
                ¿Cuántas unidades quieres?
              </p>
              <select
                value={quantity ?? ""}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white cursor-pointer"
              >
                <option value="" disabled>
                  Selecciona cantidad
                </option>
                {Array.from({ length: totalStock }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "unidad" : "unidades"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ── SELECCIÓN DE COLORES (aparece solo si eligió cantidad) ── */}
          {quantity !== null && availableColors.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                  Elige tus colores
                </p>
                <span className="text-xs text-gray-400">
                  {totalAssigned}/{quantity} asignadas
                  {totalAssigned < quantity && (
                    <span className="ml-1 text-amber-500">
                      · faltan {quantity - totalAssigned}
                    </span>
                  )}
                  {totalAssigned === quantity && (
                    <span className="ml-1 text-green-600">· ¡listo!</span>
                  )}
                </span>
              </div>

              <div className="flex items-end gap-10 flex-wrap justify-between">
                {availableColors.map((c, i) => {
                  const chosen = colorSelection[c.color] ?? 0;

                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      {/* Contador encima del círculo */}
                      <div className="h-5 flex items-center justify-center">
                        {chosen > 0 && (
                          <span className="text-xs font-semibold text-gray-700 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center leading-none">
                            {chosen}
                          </span>
                        )}
                      </div>

                      <div key={i} className="flex flex-col items-center gap-1">

                        {/* Controles */}
                        <div className="flex items-center gap-2">
                          {/* BOTÓN - */}
                          <button
                            onClick={() => {
                              if (chosen <= 0) return;
                              setColorSelection((prev) => {
                                const updated = { ...prev, [c.color]: chosen - 1 };
                                if (updated[c.color] === 0) delete updated[c.color];
                                return updated;
                              });
                            }}
                            disabled={chosen === 0}
                            className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm ${chosen === 0
                              ? "opacity-30 cursor-not-allowed"
                              : "hover:bg-gray-100"
                              }`}
                          >
                            -
                          </button>

                          {/* CÍRCULO */}
                          <div
                            className={`w-9 h-9 rounded-full border-2 ${chosen > 0 ? "border-gray-800 scale-110" : "border-gray-200"
                              }`}
                            style={{ backgroundColor: `#${c.color}` }}
                          />

                          {/* BOTÓN + */}
                          <button
                            onClick={() => {
                              if (quantity === null) return;
                              if (chosen >= c.stock) return;
                              if (totalAssigned >= quantity) return;

                              setColorSelection((prev) => ({
                                ...prev,
                                [c.color]: chosen + 1,
                              }));
                            }}
                            disabled={
                              quantity === null ||
                              chosen >= c.stock ||
                              (totalAssigned >= quantity && chosen === 0)
                            }
                            className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm
        ${quantity === null ||
                                chosen >= c.stock ||
                                (totalAssigned >= quantity && chosen === 0)
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-gray-100"
                              }`}
                          >
                            +
                          </button>
                        </div>

                        <span className="text-[9px] text-gray-400">
                          stock: {c.stock}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ── BOTONES DE ACCIÓN ── */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            {/* Consultar + Compartir */}
            <div className="w-full flex items-center">
              <a
                href={
                  product.active
                    ? `https://wa.me/51903452600?text=${encodeURIComponent(
                      `Hola!\n\n` +
                      `Tengo algunas consultas sobre este producto:\n\n` +
                      `*${product.productName}*\n` +
                      `- Precio: S/ ${product.price}\n` +
                      `- https://shantiperu.vercel.app/prenda/${product.slug}\n\n` +
                      `¿Podrían darme más información sobre la prenda?`
                    )}`
                    : undefined
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`w-1/2 py-3 px-4 text-xs rounded-md flex items-center justify-center gap-6 font-medium transition-all ${product.active
                  ? "bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
                  : "bg-gray-600 opacity-20 cursor-not-allowed pointer-events-none"
                  }`}
              >
                <WhatsappIcon size={20} />
                Consultar por WhatsApp
              </a>
              <div className="ml-auto">
                <a
                  href={
                    product.active
                      ? `https://wa.me/?text=${encodeURIComponent(
                        `Hola!, te comparto esta hermosa prenda.\n\n` +
                        `*${product.productName}*\n\n` +
                        `- ${product.description}\n\n` +
                        `https://shantiperu.vercel.app/prenda/${product.slug}`
                      )}`
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ml-auto w-15 h-15 mr-10 rounded-full flex items-center justify-center border transition-all ${product.active
                    ? "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
                    : "border-gray-200 text-gray-400 opacity-40 cursor-not-allowed pointer-events-none"
                    }`}
                >
                  <Friends />
                </a>
              </div>
            </div>

            {/* Agregar al carrito */}
            <button
              onClick={handleAddToCart}
              disabled={!isReadyToAdd || !product.active}
              className={`w-full py-4 rounded-md transition-all flex items-center justify-center gap-2 font-medium ${added
                ? "bg-green-700 text-white cursor-default"
                : isReadyToAdd && product.active
                  ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                  : "bg-gray-900 text-white opacity-30 cursor-not-allowed"
                }`}
            >
              <ShoppingCart size={20} />
              {added
                ? "¡Agregado al carrito!"
                : !quantity
                  ? "Selecciona una cantidad"
                  : totalAssigned < quantity
                    ? `Faltan ${quantity - totalAssigned} color${quantity - totalAssigned > 1 ? "es" : ""
                    } por asignar`
                    : "Agregar al carrito"}
            </button>

            {/* Compra Rápida */}
            {isReadyToAdd && product.active ? (
              <a
                href={whatsappBuyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-md flex items-center justify-center gap-2 font-medium text-white bg-green-500 hover:bg-green-600 cursor-pointer transition-all"
              >
                <WhatsappIcon size={20} />
                Compra Rápida
              </a>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-md flex items-center justify-center gap-2 font-medium text-white bg-green-500 opacity-30 cursor-not-allowed"
              >
                <WhatsappIcon size={20} />
                Compra Rápida
              </button>
            )}
          </div>

          {/* Información adicional */}
          <div className="space-y-3 text-sm text-gray-600 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Envío a todo el Perú</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Excelente calidad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Seguridad y Confianza</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}