import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Code2, Mail, Share2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Enterprise"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "API Docs", "Support", "Community"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "Compliance"],
};

const socialLinks = [
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <footer className="relative overflow-hidden bg-[#07090D] text-white">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-[#FF4D4F]/5 to-transparent" />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
              Start discovering smarter meals today
            </h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-2xl">
              Join thousands of users finding their perfect meal in seconds with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={isAuthenticated ? "/ai-search" : "/register"}
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] text-white font-bold shadow-lg shadow-[#FF4D4F]/30 hover:shadow-[#FF4D4F]/50 transition-all hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center justify-center px-7 h-12 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          {/* Top Row - Logo & Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FF4D4F] to-[#FF7A18] flex items-center justify-center">
                  <Sparkles size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-black">FoodFlow</h3>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                AI-powered meal discovery for the modern food platform.
              </p>
            </motion.div>

            {/* Links Grid */}
            {Object.entries(footerLinks).map((category, categoryIdx) => (
              <motion.div
                key={category[0]}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + categoryIdx * 0.08, duration: 0.6 }}
              >
                <h4 className="font-bold text-sm mb-4 uppercase tracking-tight">{category[0]}</h4>
                <ul className="space-y-3">
                  {category[1].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Copyright & Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="text-sm text-[#94A3B8]">
              <p>© 2025 FoodFlow AI. All rights reserved.</p>
              <p className="mt-2">Building the future of food discovery</p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="h-10 w-10 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {isDemoOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#111418] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-white">Schedule a FoodFlow demo</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  Send us your details and the FoodFlow AI team will follow up with a tailored walkthrough.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDemoOpen(false)}
                className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#94A3B8] hover:text-white"
                aria-label="Close demo modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setIsDemoOpen(false);
              }}
            >
              <input
                required
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FF4D4F]/50"
              />
              <input
                required
                type="email"
                placeholder="Work email"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FF4D4F]/50"
              />
              <input
                type="text"
                placeholder="Restaurant or company"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#FF4D4F]/50"
              />
              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-gradient-to-r from-[#FF4D4F] to-[#FF7A18] font-bold text-white"
              >
                Request Demo
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </footer>
  );
}
