import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TopBar } from "../components/PageChrome";
import SiteFooter from "../components/SiteFooter";
import Carousel, { type CrsSlide } from "../components/Carousel";
import { img } from "../media";
import type { PageId } from "../brand";

gsap.registerPlugin(ScrollTrigger);

/* Láminas del hero provisional — manifiesto del taller */
const LAMINAS_EST: CrsSlide[] = [
  {
    img: img("estudio.jpg"),
    serial: "01",
    statement: "Diseñar es ordenar el ruido.",
    cap: "Manifiesto · Tipografía y retícula, ninguna decoración",
    tint: "a",
  },
  {
    img: img("obj-2.jpg"),
    serial: "02",
    statement: "Una marca no se ve: se imprime.",
    cap: "Identidad & experiencias · Del archivo a la hoja",
    tint: "b",
  },
  {
    img: img("obj-6.jpg"),
    serial: "03",
    statement: "El espacio también es tinta.",
    cap: "Espacios y señalética · Del mostrador a la fachada",
    tint: "c",
  },
];

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

/* ¿Qué hacemos? — líneas de servicio según la ficha del estudio */
const QUE_HACEMOS = [
  "Identidad y sistemas editoriales",
  "Cartel y comunicación cultural",
  "Catálogos de arte y libros de artista",
  "Papelería corporativa y empaque",
  "Producción serigráfica, offset digital y risografía",
  "Encuadernación artesanal y acabados especiales",
];

/* Taller y técnicas — procesos en casa según el manual */
const PROCESOS = [
  { p: "Serigrafía", f: "50 × 70 cm", t: "1–4 planas", n: "25", pr: "Pantalla por tinta" },
  { p: "Offset digital", f: "32 × 45 cm", t: "CMYK", n: "1", pr: "Archivo PDF/X-4" },
  { p: "Risografía", f: "A3", t: "1–2 planas", n: "30", pr: "Máster por tinta" },
  { p: "Letterpress", f: "20 × 30 cm", t: "1–2", n: "50", pr: "Pliego y registro" },
  { p: "Encuadernado", f: "A4 · lomo 40 mm", t: "—", n: "20", pr: "Cosido en hilo" },
];

const WORKSHOPS = [
  {
    no: "WS-01",
    name: "Serigrafía en un sábado",
    desc: "Una tinta, una pantalla, tirada corta. Del diseño al tiraje con registro propio.",
  },
  {
    no: "WS-02",
    name: "Encuadernación cosida",
    desc: "Del pliego al libro en hilo: plegado, cajeado y lomo de 40 mm.",
  },
  {
    no: "WS-03",
    name: "Risografía de dos tintas",
    desc: "Registro, tramado y la felicidad del color plano desregistrado a propósito.",
  },
];

type EstNavId = "que" | "taller" | "portafolio" | "cotizar" | "workshop" | "contacto";

