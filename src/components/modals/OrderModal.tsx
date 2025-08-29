import { useState } from "react";
import svgModalPaths from "../../imports/svg-2mmpuj4g7j";
import svgPaths from "../../imports/svg-6hqazlixmp";

interface CloseButtonProps {
  onClick: () => void;
}

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <div
      className="absolute left-[835px] size-10 top-[19px] cursor-pointer hover:opacity-80 transition-opacity z-10"
      data-name="Close"
      onClick={onClick}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
      >
        <g>
          <path
            d={svgModalPaths.p26348400}
            fill="var(--fill-0, #5E6472)"
          />
        </g>
      </svg>
    </div>
  );
}

function OrderModalHeader({ order }: { order: any }) {
  return (
    <div className="absolute content-center flex flex-wrap font-['Fira_Code:Regular',_sans-serif] font-normal gap-4 items-center justify-start leading-[0] left-px text-[#2f1b04] top-0 w-[782px]">
      <div className="flex flex-col justify-end relative shrink-0 text-[36px] tracking-[-2.16px] w-full mb-2">
        <p className="leading-[1.4]">Pedido {order.id}</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[22px] text-nowrap tracking-[-1.32px]">
        <p className="leading-[1.4] whitespace-pre">
          Mesa: {order.table} |
        </p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[22px] text-nowrap tracking-[-1.32px]">
        <p className="leading-[1.4] whitespace-pre">
          Nome: {order.name} |
        </p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[22px] text-nowrap tracking-[-1.32px]">
        <p className="leading-[1.4] whitespace-pre">
          {order.datetime}
        </p>
      </div>
    </div>
  );
}

