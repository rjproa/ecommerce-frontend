/* eslint-disable @next/next/no-img-element */
"use client";

import { GetProducts } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import Link from "next/link";

const ChooseCategories = () => {
  const { result = [], loading, error } = GetProducts();

  return (
    <div className="max-w-7xl py-8 mx-auto px-4 sm:py-12 sm:px-6 lg:px-8">
      <h3 className="pb-6 text-3xl font-light tracking-tight text-gray-900 sm:pb-8">
        Categorías
      </h3>

      {/* Grid responsive en todas las pantallas */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 sm:gap-6 lg:gap-8">
        {!loading && result !== undefined && (
          result.map((categoria: CategoryType) => (
            <Link
              key={categoria.id}
              href={`/categoria/${categoria.slug}`}
              className="group flex flex-col items-center gap-2 sm:gap-3"
            >
              {/* Círculo con imagen */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200 transition-all duration-300 group-hover:ring-1 group-hover:ring-gray-300 group-hover:shadow-lg">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${categoria.mainImage.url}`}
                  alt={categoria.categoryName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-gray-400/20" />
              </div>

              {/* Nombre de categoría */}
              <p className="text-xs sm:text-sm font-medium text-gray-700 text-center line-clamp-2 transition-colors duration-300 group-hover:text-gray-900">
                {categoria.categoryName}
              </p>
            </Link>
          ))
        )}
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-12 sm:h-4 sm:w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChooseCategories;