import { ArrowRight, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

/* ============================================================
   FOOTER DEL SITIO — Mono Cromat & Co.
   Datos del taller según el Manual de marca (ed. 01).
   theme "ink"  → fondo Oxford Dark (páginas claras)
   theme "royal"→ fondo Royal Blue (páginas oscuras)
   ============================================================ */

export interface FootLink {
  label: string;
  onClick: () => void;
}

export interface FootAction {
  label: string;
  onClick: () => void;
  solid?: boolean;
}

export default function SiteFooter({
  theme = "ink",
  links = [],
  actions = [],
}: {
  theme?: "ink" | "royal";
  links?: FootLink[];
  actions?: FootAction[];
}) {
  return (
    <footer className={`site-foot ${theme === "royal" ? "royal" : ""}`}>
      <div className="sf-in">
        {/* Marca / Sobre la marca */}
        <div className="sf-brand" id="sobre-la-marca">
          <Logo variant="negative" className="w-28" />
          <p className="sf-blurb">
            Taller de artes gráficas en la Ciudad de México. Diseñamos, imprimimos y encuadernamos
            bajo una sola retícula: del archivo digital a la hoja impresa.
          </p>
          <p className="sf-serif">«Una paleta, infinitas posibilidades.»</p>
          <p className="sf-technics">Serigrafía · Riso · Offset · Encuadernación</p>
        </div>

        {/* Índice */}
        <div>
          <p className="sf-h mono-label">Índice</p>
          {links.map((l) => (
            <button key={l.label} type="button" className="sf-link mono-label" onClick={l.onClick}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Taller */}
        <div>
          <p className="sf-h mono-label">Taller</p>
          <div className="sf-data">
            <p>Calle Tinta 14 · Col. Gráfica</p>
            <p>CDMX · CP 06720</p>
            <p>
              <a href="mailto:hola@monocromat.mx">hola@monocromat.mx</a>
            </p>
            <p>+52 55 0000 0000</p>
            <p>Lun–Vie 10:00–18:00 · Sáb 11:00–15:00</p>
          </div>
        </div>

        {/* Acciones */}
        <div>
          <p className="sf-h mono-label">Acciones</p>
          <div className="sf-actions">
            {actions.map((a) =>
              a.solid ? (
                <button key={a.label} type="button" className="sf-cta mono-label" onClick={a.onClick}>
                  {a.label}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              ) : (
                <button key={a.label} type="button" className="sf-ghost mono-label" onClick={a.onClick}>
                  {a.label}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="sf-bottom-wrap">
        <div className="sf-bottom">
          <span>© MMXXVI — Mono Cromat &amp; Co.</span>
          <span>Compuesto en Space Grotesk · Fira Mono · Inter</span>
          <span>Retícula 12 col · monocromat.mx</span>
        </div>
      </div>
    </footer>
  );
}
