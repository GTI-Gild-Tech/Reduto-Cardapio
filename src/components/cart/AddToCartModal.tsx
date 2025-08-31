import { useState } from "react";
import { Product } from "../cardapio/KanbanComponents";
import { useCart } from "../context/CartContext";

interface AddToCartModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
  const sizeObj = product.sizes.find((s) => s.size === selectedSize);
  if (!sizeObj) return;

  // Substitui vírgula por ponto e converte corretamente
  const price = parseFloat(sizeObj.price.replace(",", "."));

  addToCart(product, sizeObj.size, price, quantity);
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        {/* Descrição */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        )}
        {/* Escolha de tamanho */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Escolha o tamanho:</p>
          <div className="space-y-2">
            {product.sizes.map((s) => (
              <label key={s.size} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="size"
                  value={s.size}
                  checked={selectedSize === s.size}
                  onChange={() => setSelectedSize(s.size)}
                />
                <span>
                  {s.size} - R$ {s.price}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Quantidade */}
        <div className="mb-4 flex items-center gap-4">
          <p className="font-semibold">Quantidade:</p>
          <div className="flex items-center border rounded-lg">
            <button
              className="px-3 py-1"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="px-4 py-2 bg-[#0f4c50] text-white rounded-lg disabled:opacity-50"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
