import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "kaviselvaramkathirvel@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] w-full bg-black py-32 px-6 md:px-12 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Floating White Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-white opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="h-[1px] w-6 bg-white/20"></span>
          <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
            Get In Touch
          </span>
          <span className="h-[1px] w-6 bg-white/20"></span>
        </motion.div>

        {/* Large editorial title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-white tracking-tight leading-[1.05] text-[9vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw] max-w-3xl"
        >
          Let's Build Something Intelligent
        </motion.h2>

        {/* Dynamic Clipboard Email Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-4 group"
        >
          {/* Tooltip Overlay */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -10, scale: 0.9, x: "-50%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full mb-4 left-1/2 bg-white text-black text-[9px] font-bold tracking-[0.15em] px-4 py-2 rounded-full uppercase shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
              >
                Copied to Clipboard
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Chip */}
          <button
            onClick={handleCopy}
            className="glass-premium cursor-pointer group flex items-center gap-4 px-6 md:px-8 py-4 rounded-3xl hover:border-white/15 transition-all duration-300 relative active:scale-[0.98] outline-none"
            aria-label="Copy email address to clipboard"
          >
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
              <Mail className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>
            
            <span className="font-sans text-sm sm:text-base md:text-lg font-light tracking-wide text-white/70 group-hover:text-white transition-colors">
              {email}
            </span>

            <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors ml-2">
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
              )}
            </div>
          </button>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4"
        >
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-xs font-semibold px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white shadow-lg transition-all duration-300"
          >
            Start a Conversation
            <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
