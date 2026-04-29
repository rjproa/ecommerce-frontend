/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");

    if (codigo.length !== 5) {
      setError("El código debe tener 5 dígitos");
      return;
    }

    // if (password.length !== 9) {
    //   setError("La contraseña debe tener 9 caracteres");
    //   return;
    // }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes?filters[codigo][$eq]=${codigo}`
      );

      const data = await response.json();

      if (response.ok && data.data && data.data.length > 0) {
        const cliente = data.data.find((c: any) => {
          console.log(c.codigo);

          return c.codigo === codigo;
        });

        if (!cliente) {
          setError("Código de usuario no encontradoooo");
          setLoading(false);
          return;
        }

        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/validate-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentId: cliente.documentId,
              password: password,
            }),
          }
        );

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.valid) {
          // Guardar datos en localStorage
          const userData = {
            documentId: cliente.documentId,
            nombre: cliente.nombre,
            habilitado: cliente.habilitado,
            puntos: cliente.puntos,
            codigo: cliente.codigo,
            opcion: cliente.opcion, // 👈 agrega esto
          };


          localStorage.setItem("userData", JSON.stringify(userData));
          document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=86400`;

          window.dispatchEvent(new Event("storage"));

          router.push("/ruleta");
        } else {
          setError("Contraseña incorrecta");
        }
      } else {
        setError("Error al conectar con el servidor");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Contenedor del formulario */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Bienvenida
            </h1>
            <p className="text-sm text-gray-500 font-light">
              Ingresa tus datos para ingresar a tu perfil y disfrutar de la experiencia
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Código */}
            <div>
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Código
              </label>
              <input
                id="codigo"
                type="text"
                maxLength={5}
                value={codigo}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  console.log('📝 Código onChange:', newValue);
                  setCodigo(newValue);
                }}
                placeholder="00000"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition-all text-center text-lg tracking-widest"
                required
              />
              <p className="text-xs text-gray-400 mt-1 text-center">
                Ingresa tu código personal de 5 dígitos
              </p>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                maxLength={9}
                value={password}
                onChange={(e) => {
                  console.log('🔑 Password onChange longitud:', e.target.value.length);
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition-all text-center text-lg tracking-widest"
                required
              />
              <p className="text-xs text-gray-400 mt-1 text-center">
                Contraseña
              </p>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-medium focus:outline-none focus:ring-2 transition-all disabled:opacity-50 shadow-sm cursor-pointer hover:bg-gray-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verificando...
                </span>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>

          {/* Footer decorativo */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-pink-200"></div>
              <span>S H A N T I</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-pink-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}