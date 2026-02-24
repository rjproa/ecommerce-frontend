import Link from "next/link";
import { Separator } from "./ui/separator";
import { Instagram } from "lucide-react";

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
      link: '/perfil'
    },
    {
      id: 4,
      name: 'Términos y condiciones',
      link: '/terminos-y-condiciones'
    }
  ];

  const socialMedia = [
    {
      id: 1,
      name: 'Instagram',
      link: 'https://www.instagram.com/shanti.blush',
      ariaLabel: 'Visita nuestro Instagram',
      type: 'instagram'
    },
    {
      id: 2,
      name: 'TikTok',
      link: 'https://www.tiktok.com/@shanti.blush2',
      ariaLabel: 'Visita nuestro TikTok',
      type: 'tiktok'
    }
  ];

  return (
    <footer className="mt-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-4xl font-bold bg-clip-text">
              S H A N T I
            </h2>
            <p className="text-gray-600 text-sm text-center md:text-left max-w-xs">
              Tu tienda de confianza para encontrar los mejores productos con estilo y calidad.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Enlaces rápidos</h3>
            <ul className="flex flex-col items-center space-y-2 text-sm">
              {dataFooter.map((data) => (
                <li key={data.id}>
                  <Link
                    href={data.link}
                    className="text-gray-600 hover:text-gray-900 hover:font-semibold transition-colors duration-200 hover:underline"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Síguenos</h3>
            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <Link
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group"
                >
                  <div className="p-3 rounded-full bg-black text-white hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                    {social.type === 'instagram' ? (
                      <Instagram className="w-5 h-5" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        className="w-5 h-5"
                      >
                        <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
                      </svg>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center md:text-right">
              Únete a nuestra comunidad
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-gray-300" />

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-700">S H A N T I</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400">
            Hecho con ❤️ para ti
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;