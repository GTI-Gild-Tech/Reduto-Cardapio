import { Link, useLocation } from "react-router-dom";
import { NavButton } from "./NavButton";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();

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
    </nav>
  );
};