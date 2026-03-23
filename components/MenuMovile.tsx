import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type MenuMovileProps = {
  isTransparent: boolean;
};

const LINKS = [
  { href: "/ofertas", label: "Prendas en Oferta" },
  { href: "/catalogo/polos", label: "Polos" },
  { href: "/catalogo/corset", label: "Corsets" },
  { href: "/catalogo/blusas", label: "Blusas" },
  { href: "/catalogo/tops", label: "Tops" },
  { href: "/catalogo/body", label: "Body" },
];

const MenuMovile = ({ isTransparent }: MenuMovileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Menu className={isTransparent ? "text-white" : "text-black"} />
      </PopoverTrigger>
      <PopoverContent className="bg-white border rounded-xs border-gray-300 shadow-2xl">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block my-3"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MenuMovile;