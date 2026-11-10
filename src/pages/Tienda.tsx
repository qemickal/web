import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import CardPress from "../components/CardPress";
import { TopBar, PageFooter } from "../components/PageChrome";
import { IconTopDown, IconOver } from "../components/Icons";
import { img } from "../media";
import type { PageId } from "../brand";

gsap.registerPlugin(ScrollTrigger);

const RELEASES = [
  {
    icon: IconTopDown,
    serial: "01",
    name: "Top Down Press",
    sub: "Cartas de presión vertical",
    desc: "Seis objetos de escritorio en algodón de 600 g, prensados en una sola pasada de arriba hacia abajo. Cada número sale una vez; la plancha se retira con la tirada.",
    note: "Las piezas de cada número variarán levemente entre lanzamientos.",
    price: "$1,450 MXN",
    state: "Disponible",
    img: img("obj-1.jpg"),
  },
  {
    icon: IconOver,
    serial: "02",
    name: "Over Press",
    sub: "Cartas de presión superpuesta",
    desc: "Cuatro piezas impresas en dos pasadas, Axis Blue sobre Night Ink. La sobreposición deja un tercer azul que no existe en la paleta: solo ocurre en el papel.",
    note: "Edición numerada y firmada por el taller.",
    price: "$1,650 MXN",
    state: "Disponible",
    img: img("obj-2.jpg"),
  },
];

const TEASERS = [
  { img: img("obj-3.jpg"), name: "Pieza N°03" },
  { img: img("obj-4.jpg"), name: "Pieza N°04" },
  { img: img("obj-5.jpg"), name: "Pieza N°05" },
  { img: img("obj-6.jpg"), name: "Pieza N°06" },
];

export default function Tienda({ onNavigate }: { onNavigate: (p: PageId) => void }) {
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
    <div ref={rootRef} className="page page-tienda">
      <TopBar tag="Tienda — MC-01 / Catálogo 0.3" onHome={() => onNavigate("hero")} />

      {/* ——— Hero: la misma tarjeta, ahora abierta ——— */}
      <section className="pg-hero">
        <div className="pg-copy">
          <p className="pg-kicker mono-label gs-rise">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--axis)]" />
            N°01 — La técnica · Objetos &amp; Ediciones
          </p>
          <h2 className="pg-title gs-rise">Tienda</h2>
          <p className="pg-ety gs-rise">
            (del latín <em>tentorium</em> — aquello que se extiende para cobijar lo que importa)
          </p>
          <p className="pg-desc gs-rise">
            Una selección de objetos, piezas y ediciones creadas para acompañar tu espacio y tu
            día a día. Cada lanzamiento llega con su icono CardPress y su tarjeta: numerada,
            impresa por el taller, irrepetible por definición.
          </p>
          <div className="pg-stats mono-label gs-rise">
            <span>Ediciones — 002</span>
            <span>Serie — MC-01</span>
            <span>Tirada — 200 uds.</span>
          </div>
        </div>

        <figure className="pg-card gs-rise">
          <CardPress universe="tienda" mode="hero" stamp={1} />
          <figcaption className="pg-caption mono-label">
            CardPress — la misma tarjeta, sin empaque.
            <br />
            Pulsa la tarjeta para ver su reverso.
          </figcaption>
        </figure>
      </section>

      {/* ——— Catálogo temprano ——— */}
      <section className="pg-section">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Catálogo temprano</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Índice 01 — 06</p>
        </div>

        <div className="rel-grid">
          {RELEASES.map((r) => (
            <article key={r.serial} className="rel-card gs-rise">
              <div className="rel-photo">
                <img src={r.img} alt={`${r.name} — ${r.sub}`} loading="lazy" />
                <span className="rel-serial mono-label">{r.serial}</span>
              </div>
              <div className="rel-body">
                <div className="rel-head">
                  <r.icon className="rel-icon" strokeWidth={1.6} />
                  <div>
                    <h4 className="rel-name">{r.name}</h4>
                    <p className="rel-sub mono-label">{r.sub}</p>
                  </div>
                </div>
                <p className="rel-desc">{r.desc}</p>
                <p className="rel-note">{r.note}</p>
                <div className="rel-foot">
                  <span className="chip mono-label">
                    <i className="bg-[var(--mint)]" />
                    {r.state}
                  </span>
                  <span className="rel-price mono-label">{r.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="tea-grid">
          {TEASERS.map((t) => (
            <figure key={t.name} className="tea-card gs-rise">
              <div className="tea-photo">
                <img src={t.img} alt={t.name} loading="lazy" />
                <span className="chip chip-ghost mono-label">
                  <i className="bg-[var(--sky)]" />
                  Muy pronto
                </span>
              </div>
              <figcaption className="tea-cap mono-label">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ——— Siguiente universo ——— */}
      <section className="pg-next">
        <p className="pg-big gs-rise">
          Esto es solo <span className="font-serif-i font-normal">el comienzo.</span>
        </p>
        <button type="button" onClick={() => onNavigate("estudio")} className="next-link gs-rise">
          <span className="mono-label text-[10px] md:text-xs">Siguiente universo</span>
          <span className="next-word">
            Estudio — La creatividad
            <ArrowRight className="h-[0.85em] w-auto" strokeWidth={1.8} />
          </span>
        </button>
      </section>

      <PageFooter />
    </div>
  );
}
