import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { TopBar } from "../components/PageChrome";
import SiteFooter from "../components/SiteFooter";
import Carousel, { type CrsSlide } from "../components/Carousel";
import { IconTopDown, IconOver } from "../components/Icons";
import { img } from "../media";
import type { PageId } from "../brand";

gsap.registerPlugin(ScrollTrigger);

/* Láminas del hero provisional — frases del reverso CardPress */
const LAMINAS: CrsSlide[] = [
  {
    img: img("obj-1.jpg"),
    serial: "01",
    statement: "Cada golpe deja marca.",
    cap: "MC-01 · Top Down Press · Tirada 200",
    tint: "a",
  },
  {
    img: img("obj-2.jpg"),
    serial: "02",
    statement: "Solo la primera tinta.",
    cap: "MC-01 · Over Press · Dos tintas · Edición numerada",
    tint: "b",
  },
  {
    img: img("tienda.jpg"),
    serial: "03",
    statement: "La técnica es poética.",
    cap: "Objetos & ediciones · Impreso en el taller · CDMX",
    tint: "c",
  },
];

type CatId = "novedades" | "papeleria" | "decorativo" | "estilo" | "colecciones" | "sobre";

const NAV: { id: CatId; no: string; label: string }[] = [
  { id: "novedades", no: "01", label: "Novedades" },
  { id: "papeleria", no: "02", label: "Papelería creativa" },
  { id: "decorativo", no: "03", label: "Diseño decorativo" },
  { id: "estilo", no: "04", label: "Estilo" },
  { id: "colecciones", no: "05", label: "Colecciones / Sets" },
  { id: "sobre", no: "06", label: "Sobre la marca" },
];

type Item = {
  serial: string;
  name: string;
  sub: string;
  desc: string;
  note?: string;
  price?: string;
  state?: string;
  img: string;
  cats: CatId[];
  teaser?: boolean;
  icon?: typeof IconTopDown;
};

const CATALOG: Item[] = [
  {
    serial: "01",
    name: "Top Down Press",
    sub: "Cartas de presión vertical",
    desc: "Seis objetos de escritorio en algodón de 600 g, prensados en una sola pasada de arriba hacia abajo. Cada número sale una vez; la plancha se retira con la tirada.",
    note: "Las piezas de cada número variarán levemente entre lanzamientos.",
    price: "$1,450 MXN",
    state: "Disponible",
    img: img("obj-1.jpg"),
    cats: ["novedades", "papeleria", "colecciones"],
    icon: IconTopDown,
  },
  {
    serial: "02",
    name: "Over Press",
    sub: "Cartas de presión superpuesta",
    desc: "Cuatro piezas impresas en dos pasadas, Royal Blue sobre Oxford Dark. La sobreposición deja un tercer azul que no existe en la paleta: solo ocurre en el papel.",
    note: "Edición numerada y firmada por el taller.",
    price: "$1,650 MXN",
    state: "Disponible",
    img: img("obj-2.jpg"),
    cats: ["novedades", "papeleria", "estilo"],
    icon: IconOver,
  },
  {
    serial: "03",
    name: "Pieza N°03",
    sub: "Vasija de gres con flor seca",
    desc: "",
    img: img("obj-3.jpg"),
    cats: ["decorativo", "colecciones"],
    teaser: true,
  },
  {
    serial: "04",
    name: "Pieza N°04",
    sub: "Esfera de piedra en reposo",
    desc: "",
    img: img("obj-4.jpg"),
    cats: ["decorativo"],
    teaser: true,
  },
  {
    serial: "05",
    name: "Pieza N°05",
    sub: "Decantador de vidrio soplado",
    desc: "",
    img: img("obj-5.jpg"),
    cats: ["estilo"],
    teaser: true,
  },
  {
    serial: "06",
    name: "Pieza N°06",
    sub: "Brújula sobre archivo de mesa",
    desc: "",
    img: img("obj-6.jpg"),
    cats: ["estilo"],
    teaser: true,
  },
];

