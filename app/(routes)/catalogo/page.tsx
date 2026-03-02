"use client";

import { useState, useEffect, useMemo } from "react";
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

async function fetchAllProducts(): Promise<Product[]> {
  const pageSize = 100;
  let page = 1;
  let all: Product[] = [];

  while (true) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const json = await res.json();
    const data: Product[] = json.data || [];
    all = [...all, ...data];

    const total = json.meta?.pagination?.total ?? 0;
    if (all.length >= total || data.length === 0) break;
    page++;
  }

  return all;
}

export default function Page() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useEffect(() => {
    const load = async () => {
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() =>
    Array.from(
      new Map(
        allProducts
          .filter((p) => p.categoria)
          .map((p) => [p.categoria.slug, p.categoria])
      ).values()
    ), [allProducts]);

  const filteredProducts = useMemo(() =>
    activeCategory === "todos"
      ? allProducts
      : allProducts.filter((p) => p.categoria?.slug === activeCategory),
    [activeCategory, allProducts]
  );

  const handleFilter = (slug: string) => {
    if (slug === activeCategory) return;
    setFiltering(true);
    setActiveCategory(slug);
    // Pequeño delay para que el skeleton sea visible
    setTimeout(() => setFiltering(false), 350);
  };

  const showSkeleton = loading || filtering;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-8 sm:py-16 mt-16">

      {/* Título */}
      <div className="mb-10 text-center">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 mb-3">
            CATÁLOGO
          </h1>
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
        <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mt-4">
          Colección exclusiva
        </p>
      </div>

      {/* Filtros */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilter("todos")}
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
              onClick={() => handleFilter(cat.slug)}
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

      {/* Skeleton */}
      {showSkeleton && <SkeletonSchema grid={4} />}

      {/* Error */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Productos */}
      {!showSkeleton && filteredProducts.length > 0 && (
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
                active={product.active}
                images={product.images}
              />
            </Reveal>
          ))}
        </div>
      )}

      {/* Sin productos */}
      {!showSkeleton && filteredProducts.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg font-light">
            No hay productos disponibles en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}