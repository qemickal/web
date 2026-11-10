/* MONO CROMAT & CO. — Tokens de marca */

export type PageId = "hero" | "tienda" | "estudio";

export const C = {
  paper: "#F4F6F8",
  sky: "#9BC1E2",
  mint: "#7FC5C1",
  axis: "#0A50B1",
  navy: "#003366",
  night: "#0A1A2F",
} as const;

export const SLOGAN = "Lift your vision";

/* Motion (las transiciones del DOM viven en CSS con la misma curva) */
export const EASE = "power3.inOut";
export const WIPE_DUR = 0.52;
export const FLOAT_DUR = 3.4;

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
