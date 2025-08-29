import { Link, useLocation } from "react-router-dom";
import { NavButton } from "./NavButton"; // Importe o NavButton

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();

  return (
    <nav className="flex gap-4 p-4 bg-white shadow-md justify-self-center rounded-full">
      <Link to="/" className="no-underline">
        <NavButton isActive={location.pathname === "/home"} onClick={() => {}}>
          Home
        </NavButton>
      </Link>
      <Link to="/pedidos" className="no-underline">
        <NavButton isActive={location.pathname === "/pedidos"} onClick={() => {}}>
          Pedidos
        </NavButton>
      </Link>
      <Link to="/fidelidade" className="no-underline">
        <NavButton isActive={location.pathname === "/fidelidade"} onClick={() => {}}>
          Fidelidade
        </NavButton>
      </Link>
      <Link to="/cardapio" className="no-underline">
        <NavButton isActive={location.pathname === "/cardapio"} onClick={() => {}}>
          Cardápio
        </NavButton>
      </Link>
    </nav>
  );
};