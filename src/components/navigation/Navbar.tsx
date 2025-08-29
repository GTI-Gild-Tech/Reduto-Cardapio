import { NavButton } from "./NavButton";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Navbar({
  activePage,
  setActivePage,
}: NavbarProps) {
  return (
    <div className="flex justify-center w-full">
      <div
        className="bg-[#f0f0f0] box-border flex gap-5 items-start justify-start p-[10px] relative rounded-[30px] shadow-[4px_4px_4px_0px_rgba(130,118,87,0.19)] shrink-0"
        data-name="Navbar"
      >
        <NavButton
          isActive={activePage === "home"}
          onClick={() => setActivePage("home")}
        >
          Home
        </NavButton>
        <NavButton
          isActive={activePage === "pedidos"}
          onClick={() => setActivePage("pedidos")}
        >
          Pedidos
        </NavButton>
        <NavButton
          isActive={activePage === "fidelidade"}
          onClick={() => setActivePage("fidelidade")}
        >
          Fidelidade
        </NavButton>
        <NavButton
          isActive={activePage === "cardapio"}
          onClick={() => setActivePage("cardapio")}
        >
          Cardapio
        </NavButton>
      </div>
    </div>
  );
}