import imgBackground from "./../../assets/Background.png";
import { motion } from 'framer-motion';
import { MenuSection } from './MenuSection';
import { Navigation } from './Navigation';
import { CoffeeIllustration } from './CoffeeIllustration';
import { useApp } from './AppContext';
import { menuCategories } from '../../data/menuData';
import { HomeContent } from '../home/HomeContent';

export function Home() {
  const { addToCart } = useApp();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center min-h-[100vh]"
        style={{ backgroundImage: `url('${imgBackground}')` }}
      >
      

        {/* Conteúdo da Hero Section */}
        <div className="relative mx-auto max-w-[1129px] px-4">
          <Navigation />
          <CoffeeIllustration />
          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-6 h-10 border-2 border-[#E4DDCD] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#c1a07b] rounded-full mt-2"></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center pt-1 text-[#E4DDCD]"
          > Veja mais
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-[#f0eee9]">
        <div className="max-w-[1129px] mx-auto px-4">
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