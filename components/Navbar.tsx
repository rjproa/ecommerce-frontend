"use client";

import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import MenuMovile from "./MenuMovile";

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-sm" : ""
        }`}
    >
      <div className="flex items-center justify-between p-4 cursor-pointer sm:max-w-4xl md:max-w-7xl mx-auto xl:px-2">
        <div className="flex sm:hidden self-end">
          <MenuMovile />
        </div>

        <h1 className="text-xl xs:text-3xl" onClick={() => router.push("/")}>
          Laila <span className="font-bold">Shop</span>
        </h1>

        <div className="hidden sm:flex items-center justify-between">
          <MenuList />
        </div>

        <div className="flex items-center justify-between gap-7">
          <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/carrito")} />
          <ShoppingBag strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/catalogo")} />
          <Heart strokeWidth="1.1" className="cursor-pointer hover:stroke-red-500 hover:fill-red-500" />
          <User strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/perfil")} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
