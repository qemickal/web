import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";

/* Barra superior de páginas interiores */
export function TopBar({ tag, onHome }: { tag: string; onHome: () => void }) {
  return (
    <header className="page-top">
      <div className="flex items-center gap-5 md:gap-7">
        <button type="button" onClick={onHome} className="top-back" aria-label="Volver a todos los universos">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
          <span>Todos los universos</span>
        </button>
        <span className="hidden opacity-25 sm:inline" aria-hidden="true">
          /
        </span>
        <Logo className="hidden opacity-90 sm:flex w-24" />
      </div>
      <p className="mono-label text-right text-[9px] leading-[1.8] opacity-70 md:text-[10px]">{tag}</p>
    </header>
  );
}
