import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-gray-900">403</h1>
      <p className="text-lg text-gray-600">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link
        href="/home"
        className="text-sm text-primary-600 underline hover:text-primary-800"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
