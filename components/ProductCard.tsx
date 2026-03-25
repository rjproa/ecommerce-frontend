"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductImage {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

interface Colores {
  color: string;
  stock: number;
  nombreColor: string;
}

interface ProductCardProps {
  id: number;
  productName: string;
  slug: string;
  price: number;
  active: boolean;
  oferta: boolean;
  images: ProductImage[];
  colores?: Colores[];
  onAddToCart?: (id: number) => void;
}

export default function ProductCard({
  id,
  productName,
  slug,
  price,
  active,
  oferta,
  images,
  colores = [],
}: ProductCardProps) {

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group">
      <Card className="flex flex-col justify-between py-0 border border-gray-200 shadow-none overflow-hidden gap-4">
        <CardContent className="relative w-full aspect-square px-0 overflow-hidden">
          {/* Imagen actual */}
          <Image
            src={
              currentImage.url.startsWith("http")
                ? currentImage.url
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${currentImage.url}`
            }
            alt={productName}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />

          {/* Agotado */}
          {!active && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-white text-lg font-semibold tracking-[0.3em] px-6 py-1 border border-white"
                style={{
                  transform: "rotate(-30deg)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                AGOTADO
              </span>
            </div>
          )}

          {/* Sello de oferta */}
          {/* Sello de oferta — Cinta diagonal */}
          {oferta && (
            <div className="absolute top-0 right-0 z-10 w-20 h-20 overflow-hidden rounded-tr-lg">
              <div
                className="absolute top-0 right-0"
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 80px 80px 0",
                  borderColor: "transparent #c8102e transparent transparent",
                }}
              />
              <span
                className="absolute text-white font-medium uppercase tracking-widest"
                style={{
                  fontSize: "9px",
                  top: "24px",
                  right: "-14px",
                  width: "90px",
                  textAlign: "center",
                  fontWeight: "bolder",
                  transform: "rotate(45deg)",
                }}
              >
                Liquidación
              </span>
            </div>
          )}

          {/* Botones prev/next */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all lg:opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={16} className="text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all lg:opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={16} className="text-gray-700" />
              </button>

              {/* Dots */}
              <div className="absolute top-9 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white scale-125" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Acciones (expand + carrito) */}
          <div className="absolute w-full px-6 transition duration-200 lg:opacity-0 group-hover:opacity-100 bottom-2 left-0">
            <div className="flex justify-center gap-x-6">
              <IconButton
                onClick={() => router.push(`/prenda/${slug}`)}
                icon={<Expand size={20} />}
                className="text-gray-600 cursor-pointer"
              />
              {/* <IconButton
                onClick={() => {
                  if (active) {
                    const cart: string[] = JSON.parse(
                      localStorage.getItem("cart") || "[]"
                    );
                    if (!cart.includes(slug)) {
                      cart.push(slug);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      window.dispatchEvent(new Event("cartUpdated"));
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1500);
                    }
                  }
                }}
                icon={
                  <ShoppingCart size={20} color={added ? "#a0536e" : undefined} />
                }
                className={`text-gray-600 ${active ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
              /> */}
            </div>
          </div>
        </CardContent>

        {/* Colores */}
        {colores.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 pt-1 flex-wrap">
            {colores.map((c, i) => (
              <div
                key={i}
                title={c.nombreColor}
                className="w-4 h-4 rounded-full border border-gray-200 shrink-0"
                style={{ backgroundColor: `#${c.color}` }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between px-4 pt-1">
          <h3 className="text-md truncate">{productName}</h3>
        </div>
        <div className="px-4 pb-4">
          <span className="text-md font-bold text-gray-700 rounded-full mr-5">
            s/ {price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            s/ {price + 5.9}
          </span>
        </div>
      </Card>
    </div>
  );
}