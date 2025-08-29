interface NavButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function NavButton({
  children,
  isActive,
  onClick,
}: NavButtonProps) {
  return (
    <div
      className={`box-border content-stretch flex gap-2.5 h-[41px] items-center justify-center px-5 py-2.5 relative rounded-[30px] shrink-0 cursor-pointer transition-colors ${
        isActive
          ? "bg-[#c1a07b]"
          : "bg-[#e4ddcd] hover:bg-[#d4c7b3]"
      }`}
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className={`absolute border-[0px_1px_1px_0px] border-[rgba(0,0,0,0.18)] border-solid inset-0 pointer-events-none rounded-[30px] ${
          isActive
            ? "shadow-[2px_2px_2px_0px_rgba(115,82,46,0.3)]"
            : "shadow-[2px_2px_2px_0px_rgba(138,107,71,0.2)]"
        }`}
      />
      <div
        className={`flex flex-col justify-center leading-[0] relative shrink-0 text-[24px] text-center text-nowrap ${
          isActive
            ? "font-['Rethink_Sans:Bold',_sans-serif] font-bold text-[#ffffff]"
            : "font-['Rethink_Sans:Regular',_sans-serif] font-normal text-[#000000]"
        }`}
      >
        <p className="leading-[40px] whitespace-pre">
          {children}
        </p>
      </div>
    </div>
  );
}