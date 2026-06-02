import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, PenTool, Code2, TrendingUp } from "lucide-react";

export default function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section to drive the SVG line path
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  const steps = [
    {
      stepNum: "01",
      title: "Discover",
      subtitle: "Understand goals & opportunities",
      description:
        "We audit your existing legacy workflows, coordinate with technical stakeholders, and map precise operational pipelines that are prime candidates for AI-powered acceleration.",
      icon: Search,
    },
    {
      stepNum: "02",
      title: "Design",
      subtitle: "Architect intelligent solutions",
      description:
        "We design custom Large Language Model architectures, draft agentic routing protocols, and layout integration blueprints that map cleanly into your corporate technology stack.",
      icon: PenTool,
    },
    {
      stepNum: "03",
      title: "Build",
      subtitle: "Develop scalable AI systems",
      description:
        "Our engineers build and test production-grade autonomous agent models, fine-tune domain-specific layers, and implement rigorous security guardrails for data protection.",
      icon: Code2,
    },
    {
      stepNum: "04",
      title: "Scale",
      subtitle: "Optimize & continuously improve",
      description:
        "We deploy nodes to secure clouds, connect custom analytics interfaces, monitor inference metrics, and systematically improve accuracy through continuous reinforcement loops.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="company"
      className="relative min-h-screen w-full bg-black py-28 px-6 md:px-12 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Floating Silver Spot */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full glow-silver opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-6 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Our Methodology
            </span>
            <span className="h-[1px] w-6 bg-white/20"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl text-white font-normal tracking-tight"
          >
            How We Work
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-8">
          {/* Connecting SVG Path Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 pointer-events-none">
            {/* Dashed background track */}
            <div className="absolute inset-0 border-l border-dashed border-white/10" />
            {/* Active filled line driven by scroll */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/30 via-white/80 to-white"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.stepNum}
                  className={`flex flex-col md:flex-row relative items-start w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Column / Card side */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 flex justify-start md:justify-end">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.01 }}
                      className={`glass-premium p-6 md:p-8 rounded-3xl w-full max-w-md hover:border-white/12 transition-all duration-300 ${
                        isEven ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <div className={`flex items-center gap-3 mb-4 ${
                        isEven ? "justify-start" : "justify-start md:justify-end"
                      }`}>
                        <span className="font-serif italic text-white/35 text-2xl font-light">
                          {step.stepNum}
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase font-sans">
                          Step Name
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-serif text-white font-medium mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-white/60 font-light mb-4 font-sans tracking-wide">
                        {step.subtitle}
                      </p>
                      <p className="text-xs md:text-sm font-light text-white/40 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* SVG Node Overlay Dot */}
                  <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative flex items-center justify-center h-5 w-5 rounded-full bg-black border border-white/20 group"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" />
                      <div className="absolute -inset-1.5 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Opposite Column / Placeholder on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
