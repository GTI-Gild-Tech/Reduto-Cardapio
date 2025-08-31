// src/components/modals/OrderModal.tsx
import React from "react";
import { X } from "lucide-react";
import type { Order } from "../context/OrdersContext";

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const formatPrice = (value: number | undefined | null) =>
  (Number.isFinite(value as number) ? (value as number) : 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function OrderModal({ order, onClose }: OrderModalProps) {
  if (!order) return null;

  // Garante compatibilidade com itens vindos do carrinho ou de seeds antigos
  const itemsSafe = (order.items ?? []).map((it) => {
    const qty = it.quantity ?? 1;
    const unit = (it as any).unitPrice ?? (it as any).price ?? 0;
    const sub = (it as any).total ?? (it as any).subtotal ?? unit * qty;
    return {
      name: it.name ?? "Item",
      size: it.size ?? "",
      quantity: qty,
      unitPrice: unit,
      subtotal: sub,
      category: (it as any).category,
    };
  });

  const totalSafe =
    (order as any).total ??
    itemsSafe.reduce((acc, it) => acc + (Number(it.subtotal) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      {/* card */}
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#0f4c50]">Pedido {order.orderNumber}</h3>
            <p className="text-sm text-gray-600">
              {order.datetime}  Mesa: <span className="font-medium">{order.table}</span> • Cliente: <span className="font-medium">{order.name}</span>
            </p>
            {order.finalizado && (
              <p className="mt-1 inline-block text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Finalizado
              </p>
            )}
          </div>
          <button onClick={onClose} aria-label="Fechar">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* itens */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-[#c1a07b] text-white text-sm font-semibold">
            <div className="col-span-6 px-3 py-2">Item</div>
            <div className="col-span-2 px-3 py-2 text-right">Qtd</div>
            <div className="col-span-2 px-3 py-2 text-right">Unit.</div>
            <div className="col-span-2 px-3 py-2 text-right">Subtotal</div>
          </div>
          {itemsSafe.map((it, idx) => (
            <div key={idx} className="grid grid-cols-12 border-t text-sm">
              <div className="col-span-6 px-3 py-2">
                <div className="font-medium text-[#0f4c50]">{it.name}</div>
                <div className="text-xs text-gray-500 space-x-2">
                  {it.size && <span>Tam: {it.size}</span>}
                  {it.category && <span>Cat: {it.category}</span>}
                </div>
              </div>
              <div className="col-span-2 px-3 py-2 text-right">{it.quantity}</div>
              <div className="col-span-2 px-3 py-2 text-right">{formatPrice(it.unitPrice)}</div>
              <div className="col-span-2 px-3 py-2 text-right">{formatPrice(it.subtotal)}</div>
            </div>
          ))}
          {itemsSafe.length === 0 && (
            <div className="px-3 py-6 text-center text-gray-500">
              Nenhum item neste pedido.
            </div>
          )}
        </div>

        {/* total */}
        <div className="mt-4 flex justify-end">
          <div className="text-right">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-[#0f4c50]">
              {formatPrice(totalSafe)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
