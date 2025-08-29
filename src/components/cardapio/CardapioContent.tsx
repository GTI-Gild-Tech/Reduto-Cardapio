import { KanbanBoard } from "./KanbanBoard";

export function CardapioContent() {
  return (
    <div className="">
      <div className="font-['Retrokia:Demo',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0f4c50] text-[64px] text-nowrap tracking-[-1.28px]">
        <p className="leading-[1.5] whitespace-pre">
          Cardápio
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}