export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:px-0 py-8 sm:py-16 mt-16">

      {/* Título */}
      <div className="mb-14 text-center">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 mb-3">
            TÉRMINOS
          </h1>
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
        <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mt-6">
          Condiciones de compra
        </p>
      </div>

      {/* Contenido */}
      <div className="space-y-12">

        {/* Sección 1 */}
        <Section numero="01" titulo="Separado de productos por LIVE en TIKTOK">
          <p>
            Para reservar tu prenda por LIVE, deberás enviar un adelanto de <strong className="font-medium text-gray-800">S/ 10</strong> por Yape al número que se indique en la transmisión. Esto nos permitirá apartar tu producto y garantizar que esté disponible para ti.
          </p>
          {/* <InfoBox>
            <span className="text-lg font-medium text-gray-900">952 215 553</span>
            <span className="text-sm text-gray-500">A nombre de: Rocío Hua.</span>
          </InfoBox> */}
          <p>
            Una vez recibido el comprobante de pago, tu pedido quedará reservado. Envíanos la captura del pago junto con tus datos para coordinar la entrega.
          </p>
        </Section>

        {/* Sección 2 */}
        <Section numero="02" titulo="Modalidades de entrega">
          <p>Trabajamos con tres modalidades de entrega:</p>

          <div className="mt-4 space-y-4">
            <EntregaCard
              icon="🚚"
              titulo="Envío por Shalom"
              descripcion="El saldo restante se cancela antes de realizar el envío. Necesitaremos tu nombre completo, DNI, número de contacto y ciudad / agencia de destino."
            />
            <EntregaCard
              icon="🚉"
              titulo="Entrega en estación del tren"
              descripcion="Disponible únicamente los martes y jueves de 4:00 a 5:00 pm. El saldo restante puede cancelarse al momento de la entrega. Si no puedes en esos horarios, coordinamos el envío por Shalom."
            />
            <EntregaCard
              icon="🤝"
              titulo="Lugar público (previo acuerdo)"
              descripcion="Coordinamos día, hora y lugar de encuentro de manera previa. El saldo restante se cancela al momento de la entrega."
            />
          </div>
        </Section>

        {/* Sección 3 */}
        <Section numero="03" titulo="Datos para el envío por Shalom">
          <p>Para procesar tu envío por Shalom necesitaremos los siguientes datos:</p>
          <ul className="mt-4 space-y-2">
            {[
              "Nombre completo",
              "DNI",
              "Número de contacto",
              "Ciudad / Agencia de destino",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Sección 4 */}
        <Section numero="04" titulo="Ruleta exclusiva para clientas">
          <p>
            Al recibir tu pedido, podrás acceder a nuestra <strong className="font-medium text-gray-800">ruleta exclusiva</strong> para clientas. Dentro de tu paquete encontrarás un QR junto con tu código de clienta para activarte en el sistema.
          </p>
          <p className="mt-3">
            Tu número de DNI será tu clave de acceso. Envíanoslo para dejarte lista y que puedas participar.
          </p>
        </Section>

        {/* Sección 5 */}
        <Section numero="05" titulo="Contacto">
          <p>
            Ante cualquier duda o consulta, puedes escribirnos directamente por WhatsApp. Estamos atentas para ayudarte en todo momento. 🥰
          </p>
          <InfoBox>
            <span className="text-lg font-medium text-gray-900">903 452 600</span>
            <span className="text-sm text-gray-500">WhatsApp · Shanti</span>
          </InfoBox>
        </Section>

      </div>


    </div>
  );
}

function Section({
  numero,
  titulo,
  children,
}: {
  numero: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-6">
      {/* Número */}
      <div className="pt-1">
        <span className="text-xs tracking-widest text-gray-300 font-light">{numero}</span>
      </div>

      {/* Contenido */}
      <div>
        <h2 className="text-lg font-light tracking-wide text-gray-900 mb-4 relative inline-block">
          {titulo}
          <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-gray-200 to-transparent" />
        </h2>
        <div className="text-sm text-gray-500 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex flex-col items-start gap-1 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4">
      {children}
    </div>
  );
}

function EntregaCard({
  icon,
  titulo,
  descripcion,
}: {
  icon: string;
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-medium text-gray-800 mb-1">{titulo}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{descripcion}</p>
      </div>
    </div>
  );
}