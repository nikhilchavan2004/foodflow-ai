import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { menuService } from "../api/menu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

export default function Menu() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [page, setPage] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 9;
  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category).filter(Boolean))),
  ];

  // Fetch menu items from backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await menuService.getAllMenuItems();
      setMenuItems(response.data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setError("Failed to load menu items");
      toast.error("Failed to load menu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const filteredItems = menuItems.filter((item) => {
    const searchValue = searchQuery.toLowerCase();
    const matchesSearch = [item.name, item.description, item.category, item.cuisine]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchValue));
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.is_available !== false;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return Number(a.price || 0) - Number(b.price || 0);
    if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
    if (sortBy === "rating") return Number(b.rating || 4.5) - Number(a.rating || 4.5);
    if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / pageSize));
  const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize);

  const handleAddToCart = async (itemId, itemName) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const result = await addToCart(itemId, 1);
    if (result.success) {
      toast.success(`${itemName} added to cart!`);
    } else {
      toast.error(result.error || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      {/* Header */}
      <div className="relative overflow-hidden bg-[#07090D] pt-32 pb-16 px-4 sm:px-6">
        <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-[#FF4D4F]/10 blur-3xl opacity-60 rounded-full" />
        
        <div className="mx-auto max-w-[1400px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              Explore Our <span className="bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] bg-clip-text text-transparent">Menu</span>
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-2xl">
              Discover hundreds of delicious meals curated by our AI, or browse by category to find your favorite.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-[#07090D] border-y border-white/10 sticky top-20 z-40 backdrop-blur-md bg-[#07090D]/80">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* Search Input */}
            <div className="relative flex items-center gap-3 px-5 py-3 rounded-lg border border-white/15 bg-white/8 backdrop-blur-md">
              <Search size={20} className="text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white shadow-lg shadow-[#FF4D4F]/30"
                      : "border border-white/15 bg-white/5 text-[#94A3B8] hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#94A3B8]">
                Showing {sortedItems.length} available item{sortedItems.length === 1 ? "" : "s"}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 rounded-lg border border-white/15 bg-[#111418] px-4 text-sm font-semibold text-white outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="name">Name</option>
                <option value="rating">Highest rated</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="bg-[#07090D] px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-[#FF4D4F]/20 border-t-[#FF4D4F] rounded-full" />
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-[#FF4D4F] mb-4">{error}</p>
              <button
                onClick={fetchMenuItems}
                className="px-6 py-2 rounded-lg bg-[#FF4D4F] text-white font-bold hover:bg-[#FF6B35] transition-all"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginatedItems.map((item, idx) => (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    className="group rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden hover:shadow-2xl hover:shadow-[#FF4D4F]/20 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#111418]">
                      <motion.img
                        src={item.image_url || item.image || fallbackImage}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-black text-white">{item.name}</h3>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star size={14} className="fill-[#FF7A18] text-[#FF7A18]" />
                          <span className="text-xs font-bold text-white">{item.rating || 4.5}</span>
                        </div>
                      </div>

                      <p className="text-sm text-[#94A3B8] mb-4">{item.description}</p>

                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                          <Clock size={14} />
                          {item.preparation_time || "15"} min
                        </div>
                        <div className="text-lg font-black text-white">${parseFloat(item.price).toFixed(2)}</div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item._id || item.id, item.name)}
                        className="w-full h-10 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF4D4F]/40 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-[#94A3B8]">No items found matching your search.</p>
                </motion.div>
              )}

              {sortedItems.length > pageSize && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    className="h-10 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-semibold text-[#94A3B8]">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    className="h-10 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
