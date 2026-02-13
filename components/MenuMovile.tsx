import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MenuMovile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent className="bg-white border rounded-xs border-gray-300 shadow-2xl">
        <Link href="/catalogo/polos" className="block my-3">Polos</Link>
        <Link href="/catalogo/vestidos" className="block my-3">Vestidos</Link>
        <Link href="/catalogo/faldas" className="block my-3">Faldas</Link>
        <Link href="/catalogo/jeans" className="block my-3">Jeans</Link>
        <Link href="/catalogo/pijamas" className="block my-3">Pijamas</Link>
        <Link href="/catalogo/accesorios" className="block my-3">Accesorios</Link>
      </PopoverContent>
    </Popover>
  )
}

export default MenuMovile;