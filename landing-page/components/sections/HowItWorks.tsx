import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const steps = [
  {
    number: "01",
    title: "Collectez les données",
    description:
      "Recueillez des retours anonymes et des signaux terrain pour mieux comprendre le ressenti réel d evos équipes",
    image: "/how-it-work-pic-1.png",
  },
  {
    number: "02",
    title: "Analysez les données",
    description:
      "Transformez ces données e indicateurs clairs, comparables et exploitables",
    image: "/how-it-work-pic-2.png",
  },
  {
    number: "03",
    title: "Agissez",
    description:
      "Déployez des plans concrets et suivez leur impact dans le temps",
    image: "/how-it-work-pic-3.png",
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
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1 flex flex-col items-start gap-4">
                <div className="relative">
                  <span className="text-9xl font-bold text-primary-500">
                    {step.number}
                  </span>
                  <div className="absolute -left-4 top-4 w-1 h-[85%] bg-gradient-to-b from-primary-200 to-primary-500 rounded-full" />
                  <div className="absolute -left-2 top-2 w-15 h-15 rounded-full bg-white/30 backdrop-blur-xs border border-white/20" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-gray-900 text-sm leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full h-auto rounded-3xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/contact">
            <Button color="primary" size="lg">
              Je suis intéressé
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
