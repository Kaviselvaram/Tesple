import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Magnetic button values
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, elasticity: 0.8, stiffness: 100 };
  const magneticX = useSpring(x, springConfig);
  const magneticY = useSpring(y, springConfig);

  // Mouse tracker for particle gravity
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.15,
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ambient light background overlays
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particle network
      particles.forEach((p, index) => {
        // Subtle mouse interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 1500;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Limit speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 0.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();

        // Connect lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (120 - dist) / 120 * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Magnetic hover calculations
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const clientX = e.clientX - rect.left - halfWidth;
    const clientY = e.clientY - rect.top - halfHeight;
    x.set(clientX * 0.35);
    y.set(clientY * 0.35);
  };

  const handleButtonMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black py-16 px-4">
      {/* 1. Canvas particle field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Floating Ambient Glow System */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full glow-white animate-pulse-slow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full glow-silver animate-pulse-slow z-0" />

      {/* Spacing for floating navbar */}
      <div className="h-16" />

      {/* Hero Central Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4">
        {/* Animated Headline */}
        <h1 className="font-serif text-white tracking-tight leading-[0.9] select-none text-[13vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw]">
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block overflow-hidden pb-2"
          >
            Build the Future
          </motion.span>
          <motion.span
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block font-normal text-white/95"
            style={{ paddingBottom: "0.05em" }}
          >
            with Intelligent Systems
          </motion.span>
        </h1>

        {/* Dynamic Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-sm md:text-base font-light text-white/50 max-w-2xl mx-auto leading-relaxed tracking-wide font-sans"
        >
          Tesple develops AI software, intelligent automation systems, and
          enterprise consulting solutions that help organizations unlock new
          levels of growth, efficiency, and innovation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
        >
          {/* Magnetic CTA Button 1 */}
          <motion.button
            ref={buttonRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            style={{ x: magneticX, y: magneticY }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold px-8 py-4 rounded-full bg-white text-black hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-colors"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* CTA Button 2 */}
          <motion.a
            href="#solutions"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-semibold px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300"
          >
            Explore Services
          </motion.a>
        </motion.div>
      </div>

      {/* Founder Strip (Positioned Below Hero) */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float-slow"
        >
          <div className="glass-premium px-6 py-2.5 rounded-full flex items-center gap-2 text-xs text-white/50 tracking-wider">
            <span>Founded by</span>
            <span className="font-semibold text-white/90">Kaviselvaram</span>
            <span className="text-white/20">&</span>
            <span className="font-semibold text-white/90">Praful</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [0, 5, 0] }}
          transition={{
            opacity: { duration: 1.5, delay: 2, repeat: Infinity },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          href="#about"
          className="text-white/30 hover:text-white/60 transition-colors mt-2"
          aria-label="Scroll to About Section"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}
