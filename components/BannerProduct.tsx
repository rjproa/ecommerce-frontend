import Link from "next/link";

const BannerProduct = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <p>Estilo que se adapta a ti</p>
        <h4 className="mt-2 text-3xl font-extrabold uppercase">Descubre tu Look ideal para cada momento</h4>
        <p className="my-6 text-lg">Moda femenina para pensada en nosotras</p>
        <Link href="#" className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600 hover:transition-all hover:duration-200">Comprar</Link>
        <div className="mt-6">
          <div
            className="h-125 w-full bg-fixed bg-cover bg-no-repeat bg-position[10%_20%]"
            style={{ backgroundImage: "url('/pexels-cottonbro-4505449.jpg')" }}
          />
        </div>


      </div >
    </>
  )
}

export default BannerProduct;