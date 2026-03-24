export function Team() {
  return (
    <section id="equipe" className="w-full bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Photo placeholder */}
        <div className="lg:w-1/2 min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/30 text-sm">Photo d&apos;equipe</p>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative">
          {/* Decorative logo */}
          <div className="absolute top-8 right-8 w-32 h-32 opacity-20">
            <div className="w-full h-full rounded-2xl border-2 border-white flex items-center justify-center">
              <div className="w-12 h-16 border-2 border-white rounded-full" />
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Derriere ce projet
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md">
            Aalma est nee d&apos;un constat simple : la sante mentale impacte
            directement la performance, mais reste encore difficile a mesurer et
            a piloter. Notre ambition est d&apos;aider les entreprises a mieux
            comprendre leurs equipes et a transformer cette comprehension en
            action concretes et mesurables.
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            Leane Charpentier - Hugo Couturier - Mahora Grolleau -<br />
            Marine Bruneau - Rebecca Ahiale Lieben - Zoe Pineau
          </p>
        </div>
      </div>
    </section>
  );
}
