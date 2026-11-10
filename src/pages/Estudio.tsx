import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import CardPress from "../components/CardPress";
import { TopBar, PageFooter } from "../components/PageChrome";
import type { PageId } from "../brand";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPIOS = [
  { i: "01", text: "Idea antes que sistema." },
  { i: "02", text: "La técnica también es poesía." },
  { i: "03", text: "Objetos con memoria." },
];

const PRACTICAS = [
  {
    i: "01",
    name: "Identidad",
    desc: "Marcas con carácter: sistemas visuales que respiran igual en papel que en pantalla.",
    poster: "pa",
    big: "Aa",
    bigCls: "font-serif-i",
    cap: "Identidad / Pronto",
  },
  {
    i: "02",
    name: "Sistemas de objetos",
    desc: "Ediciones y piezas que cargan la identidad mucho más allá del logotipo.",
    poster: "pb",
    big: "02",
    bigCls: "font-display",
    cap: "Objetos / Pronto",
  },
  {
    i: "03",
    name: "Espacios",
    desc: "Señalética y atmósferas para lugares reales, del mostrador a la fachada.",
    poster: "pc",
    big: "&",
    bigCls: "font-serif-i",
    cap: "Espacios / Pronto",
  },
];

function Poster({
  cls,
  big,
  bigCls,
  cap,
}: {
  cls: string;
  big: string;
  bigCls: string;
  cap: string;
}) {
  return (
    <div className={`poster ${cls}`} aria-hidden="true">
      <span className={`poster-big ${bigCls}`}>{big}</span>
      <span className="poster-rule" />
      <span className="poster-cap mono-label">{cap}</span>
    </div>
  );
}

export default function Estudio({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gs-rise").forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="page page-estudio">
      <TopBar tag="Estudio — MC-02 / Ver. 0.3" onHome={() => onNavigate("hero")} />

      {/* ——— Hero ——— */}
      <section className="pg-hero">
        <div className="pg-copy">
          <p className="pg-kicker mono-label gs-rise">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--mint)]" />
            N°02 — La creatividad · Identidad &amp; Experiencias
          </p>
          <h2 className="pg-title gs-rise">Estudio</h2>
          <p className="pg-ety gs-rise">
            (del latín <em>studium</em> — el empeño puesto en lo que se ama hacer)
          </p>
          <p className="pg-desc gs-rise">
            Desarrollamos identidades, experiencias y soluciones creativas para marcas, proyectos
            y espacios con personalidad. Esta página está en prensa: el archivo completo de casos
            sale en la próxima edición.
          </p>
          <div className="pg-stats mono-label gs-rise">
            <span>Prácticas — 003</span>
            <span>Marcas — 012</span>
            <span>Desde — MMXXIV</span>
          </div>
        </div>

        <figure className="pg-card gs-rise">
          <CardPress universe="estudio" mode="hero" stamp={2} />
          <figcaption className="pg-caption mono-label">
            CardPress — la misma tarjeta, sin empaque.
            <br />
            Pulsa la tarjeta para ver su reverso.
          </figcaption>
        </figure>
      </section>

      {/* ——— Principios ——— */}
      <section className="pg-section">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Principios</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Índice 01 — 03</p>
        </div>
        <ul className="prin-list">
          {PRINCIPIOS.map((p) => (
            <li key={p.i} className="prin-row gs-rise">
              <span className="prin-i mono-label">({p.i})</span>
              <span className="prin-t">
                {p.text}
                <span className="prin-fill" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Prácticas ——— */}
      <section className="pg-section">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Prácticas</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Casos — archivo en preparación</p>
        </div>
        <ul className="prac-list">
          {PRACTICAS.map((p) => (
            <li key={p.i} className="prac-row gs-rise">
              <div className="prac-main">
                <span className="prac-i mono-label">({p.i})</span>
                <div className="prac-body">
                  <h4 className="prac-name">{p.name}</h4>
                  <p className="prac-desc">{p.desc}</p>
                </div>
                <span className="chip mono-label">
                  <i className="bg-[var(--sky)]" />
                  Muy pronto
                </span>
              </div>
              <Poster cls={p.poster} big={p.big} bigCls={p.bigCls} cap={p.cap} />
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Contacto ——— */}
      <section className="pg-next">
        <p className="pg-big gs-rise">
          Hablemos <span className="font-serif-i font-normal">de tu marca.</span>
        </p>
        <a href="mailto:hola@monocromat.mx" className="next-link gs-rise">
          <span className="mono-label text-[10px] md:text-xs">Escribe al taller</span>
          <span className="next-word">
            hola@monocromat.mx
            <ArrowRight className="h-[0.85em] w-auto" strokeWidth={1.8} />
          </span>
        </a>
        <p className="mono-label mt-6 text-center text-[9px] opacity-60 md:text-[10px]">
          Muy pronto — estudio.monocromat.mx
        </p>
        <button
          type="button"
          onClick={() => onNavigate("tienda")}
          className="cross-link mono-label gs-rise"
        >
          Ver la tienda — La técnica
          <ArrowRight className="h-3.5 w-3.5 text-[var(--mint)]" strokeWidth={2.2} />
        </button>
      </section>

      <PageFooter />
    </div>
  );
}
