"""
Home de Cotown + Vanguard servida dinámicamente con FastAPI.

La home se renderiza en cada petición (sin generación estática). La marca se
resuelve por el Host de la petición (cotown* / vanguard*), con override por la
variable de entorno SITE o el query ?site= (cómodo en desarrollo).

Arranque:

    uvicorn app:app --reload --port 5000

    http://localhost:5000/                 -> home (marca por Host, por defecto cotown)
    http://localhost:5000/es/              -> home en español
    http://localhost:5000/?site=vanguard   -> forzar Vanguard en local
"""

import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

import data
import render

app = FastAPI(title="Cotown + Vanguard home")


# En desarrollo: no cachear los assets, así el CSS/JS se recargan sin hard-refresh
@app.middleware("http")
async def no_cache_assets(request: Request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/assets"):
        response.headers["Cache-Control"] = "no-store"
    return response


# Assets (css, icons, js, img)
app.mount("/assets", StaticFiles(directory=render.STATIC_DIR / "assets"), name="assets")


def site_of(request: Request) -> str:
    """Marca de esta petición: ?site= > env SITE > Host > cotown."""
    override = request.query_params.get("site") or os.environ.get("SITE", "")
    host = request.headers.get("host", "")
    return data.resolve_site(host, override)


@app.get("/", response_class=HTMLResponse)
def home_en(request: Request):
    return render.render_home(site_of(request), "en")


@app.get("/es", include_in_schema=False)
def home_es_redirect():
    return RedirectResponse("/es/")


@app.get("/es/", response_class=HTMLResponse)
def home_es(request: Request):
    return render.render_home(site_of(request), "es")


@app.get("/test", response_class=HTMLResponse)
def test_blocks(request: Request):
    """Página de desarrollo: muestra los bloques de la home por separado."""
    lang = request.query_params.get("lang", "en")
    return render.render_test(site_of(request), lang if lang in ("en", "es") else "en")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
