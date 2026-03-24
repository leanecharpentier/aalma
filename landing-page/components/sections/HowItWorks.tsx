import { Button } from "../ui/Button";

const steps = [
  {
    number: "01",
    title: "Collectez les donnees",
    description:
      "Recueillez des retours anonymes et des signaux terrain pour mieux comprendre le ressenti reel de vos equipes",
  },
  {
    number: "02",
    title: "Analysez les donnees",
    description:
      "Transformez ces donnees en indicateurs clairs, comparables et exploitables",
  },
  {
    number: "03",
    title: "Agissez",
    description:
      "Deployez des plans concrets et suivez leur impact dans le temps",
  },
];

export function HowItWorks() {
  return (
    <section id="fonctionnement" className="w-full px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-16">
          Comment ca marche ?
        </h2>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="relative mb-4">
                  <span className="text-7xl lg:text-8xl font-bold text-primary-500/20">
                    {step.number}
                  </span>
                  <div className="absolute left-0 top-4 w-1 h-16 bg-primary-500 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>

              {/* Image placeholder */}
              <div className="flex-1 w-full">
                <div className="w-full h-48 lg:h-56 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button color="primary" size="lg">
            Je suis interesse
          </Button>
        </div>
      </div>
    </section>
  );
}
