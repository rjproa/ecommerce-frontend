"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const dataCarousel = [
  {
    id: 1,
    title: "Ofertas",
    description: "Obtén envíos gratis por compras mayores a s/ 79.90",
  },
  {
    id: 2,
    title: "Nuevos productos",
    description: "Productos de moda con descuentos exclusivos",
  }, {
    id: 3,
    title: "Obtén promociones registrandote",
    description: "Regístrate y recibe descuentos exclusivos",
  }
];

const CarouselBanner = () => {

  return (
    <div className="bg-gray-200">
      <Carousel className="w-full max-w-4xl mx-auto" plugins={[Autoplay({ delay: 2000 })]}>

        <CarouselContent>
          {dataCarousel.map(({ id, title, description }) => (
            <CarouselItem key={id} >
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center items-center text-sm">
                    <p className="sm:text-lg text-wrap">{title}</p>
                    <p className="text-sm sm:text-sm text-wrap">{description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarouselBanner;