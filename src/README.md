# Home Cotown + Vanguard — FastAPI + Jinja2

Reproducción de la home de **cotown.com** y **vanguard-student-housing.com**
(las que hoy genera Eleventy/Nunjucks en [`../code`](../code)) usando FastAPI +
Jinja2. La home se sirve **sólo de forma dinámica** (se renderiza en cada
petición, sin generación estática). **De momento sin datos reales**: son
literales en [`data.py`](data.py), todavía no se consulta el GraphQL.

## Uso

```bash
pip install -r requirements.txt

uvicorn app:app --reload --port 5000   # o: python app.py
```

- `http://localhost:5000/` → home en inglés
- `http://localhost:5000/es/` → home en español
- `http://localhost:5000/?site=vanguard` → forzar Vanguard en local

Con `--reload`, uvicorn reinicia al editar `.py`; las plantillas Jinja2 se
recargan solas en cada petición (`auto_reload`).

## Dos marcas, una sola plantilla

Cotown y Vanguard comparten estructura; se diferencian en **tema** (colores +
fuentes + logo) y en unos pocos bloques. Por eso **hay una única home** con
`{% if site == 'vanguard' %}` puntual, no dos homes:

| Diferencia | Cómo se resuelve |
|---|---|
| Colores y fuentes | Variables CSS en el tema de marca (`cotown.css` / `vanguard.css`) |
| Logo, IDs (chatbot, Trustindex, GTM), fuentes | Config por marca en `data.SITES`, leída en plantilla |
| Textos que difieren (bienvenida, "qué es", banner) | `data.TEXTS_SITE[site]` (override sobre `TEXTS`) |
| Estructura que difiere (choose, what-is, locations, cotownity, main-header) | Rama `{% if site %}` en la sección |

La marca de cada petición se resuelve en [`app.py`](app.py): `?site=` (dev) >
env `SITE` > **Host** (`cotown*` / `vanguard*`) > `cotown` por defecto.

## CSS: común + tema + página (3 capas)

Cargado en cada página desde `head.html`:

1. **`common.css`** — layout, agnóstico de marca (usa `var(--…)`). Purgado.
2. **`<marca>.css`** (`cotown.css` / `vanguard.css`) — sólo el tema: `:root {…}`
   con colores y fuentes. Es el `variables.css` original, uno por marca.
3. **`<página>.css`** (`home.css`) — específico de la página. Purgado.

Aparte, cargados sólo donde se usan: `splide.css` y `calendar.css` (en la home)
y los iconos (`icons/style.css`, fuente de iconos, entera).

### Breakpoints (una sola escala, alineada con PureCSS)

Todo el responsive usa **3 cortes en `em`**, los mismos que la rejilla Pure:

| | em | px | clases Pure |
|---|---|---|---|
| md | 48em | 768 | `pure-u-md-*` |
| lg | 64em | 1024 | `pure-u-lg-*` |
| xl | 80em | 1280 | `pure-u-xl-*` |

Los "por debajo de" usan el complemento (`max-width: 47.99em / 63.99em / 79.99em`).
Se eliminaron el nivel ultra-wide (1600px), los cortes en px con fracciones
inconsistentes (767 / 1023.9 / 1279.9 …) y los hacks de IE11
(`-ms-high-contrast`). **Regla: no añadir px sueltos ni un cuarto nivel** (hay un
recordatorio en la cabecera de `styles/global.css` y `styles/home.css`).

### Regenerar el CSS purgado

`common.css` y `home.css` son **artefactos purgados** con PurgeCSS (a partir de
`pure` + `grids` + `global` + `home` de [`../code`](../code)), quedándose sólo
con lo que usan **ambas** marcas en **ambos** idiomas:

```bash
python tools/build_css.py
```

De ~176 KB de CSS a ~100 KB por página. Al **añadir páginas o marcas**, amplía
`SITES`/`LANGS` en `data.py` y vuelve a ejecutarlo: el común se purga contra
TODAS las páginas, así que hay que regenerarlo cuando el conjunto crece.
Necesita Node (`npx purgecss`, se instala solo la primera vez).

Las **fuentes CSS sin purgar** que se editan (breakpoints, estilos) viven en
[`styles/`](styles) (`global.css`, `home.css` + los vendor `pure`/`grids`).
`build_css.py` lee de ahí y escribe `common.css`/`home.css` purgados en
`static/assets/css/`. Es decir: se edita en `styles/`, se sirve lo de
`static/assets/css/`.

## Estructura

```
app.py                  App FastAPI: rutas / y /es/, resuelve la marca, monta /assets
render.py               Entorno Jinja2: filtros y shortcodes equivalentes a los de 11ty
data.py                 Datos (config por marca, textos, colecciones) — hoy literales
tools/build_css.py      Regenera common.css/home.css purgando con PurgeCSS
styles/                 CSS fuente EDITABLE sin purgar (global, home + vendor)
templates/
  layouts/base.html     Equivale a includes/shared/layouts/base.html.njk
  pages/index.html      Equivale a pages/index.html.njk
  sections/common/      head, header, footer, calendar
  sections/home/        main-header, what-is, locations, choose, services,
                        cotownity, partners, testimonial
static/assets/          css (common + temas + splide/calendar), icons, js, img
```

## Equivalencias Nunjucks → Jinja2

| Eleventy / Nunjucks | Aquí |
|---|---|
| `{% literal texts, 'id', L %}` | `{{ literal('id', L) }}` (la marca la lee del contexto) |
| `{% image src, L, alt, … %}` | `{{ image('home-640', alt='home') }}` |
| `{% svg src, name %}` | `{{ svg('services/wifi') }}` |
| `\| translate('Name', L)` | igual (filtro en `render.py`) |
| `\| find('Page','eq','home')` | igual |
| `\| slugify` | igual |
| `{% include site + '/...' %}` | rama `{% if site == 'vanguard' %}` |
| `layout:` + `{{ content }}` | `{% extends %}` + `{% block content %}` |

## Fidelidad

El texto renderizado coincide **1:1** con los cuatro publishes originales
(`../code/sites/{cotown,vanguard}-publish/{,es/}index.html`): 0 líneas de
diferencia de contenido en las 4 variantes (2 marcas × 2 idiomas).

Las imágenes son las del build de pruebas (`TEST11TY=test`), que sustituye las
fotos por un placeholder (`home-640.*`, `iunit-1028-600.*`). Al conectar el
dinamismo hay que apuntar al servidor de medios real.

## Siguientes pasos para el dinamismo

1. Sustituir las constantes de `data.py` por llamadas al GraphQL de Oimbra
   (mismos nombres de campo: `Name`/`Name_en`, `Text`/`Text_en`, …), de modo
   que las plantillas no cambien.
2. Recuperar el filtrado real de localizaciones por edificios con plazas
   disponibles (`buildings | find('District.Location.id', …)`).
3. Añadir el resto de páginas replicando `pages/index.html` (y regenerar el CSS).
