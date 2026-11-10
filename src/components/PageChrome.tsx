import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { SLOGAN } from "../brand";

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
        <Logo className="hidden opacity-90 sm:flex" />
      </div>
      <p className="mono-label text-right text-[9px] leading-[1.8] opacity-70 md:text-[10px]">{tag}</p>
    </header>
  );
}

/* Pie de páginas interiores */
export function PageFooter() {
  return (
    <footer className="page-bottom mono-label text-[9px] uppercase md:text-[10px]">
      <p className="opacity-70">© MMXXVI — Mono Cromat &amp; Co.</p>
      <p className="flex items-center gap-2.5">
        <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-60" />
        {SLOGAN}
        <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-60" />
      </p>
      <p className="opacity-70">Ciudad de México</p>
    </footer>
  );
}
