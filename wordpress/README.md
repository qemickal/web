# Mono Cromat & Co. — Integración con WordPress

La idea: **el hero es tu portada de entrada; WordPress es todo lo demás.**
Cada uno hace lo que mejor sabe hacer: React cuida la experiencia inmersiva,
WP administra páginas, blog, tienda y SEO.

---

## Qué contiene el paquete

Al compilar el proyecto (`npm run build`) obtienes en `/dist`:

```
dist/
├── index.html      ← TODO el hero inline (HTML + CSS + JS, ~123 KB gzip)
└── images/         ← fondos, estampas y fotos del catálogo
```

## Antes de compilar: decide el modo de enlaces

Abre **`src/brand.ts`**:

```ts
export const LINK_MODE: "spa" | "wp" = "wp";   // ← cámbialo a "wp"

export const WP_URLS: Record<PageId, string> = {
  hero: "/",
  tienda: "/tienda",      // ← la URL real de tu página Tienda en WP
  estudio: "/estudio",    // ← la URL real de tu página Estudio en WP
};
```

- `"spa"` → el paquete incluye sus propias páginas internas (demo).
- `"wp"` → TIENDA / ESTUDIO salen a tus páginas de WordPress,
   con la cortina azul/tinta como despedida elegante.

Después: `npm run build`.

---

## Opción A — El hero ES tu portada (recomendado)

Hero en `tudominio.com` · contenido WP en `tudominio.com/*`.

1. **Tema hijo.** Si no tienes uno, créalo (o pídeselo a tu hosting).
2. Sube **`wordpress/page-monohero.php`** a la raíz del tema hijo.
3. Crea la carpeta **`mono-hero/`** dentro del tema hijo y sube ahí el
   `dist/index.html` **renombrado a `mono-hero.html`**.
4. Sube la carpeta **`dist/images/`** a la **raíz del hosting**
   (queda `/images/`, junto a `wp-content/`).
5. En WP → **Páginas → Añadir nueva**: título "Inicio" y, en el panel
   *Plantilla*, elige **"Mono Hero — Portada"**. Publica.
6. **Ajustes → Lectura → Página de inicio** → selecciona "Inicio".

Listo. Tu estructura queda:

```
(mi hosting)/
├── images/                      ← assets del hero
├── wp-content/
│   └── themes/
│       └── tu-tema-hijo/
│           ├── functions.php    ← snippets opcionales (ver functions-snippets.php)
│           ├── page-monohero.php
│           └── mono-hero/
│               └── mono-hero.html
└── …WordPress…
```

## Opción B — El hero vive en una subcarpeta

Más limpio de archivos; el hero queda en `tudominio.com/inicio/`.

1. Sube `dist/index.html` y `dist/images/` a `/inicio/` en el hosting.
2. En WP, crea un ítem de menú o botón "Entrar" que apunte a `/inicio/`
   (o redirige la portada ahí con el plugin *Redirection*).

## Agregar tus secciones y páginas

Todo lo demás se crea normal en WordPress: páginas, entradas, WooCommerce,
menús. Los enlaces **dentro** del hero ya apuntan a las URLs de `WP_URLS`;
para que tus páginas de WP enlacen de vuelta, usa el menú habitual de WP
apuntando a `/` (la portada-hero).

## Actualizar el hero en el futuro

1. Edita lo que sea en el proyecto (textos, imágenes en `src/media.ts`, etc.).
2. `npm run build`.
3. Re-sube `mono-hero.html` (y `/images/` solo si cambiaron las imágenes).
   Dos archivos, 30 segundos.

---

## Solución de problemas

| Síntoma | Causa | Arreglo |
|---|---|---|
| Pantalla en negro, sin títulos | Las imágenes 404 | Verifica que `/images/` exista en la raíz (Opción A) o dentro de la subcarpeta (Opción B) |
| Tipografías por defecto | Sin internet en el visitante / CSP | Las fuentes vienen de Google Fonts; el sitio funciona igual con fallbacks |
| Hero en blanco total | Plugin de optimización reordenó el JS | Excluye `/mono-hero/` de WP Rocket/Autoptimize (snippet 2 incluido) |
| Barra negra de WP tapa el header | Estás logueado | Snippet 1 incluido la oculta solo en portada |
| Quiero otra URL para Tienda | — | Edita `WP_URLS` en `src/brand.ts` y re-compila |

## Notas

- **SEO**: la portada-hero es experiencia; el contenido rastreable vive en
  tus páginas WP (ahí instala tu plugin SEO favorito).
- **Fuentes/íconos**: se cargan de CDNs públicos (Google Fonts); nada de
  dependencias de plugins.
- **No edites `mono-hero.html` a mano**: cualquier cambio se hace en el
  proyecto y se recompila — editar el compilado es perder tiempo y cordura.
