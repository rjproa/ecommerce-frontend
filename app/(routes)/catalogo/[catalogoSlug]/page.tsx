"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { useParams } from "next/navigation";
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
  const params = useParams();
  const { catalogoSlug } = params;
  const { result, loading, error } = useGetCategoryProduct(catalogoSlug as string);

  const products: Product[] = (result as Product[] | null) || [];
  const categoryName = products[0]?.categoria?.nombreCategoria || "";

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-16 sm:px-24 md:px-2 mt-16">
      <div className="mb-12 text-center">
        <div className="inline-block">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 mb-3 relative">
            {categoryName.toUpperCase()}
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
          </h1>
          <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mt-4">
            Colección exclusiva
          </p>
        </div>
      </div>

      {loading && <SkeletonSchema grid={4} />}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Error al cargar los productos</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 xl:px-1">
          {products.map((product, i: number) => (
            <Reveal key={product.id} delay={Math.min((i % 4) * 100, 400) as 0 | 100 | 200 | 300 | 400}>
              <ProductCard
                key={product.id}
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

      {!loading && result && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </div>
  );
}