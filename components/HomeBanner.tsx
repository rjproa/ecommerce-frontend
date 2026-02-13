// components/HomeBanner.tsx
import Image from "next/image";

export default function HomeBanner() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[40vh] sm:h-[60vh] max-h-[80vh]">
        <Image
          src="/banner.png"
          alt="Banner principal"
          fill
          priority
          className="object-cover object-[50%_25%]"
        />
      </div>
    </section>
  );
}
