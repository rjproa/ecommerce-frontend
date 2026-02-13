import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {

  const dataFooter = [
    {
      id: 1,
      name: 'Catálogo',
      link: '/catalogo'
    },
    {
      id: 2,
      name: 'Mi cuenta',
      link: '/mi-cuenta'
    }, {
      id: 3,
      name: 'Politicas de privacidad',
      link: '/politicas-de-privacidad'
    }
  ];

  return (
    <footer className="mt-4">
      <div className="w-full max-w-7xl mx-auto md:py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p>
            <span className="font-bold">
              Laila
            </span>
            Shop
          </p>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link href={data.link} className="hover:underline me-4 md:me-6">{data.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6 border-gray-400 sm:mx-auto" />
      </div>
    </footer>
  )
}

export default Footer;