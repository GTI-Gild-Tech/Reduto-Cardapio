// src/components/context/OrdersContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  size?: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  customer?: { name?: string; phone?: string };
};

type OrdersCtx = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  removeOrder: (id: string) => void;
  clearOrders: () => void;
};

const OrdersContext = createContext<OrdersCtx | undefined>(undefined);

const LS_ORDERS_KEY = 'gti.orders.v1';

export const OrdersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // ✅ Hooks SOMENTE dentro do componente
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(LS_ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistência
  useEffect(() => {
    localStorage.setItem(LS_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Sincroniza entre abas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_ORDERS_KEY && e.newValue) {
        try { setOrders(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (order: Order) => {
    setOrders(prev => prev.map(o => (o.id === order.id ? order : o)));
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const removeOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const clearOrders = () => setOrders([]);

  return (
    <OrdersContext.Provider
      value={{ orders, addOrder, updateOrder, updateOrderStatus, removeOrder, clearOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider');
  return ctx;
};
