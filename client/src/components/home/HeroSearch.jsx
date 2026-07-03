import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  "High-protein breakfast",
  "Quick lunch under 15 min",
  "Comfort food for dinner",
  "Healthy vegetarian options",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const runSearch = (searchQuery = query) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      navigate("/ai-search");
      return;
    }

    navigate(`/ai-search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch();
  };

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl shadow-[#FF4D4F]/20 backdrop-blur-xl"
      >
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-4">
            <Search className="shrink-0 text-[#94A3B8]" size={20} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask AI: meals for your mood, diet, budget, or time..."
              className="flex-1 bg-transparent text-base sm:text-lg font-medium text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] placeholder:font-normal"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group flex items-center justify-center gap-2 px-6 h-12 sm:h-14 rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold shadow-lg shadow-[#FF4D4F]/40 hover:shadow-[#FF4D4F]/60 transition-all duration-200 whitespace-nowrap"
          >
            <Sparkles size={18} />
            Search
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-5 flex flex-wrap gap-3"
      >
        {suggestions.map((suggestion, idx) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + idx * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 77, 79, 0.15)" }}
            type="button"
            onClick={() => runSearch(suggestion)}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </form>
  );
}
