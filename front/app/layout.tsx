import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aalma",
  description: "Application Aalma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
