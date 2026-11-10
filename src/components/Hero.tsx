import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Asterisk, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import CardPress from "./CardPress";
import { MEDIA } from "../media";
import { WP_URLS, type PageId } from "../brand";

type Universe = "tienda" | "estudio";

interface PanelDef {
  id: Universe;
  no: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  aria: string;
  marquee: string;
  bg: string;
  bgAlt: string;
}

/* Las rutas de las imágenes viven en src/media.ts — edítalas ahí
   o sustituye los archivos en /public/images/ con el mismo nombre. */
const PANELS: PanelDef[] = [
  {
    id: "tienda",
    no: "N°01",
    tag: "Objetos & Ediciones",
    title: "Tienda",
    desc: "Una selección de objetos, piezas y ediciones creadas para acompañar tu espacio y tu día a día.",
    cta: "Ver tienda",
    aria: "Entrar a la Tienda: objetos, piezas y ediciones de Mono Cromat & Co.",
    marquee: "Tienda — Objetos — Piezas — Ediciones — ",
    bg: MEDIA.tienda.heroBg,
    bgAlt: MEDIA.tienda.heroAlt,
  },
  {
    id: "estudio",
    no: "N°02",
    tag: "Identidad & Experiencia",
    title: "Estudio",
    desc: "Desarrollamos identidades, experiencias y soluciones creativas para marcas, proyectos y espacios con personalidad.",
    cta: "Conocer el estudio",
    aria: "Entrar al Estudio: identidades, experiencias y soluciones creativas.",
    marquee: "Estudio — Ideas — Identidad — Marcas — ",
    bg: MEDIA.estudio.heroBg,
    bgAlt: MEDIA.estudio.heroAlt,
  },
];

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export default function Hero({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [active, setActive] = useState<Universe | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const interacted = useRef(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const activate = useCallback((id: Universe | null, byUser = true) => {
    if (byUser) interacted.current = true;
    setActive(id);
  }, []);

  /* Auto-demostración: expande Tienda una vez, solo si nadie ha tocado nada */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = window.setTimeout(() => {
      if (!interacted.current) activate("tienda", false);
    }, 2100);
    const t2 = window.setTimeout(() => {
      if (!interacted.current) activate(null, false);
    }, 4100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [activate]);

  /* Parallax suave (ahora arrastra la tarjeta) */
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;
      heroRef.current?.style.setProperty("--px", c.x.toFixed(4));
      heroRef.current?.style.setProperty("--py", c.y.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!canHover()) return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  }, []);

  const onPanelClick = useCallback(
    (id: Universe) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      interacted.current = true;
      if (!canHover() && active !== id) {
        activate(id);
        return;
      }
      onNavigate(id);
    },
    [active, activate, onNavigate],
  );

  return (
    <main
      ref={heroRef}
      className="hero"
      data-active={active ?? ""}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        target.current = { x: 0, y: 0 };
        if (canHover()) activate(null);
      }}
    >
      <h1 className="sr-only">
        Mono Cromat &amp; Co. — Tienda de objetos y estudio creativo
      </h1>

      {PANELS.map((p, i) => (
        <a
          key={p.id}
          href={WP_URLS[p.id]}
          aria-label={p.aria}
          className={`panel panel-${p.id} group`}
          onMouseEnter={() => canHover() && activate(p.id)}
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) activate(p.id);
          }}
          onBlur={() => activate(null)}
          onClick={onPanelClick(p.id)}
        >
          {/* Fondo a sangre completa — reemplazable desde src/media.ts */}
          <div className="bg-par" aria-hidden="true">
            <img src={p.bg} alt={p.bgAlt} loading="eager" decoding="async" />
          </div>
          <div className={`ov ${p.id === "tienda" ? "ov-wash" : "ov-night"}`} aria-hidden="true" />
          {p.id === "estudio" && <div className="ov ov-chroma" aria-hidden="true" />}
          <div className="ov ov-dim" aria-hidden="true" />

          <div className={`content content-${p.id}`}>
            {/* La tarjeta CardPress "empaquetada", detrás del título */}
            <div className="packed" aria-hidden="true">
              <CardPress universe={p.id} mode="packed" stamp={i} />
            </div>

            <div
              className={`rise-in rise-in-${i + 1} relative z-10 flex flex-col items-center justify-center px-6 text-center`}
            >
              <div className="reveal-group" aria-hidden="true">
                <div className="item item-1 mono-label mb-4 flex items-center justify-center gap-3 text-[10px] md:mb-6 md:text-[11px]">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" />
                  {p.no} — {p.tag}
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" />
                </div>
              </div>

              <span
                aria-hidden="true"
                className="title-h font-display block text-[clamp(3.4rem,10.5vw,9.5rem)] leading-[0.92] font-black tracking-[-0.045em] uppercase"
              >
                <span className="title-text">{p.title}</span>
              </span>

              <div className="reveal-group">
                <p className="item item-2 mx-auto mt-5 max-w-[34ch] text-[15px] leading-relaxed font-normal tracking-[0.01em] opacity-90 md:mt-7 md:max-w-[42ch] md:text-lg md:leading-[1.6]">
                  {p.desc}
                </p>
                <span className="item item-3 mt-6 inline-flex items-center gap-3 border-b border-current pb-1.5 md:mt-8">
                  <span className="mono-label text-[11px] md:text-xs">{p.cta}</span>
                  <ArrowRight
                    className="h-4 w-4 text-[var(--accent)] transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                    strokeWidth={2.2}
                  />
                </span>
                <span className="mono-label mt-4 block text-[9px] opacity-0 transition-opacity duration-300 group-focus-visible:opacity-70 md:text-[10px]">
                  Pulsa Enter para continuar
                </span>
              </div>
            </div>

            <div className="title-v mono-label text-[12px] md:text-[14px]" aria-hidden="true">
              <div className="marquee-track">
                <span>{(p.marquee + p.marquee).toUpperCase()}</span>
                <span>{(p.marquee + p.marquee).toUpperCase()}</span>
              </div>
            </div>

            <div className="title-strip mono-label text-[11px]" aria-hidden="true">
              <span>{p.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2.4} />
            </div>
          </div>
        </a>
      ))}

      <div className="seam-dot fade-in fade-in-late" aria-hidden="true">
        <Asterisk className="spin-slow h-5 w-5" strokeWidth={2.6} />
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between px-5 pt-5 text-white mix-blend-difference md:px-9 md:pt-7">
        <a
          href="/"
          className="fade-in pointer-events-auto"
          aria-label="Mono Cromat & Co. — Inicio"
          onClick={(e) => e.preventDefault()}
        >
          <Logo />
        </a>
        <nav className="fade-in mono-label hidden text-right text-[10px] leading-[1.9] opacity-90 sm:block md:text-[11px]">
          <p>01 — Tienda · La técnica</p>
          <p>02 — Estudio · La creatividad</p>
        </nav>
      </header>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between px-5 pb-5 text-white mix-blend-difference md:px-9 md:pb-7">
        <p className="fade-in fade-in-late mono-label text-[9px] opacity-80 md:text-[11px]">
          © MMXXVI — Mono Cromat &amp; Co.
        </p>
        <p className="fade-in fade-in-late mono-label hidden items-center justify-center gap-2.5 text-center text-[10px] sm:flex md:text-[11px]">
          <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-60" />
          Lift your vision
          <span className="inline-block h-1 w-1 rotate-45 bg-current opacity-60" />
        </p>
        <p className="fade-in fade-in-late mono-label text-right text-[9px] opacity-80 md:text-[11px]">
          Ciudad de México
        </p>
      </footer>

      <div className="grain" aria-hidden="true" />
    </main>
  );
}
