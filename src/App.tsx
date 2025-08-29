import React, { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { ProductsProvider } from './components/context/ProductsContext';
import { HomeContent } from './components/home/HomeContent';
import { PedidosContent } from './components/pedidos/PedidosContent';
import { CardapioContent } from './components/cardapio/CardapioContent';

function FidelidadeContent() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[25px] grow items-center justify-start min-h-px min-w-px px-0 py-[50px] relative shrink-0 w-full">
      <div className="font-['Retrokia:Demo',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0f4c50] text-[64px] text-nowrap tracking-[-1.28px]">
        <p className="leading-[1.5] whitespace-pre">
          Fidelidade
        </p>
      </div>
      <div className="text-center text-[#797474]">
        <p>Componente Fidelidade será implementado em seguida</p>
      </div>
    </div>
  );
}


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>(''); // 1. State for activePage

  // 2. Function to render content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <HomeContent />;
      case "pedidos":
        return <PedidosContent />;
      case "fidelidade":
        return <FidelidadeContent />;
      case "cardapio":
        return <CardapioContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
      <ProductsProvider>
        <div className="bg-[#f0eee9]">
          <div className="">
            <Navbar
              activePage={activePage}
              setActivePage={setActivePage}
            />
            {renderContent()}
          </div>
        </div>
      </ProductsProvider>
  );
};

export default App;