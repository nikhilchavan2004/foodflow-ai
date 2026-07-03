import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Brain, Zap, Star, AlertCircle, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import { aiService } from "../api/ai";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

const suggestions = [
  "Quick lunch that's high in protein",
  "Comfort food for under $15",
  "Spicy vegetarian options ready in 10 min",
  "Healthy dinner for meal prep",
];

const normalizeResult = (item, index) => ({
  id: item?._id || item?.id || item?.menu_item_id || `${item?.name || "result"}-${index}`,
  menuItemId: item?._id || item?.id || item?.menu_item_id,
  name: item?.name || "Recommended dish",
  description: item?.description || "AI matched this dish to your search intent.",
  category: item?.category || "AI Match",
  price: Number(item?.price || 0),
  rating: item?.rating || 4.8,
  image: item?.image_url || item?.image || fallbackImage,
  match: item?.match || `${Math.max(91, 98 - index * 2)}%`,
  time: item?.preparation_time ? `${item.preparation_time} min` : "15 min",
  reason:
    item?.reason ||
    [item?.dietary_tag, item?.cuisine, item?.meal_type, ...(item?.taste_tags || [])]
      .filter(Boolean)
      .slice(0, 3)
      .join(", ") ||
    "Matches your natural-language food intent.",
});

export default function AISearch() {
  const navigate = useNavigate();
const [searchParams] = useSearchParams();  
const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [intent, setIntent] = useState(null);
  const [history, setHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodflow_recent_searches") || "[]");
    } catch {
      return [];
    }
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedResults = useMemo(
    () => results.map((item, index) => normalizeResult(item, index)),
    [results]
  );

  const persistRecentSearch = (searchQuery) => {
    const nextSearches = [
      searchQuery,
      ...recentSearches.filter((item) => item.toLowerCase() !== searchQuery.toLowerCase()),
    ].slice(0, 6);

    setRecentSearches(nextSearches);
    localStorage.setItem("foodflow_recent_searches", JSON.stringify(nextSearches));
  };

  const executeSearch = async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      toast.error("Describe what you want to eat first");
      return;
    }

    setQuery(trimmedQuery);
    navigate(`/ai-search?q=${encodeURIComponent(trimmedQuery)}`, {
    replace: true,
});
    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await aiService.search(trimmedQuery);
     const data = response.data;

let nextResults = [];

if (Array.isArray(data)) {
  nextResults = data;
} else if (Array.isArray(data.results)) {
  nextResults = data.results;
}

setResults(nextResults);

setRecommendation(data?.recommendation || "");

