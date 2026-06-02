import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };


  return (
    <section
      id="about"
      className="relative min-h-[80vh] w-full bg-black py-28 px-6 md:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-silver opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="flex flex-col gap-10"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Who We Are
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-white tracking-tight leading-[1.05] text-[10vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] max-w-4xl"
          >
            We build <span className="italic font-light text-white/95">intelligence</span> that{" "}
            <span className="italic font-light text-white/95">transforms</span> businesses.
          </motion.h2>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mt-4"
          >
            <div className="md:col-span-4 flex items-start">
              <p className="text-xs uppercase tracking-widest text-white/30 font-medium pt-1">
                Our Core Philosophy
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">
                Tesple is an AI SaaS and consulting company focused on helping
                organizations adopt practical artificial intelligence solutions.
                From autonomous workflows to enterprise-grade AI systems, we
                bridge the gap between innovation and real-world execution.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
