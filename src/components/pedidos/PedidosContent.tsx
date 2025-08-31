import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { Table } from "./Table";
import searchSvgPaths from "../../imports/svg-jrmubkrrio";
import { useOrders } from "../context/OrdersContext";

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-4" data-name="search">
      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
        <g id="search">
          <path d={searchSvgPaths.p24e77f00} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

export function PedidosContent() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { orders } = useOrders();       // <<— pedidos reais
  const [searchTerm, setSearchTerm] = useState("");

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[25px] grow items-center justify-start px-0 py-[50px] relative shrink-0 w-screen">
      <div className="font-['Retrokia:Demo',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0f4c50] text-[64px] text-nowrap tracking-[-1.28px]">
        <p className="leading-[1.5] whitespace-pre font-[Retrokia]">Pedidos</p>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        clearFilters={clearFilters}
        searchButton={<SearchIcon />}
      />

      <Table
        searchTerm={searchTerm}
        startDate={startDate}
        endDate={endDate}
        orders={orders}  // <<— vem do contexto
      />
    </div>
  );
}
