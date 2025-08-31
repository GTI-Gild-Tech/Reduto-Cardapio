// src/components/context/OrdersContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type OrderStatus = "pending" | "preparing" | "ready" | "done";

export interface OrderItem {
  productId?: string;
  name: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;     // só dígitos
  createdAt: number;       // timestamp
  status: OrderStatus;     // "pending" | ... | "done"
  finalizado: boolean;     // espelho de status === "done"
  name: string;            // nome do cliente
  table: string;           // mesa
  items: OrderItem[];
}

interface AddOrderInput {
  name: string;
  table: string;
  items: OrderItem[];
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (payload: AddOrderInput) => Order;
  toggleFinalizado: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

const LS_KEY = "orders_v2";

function loadFromStorage(): Order[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(orders: Order[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(orders));
}

// Gera um número aleatório de N dígitos e garante unicidade na lista
function generateNumericOrderNumber(existing: Order[], length = 6): string {
  const mk = () =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  let num = mk();
  while (existing.some(o => o.orderNumber === num)) num = mk();
  return num;
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(orders);
  }, [orders]);

  const addOrder: OrdersContextValue["addOrder"] = (payload) => {
    const id =
      (globalThis.crypto as any)?.randomUUID?.() ??
      String(Date.now()) + Math.random().toString(36).slice(2);

    const orderNumber = generateNumericOrderNumber(orders, 6);
    const createdAt = Date.now();

    const newOrder: Order = {
      id,
      orderNumber,
      createdAt,
      status: "pending",
      finalizado: false,
      name: payload.name,
      table: payload.table,
      items: payload.items,
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus: OrdersContextValue["updateOrderStatus"] = (id, status) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status, finalizado: status === "done" } : o
      )
    );
  };

  const toggleFinalizado: OrdersContextValue["toggleFinalizado"] = (id) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== id) return o;
        const finalizado = !o.finalizado;
        return { ...o, finalizado, status: finalizado ? "done" : "pending" };
      })
    );
  };

  const value = useMemo(
    () => ({ orders, addOrder, toggleFinalizado, updateOrderStatus }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
