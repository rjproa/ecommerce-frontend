"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const dataCarousel = [
  {
    id: 1,
    title: "Ofertas",
    description: "Obtén descuentos exclusivos en productos seleccionados",
  },
  {
    id: 2,
    title: "Nuevos productos",
    description: "Productos de moda con los mejores precios",
  }, {
    id: 3,
    title: "Obtén promociones registrandote",
    description: "Regístrate en la primera compra y participa en regalos exclusivos ",
  }
];

const CarouselBanner = () => {

  return (
    <div className="bg-gray-200">
      <Carousel className="w-full max-w-4xl mx-auto" plugins={[Autoplay({ delay: 2500 })]}>

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