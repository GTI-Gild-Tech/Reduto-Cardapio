import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../cardapio/KanbanComponents';

// Mock data inicial baseado no design do Figma - mesmos dados do KanbanBoard
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Avelã',
    category: 'Cappuccinos',
    sizes: [
      { size: 'M', price: '8,00' },
      { size: 'G', price: '12,00' }
    ]
  },
  {
    id: '2',
    name: 'Chocolate',
    category: 'Cappuccinos',
    sizes: [
      { size: 'M', price: '8,50' },
      { size: 'G', price: '12,50' }
    ]
  },
  {
    id: '3',
    name: 'Canela',
    category: 'Cappuccinos',
    sizes: [
      { size: 'M', price: '8,00' },
      { size: 'G', price: '12,00' }
    ]
  },
  {
    id: '4',
    name: 'Tradicional',
    category: 'Cappuccinos',
    sizes: [
      { size: 'M', price: '7,50' },
      { size: 'G', price: '11,50' }
    ]
  },
  {
    id: '5',
    name: 'Expresso',
    category: 'Cafés',
    sizes: [
      { size: 'M', price: '4,00' },
      { size: 'G', price: '6,00' }
    ]
  },
  {
    id: '6',
    name: 'Americano',
    category: 'Cafés',
    sizes: [
      { size: 'M', price: '5,00' },
      { size: 'G', price: '7,00' }
    ]
  },
  {
    id: '7',
    name: 'Café com Leite',
    category: 'Cafés',
    sizes: [
      { size: 'M', price: '6,00' },
      { size: 'G', price: '8,00' }
    ]
  },
  {
    id: '8',
    name: 'Macchiato',
    category: 'Cafés',
    sizes: [
      { size: 'M', price: '7,00' },
      { size: 'G', price: '9,00' }
    ]
  },
  {
    id: '9',
    name: 'Sanduíche Natural',
    category: 'Lanches',
    sizes: [
      { size: 'M', price: '12,00' },
      { size: 'G', price: '16,00' }
    ]
  },
  {
    id: '10',
    name: 'Croissant',
    category: 'Lanches',
    sizes: [
      { size: 'M', price: '8,00' },
      { size: 'G', price: '12,00' }
    ]
  },
  {
    id: '11',
    name: 'Misto Quente',
    category: 'Lanches',
    sizes: [
      { size: 'M', price: '10,00' },
      { size: 'G', price: '14,00' }
    ]
  },
  {
    id: '12',
    name: 'Pão na Chapa',
    category: 'Lanches',
    sizes: [
      { size: 'M', price: '6,00' },
      { size: 'G', price: '9,00' }
    ]
  }
];

// Categorias dinâmicas - inicialmente com as padrões
const initialCategories = ['Cappuccinos', 'Cafés', 'Lanches'];

interface ProductsContextType {
  products: Product[];
  categories: string[];
  setProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  moveProduct: (productId: string, newCategory: string) => void;
  addCategory: (category: string) => void;
  updateCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const moveProduct = (productId: string, newCategory: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId ? { ...product, category: newCategory } : product
      )
    );
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const updateCategory = (oldCategory: string, newCategory: string) => {
    // Atualizar nome da categoria
    setCategories(prev => 
      prev.map(cat => cat === oldCategory ? newCategory : cat)
    );
    
    // Atualizar categoria nos produtos
    setProducts(prev =>
      prev.map(product =>
        product.category === oldCategory 
          ? { ...product, category: newCategory }
          : product
      )
    );
  };

  const deleteCategory = (categoryToDelete: string) => {
    // Remover categoria
    setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
    
    // Remover produtos da categoria
    setProducts(prev => prev.filter(product => product.category !== categoryToDelete));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      setProducts,
      setCategories,
      addProduct,
      updateProduct,
      deleteProduct,
      moveProduct,
      addCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}