import { motion } from "framer-motion";
import { Sparkles, Compass, Globe } from "lucide-react";

export default function FoundersSection() {
  const founders = [
    {
      name: "Kaviselvaram",
      role: "Founder & CEO",
      image: "/kaviselvaram_avatar.png",
      vision:
        "Building technology companies that combine intelligence, creativity, and scalable innovation.",
      quote: "AI should not replace human capability, but amplify human imagination and structural excellence.",
      icon: Sparkles,
    },
    {
      name: "Praful",
      role: "Co-Founder",
      image: "/praful_avatar.png",
      vision:
        "Helping organizations embrace the next generation of AI-powered transformation.",
      quote: "The next decade will belong to companies who transition from reactive processes to cognitive intelligence.",
      icon: Compass,
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black py-28 px-6 md:px-12 overflow-hidden flex flex-col justify-center">
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full glow-white opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-6 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
              Leadership
            </span>
            <span className="h-[1px] w-6 bg-white/20"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl text-white font-normal tracking-tight"
          >
            Meet The Founders
          </motion.h2>
        </div>

        {/* Two Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {founders.map((founder, index) => {
            const Icon = founder.icon;
            
            return (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden glass-premium rounded-[32px] p-8 md:p-10 flex flex-col gap-8 transition-all duration-500 hover:border-white/15"
              >
                {/* Sweeping Glass Reflection Beam */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />

                {/* Profile Image Column & Intro */}
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                  {/* Avatar Frame with custom outline pulse */}
                  <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border border-white/10 bg-black flex-shrink-0 group-hover:border-white/25 transition-colors duration-500">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover grayscale brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Inner glowing radial border */}
                    <div className="absolute inset-0 bg-radial-gradient(circle, transparent 70%, rgba(255,255,255,0.05) 100%) pointer-events-none" />
                  </div>

                  <div className="text-center sm:text-left flex flex-col">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase block mb-1 font-sans">
                      {founder.role}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white font-medium mb-2">
                      {founder.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Globe className="w-3.5 h-3.5 text-white/40 hover:text-white transition-colors cursor-pointer" />
                      <span className="text-[10px] text-white/30 font-sans tracking-wide">
                        Verified Partner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vision Box */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6 mt-2">
                  <div className="flex gap-3">
                    <Icon className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-[10px] font-semibold tracking-wider text-white/50 uppercase font-sans mb-1.5">
                        Vision Statement
                      </h4>
                      <p className="font-sans text-xs md:text-sm font-light text-white/80 leading-relaxed">
                        {founder.vision}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl mt-2 italic text-xs text-white/45 font-sans leading-relaxed relative">
                    <span className="absolute top-2 left-2 text-white/5 font-serif text-2xl">“</span>
                    <p className="pl-4 pr-2">
                      {founder.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
