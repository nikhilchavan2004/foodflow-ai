import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await register(formData.fullName, formData.email, formData.password);
    if (result.success) {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  const passwordStrength = formData.password.length >= 8 ? 100 : (formData.password.length / 8) * 100;

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <Navbar />

      <div className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Gradient */}
        <div className="pointer-events-none absolute top-1/4 right-0 w-96 h-96 bg-[#FF4D4F]/12 blur-3xl opacity-60 rounded-full" />
        <div className="pointer-events-none absolute bottom-1/4 left-0 w-96 h-96 bg-[#FF7A18]/10 blur-3xl opacity-40 rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-md relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-3">Create Account</h1>
            <p className="text-[#94A3B8]">Join FoodFlow and start discovering smarter meals</p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/15 bg-white/8 text-white outline-none focus:border-[#FF4D4F]/50 focus:bg-white/12 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/15 bg-white/8 text-white outline-none focus:border-[#FF4D4F]/50 focus:bg-white/12 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-white/15 bg-white/8 text-white outline-none focus:border-[#FF4D4F]/50 focus:bg-white/12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        passwordStrength < 50
                          ? "bg-[#FF4D4F]"
                          : passwordStrength < 100
                          ? "bg-[#FF7A18]"
                          : "bg-[#10B981]"
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#94A3B8]">
                    {passwordStrength < 50 ? "Weak" : passwordStrength < 100 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-white/15 bg-white/8 text-white outline-none focus:border-[#FF4D4F]/50 focus:bg-white/12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-[#10B981]">
                  <CheckCircle size={16} />
                  <span className="text-xs font-semibold">Passwords match</span>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded border-white/20" required />
              <span className="text-xs text-[#94A3B8]">
                I agree to the <a href="#" className="text-[#FF4D4F] hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-[#FF4D4F] hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={authLoading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D4F]/30 hover:shadow-[#FF4D4F]/50 transition-all disabled:opacity-50"
            >
              {authLoading ? "Creating account..." : "Create Account"}
              {!authLoading && <ArrowRight size={18} />}
            </motion.button>
          </motion.form>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-8 text-[#94A3B8]"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF4D4F] hover:text-[#FF7A18] transition-colors font-semibold">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
