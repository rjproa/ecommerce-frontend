import Image from "next/image";

export default function HomeBanner() {
  return (
    <section className="w-full h-[70vh] sm:h-screen">
      <div className="relative w-full h-full">
        <Image
          src="/women-6921434_1920.jpg"
          alt="Banner principal"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
    </section>
  );
}