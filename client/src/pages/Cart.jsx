import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ordersService } from "../api/orders";
import Navbar from "../components/common/Navbar";

export default function Cart() {
  const navigate = useNavigate();
  const { items, isLoading, removeFromCart, updateQuantity, clearCart, fetchCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const tax = subtotal * 0.1;
  const delivery = 4.99;
  const total = subtotal + tax + delivery;

  const handleRemoveItem = async (cartItemId) => {
    const result = await removeFromCart(cartItemId);
    if (result.success) {
      toast.success("Item removed from cart");
    } else {
      toast.error(result.error || "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    try {
      const orderData = {
        user_id: user.user_id,
        items: items.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: total,
      };

      await ordersService.createOrder(orderData);
      await clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.response?.data?.detail || "Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[1400px]">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-[#FF4D4F]/20 border-t-[#FF4D4F] rounded-full" />
              </motion.div>
            </motion.div>
          ) : items.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingCart size={64} className="mx-auto text-[#94A3B8] mb-6 opacity-50" />
              <h1 className="text-4xl font-black mb-3">Your cart is empty</h1>
              <p className="text-[#94A3B8] mb-8 max-w-md mx-auto">
                Explore our menu and add delicious meals to your cart to get started.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-7 h-12 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold hover:-translate-y-1 transition-all"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            // Cart Content
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Items List */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-black mb-8">Shopping Cart</h1>
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.cart_id || item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 hover:bg-white/10 transition-all"
                    >
                      {/* Image */}
                      <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#111418]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-white mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-[#FF4D4F]">${Number(item.price || 0).toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          className="h-10 w-10 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="h-10 w-10 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.cart_id || item._id || item.id)}
                          className="h-10 w-10 rounded-lg border border-white/15 bg-[#FF4D4F]/10 hover:bg-[#FF4D4F]/20 text-[#FF4D4F] flex items-center justify-center transition-all ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 mt-8 px-6 h-11 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="h-fit rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 sticky top-24"
              >
                <h2 className="text-xl font-black mb-6">Order Summary</h2>

                <div className="space-y-4 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Delivery</span>
                    <span className="font-semibold">${delivery.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-black my-6">
                  <span>Total</span>
                  <span className="text-[#FF4D4F]">${total.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D4F]/30 hover:shadow-[#FF4D4F]/50 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isCheckingOut ? "Creating Order..." : "Proceed to Checkout"}
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-[#94A3B8] text-center mt-4">
                  Estimated delivery: 25-35 minutes
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
