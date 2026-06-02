import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Is it a direct string like "24/7"?
    if (value.includes("/")) {
      // Just step animate or count the first digit
      const parts = value.split("/");
      const firstNum = parseInt(parts[0], 10);
      if (isNaN(firstNum)) return;

      let start = 0;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / firstNum));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= firstNum) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }

    const numericPart = parseInt(value, 10);
    if (isNaN(numericPart)) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing out quad
      const easeProgress = percentage * (2 - percentage);
      const currentCount = Math.floor(easeProgress * numericPart);

      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(numericPart);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  if (value.includes("/")) {
    const parts = value.split("/");
    return (
      <span ref={ref} className="font-serif font-light tracking-tight text-white">
        {count}/{parts[1]}
        <span className="text-white/60 text-2xl md:text-3xl ml-1">{suffix}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className="font-serif font-light tracking-tight text-white">
      {count}
      <span className="text-white/70 text-4xl sm:text-5xl ml-0.5">{suffix}</span>
    </span>
  );
}

export default function ImpactSection() {
  const metrics = [
    {
      value: "95",
      suffix: "%",
      label: "Automation Potential",
      description: "Of manual tasks and business processes can be dynamically automated.",
    },
    {
      value: "10",
      suffix: "x",
      label: "Operational Speed",
      description: "Increase in transactional throughput and software processing speeds.",
    },
    {
      value: "24/7",
      suffix: "",
      label: "Intelligent Assistance",
      description: "Autonomous reasoning services operating continually without downtime.",
    },
    {
      value: "100",
      suffix: "%",
      label: "Custom Solutions",
      description: "SaaS platforms tailored specifically to individual business goals.",
    },
  ];

  return (
    <section className="relative min-h-[90vh] w-full bg-black py-28 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      {/* Floating Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full glow-silver opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-20">
        {/* Heading */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Impact & Value
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white tracking-tight leading-[1.05] text-[8vw] sm:text-[6.5vw] md:text-[5vw]"
          >
            The future belongs to intelligent organizations.
          </motion.h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.02 }}
              className="glass-premium rounded-3xl p-8 flex flex-col justify-between min-h-[240px] hover:border-white/12 transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase block mb-6 font-sans">
                  {metric.label}
                </span>

                <div className="text-6xl sm:text-7xl">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
              </div>

              <p className="mt-8 text-xs font-light text-white/40 leading-relaxed font-sans">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
