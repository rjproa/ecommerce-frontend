import { Menu } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


type MenuMovileProps = {
  isTransparent: boolean;
};

const MenuMovile = ({ isTransparent }: MenuMovileProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu className={isTransparent ? "text-white" : "text-black"} />
      </PopoverTrigger>
      <PopoverContent className="bg-white border rounded-xs border-gray-300 shadow-2xl">
        <Link href="/catalogo/polos" className="block my-3">Polos</Link>
        <Link href="/catalogo/corset" className="block my-3">Corsets</Link>
        <Link href="/catalogo/blusas" className="block my-3">Blusas</Link>
        <Link href="/catalogo/tops" className="block my-3">Tops</Link>
        <Link href="/catalogo/body" className="block my-3">Body</Link>
      </PopoverContent>
    </Popover>
  )
}

export default MenuMovile;