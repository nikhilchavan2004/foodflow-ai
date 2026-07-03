import { motion } from "framer-motion";
import { Zap, Flame, Clock3, TrendingUp } from "lucide-react";
import bowl from "../../assets/images/hero-bowl.png";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden min-h-[680px] items-center justify-center lg:flex"
    >
      {/* Background Gradient Circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-[#FF4D4F]/25 via-[#FF7A18]/15 to-transparent blur-3xl"
      />
      <div className="absolute h-96 w-96 rounded-full border border-white/8 bg-white/[0.02]" />

      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="relative z-10"
      >
        <motion.img
          src={bowl}
          alt="AI recommended bowl"
          animate={{ 
            y: [0, -24, 0],
            rotate: [-2.5, 2.5, -2.5]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-[520px] max-w-none drop-shadow-2xl"
        />
      </motion.div>

      {/* Top Right Card - AI Pick */}
      <motion.div
        initial={{ opacity: 0, y: 32, x: 24 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute right-0 top-16 z-20 w-80 rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 p-6 shadow-2xl shadow-[#FF4D4F]/20 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#FF4D4F]/20 px-3 py-1.5 text-xs font-bold text-[#FF4D4F]">
            <Zap size={14} />
            AI Pick
          </span>
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-tight">Live</span>
        </div>
        
        <h3 className="mt-5 text-2xl font-black text-white leading-tight">
          Citrus Grain Bowl
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
          Perfect macros, bright flavors, and exactly matches your recent taste preferences.
        </p>
        
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#FF7A18]">
              <Flame size={16} />
              <span className="text-xs font-semibold uppercase tracking-tight text-[#94A3B8]">Match</span>
            </div>
            <p className="mt-2 text-2xl font-black text-white">98%</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#FF4D4F]">
              <Clock3 size={16} />
              <span className="text-xs font-semibold uppercase tracking-tight text-[#94A3B8]">Time</span>
            </div>
            <p className="mt-2 text-2xl font-black text-white">12m</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left Card - Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 32, x: -24 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="absolute bottom-20 left-0 z-20 rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 px-6 py-5 shadow-2xl shadow-[#FF7A18]/20 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-[#FF7A18]/30 to-[#FF4D4F]/10 flex items-center justify-center">
            <TrendingUp size={24} className="text-[#FF7A18]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Delivery Window
            </p>
            <p className="mt-1 text-xl font-black text-white">18 min avg</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
