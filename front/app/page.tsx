export default function Home() {
  return (
    <main className="app-container py-section">
      <section className="app-card flex flex-col gap-6">
        <span className="inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium text-muted">
          Design System
        </span>
        <h1>Bienvenue sur Aalma</h1>
        <p>
          Cette base remplace les styles par defaut de Next.js. Utilise les
          tokens Tailwind definis dans <code>globals.css</code> pour garder une
          UI coherente.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className="btn-primary" href="/auth/login">
            Se connecter
          </a>
        </div>
      </section>
    </main>
  );
}
