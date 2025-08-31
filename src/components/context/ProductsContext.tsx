// src/components/context/ProductsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../cardapio/KanbanComponents';

type ProductsCtx = {
  products: Product[];
  categories: string[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  moveProduct: (id: string, newCategory: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
};

const ProductsContext = createContext<ProductsCtx | undefined>(undefined);

const LS_PRODUCTS_KEY = 'gti.products.v1';
const LS_CATEGORIES_KEY = 'gti.categories.v1';

export const ProductsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // ✅ Hooks SÓ dentro do componente:
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(LS_PRODUCTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(LS_CATEGORIES_KEY);
      return raw ? JSON.parse(raw) : ['Cappuccinos', 'Cafes', 'Lanches'];
    } catch {
      return ['Cappuccinos', 'Cafes', 'Lanches'];
    }
  });

  // Persistência
  useEffect(() => {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LS_CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // (Opcional) sincronia entre abas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_PRODUCTS_KEY && e.newValue) {
        try { setProducts(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === LS_CATEGORIES_KEY && e.newValue) {
        try { setCategories(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // CRUD
  const addProduct = (p: Product) => setProducts(prev => [...prev, p]);

  const updateProduct = (p: Product) =>
    setProducts(prev => prev.map(x => (x.id === p.id ? p : x)));

  const deleteProduct = (id: string) =>
    setProducts(prev => prev.filter(x => x.id !== id));

  const moveProduct = (id: string, newCategory: string) =>
    setProducts(prev =>
      prev.map(x => (x.id === id ? { ...x, category: newCategory } : x))
    );

  const addCategory = (name: string) =>
    setCategories(prev => (prev.includes(name) ? prev : [...prev, name]));

  const updateCategory = (oldName: string, newName: string) => {
    setCategories(prev =>
      prev.map(c => (c === oldName ? newName : c))
    );
    setProducts(prev =>
      prev.map(p => (p.category === oldName ? { ...p, category: newName } : p))
    );
  };

  const deleteCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
    // (não movo produtos aqui; você já bloqueia se houver produtos)
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        moveProduct,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider');
  return ctx;
};
