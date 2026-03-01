"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useSyncExternalStore, useRef, useEffect } from "react";
import MenuList from "./MenuList";
import MenuMovile from "./MenuMovile";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

let cachedSnapshot: { nombre: string } | null = null;
let cachedString = "";

function getSnapshot(): { nombre: string } | null {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      cachedSnapshot = null;
      return null;
    }
    // Solo crear nuevo objeto si el string cambió
    if (userData !== cachedString) {
      cachedString = userData;
      cachedSnapshot = JSON.parse(userData);
    }
    return cachedSnapshot;
  } catch {
    return null;
  }
}

function getServerSnapshot(): null {
  return null;
}

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    document.cookie = "userData=; path=/; max-age=0";
    setMenuOpen(false);
    router.push("/perfil");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-sm" : ""
        }`}
    >
      <div className="flex items-center justify-between p-4 sm:max-w-4xl md:max-w-7xl mx-auto xl:px-0">
        <div className="flex sm:hidden self-end">
          <MenuMovile />
        </div>

        <h1
          className="text-xl xs:text-3xl cursor-pointer font-medium"
          onClick={() => router.push("/")}
        >
          S H A N T I
        </h1>

        <div className="hidden sm:flex items-center justify-between">
          <MenuList />
        </div>

        <div className="flex items-center justify-between gap-7">
          <ShoppingCart
            strokeWidth="1.1"
            className="cursor-pointer transition-transform duration-200 ease-out hover:scale-108"
            onClick={() => router.push("/carrito")}
          />
          <ShoppingBag
            strokeWidth="1.1"
            className="cursor-pointer transition-transform duration-200 ease-out hover:scale-108"
            onClick={() => router.push("/catalogo")}
          />

          {userData ? (
            <div className="relative" ref={menuRef}>
              <div
                className="flex items-center gap-1 cursor-pointer"
              >
                {/* Círculo con inicial → redirige a /ruleta */}
                <div
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm"
                  onClick={() => router.push("/ruleta")}
                >
                  {userData.nombre.charAt(0).toUpperCase()}
                </div>

                {/* Flecha → abre menú desplegable */}
                <ChevronDown
                  strokeWidth="1.5"
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""
                    }`}
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              </div>

              {/* Menú desplegable */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg py-1">
                  <button
                    onClick={() => { router.push("/ruleta"); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Mi ruleta 🎡
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <User
              strokeWidth="1.1"
              className="cursor-pointer transition-transform duration-200 ease-out hover:scale-108"
              onClick={() => router.push("/perfil")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;