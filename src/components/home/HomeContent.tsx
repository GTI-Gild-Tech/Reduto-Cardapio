import { useState } from "react";
import { Product } from "../cardapio/KanbanComponents";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useProducts } from "../context/ProductsContext";

interface MenuProductCardProps {
  product: Product;
}

function MenuProductCard({ product }: MenuProductCardProps) {
  const formatPrices = () => {
    return product.sizes.map(size => `${size.size} - R${size.price}`).join(' | ');
  };

  // Selecionar imagem baseada na categoria
  const getProductImage = () => {
    switch (product.category) {
      case 'Cappuccinos':
        return "https://images.unsplash.com/photo-1658646479124-bc31e6849497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYXBwdWNjaW5vfGVufDF8fHx8MTc1NjQ4NDkxOHww&ixlib=rb-4.1.0&q=80&w=320&h=180&fit=crop";
      case 'Cafés':
        return "https://images.unsplash.com/photo-1612509590595-785e974ed690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZXxlbnwxfHx8fDE3NTY0ODQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=320&h=180&fit=crop";
      case 'Lanches':
        return "https://images.unsplash.com/photo-1673534409216-91c3175b9b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzU2NDg0OTI1fDA&ixlib=rb-4.1.0&q=80&w=320&h=180&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=320&h=180&fit=crop";
    }
  };

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-4 items-start justify-start p-6 relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[320px] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] transition-all duration-200">
      <div aria-hidden="true" className="absolute border border-[#e4ddcd] border-solid inset-0 pointer-events-none rounded-[12px]" />
      
      {/* Imagem do produto */}
      <div className="w-full h-[180px] relative rounded-[8px] bg-[#f5f5f5] overflow-hidden">
        <ImageWithFallback
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nome do produto */}
      <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full">
        <div className="font-['Rethink_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#0f4c50] text-[20px] text-nowrap">
          <p className="leading-[1.5] whitespace-pre">{product.name}</p>
        </div>
      </div>

      {/* Preços */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#2f1b04] text-[14px] flex-1">
          <p className="leading-[1.4]">{formatPrices()}</p>
        </div>
      </div>

      {/* Botão de pedido */}
      <button className="bg-[#0f4c50] box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-[8px] shrink-0 w-full hover:bg-[#0d4247] transition-colors">
        <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-none whitespace-pre">Fazer Pedido</p>
        </div>
      </button>
    </div>
  );
}

interface MenuCategoryProps {
  title: string;
  products: Product[];
}

function MenuCategory({ title, products }: MenuCategoryProps) {
  return (
    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
      {/* Título da categoria */}
      <div className="font-[Retrokia] font-bold leading-[0] relative shrink-0 text-[#0f4c50] text-[32px]">
        <p className="leading-[1.2]">{title}</p>
      </div>
      
      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <MenuProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function HomeContent() {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  
  // Agrupar produtos por categoria
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category);
    return acc;
  }, {} as Record<string, Product[]>);

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-8 grow items-center justify-start min-h-px min-w-px px-8 py-[50px] relative shrink-0 w-full">
      {/* Título principal */}
      <div className="font-['Retrokia:Demo',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0f4c50] text-[48px] text-center tracking-[-1.28px]">
        <p className="leading-[1.3] whitespace-pre font-[Retrokia]">
          Nosso Cardapio
        </p>
      </div>

      {/* Subtítulo */}
      <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#797474] text-[18px] text-center max-w-[600px]">
        <p className="leading-[1.5]">
          Descubra nossos sabores únicos e faça seu pedido. Cada produto é preparado com ingredientes selecionados para proporcionar a melhor experiência.
        </p>
      </div>

      {/* Filtros de categoria */}
      <div className="content-stretch flex gap-4 items-center justify-center relative shrink-0 flex-wrap">
        <button
          onClick={() => setSelectedCategory('todos')}
          className={`box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-[25px] shrink-0 transition-all hover:opacity-80 ${
            selectedCategory === 'todos' ? 'bg-[#0f4c50] text-white' : 'bg-transparent border border-[#0f4c50] text-[#0f4c50]'
          }`}
        >
          <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap">
            <p className="leading-[1.4] whitespace-pre">Todos</p>
          </div>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-[25px] shrink-0 transition-all hover:opacity-80 ${
              selectedCategory === category ? 'bg-[#0f4c50] text-white' : 'bg-transparent border border-[#0f4c50] text-[#0f4c50]'
            }`}
          >
            <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap">
              <p className="leading-[1.4] whitespace-pre">{category}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Conteúdo do cardápio */}
      <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full max-w-[1400px]">
        {selectedCategory === 'todos' ? (
          // Mostrar todas as categorias
          categories.map((category) => (
            <MenuCategory
              key={category}
              title={category}
              products={groupedProducts[category]}
            />
          ))
        ) : (
          // Mostrar apenas a categoria selecionada
          <MenuCategory
            title={selectedCategory}
            products={filteredProducts}
          />
        )}
      </div>
    </div>
  );
};

export default HomeContent;