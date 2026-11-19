import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   CARRUSEL DE LÁMINAS — hero provisional
   Cartel serigrafiado en movimiento: foto + duotono de la
   paleta + frase de taller. Avanza solo (6 s), pausa al hover,
   respeta prefers-reduced-motion y se puede arrastrar en móvil.
   ============================================================ */

export interface CrsSlide {
  img: string;
  serial: string;
  statement: string;
  cap: string;
  tint: "a" | "b" | "c";
}

export default function Carousel({
  slides,
  label,
}: {
  slides: CrsSlide[];
  label: string;
}) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const startX = useRef<number | null>(null);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  /* Auto-avance */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % n);
    }, 6000);
    return () => window.clearInterval(id);
  }, [n]);

  /* Arrastre táctil */
  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 48) go(i + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <div
      className="crs"
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="crs-track"
        style={{ transform: `translateX(-${i * 100}%)` }}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        {slides.map((s, k) => (
          <div
            key={s.serial}
            className={`crs-slide ${k === i ? "active" : ""}`}
            aria-hidden={k !== i}
          >
            <img src={s.img} alt="" loading={k === 0 ? "eager" : "lazy"} draggable={false} />
            <div className={`crs-tint crs-tint-${s.tint}`} aria-hidden="true" />
            <div className="crs-copy">
              <p className="crs-serial mono-label">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--mint)]" />
                Lámina {s.serial}
              </p>
              <p className="crs-statement font-display">{s.statement}</p>
              <p className="crs-cap mono-label">{s.cap}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="crs-arrow prev"
        onClick={() => go(i - 1)}
        aria-label="Lámina anterior"
      >
        <ChevronLeft strokeWidth={2} />
      </button>
      <button
        type="button"
        className="crs-arrow next"
        onClick={() => go(i + 1)}
        aria-label="Lámina siguiente"
      >
        <ChevronRight strokeWidth={2} />
      </button>

      <div className="crs-dots" aria-label="Láminas">
        {slides.map((s, k) => (
          <button
            key={s.serial}
            type="button"
            aria-current={k === i}
            aria-label={`Ir a la lámina ${s.serial}`}
            className={`crs-dot ${k === i ? "active" : ""}`}
            onClick={() => go(k)}
          />
        ))}
      </div>
    </div>
  );
}
