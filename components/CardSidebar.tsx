"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

interface CartColorDetail {
  color: string;
  nombreColor: string;
  cantidad: number;
}

interface CartDetail {
  quantity: number;
  colors: CartColorDetail[];
}

// { [slug]: CartDetail }
type CartDetails = Record<string, CartDetail>;

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartDetails, setCartDetails] = useState<CartDetails>({});
  const [loading, setLoading] = useState(false);

  const fetchCartProducts = useCallback(async () => {
    const slugs: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const details: CartDetails = JSON.parse(localStorage.getItem("cartDetails") || "{}");

    if (slugs.length === 0) {
      setProducts([]);
      setCartDetails({});
      return;
    }

    setCartDetails(details);
    setLoading(true);
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
      console.error("Error fetching cart products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) fetchCartProducts();
  }, [open, fetchCartProducts]);

  useEffect(() => {
    const handleStorage = () => {
      if (open) fetchCartProducts();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [open, fetchCartProducts]);

  const handleRemove = (slug: string) => {
    const cart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const updated = cart.filter((s) => s !== slug);
    localStorage.setItem("cart", JSON.stringify(updated));

    const details: CartDetails = JSON.parse(localStorage.getItem("cartDetails") || "{}");
    delete details[slug];
    localStorage.setItem("cartDetails", JSON.stringify(details));

    window.dispatchEvent(new Event("storage"));
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
    setCartDetails((prev) => {
      const updated = { ...prev };
      delete updated[slug];
      return updated;
    });
  };

  // Precio total: suma de (precio × cantidad) por producto
  const total = products.reduce((sum, p) => {
    const qty = cartDetails[p.slug]?.quantity ?? 1;
    return sum + p.price * qty;
  }, 0);

  // Cantidad total de unidades en el carrito
  const totalUnits = products.reduce((sum, p) => {
    return sum + (cartDetails[p.slug]?.quantity ?? 1);
  }, 0);

  const getImageSrc = (images: ProductImage[]) => {
    const img = images?.[0];
    if (!img) return null;
    return img.url.startsWith("http")
      ? img.url
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.url}`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.4} className="text-gray-700" />
            <span className="text-sm font-medium tracking-widest uppercase text-gray-800">
              Carrito
            </span>
            {totalUnits > 0 && (
              <span className="ml-1 bg-gray-900 text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {totalUnits}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading && (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0" />
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingBag size={24} strokeWidth={1.2} className="text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-light text-gray-500">Tu carrito está vacío</p>
                <p className="text-xs text-gray-400 mt-1">Agrega prendas para verlas aquí</p>
              </div>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="flex flex-col divide-y divide-gray-50">
              {products.map((product) => {
                const imgSrc = getImageSrc(product.images);
                const detail = cartDetails[product.slug];
                const qty = detail?.quantity ?? 1;
                const colors = detail?.colors ?? [];
                const subtotal = product.price * qty;

                return (
                  <div key={product.slug} className="flex gap-4 py-4">
                    {/* Imagen */}
                    {imgSrc ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                        <Image
                          src={imgSrc}
                          alt={product.productName}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0" />
                    )}

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0 gap-1">
                      {/* Nombre + botón eliminar */}
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className="group relative text-sm font-light text-gray-800 leading-snug cursor-pointer inline-block"
                          onClick={() => {
                            router.push(`/prenda/${product.slug}`)
                            onClose();
                          }}
                        >
                          <span className="transition-all duration-300 group-hover:tracking-wide group-hover:text-black">
                            {product.productName}
                          </span>
                          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                        </p>
                        <button
                          onClick={() => handleRemove(product.slug)}
                          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors group"
                        >
                          <Trash2
                            size={13}
                            className="text-gray-300 group-hover:text-red-400 transition-colors"
                          />
                        </button>
                      </div>

                      {/* Colores y cantidades */}
                      {colors.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          {colors.map((c, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <div
                                className="w-3 h-3 rounded-full border border-gray-200 shrink-0"
                                style={{ backgroundColor: `#${c.color}` }}
                              />
                              <span className="text-[10px] text-gray-400 capitalize">
                                {c.nombreColor}
                                {c.cantidad > 1 && (
                                  <span className="ml-0.5 text-gray-500 font-medium">
                                    ×{c.cantidad}
                                  </span>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Precio */}
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                          S/ {subtotal.toFixed(2)}
                        </p>
                        {qty > 1 && (
                          <span className="text-[10px] text-gray-400">
                            ({qty} × S/ {product.price.toFixed(2)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {products.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="font-light">
                  {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"} ·{" "}
                  {products.length} {products.length === 1 ? "prenda" : "prendas"}
                </span>
                <span className="font-light">
                  {products
                    .map((p) => {
                      const qty = cartDetails[p.slug]?.quantity ?? 1;
                      return `S/ ${(p.price * qty).toFixed(2)}`;
                    })
                    .join(" + ")}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-900 tracking-wide uppercase text-xs">
                  Total
                </span>
                <span className="font-semibold text-gray-900">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => { router.push("/carrito"); onClose(); }}
              className="w-full py-3.5 bg-gray-900 text-white text-xs font-medium tracking-widest uppercase rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all duration-200"
            >
              Ver carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}