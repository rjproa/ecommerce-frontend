"use client";

import useGetProductBySlug from "@/api/getProductBySlug";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";

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
  const router = useRouter();
  const { prendaSlug } = params;

  const { result, loading, error } = useGetProductBySlug(prendaSlug as string);
  const [selectedImage, setSelectedImage] = useState(0);

  const product: Product | null = result ? (result as Product[])[0] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">Producto no encontrado</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[selectedImage].url}`}
              src={product.images[selectedImage].url.startsWith('http')
                ? product.images[selectedImage].url
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[selectedImage].url}`
              }
              alt={product.productName}
              fill
              className="object-contain p-4"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Miniaturas */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === index
                    ? "border-gray-900"
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                    src={image.url.startsWith('http')
                      ? image.url
                      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
                    }
                    alt={`${product.productName} - imagen ${index + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Categoría */}
          <div className="text-sm text-gray-500 uppercase tracking-wider">
            {product.categoria.nombreCategoria}
          </div>

          {/* Nombre */}
          <h1 className="text-3xl md:text-4xl font-light text-gray-900">
            {product.productName}
          </h1>

          {/* Precio */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-gray-900">
              s/ {product.price}
            </span>
            <span className="text-xl text-gray-400 line-through">
              s/ {product.price + 20}
            </span>
            <span className="text-sm text-green-600 font-medium">
              Ahorra s/ 20
            </span>
          </div>

          {/* Descripción */}
          {product.description && (
            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="space-y-4">
            <button className="w-full bg-gray-900 text-white py-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer">
              <ShoppingCart size={20} />
              Agregar al carrito
            </button>

            {/* <button className="w-full border border-gray-300 text-gray-900 py-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium">
              <Heart size={20} />
              Agregar a favoritos
            </button> */}
          </div>

          {/* Información adicional */}
          <div className="space-y-3 text-sm text-gray-600 pt-6">
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Envío gratis en compras mayores a s/ 100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Excelente calidad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">✓</span>
              <span>Garantía de satisfacción</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}