import { Button } from "../ui/Button";

const tags = ["IA", "Plan d'action", "Impact mesurable"];

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden px-6 lg:px-12 py-16 lg:py-24 flex items-center">
      <div className="w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 z-10">
          <div className="flex items-center gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-primary-100 bg-primary-50 text-primary-500 text-xs font-medium"
              >
                {tag === "IA" && (
                  <span className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary-200" />
                  </span>
                )}
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="text-primary-500">Pilotez la sante mentale</span>
            <br />
            <span className="text-foreground">
              avec des plans d&apos;action et mesurables
            </span>
          </h1>

          <p className="text-gray-800 text-sm leading-relaxed mb-8">
            Aalma transforme le ressenti de vos equipes en indicateurs clairs
            pour mieux comprendre, agir et ameliorer durablement leur bien etre.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button color="primary" size="lg">
              Demander une demo
            </Button>
            <Button color="outline" size="lg">
              Comment ca fonctionne ?
            </Button>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="flex-1 relative min-h-[400px] hidden lg:block">
          <div className="absolute top-8 left-12 w-48 h-64 rounded-3xl bg-gradient-to-br from-primary-300 to-primary-400 opacity-80" />
          <div className="absolute top-0 left-32 w-72 h-80 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-500" />
          <div className="absolute top-16 left-48 w-56 h-72 rounded-3xl bg-primary-500 border-2 border-primary-300/50" />
        </div>
      </div>
    </section>
  );
}
