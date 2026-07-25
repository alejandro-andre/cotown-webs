"""
Genera el CSS servido purgando y fusionando el CSS por bloque.

    python tools/build_css.py

Cada bloque de plantilla lleva su CSS al lado (templates/**/<bloque>.css).
Este script los fusiona en dos bundles servidos, purgados con PurgeCSS contra
la home renderizada de cada marca e idioma:

  static/assets/css/common.css = vendor (pure+grids) + base + bloques comunes
                                 (header, menu, footer)
  static/assets/css/home.css   = base de la home + cada bloque de la home

Se dejan intactos (servidos directos): temas (cotown/vanguard.css), splide.css
y calendar.css (este último se copia desde su bloque).

Requisitos: Node + `npx purgecss` (se instala solo la primera vez).
Al añadir páginas/marcas/bloques, amplía las listas y re-ejecuta.
"""

import shutil
import subprocess
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SRC))

import render  # noqa: E402
import data    # noqa: E402

PURGE = SRC / ".purge"
OUT = PURGE / "out"
CSS = SRC / "static" / "assets" / "css"
TPL = SRC / "templates"
STYLES = SRC / "styles"

# Bundles servidos: (nombre de salida, lista ordenada de fuentes)
COMMON_SOURCES = [
    STYLES / "pure.min.css",
    STYLES / "grids-responsive.min.css",
    TPL / "layouts" / "base.css",
    TPL / "common" / "header" / "header.css",
    TPL / "common" / "menu" / "menu.css",
    TPL / "common" / "footer" / "footer.css",
]
HOME_SOURCES = [
    TPL / "pages" / "home" / "home.css",
    *[TPL / "pages" / "home" / b / f"{b}.css" for b in render.HOME_BLOCKS],
]
# Servidos directos (sin purgar), origen -> destino
COPIES = [(TPL / "common" / "calendar" / "calendar.css", CSS / "calendar.css")]

# Clases que añade el JS y no aparecen en el HTML estático
SAFELIST = ["input-error", "icon-corchete-up", "selected", "inside-selected", "hover", "open", "banner-hidden"]


def render_all():
    PURGE.mkdir(exist_ok=True)
    contents = []
    for site in data.SITES:
        for lang in data.LANGS:
            f = PURGE / f"{site}-{lang}.html"
            f.write_text(render.render_home(site, lang), encoding="utf-8")
            contents.append(f)
    return contents


def purge(contents):
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    srcs = [p.as_posix() for p in COMMON_SOURCES + HOME_SOURCES if p.exists()]
    npx = shutil.which("npx") or "npx"
    args = [
        npx, "--yes", "purgecss", "--css", *srcs, "--content",
        *[Path(c).as_posix() for c in contents], "--safelist", *SAFELIST,
        "--output", OUT.as_posix() + "/",
    ]
    subprocess.run(args, check=True)


def assemble(bundle_name, sources):
    parts = []
    for src in sources:
        purged = OUT / src.name
        if purged.exists():
            parts.append(f"/* === {src.name} === */\n{purged.read_text(encoding='utf-8')}")
    dest = CSS / bundle_name
    dest.write_text("\n".join(parts), encoding="utf-8")
    print(f"{bundle_name}: {dest.stat().st_size // 1024} KB ({len(parts)} bloques)")


if __name__ == "__main__":
    contents = render_all()
    purge(contents)
    assemble("common.css", COMMON_SOURCES)
    assemble("home.css", HOME_SOURCES)
    for src, dest in COPIES:
        shutil.copyfile(src, dest)
        print(f"{dest.name}: copiado (sin purgar)")
    print("Hecho. Purga contra TODAS las marcas/idiomas.")
