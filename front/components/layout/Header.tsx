"use client";

import { Bell, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-40 p-6 overflow-hidden border-b-2 border-gray-50">
      {/* Left: Logos + Search */}
      <div className="flex items-center gap-8 min-w-2xl">
        {/* Logos */}
        <Link href="/home" className="flex items-center gap-3 h-8.5">
          <Image
            src="/images/aalma/logo-reduit.svg"
            alt="Aalma"
            width={30}
            height={21}
            className="shrink-0"
          />
          <div className="w-0.5 h-5 bg-gray-500 shrink-0" />
          <div className="flex items-center justify-center h-8.5 px-2 border-2 border-gray-50 rounded overflow-hidden shrink-0">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
              ENTREPRISE
            </span>
          </div>
        </Link>

        {/* AI Search bar */}
        <button
          type="button"
          className="flex items-center gap-2 bg-gray-40 border border-primary-200 rounded-lg p-3.5 shadow-orange-glow flex-1 max-w-2xl cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/images/aalma/halo.png"
            alt="Aalma AI"
            width={32}
            height={32}
            className="shrink-0"
          />
          <span className="text-sm text-primary-100">
            Poser une question à aalma
          </span>
        </button>
      </div>

      {/* Right: Buttons + Profile */}
      <div className="flex items-center gap-6">
        {/* Icon buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center justify-center size-13 border border-gray-500 rounded-full bg-gray-40 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Bell size={24} className="text-gray-900" />
          </button>
          <Link
            href="/settings/roles"
            className="flex items-center justify-center size-13 border border-gray-500 rounded-full bg-gray-40 hover:bg-gray-50 transition-colors"
          >
            <Settings size={24} className="text-gray-900" />
          </Link>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-13 bg-primary-500 border-2 border-primary-200 rounded-full overflow-hidden shrink-0">
            <span className="text-3xl font-bold text-primary-50">R</span>
          </div>
          <div className="flex flex-col gap-0.5 w-auto">
            <span className="text-xs text-gray-500 text-center">
              Roger Durand
            </span>
            <span className="text-xs font-bold text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
