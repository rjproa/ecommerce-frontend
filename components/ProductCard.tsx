"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductImage {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

interface ProductCardProps {
  id: number;
  productName: string;
  slug: string;
  price: number;
  images: ProductImage[];
  onAddToCart?: (id: number) => void;
}

export default function ProductCard({
  id,
  productName,
  slug,
  price,
  images,
  onAddToCart
}: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const handleExpand = () => {
    router.push(`/prenda/${slug}`);
  };

  // Determinar qué imagen mostrar
  const hasMultipleImages = images.length >= 2;
  const currentImage = isHovered && hasMultipleImages ? images[1] : images[0];

  return (
    <div className="group">
      <Card className="flex flex-col justify-between py-0 border border-gray-200 shadow-none overflow-hidden">
        <CardContent
          className="relative w-full aspect-square px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${currentImage.url}`}
            src={currentImage.url.startsWith('http')
              ? currentImage.url
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${currentImage.url}`
            }
            alt={productName}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute w-full px-6 transition duration-200 lg:opacity-0 group-hover:opacity-100 bottom-5 left-0">
            <div className="flex justify-center gap-x-6">
              <IconButton
                onClick={handleExpand}
                icon={<Expand size={20} />}
                className="text-gray-600 cursor-pointer"
              />
              <IconButton
                onClick={() => onAddToCart ? onAddToCart(id) : console.log('add to cart', id)}
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
          <span className="text-md font-bold text-gray-700 rounded-full mr-5">
            s/ {price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            s/ {price + 10.9}
          </span>
        </div>
      </Card>
    </div>
  );
}