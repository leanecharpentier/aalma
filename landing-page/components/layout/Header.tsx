import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const navLinks = [
  { label: "Plateforme", href: "#plateforme" },
  { label: "Fonctionnement", href: "#fonctionnement" },
  { label: "Impact", href: "#impact" },
  { label: "Équipe", href: "#equipe" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full py-5 px-6 lg:px-12 bg-primary-40/80 backdrop-blur-md shadow-card">
      <div className="flex items-center justify-between">
        <nav className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground hover:text-primary-500 transition-colors px-8 py-3.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="/">
          <Image src="/logo-noir.svg" alt="aalma" width={107} height={29} />
        </a>

        <div className="flex items-center gap-3">
          <a href={process.env.NEXT_PUBLIC_PLATFORM_URL}>
            <Button color="outline" size="lg" left={<User size={16} />}>
              Connexion
            </Button>
          </a>
          <Link href="/contact">
            <Button color="primary" size="lg" right={<ArrowRight size={16} />}>
              Demander une démo
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
