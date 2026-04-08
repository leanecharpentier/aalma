"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import { TextField } from "../ui/TextField";

const companySizes = [
  { id: "0-10", label: "0-10" },
  { id: "11-50", label: "11-50" },
  { id: "51-200", label: "51-200" },
  { id: "201-500", label: "201-500" },
  { id: "500+", label: "500+" },
];

const logos = ["L'OREAL", "Allianz", "orange", "SNCF", "MAIF"];

export function ContactForm() {
  return (
    <section className="w-full px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Form */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Réservez une{" "}
            <span className="text-primary-500">démo personnalisée</span>
          </h1>
          <p className="text-gray-900 text-lg leading-relaxed mb-10">
            En 30 minutes, découvrez comment AALMA peut vous aider à piloter la
            santé mentale de vos équipes
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField label="Nom" isRequired placeholder="Dupont" />
            <TextField label="Prenom" isRequired placeholder="Dupont" />
            <TextField
              label="Email professionnel"
              isRequired
              type="email"
              placeholder="nomdupont@gmail.com"
            />
            <TextField
              label="Numero telephone"
              isRequired
              type="tel"
              placeholder="+33"
            />
            <TextField label="Entreprise" isRequired />
            <Select
              label="Taille de l'entreprise"
              isRequired
              options={companySizes}
              placeholder="0-10"
            />
            <TextArea label="Message" isRequired placeholder="Votre message" />
            <div className="mt-2">
              <Button color="primary" size="lg" type="submit">
                Envoyer la demande
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Decorative + Chat widget */}
        <div className="flex-1 relative hidden lg:flex flex-col items-center justify-start">
          <Image
            src="/visual-contact.png"
            alt="Illustration contact"
            width={448}
            height={448}
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
