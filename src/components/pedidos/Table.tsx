import { useState } from "react";
import { ActionButton } from "../shared/ActionButton";
import { OrderModal } from "../modals/OrderModal";
import { useOrders, type Order } from "../context/OrdersContext"

interface TableHeaderCellProps {
  children: React.ReactNode;
}

function TableHeaderCell({ children }: TableHeaderCellProps) {
  return (
    <div
      className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full"
      data-name="Table/Cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none"
      />
      <div
        className="relative shrink-0 w-full"
        data-name="Content"
      >
        <div className="overflow-clip relative size-full">
          <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-2 py-[7px] relative w-full">
            <div className="font-['Rethink_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#ffffff] text-[15px] tracking-[-0.3px] w-full">
              <p className="leading-[1.5]">{children}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableDataCellProps {
  children: React.ReactNode;
  width?: string;
}

function TableDataCell({ children, width }: TableDataCellProps) {
  return (
    <div
      className={`bg-[rgba(255,255,255,0)] border-[1px] border-slate-900/10 content-stretch flex flex-col items-start justify-start relative self-stretch shrink-0 ${width || "basis-0 grow min-h-px min-w-px"}`}
      data-name="Table/Cell"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none"
      />
      <div
        className="relative shrink-0 w-full"
        data-name="Content"
      >
        <div className="overflow-clip relative size-full">
          <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-2 py-[7px] relative w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableProps {
  searchTerm: string;
  startDate: string;
  endDate: string;
  orders: Order[];
}

export function Table({ searchTerm, startDate, endDate, orders }: TableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toggleFinalizado } = useOrders(); // <<—

  const handleViewOrder = (order: Order) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);

  const [confirmOrder, setConfirmOrder] = useState<Order | null>(null);
  const handleStatusClick = (order: Order) => {
  if (order.finalizado) {
    setConfirmOrder(order); // pedir confirmação para reabrir
    return;
  }
  toggleFinalizado(order.id); // aberto -> finaliza direto
  };
  const confirmReopen = () => {
  if (confirmOrder) toggleFinalizado(confirmOrder.id);
  setConfirmOrder(null);
};

const cancelReopen = () => setConfirmOrder(null);

  // FILTRO (mantive sua lógica simples)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.table.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange = () => {
      if (!startDate && !endDate) return true;
      const orderDateStr = order.datetime.split(" ")[0]; // "dd/MM/yyyy"
      // comparação ingênua; mantendo sua regra atual
      if (startDate && endDate) {
        return orderDateStr >= startDate && orderDateStr <= endDate;
      } else if (startDate) {
        return orderDateStr >= startDate;
      } else if (endDate) {
        return orderDateStr <= endDate;
      }
      return true;
    };

    return matchesSearch && matchesDateRange();
  });

  return (
    <>
      <div className="bg-[rgba(255,255,255,0.3)] content-stretch flex flex-col items-start justify-start relative shrink-0 w-[912px]" data-name="Table">
        <div aria-hidden className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none" />
        {/* Header */}
        <div className="bg-[#c1a07b] content-stretch flex items-start justify-start overflow-clip relative shrink-0 w-full" data-name="Table/Row">
          <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>ID</TableHeaderCell>
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Mesa</TableHeaderCell>
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Nome</TableHeaderCell>
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Data/Horário</TableHeaderCell>
          </div>
          <div className="content-stretch flex flex-col gap-2.5 items-start justify-start relative self-stretch shrink-0 w-[145px]">
            <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
              <div aria-hidden className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="h-8 relative shrink-0 w-full">
                <div className="relative size-full"><TableHeaderCell>Pedido</TableHeaderCell></div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-2.5 items-start justify-start relative self-stretch shrink-0 w-[145px]">
            <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
              <div aria-hidden className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="h-8 relative shrink-0 w-full">
                <div className="relative size-full"><TableHeaderCell>Status</TableHeaderCell></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        {filteredOrders.map((order, index) => (
          <div key={index} className="content-stretch flex items-start justify-start overflow-clip relative shrink-0 w-full" data-name="Table/Row">
            <TableDataCell><p className="font-['Fira_Code:Regular'] text-[12px]">{order.id}</p></TableDataCell>
            <TableDataCell><p className="font-['Fira_Code:Regular'] text-[12px]">{order.table}</p></TableDataCell>
            <TableDataCell><p className="font-['Fira_Code:Regular'] text-[12px]">{order.name}</p></TableDataCell>
            <TableDataCell><p className="font-['Fira_Code:Regular'] text-[12px]">{order.datetime}</p></TableDataCell>
            <TableDataCell width="w-[145px]">
              <ActionButton variant="outline" onClick={() => handleViewOrder(order)}>
                Ver pedido
              </ActionButton>
            </TableDataCell>
            <TableDataCell width="w-[145px]">
              <div
                className={
                  order.finalizado
                    ? "opacity-40 cursor-pointer" // finalizado = mais clarinho
                    : "opacity-100"               // aberto = normal
                }
              >
                <ActionButton
                  variant="filled"
                  onClick={() => handleStatusClick(order)}
                >
                  {order.finalizado ? "Finalizado" : "Aberto"}
                </ActionButton>
              </div>
            </TableDataCell>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={handleCloseModal} />
            )}
            {confirmOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={cancelReopen} />
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-bold text-[#0f4c50] mb-2">Reabrir pedido?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Você deseja reabrir o pedido <span className="font-semibold">{confirmOrder.id}</span>?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelReopen}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReopen}
                className="px-4 py-2 rounded-md bg-[#0f4c50] hover:bg-[#0d4247] text-white"
              >
                Reabrir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}