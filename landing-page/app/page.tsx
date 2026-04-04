import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ChatWidget } from "@/components/sections/ChatWidget";
import { CTA } from "@/components/sections/CTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Impact } from "@/components/sections/Impact";
import { Roles } from "@/components/sections/Roles";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-t from-primary-50 to-primary-40">
      <Header />
      <main className="flex flex-col gap-16">
        <Hero />
        <ChatWidget />
        <Stats />
        <Features />
        <HowItWorks />
        <Impact />
        <Roles />
        <Team />
        <Trust />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
