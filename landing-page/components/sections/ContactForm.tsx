"use client";

import { Button } from "../ui/Button";
import { SelectField, TextAreaField, TextField } from "../ui/TextField";

const companySizes = [
  { value: "0-10", label: "0-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "500+", label: "500+" },
];

const logos = ["L'OREAL", "Allianz", "orange", "SNCF", "MAIF"];

export function ContactForm() {
  return (
    <section className="w-full px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Form */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Reservez une{" "}
            <span className="text-primary-500">demo personnalisee</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            En 30 minutes, decouvrez comment AALMA peut vous aider a piloter la
            sante mentale de vos equipes
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField label="Nom" required placeholder="Dupont" />
            <TextField label="Prenom" required placeholder="Dupont" />
            <TextField
              label="Email professionnel"
              required
              type="email"
              placeholder="nomdupont@gmail.com"
            />
            <TextField
              label="Numero telephone"
              required
              type="tel"
              placeholder="+33"
            />
            <TextField label="Entreprise" required />
            <SelectField
              label="Taille de l'entreprise"
              required
              options={companySizes}
            />
            <TextAreaField
              label="Message"
              required
              placeholder="Votre message"
            />
            <div className="mt-2">
              <Button color="primary" size="lg" type="submit">
                Envoyer la demande
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Decorative + Chat widget */}
        <div className="flex-1 relative hidden lg:flex flex-col items-center justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-primary-400 to-primary-500 relative overflow-hidden">
            {/* Glassmorphism grid */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`shape-${i}`}
                  className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm"
                />
              ))}
            </div>
          </div>

          {/* Chat widget */}
          <div className="absolute bottom-12 right-0 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <span className="w-5 h-5 rounded-full border-2 border-primary-500" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Discuter avec Aalma
              </p>
              <p className="text-xs text-gray-400">IA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-bold text-gray-800 opacity-60"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
