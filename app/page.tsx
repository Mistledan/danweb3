import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Proof from "@/components/Proof";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Proof />
        <Process />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
