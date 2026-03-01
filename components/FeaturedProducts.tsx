"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./SkeletonShema";
import { ProductType } from "@/types/product";
import ProductCard from "./ProductCard";
import { Reveal } from "./Reveal";

const FeaturedProducts = () => {
  const { loading, result } = useGetFeaturedProducts() as ResponseType<ProductType[]>;

  return (
    <div className="max-w-7xl mx-auto py-12 sm:py-16 px-6 xl:px-0">
      <Reveal delay={400}>
        <h3 className="text-4xl font-light sm:pb-4 pb-8">Productos destacados</h3>
      </Reveal>
      <Reveal delay={400}>
        <Carousel className="relative">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Reveal>
    </div>
  );
};

export default FeaturedProducts;