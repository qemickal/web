# 🚀 Subir el hero a WordPress — Paso a paso (ruta plugin)

15 minutos · sin FTP · sin tocar tu tema · sobrevive a cambios de tema.

**La idea en 3 líneas:** el hero viaja como un mini-plugin. WordPress lo
sirve como portada; cuando hagas clic en TIENDA/ESTUDIO, la cortina te
lleva a páginas normales de WP que tú crearás.

---

## PARTE 1 · En tu computadora

### Paso 1 — Compila una vez para revisar que todo corre
```bash
npm run build
```
En `dist/` verás `index.html` + `images/`.

### Paso 2 — Apunta las imágenes al plugin
Abre **`src/media.ts`** y cambia UNA línea:

```ts
const IMG_BASE = "images";
// ⬇ déjala así:
const IMG_BASE = "/wp-content/plugins/mono-hero/hero/images";
```

> ¿Por qué? Así las fotos viajan DENTRO del plugin y un solo .zip lo
> sube todo. Sin esto, el hero saldría sin imágenes en WordPress.

### Paso 3 — Recompila
```bash
npm run build
```

### Paso 4 — Arma el plugin
Copia dentro de `wordpress/plugin/mono-hero/hero/`:

| Archivo origen | Destino |
|---|---|
| `dist/index.html` | `hero/` → **renómbralo `mono-hero.html`** |
| `dist/images/` (la carpeta entera) | `hero/images/` |

La carpeta debe quedar así:
```
mono-hero/
├── mono-hero.php          (ya estaba)
└── hero/
    ├── mono-hero.html     ← tuyo
    ├── images/            ← tuyas
    └── LEEME.txt
```

### Paso 5 — Comprime
Clic derecho sobre la carpeta **`mono-hero/`** → *Comprimir* / *Add to zip*.
Obtienes `mono-hero.zip`.

---

## PARTE 2 · En WordPress (tudominio.com/wp-admin)

### Paso 6 — Sube el plugin
**Plugins → Añadir nuevo → Subir plugin** → elige `mono-hero.zip`
→ **Instalar ahora** → **Activar**.

✔ *Chequeo:* en la lista de plugins debe aparecer **"Mono Hero — Portada"** activo.

### Paso 7 — Crea la portada
**Páginas → Añadir nueva** → título: `Inicio` → en el panel derecho
busca **Plantilla / Template** → elige **"Mono Hero — Portada (React)"**
→ **Publicar**.

### Paso 8 — Hazla la página de inicio
**Ajustes → Lectura → Tu página de inicio** → *Una página estática* →
Página de inicio: **Inicio** → **Guardar cambios**.

✔ *Chequeo final:* abre `tudominio.com` **en ventana de incógnito** →
debe verse el hero a pantalla completa, con imágenes y la diagonal.

🎉 **YA ESTÁ EN VIVO.**

---

## PARTE 3 · Cuando quieras que TIENDA/ESTUDIO abran páginas WP

Por ahora los CTAs muestran las páginas internas del paquete (hermosas,
pero de demo). Cuando tengas las páginas reales en WP:

1. En WP crea **Página "Tienda"** (enlace permanente `/tienda`) y
   **Página "Estudio"** (`/estudio`) — aunque estén en borrador de contenido.
2. En `src/brand.ts`:
   ```ts
   export const LINK_MODE = "wp";   // ← de "spa" a "wp"
   export const WP_URLS = { hero: "/", tienda: "/tienda", estudio: "/estudio" };
   ```
3. `npm run build` → copia el nuevo `mono-hero.html` al plugin
   (re-arma el zip y súbelo de nuevo; WP preguntará *"¿reemplazar el
   instalado?"* → sí).

Ahora los clics del hero abren la cortina y aterrizan en tus páginas WP.

---

## 😰 Si algo sale mal

| Síntoma | Causa probable | Arreglo |
|---|---|---|
| Hero negro, sin fotos | No hiciste el Paso 2/3 | Cambia `IMG_BASE`, recompila, re-arma el zip |
| "No encuentro hero/mono-hero.html" | El renombrado se olvidó | Paso 4: el archivo debe llamarse exactamente `mono-hero.html` |
| No aparece la plantilla al crear la página | Plugin sin activar | Plugins → Activar "Mono Hero — Portada" |
| Pantalla totalmente en blanco | Plugin de caché tocó el JS | WP Rocket/LiteSpeed/Autoptimize → excluye `/mono-hero/` (o limpia caché) |
| 404 al entrar a /wp-content/plugins/mono-hero/hero/images/tienda.jpg | La carpeta images no subió | Revisa Paso 4 y vuelve a comprimir CON la carpeta adentro |

## ¿Atrapada/o?
Dime **en qué paso estás** y **qué ves** (o mándame el texto del error)
y lo resolvemos juntos. ✦
