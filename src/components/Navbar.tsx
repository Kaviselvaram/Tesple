import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Solutions", href: "#solutions" },
    { label: "Products", href: "#products" },
    { label: "Consulting", href: "#consulting" },
    { label: "Company", href: "#company" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl glass-premium rounded-full px-6 py-3 flex items-center justify-between"
      >
        {/* Left: Branding */}
        <a href="#" className="flex items-center gap-2 group.">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-sans text-sm font-semibold tracking-widest text-white">
            TESPLE
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Get Started Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white transition-colors duration-300"
          >
            Get Started
            <ArrowUpRight className="w-3 h-3 text-white/60" />
          </motion.a>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 md:hidden text-white/80 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm glass-premium rounded-3xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white/70 hover:text-white py-2 border-b border-white/5 last:border-0 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center text-xs font-semibold px-5 py-3 rounded-full border border-white/10 bg-white text-black hover:bg-white/90 transition-colors"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
