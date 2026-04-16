import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const tags = ["IA", "Plan d'action", "Impact mesurable"];

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden px-6 lg:px-12 py-16 flex items-center">
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
            <span className="text-primary-500">Pilotez la santé mentale</span>{" "}
            <span className="text-foreground">
              avec des plans d&apos;action mesurables
            </span>
          </h1>

          <p className="text-gray-800 text-sm leading-relaxed mb-8">
            Aalma transforme le ressenti de vos équipe en indicateurs clairs
            pour mieux comprendre, agir et améliorer durablement leur bien être.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button color="primary" size="lg">
                Demander une démo
              </Button>
            </Link>
            <Link href="/contact">
              <Button color="outline" size="lg">
                Comment ça fonctionne ?
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative hidden lg:flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src="/image-hero.png"
              alt="Aperçu du tableau de bord Aalma"
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
