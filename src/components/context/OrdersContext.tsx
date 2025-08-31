import React, { createContext, useContext, useMemo, useState } from "react";

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  size: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;            // ex.: "#247"
  table: string;         // mesa
  name: string;          // cliente
  datetime: string;      // "dd/MM/yyyy HH'h'mm"
  finalizado: boolean;
  items: OrderItem[];
  total: number;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "datetime" | "finalizado">) => Order;
  toggleFinalizado: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

function formatDateBR(d = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${dd}/${mm}/${yyyy} ${hh}h${min}`;
}

// Gera "#XYZ" com 3 a 4 dígitos aleatórios e garante unicidade em memória
function generateOrderId(existing: Set<string>) {
  let id = "";
  do {
    const n = Math.floor(100 + Math.random() * 9000); // 3-4 dígitos
    id = `#${n}`;
  } while (existing.has(id));
  return id;
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const existingIds = useMemo(() => new Set(orders.map(o => o.id)), [orders]);

  const addOrder: OrdersContextType["addOrder"] = (payload) => {
    const id = generateOrderId(existingIds);
    const datetime = formatDateBR(new Date());
    const newOrder: Order = {
      id,
      datetime,
      finalizado: false,
      ...payload,
    };
    setOrders(prev => [newOrder, ...prev]); // adiciona no topo
    return newOrder;
  };

  const toggleFinalizado = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, finalizado: !o.finalizado } : o))
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, toggleFinalizado }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders deve ser usado dentro de OrdersProvider");
  return ctx;
}