function OrderItem({ item }: { item: any }) {
  return (
    <div className="h-[55px] relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-8 h-[55px] items-center justify-start px-6 py-0 relative w-full">
          <div className="box-border content-stretch flex font-['Rethink_Sans:SemiBold',_sans-serif] font-semibold gap-3 h-[95px] items-center justify-start leading-[0] px-0 py-1 relative shrink-0 text-[24px] text-nowrap min-w-0">
            <div className="relative shrink-0 text-[#0f4c50]">
              <p className="leading-[1.2] text-nowrap whitespace-pre">
                {item.name}
              </p>
            </div>
            <div className="relative shrink-0 text-[#000000]">
              <p className="leading-[1.2] text-nowrap whitespace-pre">
                {item.variant}
              </p>
            </div>
          </div>
          <div className="content-center flex flex-wrap gap-2.5 items-center justify-start relative shrink-0 min-w-[120px]">
            <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#797474] text-[18px] text-nowrap">
              <p className="leading-[1.3] text-nowrap whitespace-pre">
                Tamanho: {item.size}
              </p>
            </div>
          </div>
          <div className="content-center flex flex-col items-start justify-center relative shrink-0 min-w-[140px]">
            <div className="font-['Rethink_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#797474] text-[18px] text-nowrap">
              <p className="leading-[1.3] text-nowrap whitespace-pre">
                Quantidade: {item.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalPaginationArrow({
  direction,
  disabled = false,
}: {
  direction: "left" | "right";
  disabled?: boolean;
}) {
  const isLeft = direction === "left";
  const pathKey = isLeft ? "p1ca2d600" : "p4172e00";

  return (
    <div
      className={`h-4 relative ${isLeft ? "w-2" : "size-4"} ${disabled ? "opacity-50" : "cursor-pointer hover:opacity-80"}`}
    >
      <div
        className={`absolute bottom-0 left-0 ${isLeft ? "right-[-6.25%]" : "right-[-3.13%]"} top-0`}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox={isLeft ? "0 0 9 16" : "0 0 17 16"}
        >
          <g>
            <path
              d={svgPaths[pathKey]}
              fill="var(--fill-0, #A9A9A9)"
              fillOpacity="0.73"
            />
            {!isLeft && (
              <path
                d={svgPaths.p18f8fd40}
                fill="var(--fill-0, #A9A9A9)"
                fillOpacity="0.73"
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}

function ModalPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  return (
    <div className="content-stretch flex gap-[25px] items-center justify-center relative shrink-0 w-[377px]">
      <div className="content-stretch flex gap-[15px] items-center justify-start relative shrink-0">
        <ModalPaginationArrow
          direction="right"
          disabled={currentPage === 1}
        />
        <ModalPaginationArrow
          direction="left"
          disabled={currentPage === 1}
        />
      </div>

      <div
        className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
        data-name="1"
      >
        <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 28 28"
          >
            <circle
              cx="14"
              cy="14"
              fill="var(--fill-0, #0F4C50)"
              r="14"
            />
          </svg>
        </div>
        <div className="[grid-area:1_/_1] box-border content-stretch flex font-['Lato:SemiBold',_sans-serif] gap-6 items-start justify-start ml-[7px] mt-[7px] not-italic relative text-[12px] text-center">
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <div
              key={page}
              className={`flex flex-col h-[13px] justify-end relative shrink-0 w-3.5 cursor-pointer ${
                page === currentPage
                  ? "text-[#fbfbfb]"
                  : "text-[#0f4c50] hover:text-[#0a3c3f]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              <p className="leading-[normal]">{page}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-stretch flex gap-[15px] h-4 items-center justify-start relative shrink-0 w-[39px]">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <ModalPaginationArrow
              direction="left"
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <ModalPaginationArrow
              direction="right"
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data for order items
const mockOrderItems = {
  "#232": [
    {
      name: "Cappuccino",
      variant: "Avelã",
      size: "M",
      quantity: 1,
    },
    {
      name: "Croissant",
      variant: "Chocolate",
      size: "Único",
      quantity: 2,
    },
    {
      name: "Latte",
      variant: "Baunilha",
      size: "G",
      quantity: 1,
    },
    {
      name: "Muffin",
      variant: "Blueberry",
      size: "Único",
      quantity: 3,
    },
    {
      name: "Americano",
      variant: "Tradicional",
      size: "M",
      quantity: 1,
    },
  ],
  "#233": [
    {
      name: "Espresso",
      variant: "Duplo",
      size: "P",
      quantity: 2,
    },
    {
      name: "Pão de Açúcar",
      variant: "Doce",
      size: "Único",
      quantity: 1,
    },
    {
      name: "Mocha",
      variant: "Chocolate Branco",
      size: "G",
      quantity: 1,
    },
  ],
  "#234": [
    {
      name: "Cappuccino",
      variant: "Tradicional",
      size: "M",
      quantity: 1,
    },
    {
      name: "Sanduíche",
      variant: "Presunto e Queijo",
      size: "Único",
      quantity: 1,
    },
  ],
};

interface OrderModalProps {
  order: any;
  onClose: () => void;
}

export function OrderModal({
  order,
  onClose,
}: OrderModalProps) {
  const items =
    mockOrderItems[order.id as keyof typeof mockOrderItems] ||
    [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute bg-[rgba(0,0,0,0.18)] inset-0 cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#ffffff] h-[586px] rounded-[10px] w-[900px] animate-in fade-in duration-300 zoom-in-95">
        <CloseButton onClick={onClose} />

        <div
          className="absolute box-border content-stretch flex flex-col h-[544px] items-center justify-between px-0 py-[25px] translate-x-[-50%] translate-y-[-50%] w-[784px]"
          style={{
            top: "calc(50% + 8px)",
            left: "calc(50% - 4px)",
          }}
        >
          <div className="h-[424px] relative shrink-0 w-[784px]">
            <OrderModalHeader order={order} />

            <div className="absolute content-stretch flex flex-col gap-4 items-start justify-center left-0 top-[113px] w-[784px]">
              {items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </div>
          </div>

          <ModalPagination />
        </div>
      </div>
    </div>
  );
}