"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./SkeletonShema";
import { ProductType } from "@/types/product";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { loading, result } = useGetFeaturedProducts() as ResponseType<ProductType[]>;

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-16 sm:px-24 md:px-2">
      <h3 className="px-2 text-4xl font-light sm:pb-4 xl:px-1">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4 min-w-87.5">
          {loading && <SkeletonSchema grid={3} />}
          {!loading && result && Array.isArray(result) && (
            result.map((product: ProductType) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1 max-w-75 mx-auto">
                  <ProductCard
                    id={product.id}
                    productName={product.productName}
                    slug={product.slug}
                    price={product.price}
                    images={product.images}
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer md:absolute md:left-5 bg-gray-100 md:top-40" />
        <CarouselNext className="sm:flex cursor-pointer md:absolute md:right-5 bg-gray-100 md:top-40" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;