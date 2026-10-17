import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import MarqueeSection from "./components/Marquee/Marquee";
import Projects from "./components/Projects/Projects";
import ProcessSection from "./components/Proccess/Proccess";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <MarqueeSection />
      <Projects />
      <ProcessSection />
      <Services />
      <Contact />
      <Footer />
      <ThemeSwitcher />
    </>
  );
}
