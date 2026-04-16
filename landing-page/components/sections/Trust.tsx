import Image from "next/image";

const logos = [
  { src: "/logo-pme-1.png", alt: "Maisons du Monde" },
  { src: "/logo-pme-2.png", alt: "Gymshark" },
  { src: "/logo-pme-3.png", alt: "Respire" },
  { src: "/logo-pme-4.png", alt: "Michel et Augustin" },
  { src: "/logo-pme-5.png", alt: "Jimmy Fairly" },
];

export function Trust() {
  return (
    <section className="w-full px-6 lg:px-12 py-20 bg-background">
      <div className="mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
          Ils nous font confiance
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={200}
              unoptimized
            />
          ))}
        </div>
      </div>
    </section>
  );
}
