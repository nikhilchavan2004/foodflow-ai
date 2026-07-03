import { motion } from "framer-motion";
import { Search, Brain, Sparkles, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Natural Language",
    description: "Just describe what you're craving—mood, time, dietary needs, budget.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "AI analyzes your intent and finds the perfect match in milliseconds.",
  },
  {
    icon: Sparkles,
    title: "Personalized Results",
    description: "Results ranked by your taste profile and ordering history.",
  },
];

export default function AISearchSection() {
  return (
    <section id="ai" className="relative overflow-hidden bg-[#07090D] px-4 py-24 sm:px-6 lg:py-32">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-[#FF4D4F]/12 blur-3xl opacity-60 -translate-y-1/2" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-[#FF7A18]/10 blur-3xl opacity-40" />

      <div className="mx-auto max-w-[1400px] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md mb-6">
            <Brain size={16} className="text-[#FF7A18]" />
            <span className="text-sm font-bold text-[#FF7A18]">AI Search Demo</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Search with <span className="bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] bg-clip-text text-transparent">natural language</span>
          </h2>

          <p className="mt-6 text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            No more scrolling through endless menus. Tell FoodFlow what you're in the mood for, and AI does the thinking.
          </p>
        </motion.div>

        {/* Demo Box */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-16 rounded-2xl border border-white/15 bg-gradient-to-b from-white/12 to-white/5 p-8 shadow-2xl shadow-[#FF4D4F]/10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-6">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-center gap-4 px-5 py-4 rounded-xl border border-white/15 bg-white/8 backdrop-blur-md">
                <Search className="text-[#94A3B8] flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="I want something spicy but light, ready in 15 minutes..."
                  className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#94A3B8] font-medium"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 h-12 sm:h-auto rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold shadow-lg shadow-[#FF4D4F]/40 hover:shadow-[#FF4D4F]/60 transition-all duration-200 whitespace-nowrap"
              >
                <Sparkles size={18} />
                Search
              </motion.button>
            </div>

            {/* Example Results */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight">Quick Results</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Spicy Thai Green Curry - 12 min", "Light Mediterranean Salad - 8 min"].map(
                  (result, idx) => (
                    <motion.div
                      key={result}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + idx * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF4D4F]/30 to-[#FF7A18]/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={18} className="text-[#FF7A18]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-sm">{result}</p>
                        <p className="text-xs text-[#94A3B8] mt-1">98% match • AI recommended</p>
                      </div>
                      <ArrowRight size={18} className="text-[#94A3B8] group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md hover:bg-white/15 transition-colors duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#FF4D4F]/30 to-[#FF7A18]/20 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[#FF7A18]" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
