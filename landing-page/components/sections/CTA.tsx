import Link from "next/link";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="bg-linear-to-b from-primary-300 via-primary-500 to-primary-500 px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Decorative shapes */}
          <div className="lg:w-1/2 grid grid-cols-3 gap-4 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-auto aspect-square rounded-full border border-white/70 shadow-[inset_-20px_-20px_30px_rgba(200,100,30,0.7),inset_20px_20px_30px_rgba(200,100,30,0.7),-10px_-10px_20px_rgba(255,200,140,0.35),10px_10px_20px_rgba(255,200,140,0.35)]"
              />
            ))}
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Présentez-nous vos enjeux et découvrez comment aalma peut vous
              aider
            </h2>
            <p className="text-white text-lg mb-8">
              Échange sans engagement · Démo personnalisée · Réponse sous 24h
            </p>
            <Link href="/contact">
              <Button color="white" size="lg">
                Demander une démo
              </Button>
            </Link>
            <p className="text-white/60 text-lg mt-4">
              Déjà + de 500 équipes nous font confiance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
