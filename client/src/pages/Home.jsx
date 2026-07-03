import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import FeaturedDishes from "../components/home/FeaturedDishes";
import AISearchSection from "../components/home/AISearchSection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090D] text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <FeaturedDishes />
        <AISearchSection />
      </main>
      <Footer />
    </div>
  );
}