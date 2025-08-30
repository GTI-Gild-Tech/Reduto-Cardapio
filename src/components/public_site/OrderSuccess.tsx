import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../../imports/svg-yafp8q3jr7";
import imgDrink from "./../../assets/6feb31b16ef07d8aad72ffc0a24969c050e5a069.png";

interface OrderSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  tableNumber?: string;
  total?: number;
}

export function OrderSuccess({ isOpen, onClose, customerName, tableNumber, total }: OrderSuccessProps) {
  if (!isOpen) return null;

  const handleEvaluate = () => {
    // Abre o Google para avaliação
    window.open('https://www.google.com/search?q=reduto+coffice+avaliação', '_blank');
    onClose(); // Fecha o modal após clicar
  };

  const formatPrice = (price: number) => {
    return price?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop com overlay do app */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background blur do app */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.1)]" />
          </motion.div>
          
          {/* Modal */}
          <motion.div 
            className="relative bg-[#ffffff] h-[586px] w-[703px] rounded-[40px] flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
        {/* Close Button */}
        <motion.button 
          onClick={onClose}
          className="absolute right-[35px] top-[29px] w-10 h-10"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <path d={svgPaths.p26348400} fill="#5E6472" />
          </svg>
        </motion.button>

        {/* Content */}
        <div className="flex flex-col items-center justify-center gap-[13px] w-[448px] h-[443px]">
          {/* Drink Icon */}
          <motion.div 
            className="w-[194px] h-[194px] bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${imgDrink}')` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
          />
          
          {/* Success Title */}
          <motion.div 
            className="font-['Roboto_Slab:Bold',_sans-serif] font-bold text-[32px] text-[#2f1b04] text-center leading-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Pedido feito com sucesso!
          </motion.div>
          
          {/* Description */}
          <motion.div 
            className="font-['Roboto_Slab:Medium',_sans-serif] font-medium text-[20px] text-[#2f1b04] text-center w-[430px] leading-[1.7]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Mostre que gostou do nosso coffice! nos avalie no google.
          </motion.div>
          
          {/* Stars */}
          <motion.div 
            className="flex gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {[...Array(5).keys()].map((_, i) => (
              <motion.div 
                key={i} 
                className="w-[35px] h-[35px]"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 1 + (i * 0.1), 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 300 
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                  <path d={svgPaths.pb1da900} fill="#A68915" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Evaluate Button */}
          <motion.button
            onClick={handleEvaluate}
            className="w-full py-4 rounded-[50px] border border-[#0f4c50] flex items-center justify-center hover:bg-[#0f4c50]/5 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="font-['Roboto:Regular',_sans-serif] font-normal text-[20px] text-[#0f4c50] text-center tracking-[0.2px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Avaliar
            </div>
          </motion.button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}