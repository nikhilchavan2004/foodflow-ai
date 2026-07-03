import { motion } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";

export default function HeroStats() {
  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "50K+",
      color: "from-[#FF4D4F]",
    },
    {
      icon: Star,
      label: "Avg. Rating",
      value: "4.9/5",
      color: "from-[#FF7A18]",
    },
    {
      icon: TrendingUp,
      label: "Match Rate",
      value: "96%",
      color: "from-[#FF6B35]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="mt-12 grid gap-4 sm:grid-cols-3"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + idx * 0.08, duration: 0.6 }}
            className="rounded-xl border border-white/15 bg-gradient-to-br from-white/8 to-white/[0.03] p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} to-[#FF7A18] flex items-center justify-center shadow-lg shadow-[#FF4D4F]/20`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-tight">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl sm:text-2xl font-black text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
