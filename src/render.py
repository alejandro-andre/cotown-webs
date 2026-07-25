"""
Motor de render: entorno Jinja2 con los filtros y shortcodes equivalentes a
los de Eleventy/Nunjucks (translate, find, slugify, literal, image, svg).
"""

from pathlib import Path
import operator
import re
import unicodedata

from jinja2 import Environment, FileSystemLoader, StrictUndefined, pass_context
from markupsafe import Markup

import data

BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"


# ---------------------------------------------------------------------------
# Filtros (equivalentes a los de config/.base.js)
# ---------------------------------------------------------------------------

def slugify(value):
    """Igual que el slugify de Eleventy: sin acentos, minúsculas y guiones."""
    if value is None:
        return ""
    value = str(value).lower()
    value = unicodedata.normalize("NFD", value)
    value = "".join(c for c in value if unicodedata.category(c) != "Mn")
    value = re.sub(r"[^a-z0-9\s-]", "-", value)
    value = re.sub(r"\s+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-")


def translate(item, key, lang):
    """Devuelve la versión inglesa del campo si existe y el idioma es 'en'."""
    if item is None:
        return ""
    if lang == "en":
        return item.get(key + "_en") or item.get(key, "")
    return item.get(key, "")


_CONDS = {
    "eq": operator.eq,
    "gt": operator.gt,
    "ge": operator.ge,
    "lt": operator.lt,
    "le": operator.le,
}


def _resolve(item, key):
    """Devuelve item['a']['b']['c'] para key='a.b.c', o None si falta algo."""
    current = item
    for part in key.split("."):
        if isinstance(current, dict) and part in current:
            current = current[part]
        else:
            return None
    return current


def find(items, key, cond="eq", value=None):
    """Filtra una lista por un campo (soporta rutas 'a.b.c')."""
    compare = _CONDS[cond]
    result = []
    for item in items or []:
        current = _resolve(item, key)
        if current is not None and compare(current, value):
            result.append(item)
    return result


# ---------------------------------------------------------------------------
# Shortcodes
# ---------------------------------------------------------------------------

@pass_context
def literal(ctx, text_id, lang):
    """Equivale a {% literal texts, 'id', L %}; la marca se lee del contexto."""
    override = data.TEXTS_SITE.get(ctx.get("site"), {})
    entry = override.get(text_id) or data.TEXTS.get(text_id)
    if entry is None:
        return Markup(f"<span style='color:red;'>[text missing {lang}: {text_id}]</span>")
    return Markup(entry[lang])


def picture(name, alt="", cls="", width=640, height=400, fmt="jpeg"):
    """Equivale al shortcode {% image %} de eleventy-img."""
    root = data.ROOT
    return Markup(
        f'<picture>'
        f'<source type="image/webp" srcset="{root}/assets/img/{name}.webp {width}w">'
        f'<img alt="{alt}" class="{cls}" loading="lazy" decoding="async" '
        f'src="{root}/assets/img/{name}.{fmt}" width="{width}" h="{height}">'
        f'</picture>'
    )


def svg(name):
    """Equivale al shortcode {% svg %}: inserta el SVG en línea."""
    path = STATIC_DIR / "assets" / "icons" / f"{name}.svg"
    if not path.exists():
        return Markup("")
    return Markup(path.read_text(encoding="utf-8"))


def asset(name):
    """Devuelve el contenido de un fichero estático (para inlinar JS)."""
    path = STATIC_DIR / "assets" / name
    return Markup(path.read_text(encoding="utf-8")) if path.exists() else Markup("")


# ---------------------------------------------------------------------------
# Entorno
# ---------------------------------------------------------------------------

def make_env():
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES_DIR)),
        autoescape=True,
        undefined=StrictUndefined,
        trim_blocks=False,
        lstrip_blocks=False,
        auto_reload=True,  # recarga plantillas al vuelo en desarrollo
    )
    env.filters["translate"] = translate
    env.filters["find"] = find
    env.filters["slugify"] = slugify
    env.globals.update(literal=literal, image=picture, svg=svg, asset=asset)
    return env


# Entorno único reutilizado entre peticiones (recarga plantillas por sí solo).
ENV = make_env()


def context(site="cotown", lang="en"):
    """Contexto global de la página (equivale a los datos globales de 11ty)."""
    cfg = data.SITES[site]
    page = data.LANGS[lang]["pages"]["index"]
    return {
        "L": lang,
        "site": site,
        "cfg": cfg,
        "siteid": cfg["siteid"],
        "root": data.ROOT,
        "langs": data.LANGS,
        "globals": cfg["globals"],
        "gtm": cfg["gtm"],
        "gtm_noscript": cfg["gtm_noscript"],
        "banners": data.BANNERS_SITE[site],
        "locations": data.LOCATIONS_SITE[site],
        "services": data.SERVICES,
        "partners": data.PARTNERS,
        "rrss": data.RRSS,
        "offices": data.OFFICES,
        "images": data.IMAGES,
        "promos": data.PROMOS,
        "title": page[site]["title"],
        "description": page[site]["description"],
        "city": "",
        "url": f"{data.ROOT}{data.LANGS[lang]['folder']}/",
        "alt": {
            "es": f"{data.ROOT}{data.LANGS['es']['folder']}/",
            "en": f"{data.ROOT}{data.LANGS['en']['folder']}/",
        },
    }


def render_home(site="cotown", lang="en"):
    return ENV.get_template("pages/home/index.html").render(**context(site, lang))


# Bloques de la home (para la página /test que los muestra por separado)
HOME_BLOCKS = [
    "main-header", "what-is", "locations", "choose",
    "services", "cotownity", "partners", "testimonial",
]


def render_test(site="cotown", lang="en"):
    ctx = context(site, lang)
    ctx["home_blocks"] = HOME_BLOCKS
    return ENV.get_template("pages/test/index.html").render(**ctx)
