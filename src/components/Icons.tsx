/* Iconos CardPress — un icono por lanzamiento.
   SVG lineales, heredan color con currentColor. */

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/* 01 — Top Down Press: prensa vertical descendiendo sobre la tarjeta */
export function IconTopDown({ className = "", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      {/* prensa superior */}
      <path d="M24 4v10" />
      <path d="M16 10h16" />
      {/* platina descendiendo */}
      <path d="M12 18h24v6H12z" />
      {/* tarjeta */}
      <path d="M10 32h28" />
      <path d="M10 38h28" />
      {/* marcas de registro */}
      <path d="M7 44h4M37 44h4" />
      <path d="M24 26v3" strokeDasharray="2 3" />
    </svg>
  );
}

/* 02 — Over Press: capas superpuestas selladas */
export function IconOver({ className = "", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      {/* capas superpuestas */}
      <path d="M14 12h24v18H14z" />
      <path d="M10 18h24v18H10z" />
      {/* golpe de tinta */}
      <path d="M17 23l6 6 8-10" />
      {/* rodillo */}
      <path d="M6 8h36" strokeDasharray="3 4" />
      <path d="M24 40v4" />
    </svg>
  );
}

/* Asterisco sello — variante gráfica grande para composiciones */
export function MarkAsterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true">
      <path d="M32 6v52M9 19.5l46 25M55 19.5l-46 25" />
    </svg>
  );
}
