import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const links = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "AI Search", href: "/ai-search" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#07090D]/80 border-b border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
      >
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#FF4D4F] via-[#FF7A18] to-[#FF6B35] flex items-center justify-center shadow-lg shadow-[#FF4D4F]/20">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tight text-white">FoodFlow</h1>
                <p className="text-xs text-[#94A3B8] font-medium">AI Discovery</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-8"
          >
            {links.map((item, idx) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  to={item.href}
                  className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {isAuthenticated && (
              <Link
                to="/cart"
                className="hidden sm:inline-flex items-center gap-2 px-4 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all duration-200 hover:border-white/20 relative"
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#FF4D4F] text-white text-xs font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex px-5 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all duration-200 hover:border-white/20 items-center"
                  title={user?.email}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center gap-2 px-5 h-10 rounded-lg bg-[#FF4D4F]/10 hover:bg-[#FF4D4F]/20 text-[#FF4D4F] text-sm font-bold transition-all duration-200 border border-[#FF4D4F]/30"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-5 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all duration-200 hover:border-white/20"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center gap-2 px-5 h-10 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white text-sm font-bold shadow-lg shadow-[#FF4D4F]/30 hover:shadow-[#FF4D4F]/50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2.5 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="mt-3 rounded-2xl bg-[#111418]/95 border border-white/10 p-6 lg:hidden backdrop-blur-xl"
            >
              <div className="flex flex-col gap-5">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/cart"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      Cart ({itemCount})
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-4 h-10 rounded-lg bg-[#FF4D4F]/10 hover:bg-[#FF4D4F]/20 text-[#FF4D4F] font-bold w-full transition-all border border-[#FF4D4F]/30 flex items-center justify-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="mt-4 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold w-full transition-all flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold w-full transition-all flex items-center justify-center"
                    >
                      Register
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="h-10 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold w-full transition-all hover:-translate-y-0.5 shadow-lg shadow-[#FF4D4F]/30 flex items-center justify-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
