import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Repeat, Compass, Bot, BarChart3, Layers } from "lucide-react";

// Individual service card with interactive hover glow and lift effects
function ServiceCard({
  label,
  title,
  description,
  icon: Icon,
  index,
}: {
  label: string;
  title: string;
  description: string;
  icon: any;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative overflow-hidden glass-premium rounded-3xl p-8 flex flex-col justify-between min-h-[300px] group cursor-pointer transition-all duration-500 hover:border-white/15"
    >
      {/* Dynamic Cursor Light Tracer */}
      {isHovered && (
        <div
          className="absolute -inset-px pointer-events-none transition-opacity duration-500 opacity-100 rounded-3xl"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Top Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase font-sans">
            {label}
          </span>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl text-white font-medium group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-8 text-xs md:text-sm font-light text-white/50 leading-relaxed font-sans group-hover:text-white/60 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const services = [
    {
      label: "AI PRODUCTS",
      title: "Custom AI Platforms",
      description: "Scalable SaaS products powered by advanced intelligence, designed to meet your specific domain-level challenges.",
      icon: Cpu,
    },
    {
      label: "AUTOMATION",
      title: "Intelligent Workflows",
      description: "Automate repetitive business processes and legacy software pipelines using state-of-the-art decision agent nodes.",
      icon: Repeat,
    },
    {
      label: "CONSULTING",
      title: "AI Transformation",
      description: "Strategic executive consulting that helps enterprise organizations audit, adopt, and integrate AI pipelines effectively.",
      icon: Compass,
    },
    {
      label: "AGENTS",
      title: "Autonomous Systems",
      description: "AI agents capable of independent planning, long-term memory reasoning, and cross-platform task execution.",
      icon: Bot,
    },
    {
      label: "DATA",
      title: "Business Intelligence",
      description: "Transform complex information, raw logs, and disparate unstructured datasets into real-time, actionable business insights.",
      icon: BarChart3,
    },
    {
      label: "INTEGRATION",
      title: "Enterprise Solutions",
      description: "Connect machine learning models and large language pipelines seamlessly into your existing, secure business software ecosystems.",
      icon: Layers,
    },
  ];

  return (
    <section
      id="solutions"
      className="relative min-h-screen w-full bg-black py-28 px-6 md:px-12 overflow-hidden flex flex-col justify-center"
    >
      {/* Floating White Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full glow-white opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full glow-silver opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Solutions & Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white tracking-tight leading-none text-5xl md:text-6xl"
          >
            What We Build
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              label={service.label}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