export default function Tienda({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const catalogRef = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<CatId | null>(null);
  const [q, setQ] = useState("");

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

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CATALOG.filter((p) => {
      const okCat = !cat || p.cats.includes(cat);
      const blob = [p.serial, p.name, p.sub, p.desc, p.note ?? "", p.price ?? "", p.state ?? ""]
        .join(" ")
        .toLowerCase();
      const okQ = !needle || blob.includes(needle);
      return okCat && okQ;
    });
  }, [cat, q]);

  const releases = filtered.filter((p) => !p.teaser);
  const teasers = filtered.filter((p) => p.teaser);
  const total = filtered.length;
  const activeCat = NAV.find((n) => n.id === cat);

  const goCatalog = () =>
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const clearAll = () => {
    setCat(null);
    setQ("");
  };

  const handleNav = (id: CatId) => {
    if (id === "sobre") {
      document.getElementById("sobre-la-marca")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setCat((c) => (c === id ? null : id));
    setQ("");
    goCatalog();
  };

  return (
    <div ref={rootRef} className="page page-tienda">
      <TopBar tag="Tienda — MC-01 / Catálogo 0.3" onHome={() => onNavigate("hero")} />

      {/* ——— Banda de navegación sticky: categorías + búsqueda ——— */}
      <div className="shopband">
        <div className="sb-in">
          <nav className="sb-track" aria-label="Categorías de la tienda">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`sb-link ${cat === n.id ? "active" : ""}`}
                onClick={() => handleNav(n.id)}
                aria-pressed={cat === n.id}
              >
                <span className="sb-no mono-label">{n.no}</span>
                <span className="sb-label mono-label">{n.label}</span>
                <span className="sb-fill" aria-hidden="true" />
              </button>
            ))}
          </nav>
          <form
            className="sb-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              goCatalog();
            }}
          >
            <Search className="sb-search-ic" strokeWidth={1.8} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar en la tienda"
              aria-label="Buscar en la tienda"
              type="search"
            />
            {q && (
              <button
                type="button"
                className="sb-clear"
                onClick={() => setQ("")}
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </form>
        </div>
      </div>

      {/* ——— Hero: carrusel de láminas ——— */}
      <section className="pg-hero pg-hero-crs">
        <Carousel slides={LAMINAS} label="Láminas de la tienda" />
        <div className="pg-copy">
          <p className="pg-kicker mono-label gs-rise">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--royal)]" />
            N°01 — La técnica · Objetos &amp; Ediciones
          </p>
          <p className="pg-desc gs-rise">
            Una selección de objetos, piezas y ediciones creadas para acompañar tu espacio y tu
            día a día. Cada lanzamiento sale numerado, impreso en el taller e irrepetible por
            definición.
          </p>
          <div className="pg-stats mono-label gs-rise">
            <span>Ediciones — 002</span>
            <span>Serie — MC-01</span>
            <span>Tirada — 200 uds.</span>
          </div>
          <div className="cta-row gs-rise">
            <button
              type="button"
              className="cta-solid mono-label"
              onClick={() => onNavigate("estudio")}
            >
              Ir al taller
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <a href="mailto:hola@monocromat.mx?subject=Colaboraciones%20%2F%20Aliados" className="cta-ghost mono-label">
              Colaboraciones / Aliados
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </section>

      {/* ——— Catálogo ——— */}
      <section ref={catalogRef} className="pg-section">
        <div className="sec-head gs-rise">
          <h3 className="sec-title">Catálogo temprano</h3>
          <p className="mono-label text-[10px] md:text-[11px]">
            Piezas — {String(CATALOG.length).padStart(3, "0")}
          </p>
        </div>

        {(cat || q) && (
          <div className="resbar mono-label">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[var(--royal)]" />
            <span>
              {cat
                ? `FILTRO — ${activeCat?.label.toUpperCase()}`
                : `BÚSQUEDA — "${q.trim().toUpperCase()}"`}
              {" · "}
              {String(total).padStart(3, "0")} PIEZAS
            </span>
            <button type="button" className="resbar-clear" onClick={clearAll}>
              Limpiar ×
            </button>
          </div>
        )}

        {total === 0 ? (
          <div className="cat-empty mono-label">
            <p>Sin resultados — 000 piezas</p>
            <button type="button" onClick={clearAll}>
              Limpiar filtro
            </button>
          </div>
        ) : (
          <>
            {releases.length > 0 && (
              <div className="rel-grid">
                {releases.map((r) => (
                  <article key={r.serial} className="rel-card gs-rise">
                    <div className="rel-photo">
                      <img src={r.img} alt={`${r.name} — ${r.sub}`} loading="lazy" />
                      <span className="rel-serial mono-label">{r.serial}</span>
                    </div>
                    <div className="rel-body">
                      <div className="rel-head">
                        {r.icon && <r.icon className="rel-icon" strokeWidth={1.6} />}
                        <div>
                          <h4 className="rel-name">{r.name}</h4>
                          <p className="rel-sub mono-label">{r.sub}</p>
                        </div>
                      </div>
                      {r.desc && <p className="rel-desc">{r.desc}</p>}
                      {r.note && <p className="rel-note">{r.note}</p>}
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
            )}

            {teasers.length > 0 && (
              <div className="tea-grid">
                {teasers.map((t) => (
                  <figure key={t.serial} className="tea-card gs-rise">
                    <div className="tea-photo">
                      <img src={t.img} alt={`${t.name} — ${t.sub}`} loading="lazy" />
                      <span className="chip chip-ghost mono-label">
                        <i className="bg-[var(--sky)]" />
                        Muy pronto
                      </span>
                    </div>
                    <figcaption className="tea-cap mono-label" title={t.sub}>
                      {t.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ——— Cierre ——— */}
      <section className="pg-next">
        <p className="pg-big gs-rise">
          Esto es solo <span className="font-serif-i font-normal">el comienzo.</span>
        </p>
        <button
          type="button"
          onClick={() => onNavigate("estudio")}
          className="next-link gs-rise"
        >
          <span className="mono-label text-[10px] md:text-xs">Siguiente universo</span>
          <span className="next-word">
            Estudio — La creatividad
            <ArrowRight className="h-[0.85em] w-auto" strokeWidth={1.8} />
          </span>
        </button>
      </section>

      <SiteFooter
        theme="ink"
        links={NAV.map((n) => ({ label: n.label, onClick: () => handleNav(n.id) }))}
        actions={[
          { label: "Ir al taller", onClick: () => onNavigate("estudio"), solid: true },
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
