"""
Home de Cotown / Vanguard servida dinámicamente con FastAPI.

La marca se fija AL ARRANCAR (una instancia = una marca), por la variable de
entorno SITE o como argumento de `python app.py`. NO se resuelve por querystring
ni por Host.

Arranque (PowerShell):

    $env:SITE = "vanguard"; uvicorn app:app --reload --port 5000
    # o
    python app.py vanguard

Sin SITE arranca en Cotown (marca por defecto).

    http://localhost:5000/      -> home en inglés
    http://localhost:5000/es/   -> home en español
    http://localhost:5000/test  -> bloques por separado (?lang=es|en)
"""

import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

import data
import render

# Marca de esta instancia (parámetro de arranque): env SITE > cotown
SITE = os.environ.get("SITE", "").lower()
if SITE not in data.SITES:
    SITE = data.DEFAULT_SITE

app = FastAPI(title=f"{SITE} home")


# En desarrollo: no cachear los assets, así el CSS/JS se recargan sin hard-refresh
@app.middleware("http")
async def no_cache_assets(request: Request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/assets"):
        response.headers["Cache-Control"] = "no-store"
    return response


# Assets (css, icons, js, img)
app.mount("/assets", StaticFiles(directory=render.STATIC_DIR / "assets"), name="assets")


@app.get("/", response_class=HTMLResponse)
def home_en():
    return render.render_home(SITE, "en")


@app.get("/es", include_in_schema=False)
def home_es_redirect():
    return RedirectResponse("/es/")


@app.get("/es/", response_class=HTMLResponse)
def home_es():
    return render.render_home(SITE, "es")


@app.get("/test", response_class=HTMLResponse)
def test_blocks(request: Request):
    """Página de desarrollo: muestra los bloques de la home por separado."""
    lang = request.query_params.get("lang", "en")
    return render.render_test(SITE, lang if lang in ("en", "es") else "en")


if __name__ == "__main__":
    import sys
    import uvicorn

    # python app.py [site]  -> fija la marca antes de arrancar
    if len(sys.argv) > 1:
        os.environ["SITE"] = sys.argv[1]
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
