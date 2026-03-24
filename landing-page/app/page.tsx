import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
    <>
      <Header />
      <main>
        <Hero />
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
    </>
  );
}
