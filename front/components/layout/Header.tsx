import { Settings } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-white p-6 border-b border-gray-50">
      <img src="/aalma.svg" alt="Aalma Logo" />
      <div className="flex flex-row gap-4">
        <Link
          href="/settings/roles"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-500"
        >
          <Settings className="h-5 w-5 text-gray-500" />
        </Link>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-500">
          <p className="text-primary-200">A</p>
        </div>
      </div>
    </header>
  );
}
