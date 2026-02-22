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

    console.log('=== INICIO LOGIN ===');
    console.log('📝 Código ingresado:', codigo);
    console.log('📝 Password ingresado:', password);
    console.log('📏 Longitud código:', codigo.length);
    console.log('📏 Longitud password:', password.length);

    // Validaciones
    if (codigo.length !== 5) {
      console.log('❌ Validación fallida: código no tiene 5 dígitos');
      setError("El código debe tener 5 dígitos");
      return;
    }

    if (password.length !== 8) {
      console.log('❌ Validación fallida: password no tiene 8 caracteres');
      setError("La contraseña debe tener 8 caracteres");
      return;
    }

    console.log('✅ Validaciones pasadas');
    setLoading(true);

    try {
      console.log('🔍 Buscando cliente con código:', codigo);
      console.log('🌐 URL Backend:', process.env.NEXT_PUBLIC_BACKEND_URL);

      // Obtener todos los clientes
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes`
      );

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      const data = await response.json();
      console.log('📦 Data completa recibida:', JSON.stringify(data, null, 2));
      console.log('📦 Cantidad de clientes:', data.data?.length);

      if (response.ok && data.data && data.data.length > 0) {
        console.log('🔎 Buscando cliente en array...');
        console.log('🔎 Clientes disponibles:', data.data.map((c: any) => ({
          codigo: c.codigo,
          nombre: c.nombre,
          documentId: c.documentId
        })));

        // Buscar el cliente con el código específico
        const cliente = data.data.find((c: any) => {
          console.log(`🔍 Comparando: "${c.codigo}" === "${codigo}" ?`, c.codigo === codigo);
          return c.codigo === codigo;
        });

        console.log('👤 Cliente encontrado:', cliente);

        if (!cliente) {
          console.log('❌ No se encontró cliente con ese código');
          setError("Código de usuario no encontrado");
          setLoading(false);
          return;
        }

        console.log('✅ Cliente encontrado:', {
          nombre: cliente.nombre,
          documentId: cliente.documentId,
          codigo: cliente.codigo
        });

        // Validar password
        console.log('🔐 Validando password para documentId:', cliente.documentId);
        console.log('🔐 URL validate:', `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/validate-password`);

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

        console.log('🔑 Login response status:', loginResponse.status);
        console.log('🔑 Login response ok:', loginResponse.ok);

        const loginData = await loginResponse.json();
        console.log('🔑 Login data:', JSON.stringify(loginData, null, 2));

        if (loginResponse.ok && loginData.valid) {
          // Guardar datos en localStorage
          const userData = {
            documentId: cliente.documentId,
            nombre: cliente.nombre,
            habilitado: cliente.habilitado,
            puntos: cliente.puntos,
            codigo: cliente.codigo,
          };

          console.log('💾 Guardando en localStorage:', userData);

          localStorage.setItem("userData", JSON.stringify(userData));
          document.cookie = `userData=${JSON.stringify(userData)}; path=/; max-age=86400`;

          window.dispatchEvent(new Event("storage"));


          console.log('✅ Datos guardados en localStorage');
          console.log('✅ Redirigiendo a /ruleta');

          // Redirigir a /ruleta
          router.push("/ruleta");
        } else {
          console.log('❌ Password incorrecto o respuesta inválida');
          console.log('❌ loginData.valid:', loginData.valid);
          setError("Contraseña incorrecta");
        }
      } else {
        console.log('❌ Error en la respuesta o sin datos');
        setError("Error al conectar con el servidor");
      }
    } catch (err) {
      console.error("💥 Error completo:", err);
      console.error("💥 Error message:", (err as Error).message);
      console.error("💥 Error stack:", (err as Error).stack);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
      console.log('=== FIN LOGIN ===\n');
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
                maxLength={8}
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
                8 caracteres
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