"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./SkeletonShema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import IconButton from "./IconButton";

const FeaturedProducts = () => {
  const { loading, result } = useGetFeaturedProducts() as ResponseType<ProductType[]>;
  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-16 sm:px-24 md:px-2">
      <h3 className="px-2 text-3xl font-light sm:pb-4 xl:px-1">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4 min-w-87.5">
          {loading && <SkeletonSchema grid={3} />}
          {!loading && result && Array.isArray(result) && (
            result.map((product: ProductType) => {
              const { images, productName, id, price } = product;
              if (!images || images.length === 0) {
                return null;
              }

              return (
                <CarouselItem key={id} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4 group">
                  <div className="p-1">
                    <Card className="flex justify-between py-4 border border-gray-200 shadow-none max-w-75 mx-auto">
                      <CardContent className="relative w-full aspect-square px-4">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`}
                          alt={productName}
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => console.log('click')}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => console.log('click')}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="wrap flex items-center justify-between px-4">
                        <h3 className="text-md truncate">{productName}</h3>
                        <Heart strokeWidth={1.2} className="cursor-pointer hover:fill-red-400 hover:stroke-red-400" />
                      </div>
                      <div className="px-4">
                        <span className="text-md text-gray-700 rounded-full mr-3">s/ {price}</span>
                        <span className="text-md text-gray-500 line-through"> s/ {price + 20}</span>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer md:absolute md:left-5" />
        <CarouselNext className="sm:flex cursor-pointer md:absolute md:right-5" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
