import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#FF4D4F]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FF7A18]/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-black">Welcome Back</h1>
            <p className="text-slate-400">
              Login to continue using FoodFlow AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 outline-none transition focus:border-[#FF4D4F]"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 outline-none transition focus:border-[#FF4D4F]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-slate-400">Remember me</span>
              </label>

              <button
                type="button"
                className="text-[#FF4D4F] hover:text-[#FF7A18]"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] font-bold shadow-lg"
            >
              {isLoading ? "Signing In..." : "Sign In"}

              {!isLoading && <ArrowRight size={18} />}
            </motion.button>
          </form>

          {/* Divider */}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-slate-400">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social */}

          <div className="space-y-3">
            <button className="w-full rounded-xl border border-white/10 bg-white/5 py-3 transition hover:bg-white/10">
              Continue with Google
            </button>

            <button className="w-full rounded-xl border border-white/10 bg-white/5 py-3 transition hover:bg-white/10">
              Continue with Apple
            </button>
          </div>

          {/* Register */}

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#FF4D4F] hover:text-[#FF7A18]"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}