import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import NoCodeHelp from "./components/NoCodeHelp";
// import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StatsAndTestimonials from "./components/StatsAndTestimonials";
import ThemeToggle from "./components/ThemeToggle";
import LavaLamp from "./components/LavaLamp";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        );
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-white dark:bg-gray-900">
      {/* Fixed LavaLamp Background */}
      <div className="fixed inset-0 z-0">
        <LavaLamp isDarkMode={isDarkMode} />
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-fuchsia-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="w-full relative z-10">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Pricing />
        <Portfolio />
        <NoCodeHelp />
        {/* <Blog /> */}
        <StatsAndTestimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Theme Toggle */}
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App;
