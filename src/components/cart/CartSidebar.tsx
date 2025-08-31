import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";


interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "cart" | "details";

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { addOrder } = useOrders();
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
  // monte o objeto do pedido com itens do carrinho e total
  addOrder({
    id: Date.now().toString(),
    items: cart,
    status: "aberto", // ou o que você usa
    createdAt: new Date().toISOString(),
    // ... total, cliente, observações, etc.
  });
  clearCart();
  onClose(); // fecha sidebar
  alert("Pedido enviado!");
};

  const [step, setStep] = useState<Step>("cart");
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [errors, setErrors] = useState<{ name?: string; table?: string }>({});

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const goToDetails = () => {
    if (cart.length === 0) return; // não prossegue com carrinho vazio
    setStep("details");
  };

  const goBackToCart = () => {
    setStep("cart");
    setErrors({});
  };

  const validateAndFinish = () => {
  const newErrors: { name?: string; table?: string } = {};
  if (!customerName.trim()) newErrors.name = "Informe como você quer ser chamado(a).";
  if (!tableNumber.trim()) newErrors.table = "Informe o número/identificação da mesa.";
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  // monta items a partir do cart
  const items = cart.map(i => ({
    id: i.product.id,
    name: i.product.name,
    category: i.product.category,
    size: i.size,
    unitPrice: i.price,
    quantity: i.quantity,
    subtotal: i.price * i.quantity,
  }));

  // cria o pedido em memória (id aleatório + datetime definidos no contexto)
  const order = addOrder({
    name: customerName,
    table: tableNumber,
    items,
    total,
  });

  // comportamento pós envio (ajuste como preferir)
  clearCart();
  setStep("cart");
  setCustomerName("");
  setTableNumber("");
  onClose();

  // opcional: feedback
  // console.log("Pedido criado:", order);
};

  // Submissão com Enter no formulário
  const onFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateAndFinish();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer (mobile fullscreen / desktop sidebar) */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-bold">
                {step === "cart" ? "Seu Carrinho" : "Dados do Cliente"}
              </h2>
              <button onClick={onClose} aria-label="Fechar">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4">
              {step === "cart" ? (
                cart.length === 0 ? (
                  <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item, idx) => (
                      <li key={`${item.product.id}-${item.size}-${idx}`} className="flex flex-col border-b pb-3 gap-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-[#0f4c50]">
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-red-500 text-sm"
                          >
                            Remover
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Categoria: {item.product.category}
                        </p>
                        <p className="text-sm">
                          Tamanho: <span className="font-medium">{item.size}</span>
                        </p>
                        <p className="text-sm">
                          Preço unitário: <span className="font-medium">{formatPrice(item.price)}</span>
                        </p>
                        <p className="text-sm">
                          Quantidade: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-sm text-[#0f4c50] font-semibold">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                // STEP: details (form)
                <form className="space-y-4" onKeyDown={onFormKeyDown}>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                      Como você gostaria de ser chamado?
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex.: Maria, João, Sr. Carlos…"
                      className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0f4c50] ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-600">{errors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Qual mesa você está?</label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Ex.: Mesa 7, Balcão, Delivery…"
                      className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0f4c50] ${
                        errors.table ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.table && (
                      <span className="text-xs text-red-600">{errors.table}</span>
                    )}
                  </div>

                  {/* Resumo opcional no form */}
                  <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Total do pedido</span>
                      <span className="font-semibold">{formatPrice(total)}</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-2">
              {step === "cart" ? (
                <>
                  <div className="flex justify-between font-semibold text-lg mb-2">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <button
                    onClick={goToDetails}
                    disabled={cart.length === 0}
                    className="w-full bg-[#0f4c50] hover:bg-[#0d4247] text-white py-2 rounded-lg transition disabled:opacity-50"
                  >
                    Continuar pedido
                  </button>

                 
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
                  >
                    Limpar carrinho
                  </button>
                  
                </>
              ) : (
                <>
                  <button
                    onClick={goBackToCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
                  >
                    Voltar ao carrinho
                  </button>
                  <button
                    onClick={validateAndFinish}
                    className="w-full bg-[#0f4c50] hover:bg-[#0d4247] text-white py-2 rounded-lg transition"
                  >
                    Finalizar pedido
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
