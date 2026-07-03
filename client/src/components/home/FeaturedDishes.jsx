import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { menuService } from "../../api/menu";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85";

export default function FeaturedDishes() {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedDishes();
  }, []);

  const loadFeaturedDishes = async () => {
    try {
      const response = await menuService.getAllMenuItems();

      const items = Array.isArray(response.data) ? response.data : [];

      setDishes(items.slice(0, 3));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load featured dishes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (dish) => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const result = await addToCart(dish._id, 1);

    if (result.success) {
      toast.success(`${dish.name} added to cart`);
    } else {
      toast.error(result.error || "Failed to add item");
    }
  };

  if (loading) {
    return (
      <section className="bg-[#07090D] py-24 text-center text-white">
        Loading featured dishes...
      </section>
    );
  }

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#07090D] px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#FF4D4F]/10 blur-3xl opacity-60" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#FF7A18]/10 blur-3xl opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
            <Flame size={16} className="text-[#FF7A18]" />
            <span className="text-sm font-bold text-[#FF7A18]">
              Featured Recommendations
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-black text-white">
            Ranked by{" "}
            <span className="bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] bg-clip-text text-transparent">
              AI intent
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg text-[#94A3B8]">
            FoodFlow analyzes your behaviour and recommends meals you'll love.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {dishes.map((dish, index) => (
            <motion.article
              key={dish._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-lg"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dish.image_url || dish.image || fallbackImage}
                  alt={dish.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur">
                  {98 - index}% Match
                </div>

                <button
                  onClick={() => navigate("/menu")}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-[#FF4D4F]"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-3 flex justify-between">
                  <h3 className="text-xl font-black text-white">
                    {dish.name}
                  </h3>

                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-[#FF7A18] text-[#FF7A18]"
                    />
                    <span>{dish.rating || 4.8}</span>
                  </div>
                </div>

                <p className="min-h-[50px] text-sm text-[#94A3B8]">
                  {dish.description ||
                    "Delicious AI recommended meal perfectly matching your preferences."}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-[#94A3B8]">Category</p>

                    <p className="font-bold text-white">
                      {dish.category || "Food"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-1 text-xs text-[#94A3B8]">
                      <Clock size={12} />
                      ETA
                    </div>

                    <p className="font-bold text-white">
                      {dish.preparation_time || 15} min
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#94A3B8]">Price</p>

                    <p className="text-2xl font-black text-white">
                      ₹{dish.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] px-5 py-3 font-bold text-white transition hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}