"use client";

import { GetAllProducts } from "@/api/getAllProducts";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import SkeletonSchema from "./SkeletonShema";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Reveal } from "./Reveal";

const ProductList = () => {
  const { loading, result } = GetAllProducts() as ResponseType<ProductType[]>;
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const maxProducts = isMobile ? 10 : 15;
  const displayedProducts = (showAll ? result : result?.slice(0, maxProducts)) ?? [];
  const hasMore = result && result.length > maxProducts;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 sm:py-16 xl:px-0">
      <Reveal delay={300}>
        <h3 className="mb-12 text-4xl font-light sm:pb-8 sm:mb-0">Nuestros productos</h3>
      </Reveal>

      {loading && <SkeletonSchema grid={3} />}

      {!loading && result && Array.isArray(result) && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 xl:px-1">
            {displayedProducts.map((product: ProductType, i: number) => (
              <Reveal key={product.id} delay={Math.min((i % 4) * 100, 400) as 0 | 100 | 200 | 300 | 400}>
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

          {hasMore && !showAll && (
            <div className="flex justify-center mt-8">
              {isMobile ? (
                <Link
                  href="/catalogo"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  <span>Ver más</span>
                  <ArrowRight size={20} />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  <span>Mostrar más productos</span>
                  <ChevronDown size={20} />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;