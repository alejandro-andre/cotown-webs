# Cotown home — FastAPI + Jinja2

Reproducción de la home de cotown.com (la que hoy genera Eleventy/Nunjucks en
[`../code`](../code)) usando FastAPI + Jinja2. La home se sirve **sólo de forma
dinámica** (se renderiza en cada petición, sin generación estática). **De
momento sin datos reales**: son literales en [`data.py`](data.py), todavía no se
consulta el GraphQL.

## Uso

```bash
pip install -r requirements.txt

uvicorn app:app --reload --port 5000   # o: python app.py
```

- `http://localhost:5000/` → home en inglés
- `http://localhost:5000/es/` → home en español

Con `--reload`, uvicorn reinicia al editar `.py`; las plantillas Jinja2 se
recargan solas en cada petición (`auto_reload`). Basta con guardar y refrescar.

## Estructura

```
app.py                  App FastAPI: rutas / y /es/ + montaje de /assets
render.py               Entorno Jinja2: filtros y shortcodes equivalentes a los de 11ty
data.py                 Datos (textos, localizaciones, servicios, partners…) — hoy literales
templates/
  layouts/base.html     Equivale a includes/shared/layouts/base.html.njk
  pages/index.html      Equivale a pages/index.html.njk
  sections/common/      head, header, footer, calendar
  sections/home/        main-header, what-is, locations, choose, services,
                        cotownity, partners, testimonial
static/assets/          css, icons, js, img (copiados del build actual)
```

## Equivalencias Nunjucks → Jinja2

| Eleventy / Nunjucks | Aquí |
|---|---|
| `{% literal texts, 'id', L %}` | `{{ literal('id', L) }}` |
| `{% image src, L, alt, … %}` | `{{ image('home-640', alt='home') }}` |
| `{% svg src, name %}` | `{{ svg('services/wifi') }}` |
| `\| translate('Name', L)` | igual (filtro en `render.py`) |
| `\| find('Page','eq','home')` | igual |
| `\| slugify` | igual |
| `layout:` + `{{ content }}` | `{% extends %}` + `{% block content %}` |
| `{% block head %}` / `{% block footer %}` | igual, definidos en `pages/index.html` |

Los `{% block %}` que en 11ty aparecían dentro de includes (calendario,
buscador, footer) aquí se emiten en línea, que es lo que hacía el build real.

Los assets (`static/assets/`) se sirven con `StaticFiles` montado en `/assets`.

## Fidelidad

El HTML generado coincide **texto a texto y etiqueta a etiqueta** con
`../code/sites/cotown-publish/index.html` y `.../es/index.html` (salvo la
minificación y el orden de un par de `<link>`).

Las imágenes son las del último build de pruebas (`TEST11TY=test`), que
sustituye todas las fotos por un placeholder: `home-640.*` para la foto
principal, localizaciones, cotownity y tipos de alojamiento, e
`iunit-1028-600.*` para los partners. Al conectar el dinamismo hay que
sustituirlas por las URLs reales del servidor de medios.

## Siguientes pasos para el dinamismo

1. Sustituir las constantes de `data.py` por llamadas al GraphQL de Oimbra
   (mismos nombres de campo: `Name`/`Name_en`, `Text`/`Text_en`, …), de modo
   que las plantillas no cambien.
2. Recuperar en `context()` el filtrado real de localizaciones por edificios
   con plazas disponibles (`buildings | find('District.Location.id', …)`).
3. Añadir el resto de páginas replicando `pages/index.html`.
