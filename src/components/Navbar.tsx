import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ name, href }: { name: string; href: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-5 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.a
          key={isHovered ? "hover" : "initial"}
          href={href}
          className="block text-sm text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          initial={{ y: 0, opacity: 1 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {name}
        </motion.a>
      </AnimatePresence>
      {isHovered && (
        <motion.a
          href={href}
          className="block text-sm text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer absolute"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            zIndex: 2,
          }}
        >
          {name}
        </motion.a>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Pricing", href: "#pricing" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? " dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-white">
              Cronk Creative
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <NavItem key={item.name} {...item} />
            ))}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
            >
              Start Your Project
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:text-white/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block w-full text-center px-6 py-2.5 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 mt-6"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
