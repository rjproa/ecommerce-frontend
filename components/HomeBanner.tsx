import Image from "next/image";

export default function HomeBanner() {
  return (
    <section className="w-full h-[70vh] sm:h-screen overflow-hidden">
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .banner-img {
          animation: slowZoom 8s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="relative w-full h-full">
        <Image
          src="/women-6921434_1920.jpg"
          alt="Banner principal"
          fill
          priority
          className="object-cover banner-img"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
    </section>
  );
}