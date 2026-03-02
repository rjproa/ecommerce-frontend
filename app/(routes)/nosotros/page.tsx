import { Reveal } from "@/components/Reveal";
import Image from "next/image";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-24">
        {/* Header with decorative text */}
        <Reveal delay={500}>
          <div className="mb-12">
            <p className="font-serif italic text-gray-400 text-sm sm:text-base mb-2">
              tu tienda de moda
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide">
              Ropa Femenina,
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide">
              Estilo Único,
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 uppercase tracking-wide">
              Hecho Para Ti
            </h1>
          </div>
        </Reveal>
        {/* Grid Layout */}
        <Reveal delay={1000}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Large Image */}
            <div className="lg:col-span-5">
              <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden">
                <Image
                  src="/6c8417ec58adda50f35038f3c6a1fafb.jpg"
                  alt="SHANTI - Tienda de ropa femenina online"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  priority
                />
              </div>
            </div>


            {/* Right Column - Content and Small Image */}
            <div className="lg:col-span-7 space-y-8">
              {/* Text Content */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-light text-gray-300">1</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 uppercase tracking-wide">
                      Nuestra Historia
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      SHANTI nació de una necesidad real: encontrar tops y blusas femeninas que realmente
                      nos gustaran. Soy Rocío, y en mis 20s me di cuenta de lo difícil que era conseguir
                      ropa de mujer con estilo, calidad y a buen precio. Así que decidí crear esta tienda
                      online de moda femenina donde cada mujer pueda encontrar esa prenda perfecta que estaba
                      buscando. Aquí encontrarás tops modernos, blusas elegantes y prendas versátiles
                      seleccionadas pensando en ti.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-4xl font-light text-gray-300">2</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-3 uppercase tracking-wide">
                      Nuestra Misión
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      En SHANTI, nuestra misión es hacer que la moda femenina sea accesible para todas.
                      Seleccionamos cuidadosamente cada top, blusa y prenda para ofrecerte opciones que
                      realmente funcionen en tu día a día. Desde tops casuales para el trabajo hasta blusas
                      elegantes para ocasiones especiales, queremos ser tu aliada en moda. Creemos que toda
                      mujer merece sentirse segura y bella con ropa que refleje su personalidad única.
                    </p>
                  </div>
                </div>
              </div>

              {/* Small Image with Quote */}
              <div className="relative">
                <div className="relative h-[300px] sm:h-[350px] lg:h-[280px] overflow-hidden">
                  <Image
                    src="/pexels-cottonbro-4505449.jpg"
                    alt="SHANTI - Moda y estilo para mujeres"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>

                {/* Floating Quote Box */}
                <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white p-6 sm:p-8 shadow-lg max-w-xs">
                  <p className="font-serif italic text-gray-700 text-base sm:text-lg leading-relaxed">
                    Tu estilo, tu confianza, nuestra pasión por la moda femenina
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        {/* Bottom spacing */}
        <div className="mt-24"></div>
      </div>
    </div >
  );
}