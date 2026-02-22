"use client";

import { GetAllProducts } from "@/api/getAllProducts";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import SkeletonSchema from "./SkeletonShema";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Expand, ShoppingCart, ChevronDown, ArrowRight } from "lucide-react";
import IconButton from "./IconButton";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="max-w-7xl mx-auto py-4 sm:py-16 sm:px-24 md:px-2">
      <h3 className="px-2 text-3xl font-light sm:pb-8 xl:px-1">Nuestros productos</h3>

      {loading && <SkeletonSchema grid={3} />}

      {!loading && result && Array.isArray(result) && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 xl:px-1">
            {displayedProducts.map((product: ProductType) => {
              const { images, productName, id, price } = product;

              if (!images || images.length === 0) {
                return null;
              }

              return (
                <div key={id} className="group">
                  <Card className="flex flex-col justify-between py-0 border border-gray-200 shadow-none overflow-hidden">
                    <CardContent className="relative w-full aspect-square px-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`}
                        alt={productName}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5 left-0">
                        <div className="flex justify-center gap-x-6">
                          <IconButton
                            onClick={() => console.log('click')}
                            icon={<Expand size={20} />}
                            className="text-gray-600 cursor-pointer"
                          />
                          <IconButton
                            onClick={() => console.log('click')}
                            icon={<ShoppingCart size={20} />}
                            className="text-gray-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <div className="wrap flex items-center justify-between px-4">
                      <h3 className="text-md truncate">{productName}</h3>
                    </div>
                    <div className="px-4 pb-4">
                      <span className="text-md font-bold text-gray-700 rounded-full mr-3">
                        s/ {price}
                      </span>
                      <span className="text-md text-gray-500 line-through">
                        s/ {price + 20}
                      </span>
                    </div>
                  </Card>
                </div>
              );
            })}
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