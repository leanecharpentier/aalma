import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-linear-to-t from-primary-50 to-primary-40">
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
