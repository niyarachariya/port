import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Academics from "./components/Academics";
import Sop from "./components/Sop";
import Activities from "./components/Activities";
import Projects from "./components/Projects";
import DesignWorks from "./components/DesignWorks";
import SiteFooter from "./components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Academics />
        <Sop />
        <Activities />
        <Projects />
        <DesignWorks />
      </main>
      <SiteFooter />
    </>
  );
}
