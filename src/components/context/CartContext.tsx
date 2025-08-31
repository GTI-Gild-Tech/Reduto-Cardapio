import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../cardapio/KanbanComponents";

interface CartItem {
  product: Product;
  size: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, price: number, quantity: number) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, price: number, quantity: number) => {
  setCart((prev) => {
    const itemExists = prev.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (itemExists) {
      return prev.map((item) =>
        item.product.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [...prev, { product, size, price, quantity }];
  });
};


  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
}
