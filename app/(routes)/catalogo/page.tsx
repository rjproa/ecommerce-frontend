"use client";

import { useState, useEffect } from "react";
import SkeletonSchema from "@/components/SkeletonShema";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

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
  images: ProductImage[];
  categoria: {
    nombreCategoria: string;
    slug: string;
  };
}

export default function Page() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        );
        const json = await res.json();
        setAllProducts(json.data || []);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extraer categorías únicas
  const categories = Array.from(
    new Map(
      allProducts
        .filter((p) => p.categoria)
        .map((p) => [p.categoria.slug, p.categoria])
    ).values()
  );

  // Filtrar productos
  const filteredProducts =
    activeCategory === "todos"
      ? allProducts
      : allProducts.filter((p) => p.categoria?.slug === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-8 sm:py-16 mt-16">

      {/* ── Título ── */}
      <div className="mb-10 text-center">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 mb-3">
            CATÁLOGO
          </h1>
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          {/* <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span> */}
        </div>
        <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mt-4">
          Colección exclusiva
        </p>
      </div>

      {/* ── Filtros ── */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-200 border ${activeCategory === "todos"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
          >
            Todos
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-200 border ${activeCategory === cat.slug
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
            >
              {cat.nombreCategoria}
            </button>
          ))}
        </div>
      )}

      {/* ── Loading ── */}
      {loading && <SkeletonSchema grid={4} />}

      {/* ── Error ── */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* ── Productos ── */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 xl:px-1">
          {filteredProducts.map((product, i) => (
            <Reveal
              key={product.id}
              delay={Math.min((i % 4) * 100, 400) as 0 | 100 | 200 | 300 | 400}
            >
              <ProductCard
                id={product.id}
                productName={product.productName}
                slug={product.slug}
                price={product.price}
                images={product.images}
              />
            </Reveal>
          ))}
        </div>
      )}

      {/* ── Sin productos ── */}
      {!loading && filteredProducts.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg font-light">
            No hay productos disponibles en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}