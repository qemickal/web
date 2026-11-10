/* ============================================================
   MEDIA — Imágenes del hero y de las tarjetas CardPress
   ------------------------------------------------------------
   PARA ACTUALIZAR LAS IMÁGENES tienes dos opciones:

   A) Lo más fácil: reemplaza los archivos en /public/images/
      conservando exactamente los mismos nombres y no tocas nada.
      (tienda.jpg, estudio.jpg trabajan a ~1600px+ de ancho,
      verticales u horizontales; el recorte es automático).

   B) Cambia las rutas aquí si quieres usar otros archivos.

   Recomendado: imágenes que respiren la paleta de la marca —
   Night Ink / Off-White para TIENDA, azules profundos para
   ESTUDIO — los overlays ya garantizan el contraste del texto.
   ============================================================ */

/* ============================================================
   IMG_BASE — carpeta base de las imágenes
   ------------------------------------------------------------
   "images"  (default) → rutas relativas: funciona abriendo
   dist/index.html local, en la raíz del dominio o en subcarpetas.

   Para WordPress CON EL PLUGIN Mono Hero → cambia a:

     const IMG_BASE = "/wp-content/plugins/mono-hero/hero/images";

   así las fotos viajan DENTRO del plugin (un solo .zip para todo).
   Después de cambiarla: npm run build  y re-arma el plugin.
   ============================================================ */

const IMG_BASE = "images";

export const img = (file: string) => `${IMG_BASE}/${file}`;

export const MEDIA = {
  tienda: {
    /* Fondo a sangre completa del panel TIENDA */
    heroBg: img("tienda.jpg"),
    heroAlt: "", /* decorativa: el panel ya tiene aria-label descriptivo */
    /* Estampa impresa dentro de la tarjeta CardPress */
    stamp: img("tienda.jpg"),
  },
  estudio: {
    heroBg: img("estudio.jpg"),
    heroAlt: "",
    stamp: img("estudio.jpg"),
  },
} as const;
