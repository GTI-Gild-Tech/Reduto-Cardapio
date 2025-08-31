import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NavButton } from "./NavButton";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react"; // ícone de carrinho
import { CartSidebar } from "../cart/CartSidebar";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="flex gap-4 p-4 bg-white shadow-md justify-self-center rounded-full z-10">
      <Link to="/dashboard-admin/home" className="no-underline">
        <NavButton isActive={location.pathname === "/dashboard-admin/home"} onClick={() => {}}>
          Home
        </NavButton>
      </Link>
      <Link to="/dashboard-admin/pedidos" className="no-underline">
        <NavButton isActive={location.pathname === "/dashboard-admin/pedidos"} onClick={() => {}}>
          Pedidos
        </NavButton>
      </Link>
      <Link to="/dashboard-admin/fidelidade" className="no-underline">
        <NavButton isActive={location.pathname === "/dashboard-admin/fidelidade"} onClick={() => {}}>
          Fidelidade
        </NavButton>
      </Link>
      <Link to="/dashboard-admin/cardapio" className="no-underline">
        <NavButton isActive={location.pathname === "/dashboard-admin/cardapio"} onClick={() => {}}>
          Cardápio
        </NavButton>
      </Link>
      <div className="relative">
        <button onClick={() => setIsCartOpen(true)} className="relative">
          <ShoppingCart className="w-6 h-6 text-[#0f4c50]" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Sidebar do carrinho */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};