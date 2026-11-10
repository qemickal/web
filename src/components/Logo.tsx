/* ============================================================
   LOGO — Mono Cromat & Co.
   ------------------------------------------------------------
   PUNTO DE REEMPLAZO ÚNICO.
   Cuando tengas tu logotipo definitivo, borra el bloque
   "wordmark provisional" de abajo y descomenta la opción A o B.
   No necesitas tocar App.tsx ni el CSS del hero.

   A) SVG inline  → mejor opción: escala perfecto y hereda el
      color actual con fill="currentColor" (funciona con el
      mix-blend-difference del header sobre ambos universos).

   B) Archivo de imagen → coloca el archivo en
      public/images/logo.svg y usa la etiqueta <img>.
   ============================================================ */

export default function Logo({ className = "" }: { className?: string }) {
  /* ---------- A) SVG INLINE (recomendado) ----------
  return (
    <svg
      viewBox="0 0 240 40"
      role="img"
      aria-label="Mono Cromat & Co."
      className={`h-5 w-auto md:h-6 ${className}`}
      fill="currentColor"
    >
      <path d="..." />
    </svg>
  );
  */

  /* ---------- B) ARCHIVO DE IMAGEN ----------
  return (
    <img
      src="/images/logo.svg"
      alt="Mono Cromat & Co."
      className={`h-5 w-auto md:h-6 ${className}`}
    />
  );
  */

  /* ---------- Wordmark provisional (borrar al tener el logo) ---------- */
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-display text-base leading-none font-bold tracking-[-0.02em] uppercase md:text-lg">
        Mono Cromat
      </span>
      <span className="font-serif-i text-lg leading-none md:text-xl">&amp; Co.</span>
    </div>
  );
}
