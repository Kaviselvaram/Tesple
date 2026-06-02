import type { MouseEvent } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black border-t border-white/5 py-12 px-6 md:px-12 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-4">
          
          {/* Logo and desc */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-sans text-sm font-semibold tracking-widest text-white">
                TESPLE
              </span>
            </div>
            <p className="text-xs text-white/40 font-light tracking-wide font-sans">
              AI SaaS & Consulting
            </p>
          </div>

          {/* Core recognition */}
          <div className="flex flex-col gap-1 md:text-right">
            <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase font-sans">
              Founding Partners
            </span>
            <p className="text-xs text-white/50 font-light font-sans">
              Founded by <span className="text-white/80 font-medium">Kaviselvaram</span> & <span className="text-white/80 font-medium">Praful</span>
            </p>
          </div>
        </div>

        {/* Thin divider */}
        <div className="h-[1px] w-full bg-white/5" />

        {/* Bottom block */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-[10px] sm:text-xs font-light text-white/35 font-sans tracking-wider">
            &copy; {currentYear} TESPLE. All rights reserved. Custom built for excellence.
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-white/40 hover:text-white uppercase transition-colors group cursor-pointer focus:outline-none"
            aria-label="Scroll to top of the page"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 text-white/30 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  );
}
