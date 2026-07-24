"""
Home de Cotown servida dinámicamente con FastAPI.

La home se renderiza en cada petición (sin generación estática). Los assets
se sirven desde static/.

Arranque:

    uvicorn app:app --reload --port 5000

    http://localhost:5000/     -> home en inglés
    http://localhost:5000/es/  -> home en español
"""

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

import render

app = FastAPI(title="Cotown home")

# Assets (css, icons, js, img)
app.mount("/assets", StaticFiles(directory=render.STATIC_DIR / "assets"), name="assets")


@app.get("/", response_class=HTMLResponse)
def home_en():
    return render.render_home("en")


@app.get("/es", include_in_schema=False)
def home_es_redirect():
    return RedirectResponse("/es/")


@app.get("/es/", response_class=HTMLResponse)
def home_es():
    return render.render_home("es")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
