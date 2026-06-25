import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Fde from "@/components/sections/Fde";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";
import { buildHomeGraph } from "@/content/seo";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeGraph(projects)} />
      <Preloader />
      <Nav />
      <SmoothScroll>
        <main>
          <Hero />
          <Fde />
          <About />
          <Experience />
          <Work />
          <Capabilities />
          <Certifications />
          <Testimonials />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
