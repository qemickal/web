/* MONO CROMAT & CO. — Tokens de marca */

export type PageId = "hero" | "tienda" | "estudio";

export const C = {
  /* Paleta oficial — Manual de marca Mono Cromat & Co., ed. 01 */
  paper: "#FAF7F4", /* Blanco papel — reserva de papel, fondos claros */
  sky: "#57C1E8", /* Sky Blue — tintas planas de apoyo */
  mint: "#4CD8C0", /* Mint Teal — acento y contraste cálido */
  bright: "#1A86D0", /* Bright Blue — énfasis y datos numéricos */
  royal: "#2E48A1", /* Royal Blue — color institucional, la voz del estudio */
  oxford: "#081C30", /* Oxford Dark — texto y fondos de alto contraste */
} as const;

export const SLOGAN = "Lift your vision";

/* Motion (las transiciones del DOM viven en CSS con la misma curva) */
export const EASE = "power3.inOut";
export const WIPE_DUR = 0.52;

/* Labels de la cortina de transición */
export const WIPE_LABEL: Record<PageId, string> = {
  hero: "Mono Cromat & Co.",
  tienda: "Tienda",
  estudio: "Estudio",
};

/* ============================================================
   MODO DE ENLACES — SPA o WordPress
   ------------------------------------------------------------
   "spa" (default): TIENDA/ESTUDIO navegan a las páginas internas
   incluidas en este paquete, con la cortina de transición.

   "wp": los CTAs y enlaces cruzados salen hacia las páginas de tu
   WordPress (las URLs de abajo), igual con la cortina como salida.
   Ponlo en "wp" ANTES de compilar para tu sitio y edita las URLs.
   ============================================================ */

export const LINK_MODE: "spa" | "wp" = "spa";

export const WP_URLS: Record<PageId, string> = {
  hero: "/",
  tienda: "/tienda", // ← URL de tu página Tienda en WordPress
  estudio: "/estudio", // ← URL de tu página Estudio en WordPress
};
