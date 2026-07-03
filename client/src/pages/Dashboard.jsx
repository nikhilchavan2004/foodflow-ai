import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import { dashboardService } from "../api/dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await dashboardService.getStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090D] text-white flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  const revenue = stats?.revenue || 0;
  const totalOrders = stats?.total_orders || 0;
  const status = stats?.orders_by_status || {};
  const recentOrders = stats?.recent_orders || [];
  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-black mb-2">Dashboard</h1>
              <p className="text-lg text-[#94A3B8]">Welcome back, Admin</p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 h-12 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all">
              <Settings size={18} />
              Settings
            </button>
          </motion.div>

          {/* Stats Grid */}
       {/* Stats Grid */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center justify-between">
      <TrendingUp className="text-[#FF7A18]" size={28} />
      <span className="text-xs text-green-400 font-bold">LIVE</span>
    </div>

    <h4 className="mt-5 text-[#94A3B8] text-sm">
      Revenue
    </h4>

    <p className="text-3xl font-black mt-2">
      ₹{revenue.toLocaleString()}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center justify-between">
      <ShoppingCart className="text-[#FF4D4F]" size={28} />
      <span className="text-xs text-green-400 font-bold">LIVE</span>
    </div>

    <h4 className="mt-5 text-[#94A3B8] text-sm">
      Orders
    </h4>

    <p className="text-3xl font-black mt-2">
      {totalOrders}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center justify-between">
      <BarChart3 className="text-[#3B82F6]" size={28} />
      <span className="text-xs text-green-400 font-bold">LIVE</span>
    </div>

    <h4 className="mt-5 text-[#94A3B8] text-sm">
      Preparing
    </h4>

    <p className="text-3xl font-black mt-2">
      {status.Preparing || 0}
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-center justify-between">
      <Settings className="text-[#10B981]" size={28} />
      <span className="text-xs text-green-400 font-bold">LIVE</span>
    </div>

    <h4 className="mt-5 text-[#94A3B8] text-sm">
      Ready Orders
    </h4>

    <p className="text-3xl font-black mt-2">
      {status.Ready || 0}
    </p>
  </div>

</div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6"
            >
              <h3 className="text-xl font-black mb-6">Revenue Trend</h3>
              <div className="h-64 flex items-end justify-around gap-2">
                {[65, 45, 72, 58, 88, 76, 92].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-[#FF4D4F] to-[#FF7A18] opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-7 gap-2 text-xs text-[#94A3B8] text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
            </motion.div>

            {/* Order Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6"
            >
              <h3 className="text-xl font-black mb-6">Order Status</h3>
              <div className="space-y-4">
                {[
                  { label: "Delivered", value: 342, color: "#10B981" },
                  { label: "Preparing", value: 89, color: "#FF7A18" },
                  { label: "Ready", value: 45, color: "#3B82F6" },
                  { label: "Cancelled", value: 12, color: "#FF4D4F" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-[#94A3B8]">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.value / 342) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          {/* Recent Orders */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
>
  <div className="flex items-center justify-between border-b border-white/10 p-6">
    <h2 className="text-2xl font-black text-white">
      Recent Orders
    </h2>

    <span className="text-sm text-[#94A3B8]">
      {recentOrders.length} Orders
    </span>
  </div>

  {recentOrders.length === 0 ? (
    <div className="py-12 text-center text-[#94A3B8]">
      No orders found.
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 text-left text-[#94A3B8]">
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="px-6 py-5 font-semibold">
                {order.id.slice(-8)}
              </td>

              <td className="px-6 py-5">
                {order.customer}
              </td>

              <td className="px-6 py-5">
                {order.items}
              </td>

              <td className="px-6 py-5 font-bold text-[#FF7A18]">
                ₹{order.amount}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold
                  ${
                    order.status === "Placed"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "Confirmed"
                      ? "bg-blue-500/20 text-blue-400"
                      : order.status === "Preparing"
                      ? "bg-orange-500/20 text-orange-400"
                      : order.status === "Ready"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {order.status}
                </span>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</motion.div>
        </div>
      </div>
    </div>
  );
}
