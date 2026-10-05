import {
  About,
  Contact,
  Footer,
  Hero,
  Marquee,
  Nav,
  Projects,
  ScrollProgress,
  Skills,
} from "@/components/Sections";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}