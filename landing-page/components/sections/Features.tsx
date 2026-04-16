import { ChevronRight, TrendingUp, User } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Plan d'action",
    description:
      "Aalma vous permet de mieux comprendre le ressenti de vos équipes et de mettre en place des actions adaptées, utiles et mesurables dans le temps",
  },
  {
    title: "Collaboration 360°",
    description:
      "Collaboration : Aalma unit les forces de la direction et du terrain dans un projet commun : faire de la cohésion d'équipe le moteur d'une entreprise en meilleure santé",
  },
  {
    title: "IA & Recommandations",
    description:
      "Aalma vous permet de mieux comprendre le ressenti de vos équipes et de mettre en place des actions adaptées, utiles et mesurables dans le temps",
  },
];

export function Features() {
  return (
    <section
      id="plateforme"
      className="w-full bg-primary-500 relative overflow-hidden py-20 px-6 lg:px-12"
    >
      {/* Decorative shape */}
      <Image
        src="/Subtract.png"
        alt=""
        width={200}
        height={200}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-auto h-[90%] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10 lg:w-3/5">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-30 text-center mb-6">
          Comprenez, mesurez, agissez
        </h2>
        <p className="text-primary-30 text-center text-lg max-w-2xl mx-auto mb-12">
          Aalma vous permet de mieux comprendre le ressenti de vos équipes
          <br />
          et de mettre en place des actions adaptées, utiles et mesurables dans
          le temps
        </p>

        <div className="grid md:grid-cols-2 gap-3 mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col rounded-3xl backdrop-blur-md border border-primary-300 shadow-card p-6 ${
                i === 2
                  ? "md:col-span-2 bg-gradient-to-l from-primary-300 via-primary-500 to-primary-500"
                  : "bg-primary-200/10"
              }`}
            >
              {i === 0 ? (
                <TrendingUp size={28} className="text-white mb-4" />
              ) : (
                <User size={28} className="text-white mb-4" />
              )}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-30 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-white text-md font-medium hover:gap-2 transition-all ml-auto"
              >
                en savoir plus <ChevronRight size={24} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
