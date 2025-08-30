import imgBackground from "./../../assets/6feb31b16ef07d8aad72ffc0a24969c050e5a069.png";
import { motion } from 'motion/react';
import { MenuSection } from './MenuSection';
import { Navigation } from './Navigation';
import { CoffeeIllustration } from './CoffeeIllustration';
import { useApp } from '../context/AppContext';
import { menuCategories } from '../../data/menuData';

export function Home() {
  const { addToCart } = useApp();
  return (
    <div className="min-h-screen bg-[#f0eee9] relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-[9.9px]"
          style={{ backgroundImage: `url('${imgBackground}')` }}
        />
        <div className="absolute inset-0 bg-[#f0eee9]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Coffee Cup Illustration */}
        <CoffeeIllustration />

        {/* Menu Sections */}
        <div className="max-w-[1129px] mx-auto px-4 space-y-16">
          {menuCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8 + (index * 0.2),
                ease: "easeOut" 
              }}
            >
              <MenuSection
                title={category.title}
                items={category.items}
                onAddToCart={addToCart}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}