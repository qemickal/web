/* ============================================================
   LOGO — Mono Cromat & Co.
   ------------------------------------------------------------
   Logotipo definitivo: script monolinea dibujado a mano
   (Manual de marca, ed. 01 · p. 06).

   Archivos en /public/images/:
     · logo-oxford.png  → Oxford Dark, sobre fondos claros
     · logo-paper.png   → Blanco papel, versión negativa
     · logo-royal.png   → Royal Blue, color base del trazo

   Reglas del manual: se usa completo, sin rotar ni estirar,
   con aire alrededor. Mínimo digital: 96 px de ancho
   (en móvil se tolera 80 px por ergonomía).
   ============================================================ */

const LOGO_INK = "images/logo-oxford.png";
const LOGO_NEG = "images/logo-paper.png";

export default function Logo({
  variant = "auto",
  className = "",
}: {
  variant?: "auto" | "negative";
  className?: string;
}) {
  /* Variante fija (p. ej. bajo mix-blend-difference en el hero) */
  if (variant === "negative") {
    return (
      <img
        src={LOGO_NEG}
        alt="Mono Cromat & Co."
        className={`logo-img ${className}`}
        draggable={false}
      />
    );
  }

  /* Automática: Oxford en páginas claras, papel en oscuras */
  return (
    <span className={`logo-swap ${className}`}>
      <img
        src={LOGO_INK}
        alt="Mono Cromat & Co."
        className="logo-img logo-ink"
        draggable={false}
      />
      <img
        src={LOGO_NEG}
        alt=""
        aria-hidden="true"
        className="logo-img logo-neg"
        draggable={false}
      />
    </span>
  );
}