const NAV_EST: { id: EstNavId; no: string; label: string }[] = [
  { id: "que", no: "01", label: "¿Qué hacemos?" },
  { id: "taller", no: "02", label: "Taller y técnicas" },
  { id: "portafolio", no: "03", label: "Portafolio" },
  { id: "cotizar", no: "04", label: "Cotizar" },
  { id: "workshop", no: "05", label: "Workshop" },
  { id: "contacto", no: "06", label: "Contacto" },
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
  const [activeNav, setActiveNav] = useState<EstNavId | null>(null);

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

  const go = (id: EstNavId, anchor: string) => {
    setActiveNav(id);
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cotizar = () => {
    setActiveNav("cotizar");
    window.location.href =
      "mailto:hola@monocromat.mx?subject=" + encodeURIComponent("Cotización — nuevo proyecto");
  };

  const handleNav = (id: EstNavId) => {
    if (id === "que") return go(id, "que-hacemos");
    if (id === "taller") return go(id, "taller-tecnicas");
    if (id === "portafolio") return go(id, "portafolio");
    if (id === "workshop") return go(id, "workshop");
    if (id === "contacto") return go(id, "contacto");
    cotizar();
  };

  return (
    <div ref={rootRef} className="page page-estudio">
      <TopBar tag="Estudio — MC-02 / Ver. 0.4" onHome={() => onNavigate("hero")} />

      {/* ——— Banda de navegación sticky ——— */}
      <div className="shopband dark">
        <div className="sb-in">
          <nav className="sb-track" aria-label="Secciones del estudio">
            {NAV_EST.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`sb-link ${activeNav === n.id ? "active" : ""}`}
                onClick={() => handleNav(n.id)}
                aria-pressed={activeNav === n.id}
              >
                <span className="sb-no mono-label">{n.no}</span>
                <span className="sb-label mono-label">{n.label}</span>
                <span className="sb-fill" aria-hidden="true" />
              </button>
            ))}
          </nav>
          <span className="sb-side mono-label" aria-hidden="true">
            Estudio — Índice
          </span>
        </div>
      </div>

      {/* ——— Hero: carrusel de láminas ——— */}
      <section className="pg-hero pg-hero-crs">
        <Carousel slides={LAMINAS_EST} label="Láminas del estudio" />
        <div className="pg-copy">
          <p className="pg-kicker mono-label gs-rise">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--mint)]" />
            N°02 — La creatividad · Identidad &amp; Experiencias
          </p>
          <p className="pg-desc gs-rise">
            Desarrollamos identidades, experiencias y soluciones creativas para marcas, proyectos
            y espacios con personalidad. Esta página está en prensa: el archivo completo de casos
            sale en la próxima edición.
          </p>
          <div className="pg-stats mono-label gs-rise">
            <span>Prácticas — 003</span>
            <span>Marcas — 012</span>
            <span>Desde — MMXIX</span>
          </div>
        </div>
      </section>

      {/* ——— ¿Qué hacemos? ——— */}
      <section className="pg-section" id="que-hacemos">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">¿Qué hacemos?</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Servicios — 06 líneas</p>
        </div>
        <ul className="qh-list">
          {QUE_HACEMOS.map((q, i) => (
            <li key={q} className="qh-row gs-rise">
              <span className="qh-no mono-label">({String(i + 1).padStart(2, "0")})</span>
              <span className="qh-txt">{q}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Taller y técnicas ——— */}
      <section className="pg-section" id="taller-tecnicas">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Taller y técnicas</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Procesos — 05 en casa</p>
        </div>
        <div className="tt-card gs-rise">
          <p className="tt-tag mono-label">Ficha — Procesos de taller</p>
          <div className="tt-scroll">
            <table className="tt-table">
              <thead>
                <tr className="mono-label">
                  <th scope="col">Proceso</th>
                  <th scope="col">Formato máx.</th>
                  <th scope="col">Tintas</th>
                  <th scope="col">Tirada mín.</th>
                  <th scope="col">Preparación</th>
                </tr>
              </thead>
              <tbody>
                {PROCESOS.map((r) => (
                  <tr key={r.p}>
                    <th scope="row">{r.p}</th>
                    <td className="mono-label">{r.f}</td>
                    <td className="mono-label">{r.t}</td>
                    <td className="mono-label">{r.n}</td>
                    <td className="mono-label">{r.pr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tt-note mono-label">
            Prueba de color — 2 días · Digital — 2 días · Riso — 4 días · Serigrafía — 6 días
          </p>
          <p className="tt-note mono-label">
            Volumen — 1–25 entrega en 48 h · 25–150 riso · 150–500 serigrafía · 500+ offset externo
          </p>
        </div>
      </section>

      {/* ——— Principios ——— */}
      <section className="pg-section" id="principios">
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

      {/* ——— Portafolio (Prácticas) ——— */}
      <section className="pg-section" id="portafolio">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Prácticas</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Portafolio — archivo en preparación</p>
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

      {/* ——— Workshop ——— */}
      <section className="pg-section" id="workshop">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Workshop</h3>
          <p className="mono-label text-[10px] md:text-[11px]">Próxima sesión — por confirmar</p>
        </div>
        <ul className="ws-list">
          {WORKSHOPS.map((w) => (
            <li key={w.no} className="ws-row gs-rise">
              <span className="ws-no mono-label">{w.no}</span>
              <div className="ws-body">
                <h4 className="ws-name">{w.name}</h4>
                <p className="ws-desc">{w.desc}</p>
              </div>
              <span className="chip mono-label">
                <i className="bg-[var(--mint)]" />
                Cupo — 08
              </span>
            </li>
          ))}
        </ul>
        <p className="ws-meta mono-label gs-rise">
          Agenda con el taller —{" "}
          <a href="mailto:hola@monocromat.mx?subject=Workshop">hola@monocromat.mx</a>
        </p>
      </section>

      {/* ——— Contacto ——— */}
      <section className="pg-next" id="contacto">
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
        <div className="cta-row cta-center gs-rise">
          <button type="button" className="cta-solid mono-label" onClick={cotizar}>
            Cotizar un proyecto
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
          <a
            href="mailto:hola@monocromat.mx?subject=Colaboraciones%20%2F%20Aliados"
            className="cta-ghost mono-label"
          >
            Colaboraciones / Aliados
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
          </a>
        </div>
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

      <SiteFooter
        theme="royal"
        links={[
          { label: "¿Qué hacemos?", onClick: () => handleNav("que") },
          { label: "Taller y técnicas", onClick: () => handleNav("taller") },
          { label: "Portafolio", onClick: () => handleNav("portafolio") },
          { label: "Workshop", onClick: () => handleNav("workshop") },
          { label: "Contacto", onClick: () => handleNav("contacto") },
        ]}
        actions={[
          { label: "Cotizar", onClick: cotizar },
          { label: "Ver la tienda", onClick: () => onNavigate("tienda") },
          {
            label: "Colaboraciones / Aliados",
            onClick: () => {
              window.location.href = "mailto:hola@monocromat.mx?subject=Colaboraciones%20%2F%20Aliados";
            },
          },
        ]}
      />
    </div>
  );
}