setIntent(data?.intent || null);
      setHistory((current) => [
        {
          query: trimmedQuery,
          results: nextResults,
          recommendation: data.recommendation || "",
          createdAt: new Date().toISOString(),
        },
        ...current,
      ].slice(0, 5));
      persistRecentSearch(trimmedQuery);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "AI search failed. Please try again.";
      setError(errorMsg);
      setResults([]);
      setRecommendation("");
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

 useEffect(() => {
  const q = searchParams.get("q");

  if (!q) return;

  setQuery(q);

  executeSearch(q);

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!item.menuItemId) {
      toast.error("This recommendation is missing a menu item id");
      return;
    }

const result = await addToCart(
  item.menuItemId || item.id,
  1
);
    if (result.success) {
      toast.success(`${item.name} added to cart`);
    } else {
      toast.error(result.error || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D4F]/12 blur-3xl opacity-60 rounded-full" />
        <div className="pointer-events-none absolute bottom-1/4 left-0 w-96 h-96 bg-[#FF7A18]/10 blur-3xl opacity-40 rounded-full" />

        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md mb-6">
              <Brain size={16} className="text-[#FF7A18]" />
              <span className="text-sm font-bold text-[#FF7A18]">AI-Powered Search</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              Describe your{" "}
              <span className="bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] bg-clip-text text-transparent">
                craving
              </span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              Tell our AI about your mood, dietary preferences, time constraints, and budget. Let AI find your perfect meal.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSearch}
            className="mb-12"
          >
            <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/12 to-white/5 p-3 shadow-2xl shadow-[#FF4D4F]/10 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-5">
                  <Search className="text-[#94A3B8] flex-shrink-0" size={20} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="I want something healthy but indulgent, spicy, under 20 minutes..."
                    className="flex-1 bg-transparent text-white outline-none placeholder:text-[#94A3B8] placeholder:font-normal text-base sm:text-lg font-medium"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-8 h-14 rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold shadow-lg shadow-[#FF4D4F]/40 hover:shadow-[#FF4D4F]/60 transition-all duration-200 whitespace-nowrap disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Sparkles size={18} className="animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Search
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.form>

          {!hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-16"
            >
              <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight mb-4">
                Try these searches
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {suggestions.map((suggestion, idx) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + idx * 0.05 }}
                    type="button"
                    onClick={() => executeSearch(suggestion)}
                    className="p-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-left transition-all"
                  >
                    <p className="text-sm font-medium text-white">{suggestion}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {recentSearches.length > 0 && (
            <div className="mb-10">
              <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight mb-3">
                Recent searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((recent) => (
                  <button
                    key={recent}
                    type="button"
                    onClick={() => executeSearch(recent)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-sm text-white transition-all"
                  >
                    {recent}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {isLoading ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block"
                  >
                    <Sparkles size={32} className="text-[#FF7A18]" />
                  </motion.div>
                  <p className="mt-4 text-lg text-[#94A3B8]">AI is analyzing your preferences...</p>
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-[#FF4D4F]/30 bg-[#FF4D4F]/10 p-6">
                  <div className="flex items-center gap-3 text-[#FF4D4F]">
                    <AlertCircle size={20} />
                    <p className="font-bold">{error}</p>
                  </div>
                </div>
              ) : (
                <>
                  {recommendation && (
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                      <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight mb-3">
                        AI Recommendation
                      </p>
                      <p className="text-white leading-relaxed whitespace-pre-wrap">{recommendation}</p>
                    </div>
                  )}

                  {intent && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(intent)
                        .filter((entry) => Boolean(entry[1]) && entry[1] !== false)
                        .slice(0, 8)
                        .map(([key, value]) => (
                          <span key={key} className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-sm text-[#94A3B8]">
                            {key}: {Array.isArray(value) ? value.join(", ") : String(value)}
                          </span>
                        ))}
                    </div>
                  )}

                  <div>
                    <h2 className="text-2xl font-black mb-6">Top Matches for You</h2>
                    {normalizedResults.length === 0 ? (
                      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
                        <p className="text-[#94A3B8]">No menu items matched that search. Try a broader request.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {normalizedResults.map((result, idx) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 hover:border-[#FF4D4F]/40 hover:bg-white/15 transition-all duration-300"
                          >
                            <div className="flex flex-col gap-6 sm:flex-row">
                              <div className="h-32 w-full rounded-xl overflow-hidden flex-shrink-0 bg-[#111418] sm:w-32">
                                <img src={result.image} alt={result.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div>
                                    <h3 className="text-xl font-black text-white">{result.name}</h3>
                                    <p className="text-sm text-[#94A3B8] mt-1">Why this matches: {result.reason}</p>
                                  </div>
                                  <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="text-right">
                                      <p className="text-xs font-semibold text-[#94A3B8] uppercase">AI Match</p>
                                      <p className="text-2xl font-black text-white">{result.match}</p>
                                    </div>
                                    <Zap className="text-[#FF7A18]" size={20} />
                                  </div>
                                </div>

                                <p className="text-sm text-[#94A3B8]">{result.description}</p>

                                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/10">
                                  <div className="flex items-center gap-2">
                                    <Star size={14} className="fill-[#FF7A18] text-[#FF7A18]" />
                                    <span className="text-sm font-semibold">{result.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#94A3B8]">
                                    <Clock size={14} />
                                    <span className="text-sm">{result.time}</span>
                                  </div>
                                  <span className="text-sm font-bold text-white">
                                    ₹{result.price}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddToCart(result)}
                                    className="ml-auto px-4 h-9 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {history.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="rounded-2xl border border-white/15 bg-white/5 p-6"
                    >
                      <h3 className="text-lg font-black mb-4">Search History</h3>
                      <div className="space-y-3">
                        {history.map((entry) => (
                          <button
                            key={`${entry.createdAt}-${entry.query}`}
                            type="button"
                            onClick={() => executeSearch(entry.query)}
                            className="flex w-full items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10"
                          >
                            <span className="text-sm font-medium text-white">{entry.query}</span>
                            <span className="text-xs text-[#94A3B8]">{entry.results.length} results</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
