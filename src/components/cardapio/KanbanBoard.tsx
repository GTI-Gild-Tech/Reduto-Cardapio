import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { KanbanColumn, Product } from "./KanbanComponents";
import { useProducts } from "../context/ProductsContext";
import svgPaths from "../../imports/svg-gf3getow1k";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type PriceType = 'Tamanho' | 'Porção' | 'Único';

interface CustomOption {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

function BadgeOption({ 
  children, 
  isSelected, 
  onClick 
}: { 
  children: React.ReactNode; 
  isSelected: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-2.5 relative rounded-[4px] shrink-0 transition-all hover:opacity-80 ${
        isSelected ? 'bg-[#0f4c50]' : 'bg-transparent'
      }`}
    >
      <div aria-hidden="true" className="absolute border border-[#0f4c50] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className={`font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap ${
        isSelected ? 'text-white' : 'text-[#0f4c50]'
      }`}>
        <p className="leading-[1.4] whitespace-pre">{children}</p>
      </div>
    </button>
  );
}

function SizeOption({ 
  size, 
  isSelected, 
  onClick 
}: { 
  size: string; 
  isSelected: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-2.5 relative rounded-[4px] shrink-0 transition-all hover:opacity-80 ${
        isSelected ? 'bg-[#0f4c50]' : 'bg-transparent'
      }`}
    >
      <div aria-hidden="true" className="absolute border border-[#0f4c50] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className={`font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap ${
        isSelected ? 'text-white' : 'text-[#0f4c50]'
      }`}>
        <p className="leading-[1.4] whitespace-pre">Tamanho {size}</p>
      </div>
    </button>
  );
}

function QuantityControl({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (value: number) => void; 
}) {
  return (
    <div className="bg-white box-border content-stretch flex h-[35px] items-center justify-between px-[5px] py-0 relative rounded-[10px] shrink-0 w-20">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="relative shrink-0 size-3.5 hover:opacity-70"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p25ae9580} fill="#0F4C50" stroke="#0F4C50" />
        </svg>
      </button>
      <div className="bg-white h-6 overflow-clip relative shrink-0 w-[22px]">
        <div className="absolute flex flex-col font-['Rethink_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] left-1/2 text-[20px] text-black text-center text-nowrap top-3 translate-x-[-50%] translate-y-[-50%]">
          <p className="leading-[0px] whitespace-pre">{value}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(value + 1)}
        className="relative shrink-0 size-3.5 hover:opacity-70"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p278a8d00} fill="#0F4C50" stroke="#0F4C50" />
        </svg>
      </button>
    </div>
  );
}

function EditProductModal({ product, isOpen, onClose, onSave, categories }: EditProductModalProps & { categories: string[] }) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || 'Cappuccinos',
    description: '',
    priceType: 'Tamanho' as PriceType,
    selectedSizes: ['M', 'G'] as string[],
    sizePrices: { P: '', M: '', G: '' } as Record<string, string>,
    customOptions: [] as CustomOption[],
    uniquePrice: ''
  });

  useEffect(() => {
    if (product) {
      // Convert existing product to new format
      setFormData({
        name: product.name,
        category: product.category,
        description: '',
        priceType: 'Tamanho',
        selectedSizes: product.sizes.map(s => s.size),
        sizePrices: product.sizes.reduce((acc, size) => ({ ...acc, [size.size]: size.price }), {} as Record<string, string>),
        customOptions: [],
        uniquePrice: ''
      });
    } else {
      setFormData({
        name: '',
        category: categories[0] || 'Cappuccinos',
        description: '',
        priceType: 'Tamanho',
        selectedSizes: ['M', 'G'],
        sizePrices: { P: '', M: '', G: '' },
        customOptions: [],
        uniquePrice: ''
      });
    }
  }, [product, isOpen, categories]);

  const handleSave = () => {
    if (!formData.name || !formData.category) return;

    let sizes: { size: string; price: string }[] = [];

    if (formData.priceType === 'Tamanho') {
      sizes = formData.selectedSizes
        .filter(size => formData.sizePrices[size])
        .map(size => ({ size, price: formData.sizePrices[size] }));
    } else if (formData.priceType === 'Porção') {
      sizes = formData.customOptions
        .filter(option => option.price) // Só incluir opções que têm preço definido
        .map(option => ({ 
          size: option.name, 
          price: option.price
        }));
    } else {
      sizes = [{ size: 'Único', price: formData.uniquePrice }];
    }

    if (sizes.length === 0) return;

    onSave({
      ...product!,
      ...formData,
      id: product?.id || Date.now().toString(),
      sizes
    } as Product);
    onClose();
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter(s => s !== size)
        : [...prev.selectedSizes, size]
    }));
  };

  const updateSizePrice = (size: string, price: string) => {
    setFormData(prev => ({
      ...prev,
      sizePrices: { ...prev.sizePrices, [size]: price }
    }));
  };

  const addCustomOption = () => {
    const newOption: CustomOption = {
      id: Date.now().toString(),
      name: `Opção ${formData.customOptions.length + 1}`,
      quantity: 1,
      price: ''
    };
    setFormData(prev => ({
      ...prev,
      customOptions: [...prev.customOptions, newOption]
    }));
  };

  const updateCustomOption = (id: string, field: 'name' | 'quantity' | 'price', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      customOptions: prev.customOptions.map(option =>
        option.id === id ? { ...option, [field]: value } : option
      )
    }));
  };

  const removeCustomOption = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customOptions: prev.customOptions.filter(option => option.id !== id)
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#f9f8f5] !max-w-[1200px] min-h-[700px] w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="font-['Retrokia:Demo',_sans-serif] text-[#0f4c50] text-[24px]">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
          <DialogDescription className="font-['Rethink_Sans:Regular',_sans-serif] text-[#797474] text-[14px]">
            {product ? 'Edite as informações do produto abaixo.' : 'Preencha as informações para criar um novo produto.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="content-stretch flex gap-8 items-start justify-start relative shrink-0 px-6 pb-4">
          {/* Left column - Basic info */}
          <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-[450px]">
            {/* Nome */}
            <div className="relative shrink-0 w-full">
              <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[normal] whitespace-pre">Nome</p>
              </div>
              <div className="h-[44px] relative rounded-[5px] w-full">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full h-full px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                  placeholder="Nome do produto"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="relative shrink-0 w-full">
              <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[normal] whitespace-pre">Categoria</p>
              </div>
              <div className="h-[44px] relative rounded-[5px] w-full">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full h-full px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div className="relative shrink-0 w-full">
              <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[normal] whitespace-pre">Descrição</p>
              </div>
              <div className="h-[44px] relative rounded-[5px] w-full">
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-full px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                  placeholder="Descrição do produto"
                />
              </div>
            </div>

            {/* Adicione imagem do produto */}
            <div className="relative shrink-0 w-full">
              <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[normal] whitespace-pre">Adicione imagem do produto</p>
              </div>
              <div className="h-[100px] relative rounded-[5px] w-full border-2 border-dashed border-[#b5b5b5] flex items-center justify-center bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-[#797474] text-[14px] mb-2">📷</div>
                  <div className="text-[#797474] text-[12px]">Clique para adicionar imagem</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Price options */}
          <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-[500px]">
            {/* Tamanho ou quantidade */}
            <div className="relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full">
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] text-[13px] text-black tracking-[0.52px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal]">Tamanho ou porção</p>
                </div>
                <div className="box-border content-stretch flex gap-3 h-12 items-center justify-start px-0 relative shrink-0 w-full">
                  <BadgeOption 
                    isSelected={formData.priceType === 'Tamanho'} 
                    onClick={() => setFormData(prev => ({ ...prev, priceType: 'Tamanho' }))}
                  >
                    Tamanho
                  </BadgeOption>
                  <BadgeOption 
                    isSelected={formData.priceType === 'Porção'} 
                    onClick={() => setFormData(prev => ({ ...prev, priceType: 'Porção' }))}
                  >
                    Porção
                  </BadgeOption>
                  <BadgeOption 
                    isSelected={formData.priceType === 'Único'} 
                    onClick={() => setFormData(prev => ({ ...prev, priceType: 'Único' }))}
                  >
                    Único
                  </BadgeOption>
                </div>
              </div>
            </div>

            {/* Conditional content based on price type */}
            {formData.priceType === 'Tamanho' && (
              <>
                {/* Selecione as opções */}
                <div className="relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full">
                    <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <p className="leading-[normal] whitespace-pre">Selecione as opções</p>
                    </div>
                    <div className="box-border content-stretch flex gap-3 h-12 items-center justify-start relative shrink-0 w-full">
                      <SizeOption 
                        size="P" 
                        isSelected={formData.selectedSizes.includes('P')} 
                        onClick={() => toggleSize('P')} 
                      />
                      <SizeOption 
                        size="M" 
                        isSelected={formData.selectedSizes.includes('M')} 
                        onClick={() => toggleSize('M')} 
                      />
                      <SizeOption 
                        size="G" 
                        isSelected={formData.selectedSizes.includes('G')} 
                        onClick={() => toggleSize('G')} 
                      />
                    </div>
                  </div>
                </div>

                {/* Valor das opções */}
                <div className="h-auto relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full">
                    <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] text-[13px] text-black tracking-[0.52px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <p className="leading-[normal]">Valor das opções</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                      {formData.selectedSizes.map(size => (
                        <div key={size} className="content-stretch flex gap-4 items-center justify-start relative shrink-0 w-full">
                          <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-3 py-2 relative rounded-[2px] shrink-0 w-[110px]">
                            <div aria-hidden="true" className="absolute border border-[#0f4c50] border-solid inset-0 pointer-events-none rounded-[2px]" />
                            <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#0f4c50] text-[14px] text-nowrap">
                              <p className="leading-[1.4] whitespace-pre">Tamanho {size}</p>
                            </div>
                          </div>
                          <div className="h-[42px] relative rounded-[5px] flex-1">
                            <input
                              type="text"
                              value={formData.sizePrices[size] || ''}
                              onChange={(e) => updateSizePrice(size, e.target.value)}
                              className="w-full h-full px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                              placeholder="0,00"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {formData.priceType === 'Porção' && (
              <>
                {/* Criar opções */}
                <div className="relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full">
                    <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0">
                      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[normal] whitespace-pre">Crie as opções</p>
                      </div>
                      <button
                        onClick={addCustomOption}
                        className="relative shrink-0 size-4 hover:opacity-70 transition-opacity"
                      >
                        <div className="absolute inset-[-20%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                            <path d={svgPaths.p27262900} fill="#0F4C50" stroke="#0F4C50" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center relative shrink-0 w-full">
                      {formData.customOptions.map(option => (
                        <div key={option.id} className="box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-3 relative rounded-[2px] shrink-0 w-full">
                          <div aria-hidden="true" className="absolute border border-[#0f4c50] border-solid inset-0 pointer-events-none rounded-[2px]" />
                          
                          {/* Primeira linha: Nome e controle de quantidade */}
                          <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0 w-full">
                            <input
                              type="text"
                              value={option.name}
                              onChange={(e) => updateCustomOption(option.id, 'name', e.target.value)}
                              className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] bg-transparent border-none outline-none text-[#0f4c50] text-[14px] flex-1"
                              placeholder="Nome da opção"
                            />
                            <QuantityControl
                              value={option.quantity}
                              onChange={(value) => updateCustomOption(option.id, 'quantity', value)}
                            />
                            <button
                              onClick={() => removeCustomOption(option.id)}
                              className="ml-2 text-red-500 hover:text-red-700 text-[14px] transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          
                          {/* Segunda linha: Campo de valor */}
                          <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0 w-full">
                            <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-3 py-1.5 relative rounded-[2px] shrink-0 bg-[#f0f0f0]">
                              <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#797474] text-[12px] text-nowrap">
                                <p className="leading-[1.2] whitespace-pre">Valor:</p>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={option.price}
                              onChange={(e) => updateCustomOption(option.id, 'price', e.target.value)}
                              className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] bg-transparent border border-[#d9d9d9] rounded-[4px] px-3 py-1.5 outline-none text-[#0f4c50] text-[14px] flex-1"
                              placeholder="0,00"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {formData.priceType === 'Único' && (
              <div className="h-auto relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full">
                  <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] text-[13px] text-black tracking-[0.52px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[normal]">Preço único</p>
                  </div>
                  <div className="h-[44px] relative rounded-[5px] w-full">
                    <input
                      type="text"
                      value={formData.uniquePrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, uniquePrice: e.target.value }))}
                      className="w-full h-full px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                      placeholder="0,00"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Button */}
        <div className="flex justify-center pt-8 pb-4 px-6">
          <button
            onClick={handleSave}
            className="bg-[#0f4c50] box-border content-stretch flex gap-2.5 items-center justify-center px-[60px] py-5 relative rounded-[50px] shrink-0 hover:bg-[#0d4247] transition-colors min-w-[280px]"
          >
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[0.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-none whitespace-pre">Finalizar cadastro</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function KanbanBoard() {
  const { 
    products, 
    categories, 
    addProduct,
    updateProduct,
    deleteProduct,
    moveProduct,
    addCategory,
    updateCategory,
    deleteCategory
  } = useProducts();
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');

  // Garantir que todas as categorias sejam sempre visíveis
  useEffect(() => {
    // Este efeito garante que quando as categorias mudarem, 
    // o componente será re-renderizado com todas as categorias visíveis
  }, [categories]);

  const handleMoveProduct = (productId: string, newCategory: string) => {
    moveProduct(productId, newCategory);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // If it's a new product (no existing ID), add it to the list
    if (!products.find(p => p.id === updatedProduct.id)) {
      addProduct(updatedProduct);
    } else {
      // Otherwise, update the existing product
      updateProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(productId);
    }
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsEditModalOpen(true);
  };

  const handleAddNewCategory = () => {
    setNewCategoryName('');
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) return;
    
    // Verificar se a categoria já existe
    if (categories.includes(newCategoryName.trim())) {
      alert('Esta categoria já existe!');
      return;
    }
    
    // Adicionar nova categoria
    addCategory(newCategoryName.trim());
    
    setIsCategoryModalOpen(false);
    setNewCategoryName('');
  };

  const handleCancelCategory = () => {
    setIsCategoryModalOpen(false);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    const productsInCategory = products.filter(p => p.category === categoryToDelete);
    
    if (productsInCategory.length > 0) {
      alert('Não é possível excluir uma categoria que possui produtos. Mova ou exclua os produtos primeiro.');
      return;
    }
    
    if (categories.length <= 1) {
      alert('Não é possível excluir a última categoria.');
      return;
    }
    
    if (confirm(`Tem certeza que deseja excluir a categoria "${categoryToDelete}"?`)) {
      deleteCategory(categoryToDelete);
    }
  };

  const handleEditCategory = (categoryToEdit: string) => {
    setEditingCategory(categoryToEdit);
    setNewCategoryName(categoryToEdit);
    setIsEditCategoryModalOpen(true);
  };

  const handleSaveEditCategory = () => {
    const newName = newCategoryName.trim();
    
    if (!newName) return;
    
    if (newName === editingCategory) {
      setIsEditCategoryModalOpen(false);
      setEditingCategory('');
      setNewCategoryName('');
      return;
    }
    
    if (categories.includes(newName)) {
      alert('Esta categoria já existe!');
      return;
    }
    
    updateCategory(editingCategory, newName);
    
    setIsEditCategoryModalOpen(false);
    setEditingCategory('');
    setNewCategoryName('');
  };

  const handleCancelEditCategory = () => {
    setIsEditCategoryModalOpen(false);
    setEditingCategory('');
    setNewCategoryName('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="basis-0 box-border content-stretch flex flex-col gap-[25px] grow items-center justify-start min-h-px min-w-px px-8 py-0 relative shrink-0 w-full">
        {/* Header */}
        <div className="content-stretch flex gap-[15px] items-start justify-start relative shrink-0">
          <button
            onClick={handleAddNewProduct}
            className="bg-[#0f4c50] box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-[50px] shrink-0 hover:bg-[#0d4247] transition-colors"
          >
            <svg className="relative shrink-0 size-4" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2b62ea40} fill="#FFFFFF" stroke="#FFFFFF" />
            </svg>
            <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[0.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-none whitespace-pre">Novo produto</p>
            </div>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#0f4c50] box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-[50px] shrink-0 hover:bg-[#0d4247] transition-colors">
                <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[0.2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-none whitespace-pre">Nova categoria</p>
                </div>
                <ChevronDown className="size-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleAddNewCategory}>
                Adicionar nova categoria
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Kanban Columns */}
        <div className="content-stretch flex gap-6 items-start justify-start relative shrink-0 w-full overflow-x-auto">
          {categories.map((category) => {
            const categoryProducts = products.filter(p => p.category === category);
            const canDeleteCategory = categories.length > 1 && categoryProducts.length === 0;
            
            return (
              <KanbanColumn
                key={category}
                title={category}
                category={category}
                products={categoryProducts}
                onMove={handleMoveProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onDeleteCategory={canDeleteCategory ? handleDeleteCategory : undefined}
                onEditCategory={handleEditCategory}
                canDeleteCategory={canDeleteCategory}
              />
            );
          })}
        </div>

        {/* Edit Product Modal */}
        <EditProductModal
          product={editingProduct}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProduct}
          categories={categories}
        />

        {/* Category Modal */}
        <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
          <DialogContent className="bg-[#f9f8f5] max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-['Retrokia:Demo',_sans-serif] text-[#0f4c50] text-[24px]">
                Nova Categoria
              </DialogTitle>
              <DialogDescription className="font-['Rethink_Sans:Regular',_sans-serif] text-[#797474] text-[14px]">
                Digite o nome da nova categoria.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col gap-4 py-4">
              <div className="relative">
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal]">Nome da categoria</p>
                </div>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                  placeholder="Ex: Sobremesas"
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={handleCancelCategory}
                  className="px-6 py-2 border border-[#0f4c50] text-[#0f4c50] rounded-[50px] hover:bg-[#0f4c50] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCategory}
                  className="px-6 py-2 bg-[#0f4c50] text-white rounded-[50px] hover:bg-[#0d4247] transition-colors"
                >
                  Criar categoria
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Category Modal */}
        <Dialog open={isEditCategoryModalOpen} onOpenChange={setIsEditCategoryModalOpen}>
          <DialogContent className="bg-[#f9f8f5] max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-['Retrokia:Demo',_sans-serif] text-[#0f4c50] text-[24px]">
                Editar Categoria
              </DialogTitle>
              <DialogDescription className="font-['Rethink_Sans:Regular',_sans-serif] text-[#797474] text-[14px]">
                Edite o nome da categoria "{editingCategory}".
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col gap-4 py-4">
              <div className="relative">
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] mb-2 text-[13px] text-black tracking-[0.52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[normal]">Nome da categoria</p>
                </div>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#b5b5b5] rounded-[5px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] text-[14px] font-['Open_Sans:Regular',_sans-serif]"
                  placeholder="Nome da categoria"
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={handleCancelEditCategory}
                  className="px-6 py-2 border border-[#0f4c50] text-[#0f4c50] rounded-[50px] hover:bg-[#0f4c50] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEditCategory}
                  className="px-6 py-2 bg-[#0f4c50] text-white rounded-[50px] hover:bg-[#0d4247] transition-colors"
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}