const logos = ["L'OREAL", "Allianz", "orange", "SNCF", "MAIF"];

export function Trust() {
  return (
    <section className="w-full px-6 lg:px-12 py-20 bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
          Ils nous font confiance
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-xl lg:text-2xl font-bold text-gray-800 opacity-70"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
