import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroImage from "./HeroImage";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";

export default function Hero() {
  const navigate = useNavigate();

  const scrollToAISearch = () => {
    document.getElementById("ai")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#07090D] pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-28 px-4 sm:px-6">
      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FF4D4F]/15 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-96 right-1/4 w-96 h-96 rounded-full bg-[#FF7A18]/12 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-[#FF4D4F]/8 blur-3xl opacity-40" />
      
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-gradient-to-r from-white/8 to-white/[0.04] px-4 py-2 backdrop-blur-md"
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF4D4F] to-[#FF7A18] flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#F8FAFC]">
              AI-Powered Recommendations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white"
          >
            Discover <span className="bg-gradient-to-r from-[#FF4D4F] via-[#FF7A18] to-[#FF6B35] bg-clip-text text-transparent">meals</span> the <span className="relative inline-block">
              <span className="relative z-10">smarter</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#FF4D4F]/20 -z-10 origin-left"
              />
            </span> way
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-8 max-w-xl text-lg text-[#94A3B8] leading-relaxed"
          >
            FoodFlow uses advanced AI to understand your mood, dietary goals, preferences, and timing—delivering the perfect meal recommendation in seconds, not searches.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              onClick={scrollToAISearch}
              className="inline-flex items-center justify-center gap-2.5 px-7 h-12 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold shadow-lg shadow-[#FF4D4F]/30 hover:shadow-[#FF4D4F]/50 transition-all duration-200 hover:-translate-y-1 group"
            >
              Start Discovering
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="inline-flex items-center justify-center px-7 h-12 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-200 hover:border-white/40"
            >
              View Menu
            </button>
          </motion.div>

          {/* Stats */}
          <HeroStats />
        </motion.div>

        {/* Right Image */}
        <HeroImage />
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-16 lg:mt-20 relative z-10"
      >
        <HeroSearch />
      </motion.div>
    </section>
  );
}
