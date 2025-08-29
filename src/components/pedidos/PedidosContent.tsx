import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { Table, type Order } from "./Table";
import { Pagination } from "../shared/Pagination";
import searchSvgPaths from "../../imports/svg-jrmubkrrio";

// Mock data for the table
const mockOrders: Order[] = [
  {
    id: "#232",
    table: "02",
    name: "Ilca Almeida",
    datetime: "22/07/2025 16h30",
  },
  {
    id: "#233",
    table: "03",
    name: "João Silva",
    datetime: "22/07/2025 16h45",
  },
  {
    id: "#234",
    table: "01",
    name: "Maria Santos",
    datetime: "22/07/2025 17h00",
  },
  {
    id: "#235",
    table: "05",
    name: "Pedro Costa",
    datetime: "22/07/2025 17h15",
  },
  {
    id: "#236",
    table: "04",
    name: "Ana Rodrigues",
    datetime: "22/07/2025 17h30",
  },
  {
    id: "#237",
    table: "06",
    name: "Carlos Ferreira",
    datetime: "22/07/2025 17h45",
  },
  {
    id: "#238",
    table: "02",
    name: "Lucia Oliveira",
    datetime: "22/07/2025 18h00",
  },
  {
    id: "#239",
    table: "07",
    name: "Roberto Lima",
    datetime: "22/07/2025 18h15",
  },
  {
    id: "#240",
    table: "03",
    name: "Fernanda Sousa",
    datetime: "22/07/2025 18h30",
  },
  {
    id: "#241",
    table: "08",
    name: "Miguel Torres",
    datetime: "22/07/2025 18h45",
  },
  {
    id: "#242",
    table: "01",
    name: "Carla Mendes",
    datetime: "22/07/2025 19h00",
  },
  {
    id: "#243",
    table: "09",
    name: "Rafael Moreira",
    datetime: "22/07/2025 19h15",
  },
  {
    id: "#244",
    table: "04",
    name: "Patrícia Reis",
    datetime: "22/07/2025 19h30",
  },
  {
    id: "#245",
    table: "10",
    name: "Bruno Pereira",
    datetime: "22/07/2025 19h45",
  },
  {
    id: "#246",
    table: "05",
    name: "Isabela Castro",
    datetime: "22/07/2025 20h00",
  },
  {
    id: "#247",
    table: "02",
    name: "Gabriel Barbosa",
    datetime: "22/07/2025 20h15",
  },
  {
    id: "#248",
    table: "06",
    name: "Amanda Dias",
    datetime: "22/07/2025 20h30",
  },
];

function SearchIcon() {
  return (
    <div className="relative shrink-0 size-4" data-name="search">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="search">
          <path
            d={searchSvgPaths.p24e77f00}
            fill="var(--fill-0, white)"
            id="Union"
          />
        </g>
      </svg>
    </div>
  );
}

export function PedidosContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[25px] grow items-center justify-start min-h-px min-w-px px-0 py-[50px] relative shrink-0 w-full"
      data-name="Left side 8 Column"
    >
      <div className="font-['Retrokia:Demo',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0f4c50] text-[64px] text-nowrap tracking-[-1.28px]">
        <p className="leading-[1.5] whitespace-pre">Pedidos</p>
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
        orders={mockOrders}
      />
      <Pagination />
    </div>
  );
}