import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 px-6 lg:px-12 py-20">
        {/* Decorative shapes */}
        <div className="absolute left-0 top-0 w-96 h-96 opacity-20">
          <div className="absolute top-12 left-8 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-8 left-20 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-24 left-16 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-20 left-32 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-36 left-8 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-36 left-28 w-24 h-24 rounded-2xl border border-white/40" />
          <div className="absolute top-48 left-20 w-24 h-24 rounded-2xl border border-white/40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" />
          <div className="lg:w-1/2">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
              Presentez-nous vos enjeux et decouvrez comment aalma peut vous
              aider
            </h2>
            <p className="text-white/80 text-sm mb-8">
              Echange sans engagement &middot; Demo personnalisee &middot;
              Reponse sous 24h
            </p>
            <Button color="white" size="lg">
              Demander une demo
            </Button>
            <p className="text-white/60 text-xs mt-4">
              Deja + de 500 equipes nous font confiance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
