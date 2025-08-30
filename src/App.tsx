import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./components/context/ProductsContext";
import { AuthProvider, useAuth } from "./components/auth/AuthContext"; // Importe AuthProvider e useAuth

// Importe os componentes das rotas e do layout
import { PublicSite } from "./components/public_site/PublicSite";
import { AdminRoute } from "./components/AdminRouter";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./components/auth/Login"; // Importe o componente de login
import { HomeContent } from "./components/home/HomeContent";
import { PedidosContent } from "./components/pedidos/PedidosContent";
import { FidelidadeContent } from "./components/fidelidade/FidelidadeContent";
import { CardapioContent } from "./components/cardapio/CardapioContent";


const App: React.FC = () => {
  const { login } = useAuth(); // Obtenha a função de login do contexto

  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicSite />} />
          
          <Route path="/dashboard-admin/login" element={<Login onLogin={login} />} />

          <Route path="/dashboard-admin" element={<AdminRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="home" element={<HomeContent />} />
              <Route path="pedidos" element={<PedidosContent />} />
              <Route path="fidelidade" element={<FidelidadeContent />} />
              <Route path="cardapio" element={<CardapioContent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ProductsProvider>
  );
};

// O seu componente App deve ser envolvido pelo AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;