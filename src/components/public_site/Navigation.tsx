import { motion } from 'motion/react';
import { Button } from './../ui/button';
import { ShoppingCart, Home as HomeIcon } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from "react-router-dom";

export function Navigation() {
  const { getTotalItems, openCart } = useApp();

  return (
    <motion.nav 
      className="flex justify-center pb-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <nav className="bg-[#c1a07b] rounded-bl-[50px] rounded-br-[50px] px-[200px] py-10 flex items-center gap-5" role="navigation" aria-label="Main navigation">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/dashboard-admin/home">
            <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 transition-colors duration-300" aria-label="Home">
              <ShieldAlert className="h-8 w-8 text-white" />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 transition-colors duration-300" aria-label="Home">
            <HomeIcon className="h-8 w-8 text-white" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 hover:bg-white/30 relative transition-colors duration-300"
            onClick={openCart}
            aria-label={`Shopping cart ${getTotalItems() > 0 ? `with ${getTotalItems()} items` : 'empty'}`}
          >
            <ShoppingCart className="h-8 w-8 text-white" />
            {getTotalItems() > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center" 
                aria-hidden="true"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                key={getTotalItems()}
              >
                <motion.span
                  key={getTotalItems()}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {getTotalItems()}
                </motion.span>
              </motion.span>
            )}
          </Button>
        </motion.div>
      </nav>
    </motion.nav>
  );
}