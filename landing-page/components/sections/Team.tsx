import Image from "next/image";

export function Team() {
  return (
    <section id="equipe" className="w-full bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Photo équipe */}
        <div className="lg:w-3/5 aspect-[4/3] relative overflow-hidden">
          <Image
            src="/photo-groupe.png"
            alt="Photo de l'équipe Aalma"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="lg:w-2/5 p-12 lg:p-20 flex flex-col justify-center relative">
          {/* Decorative logo */}
          <Image
            src="/a.png"
            alt=""
            width={250}
            height={250}
            className="absolute top-8 right-0"
          />

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Derrière l'équipe
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md">
            Aalma est née d’un constat simple : la santé mentale impacte
            directement la performance, mais reste encore difficile à mesurer et
            à piloter. Notre ambition est d’aider les entreprises à mieux
            comprendre leurs équipes et à transformer cette compréhension en
            action concrètes et mesurables.
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            Léane Charpentier - Hugo Couturier - Mahora Grolleau -<br />
            Marine Bruneau - Rebecca Ahiale Lieben - Zoé Pineau
          </p>
        </div>
      </div>
    </section>
  );
}
