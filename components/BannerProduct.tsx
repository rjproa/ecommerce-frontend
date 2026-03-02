import Link from "next/link";
import { Reveal } from "./Reveal";

const BannerProduct = () => {
  return (
    <>
      <div className="text-center py-12 sm:py-16">
        <Reveal delay={400}>
          <p>Estilo que se adapta a ti</p>
        </Reveal>
        <Reveal delay={400}>

          <h4 className="mt-2 text-3xl font-extrabold uppercase px-4 md:px-0">Descubre tu Look ideal para cada momento</h4>
          <p className="py-6 text-lg">Moda femenina pensada en <span className="text-2xl">NOSOTRAS</span></p>
          <Link href="/catalogo" className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600 hover:transition-all hover:duration-200">Comprar</Link>
        </Reveal>
        <div className="pt-12">
          <div
            className="h-120 lg:h-125 w-full bg-cover bg-no-repeat sm:bg-fixed bg-[center_20%]"
            style={{ backgroundImage: "url('/pexels-cottonbro-4505449.jpg')" }}
          />
        </div>


      </div >
    </>
  )
}

export default BannerProduct;