import { ArrowRight, User } from "lucide-react";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Plateforme", href: "#plateforme" },
  { label: "Fonctionnement", href: "#fonctionnement" },
  { label: "Impact", href: "#impact" },
  { label: "Equipe", href: "#equipe" },
];

export function Header() {
  return (
    <header className="w-full py-4 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground hover:text-primary-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="/" className="text-2xl font-bold text-foreground">
          aalma
        </a>

        <div className="flex items-center gap-3">
          <Button color="outline" size="sm" left={<User size={16} />}>
            Connexion
          </Button>
          <Button
            color="primary"
            size="sm"
            right={<ArrowRight size={16} />}
          >
            Demander une demo
          </Button>
        </div>
      </div>
    </header>
  );
}
