const footerLinks = [
  { label: "Plateforme", href: "#plateforme" },
  { label: "Fonctionnement", href: "#fonctionnement" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  "Politique de confidentialite",
  "Conditions d'utilisation",
  "Parametres des cookies",
];

export function Footer() {
  return (
    <footer className="w-full bg-background px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-8 mb-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground hover:text-primary-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* LinkedIn */}
        <div className="flex justify-center mb-12">
          <a
            href="#"
            className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center text-lg font-bold hover:bg-primary-600 transition-colors"
            aria-label="LinkedIn"
          >
            in
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-5xl lg:text-7xl font-bold text-foreground leading-none mb-2">
              aalma
            </p>
            <p className="text-xs text-gray-400">
              2026, Aalma, Tous droits reserves.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-500 hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
