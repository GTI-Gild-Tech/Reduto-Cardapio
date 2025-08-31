import React from "react";
import { type Order } from "../context/OrdersContext";

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function OrderModal({ order, onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Pedido {order.id}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Fechar</button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div><span className="font-semibold">Nome:</span> {order.name}</div>
          <div><span className="font-semibold">Mesa:</span> {order.table}</div>
          <div><span className="font-semibold">Data/Hora:</span> {order.datetime}</div>
          <div><span className="font-semibold">Status:</span> {order.finalizado ? "Fechado" : "Aberto"}</div>
        </div>

        {/* Itens */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-50 text-xs font-semibold px-3 py-2">
            <div className="col-span-2">Produto</div>
            <div>Tam.</div>
            <div>Qtd</div>
            <div>Unit.</div>
            <div>Subtotal</div>
          </div>

          {order.items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-6 text-sm px-3 py-2 border-t">
              <div className="col-span-2">
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-gray-500">Categoria: {it.category}</div>
              </div>
              <div>{it.size}</div>
              <div>{it.quantity}</div>
              <div>{formatPrice(it.unitPrice)}</div>
              <div className="font-medium">{formatPrice(it.subtotal)}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 text-lg font-semibold">
          Total: {formatPrice(order.total)}
        </div>
      </div>
    </div>
  );
}
