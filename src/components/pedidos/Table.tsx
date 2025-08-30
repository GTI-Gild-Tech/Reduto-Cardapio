import { useState } from "react";
import { ActionButton } from "../shared/ActionButton";
import { OrderModal } from "../modals/OrderModal";

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

export interface Order {
  id: string;
  table: string;
  name: string;
  datetime: string;
}

interface TableProps {
  searchTerm: string;
  startDate: string;
  endDate: string;
  orders: Order[];
}

export function Table({
  searchTerm,
  startDate,
  endDate,
  orders,
}: TableProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
  };

  const handleFinishOrder = (orderId: string) => {
    alert(`Pedido ${orderId} finalizado!`);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Filter orders based on search criteria
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.table
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDateRange = () => {
      if (!startDate && !endDate) return true;

      // Simple date matching - in a real app you'd want proper date parsing
      const orderDate = order.datetime.split(" ")[0]; // Get date part

      if (startDate && endDate) {
        return orderDate >= startDate && orderDate <= endDate;
      } else if (startDate) {
        return orderDate >= startDate;
      } else if (endDate) {
        return orderDate <= endDate;
      }
      return true;
    };

    return matchesSearch && matchesDateRange();
  });

  return (
    <>
      <div
        className="bg-[rgba(255,255,255,0.3)] content-stretch flex flex-col items-start justify-start relative shrink-0 w-[912px]"
        data-name="Table"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#b9b9b9] border-solid inset-0 pointer-events-none"
        />

        {/* Header Row */}
        <div
          className="bg-[#c1a07b] content-stretch flex items-start justify-start overflow-clip relative shrink-0 w-full"
          data-name="Table/Row"
        >
          <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>ID</TableHeaderCell>
          </div>
          <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Mesa</TableHeaderCell>
          </div>
          <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Nome</TableHeaderCell>
          </div>
          <div className="basis-0 bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px relative self-stretch shrink-0">
            <TableHeaderCell>Data/Horário</TableHeaderCell>
          </div>
          <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 items-start justify-start relative self-stretch shrink-0 w-[145px]">
            <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
              <div
                aria-hidden="true"
                className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none"
              />
              <div className="h-8 relative shrink-0 w-full">
                <div className="relative size-full">
                  <TableHeaderCell>Pedido</TableHeaderCell>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-2.5 items-start justify-start relative self-stretch shrink-0 w-[145px]">
            <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full">
              <div
                aria-hidden="true"
                className="absolute border-[#b9b9b9] border-[1px_0px_0px_1px] border-solid inset-0 pointer-events-none"
              />
              <div className="h-8 relative shrink-0 w-full">
                <div className="relative size-full">
                 <TableHeaderCell>Status</TableHeaderCell>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="content-stretch flex items-start justify-start overflow-clip relative shrink-0 w-full"
            data-name="Table/Row"
          >
            <TableDataCell>
              <div className="font-['Fira_Code:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[12px] tracking-[-0.72px] w-full">
                <p className="leading-[1.5]">{order.id}</p>
              </div>
            </TableDataCell>
            <TableDataCell>
              <div className="font-['Fira_Code:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[12px] tracking-[-0.72px] w-full">
                <p className="leading-[1.5]">{order.table}</p>
              </div>
            </TableDataCell>
            <TableDataCell>
              <div className="font-['Fira_Code:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[12px] tracking-[-0.72px] w-full">
                <p className="leading-[1.5]">{order.name}</p>
              </div>
            </TableDataCell>
            <TableDataCell>
              <div className="font-['Fira_Code:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#000000] text-[12px] tracking-[-0.72px] w-full">
                <p className="leading-[1.5]">
                  {order.datetime}
                </p>
              </div>
            </TableDataCell>
            <TableDataCell width="w-[145px]">
              <ActionButton
                variant="outline"
                onClick={() => handleViewOrder(order)}
              >
                Ver pedido
              </ActionButton>
            </TableDataCell>
            <TableDataCell width="w-[145px]">
              <ActionButton
                variant="filled"
                isToggle={true}
                initialText="Aberto"
                toggledText="Fechado"
                onClick={() => handleFinishOrder(order.id)}
              />
            </TableDataCell>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}