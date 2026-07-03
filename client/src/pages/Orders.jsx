import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, Package, ArrowRight, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import { ordersService } from "../api/orders";
import { useAuth } from "../context/AuthContext";

const statusSteps = ["Placed", "Confirmed", "Preparing", "Ready", "Picked Up"];

const formatDate = (value) => {
  if (!value) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const getStatusColor = (status) => {
  switch (status) {
    case "Picked Up":
    case "Delivered":
      return "text-[#10B981]";
    case "Preparing":
    case "Ready":
    case "Confirmed":
      return "text-[#FF7A18]";
    case "Cancelled":
      return "text-[#FF4D4F]";
    default:
      return "text-[#94A3B8]";
  }
};

const getStatusBgColor = (status) => {
  switch (status) {
    case "Picked Up":
    case "Delivered":
      return "bg-[#10B981]/10 border-[#10B981]/30";
    case "Preparing":
    case "Ready":
    case "Confirmed":
      return "bg-[#FF7A18]/10 border-[#FF7A18]/30";
    case "Cancelled":
      return "bg-[#FF4D4F]/10 border-[#FF4D4F]/30";
    default:
      return "bg-[#94A3B8]/10 border-[#94A3B8]/30";
  }
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.user_id) return;

      setIsLoading(true);
      setError("");

      try {
        const response = await ordersService.getUserOrders(user.user_id);
        setOrders(response.data || []);
      } catch (err) {
        const errorMsg = err.response?.data?.detail || "Failed to load orders";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.user_id]);

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black mb-3">Order History</h1>
            <p className="text-lg text-[#94A3B8]">Track and manage your orders</p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <div className="w-12 h-12 border-4 border-[#FF4D4F]/20 border-t-[#FF4D4F] rounded-full" />
              </motion.div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#FF4D4F]/30 bg-[#FF4D4F]/10 p-6">
              <div className="flex items-center gap-3 text-[#FF4D4F]">
                <AlertCircle size={20} />
                <p className="font-bold">{error}</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 rounded-2xl border border-white/10"
            >
              <Package size={64} className="mx-auto text-[#94A3B8] mb-6 opacity-50" />
              <h2 className="text-2xl font-black mb-2">No orders yet</h2>
              <p className="text-[#94A3B8] mb-6">Start exploring our menu to place your first order</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => {
                const orderId = order._id || order.id;
                const currentStep = statusSteps.indexOf(order.status);
                const expanded = expandedOrder === orderId;

                return (
                  <motion.div
                    key={orderId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden hover:border-white/25 transition-all"
                  >
                    <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-black mb-2">#{orderId?.slice(-6).toUpperCase()}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8]">
                          <span className="flex items-center gap-2">
                            <Clock size={14} />
                            {formatDate(order.created_at)}
                          </span>
                          <span>${Number(order.total_amount || 0).toFixed(2)}</span>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className={`px-4 py-2 rounded-lg border font-bold text-center ${getStatusBgColor(order.status)} ${getStatusColor(order.status)}`}
                      >
                        {order.status || "Placed"}
                      </motion.div>
                    </div>

                    <div className="px-6 py-4 border-b border-white/10">
                      <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight mb-2">Items</p>
                      <div className="flex flex-wrap gap-2">
                        {(order.items || []).map((item) => (
                          <span
                            key={`${orderId}-${item.menu_item_id}`}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-white"
                          >
                            {item.quantity}x {item.menu_item_id?.slice(-6).toUpperCase()} - ${Number(item.price || 0).toFixed(2)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <p className="text-sm font-semibold text-[#94A3B8] uppercase tracking-tight mb-4">Status</p>
                      <div className="space-y-3">
                        {statusSteps.map((step, stepIdx) => {
                          const reached = order.status === "Cancelled" ? stepIdx === 0 : stepIdx <= Math.max(currentStep, 0);
                          return (
                            <div key={step} className="flex items-center gap-3">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  reached ? "bg-[#10B981]" : "bg-white/10 border border-white/20"
                                }`}
                              >
                                {reached ? (
                                  <CheckCircle size={18} className="text-white" />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-white/30" />
                                )}
                              </div>
                              <span className={`text-sm font-medium ${reached ? "text-white" : "text-[#94A3B8]"}`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {expanded && (
                      <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                        <p className="text-sm text-[#94A3B8]">
                          Order placed at {formatDate(order.created_at)} with {order.items?.length || 0} line item
                          {(order.items?.length || 0) === 1 ? "" : "s"}.
                        </p>
                      </div>
                    )}

                    <div className="px-6 py-4 bg-white/5 flex items-center justify-between">
                      <span className="text-sm text-[#94A3B8]">
                        {order.status === "Picked Up" ? "Completed" : "Estimated delivery: 25-35 minutes"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedOrder(expanded ? null : orderId)}
                        className="inline-flex items-center gap-2 px-4 h-9 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all"
                      >
                        {expanded ? "Hide Details" : "View Details"}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
