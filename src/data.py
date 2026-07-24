"""
Datos estáticos de la home de Cotown.

De momento son literales: reproducen exactamente lo que hoy devuelve el
GraphQL de Oimbra + los ficheros src/data/*.js del build de Eleventy.
Se mantiene la forma original de los registros (Name / Name_en, Text /
Text_en, ...) para que, cuando se conecte el dinamismo, baste con sustituir
cada constante por la llamada a la API sin tocar las plantillas.
"""

# ---------------------------------------------------------------------------
# Globales del sitio
# ---------------------------------------------------------------------------

SITE = "cotown"
SITEID = 2
ROOT = ""

GLOBALS = {
    "author": "COTOWN",
    "url": "https://cotown.com",
    "image": "TBD",
    "rrss": {
        "wh": "https://wa.me/34663041433",
        "fb": "https://www.facebook.com/cotownspain/",
        "in": "https://www.linkedin.com/company/cotowngroup/",
        "tk": "https://www.tiktok.com/@cotown_es",
    },
}

GTM_ID = "GTM-TTZBHMV"
GTM_NOSCRIPT_ID = "GTM-5WR3Q84"

# ---------------------------------------------------------------------------
# Idiomas y páginas
# ---------------------------------------------------------------------------

LANGS = {
    "en": {
        "folder": "",
        "locale": "en_US",
        "pages": {
            "index": {
                "url": "index",
                "text": "",
                "cotown": {
                    "title": "Coliving & Shared Apartments in Spain - COTOWN",
                    "description": "Coliving in Spain ideal for digital nomads. Modern, tech-savvy rooms with all services included. ⭐⭐⭐⭐⭐",
                },
            },
            "locations": {"url": "destinations", "text": "Destinations"},
            "rooms": {"url": "shared-flats", "text": "Locations"},
            "flats": {"url": "private-apartments", "text": "Locations"},
            "residences": {"url": "residences", "text": "Residences"},
            "advantages": {"url": "membership", "text": "Membership"},
            "faqs": {"url": "faqs", "text": "FAQs"},
            "blog": {"url": "blog", "text": "Blog"},
            "contact": {"url": "contact", "text": "Contact"},
            "privacy": {"url": "privacy", "text": "Privacy policies"},
            "legal": {"url": "aviso-legal", "text": "Legal"},
            "datasecurity": {"url": "datasecurity", "text": "Data security"},
            "book": {"url": "book", "text": "Book now!"},
        },
    },
    "es": {
        "folder": "/es",
        "locale": "es_ES",
        "pages": {
            "index": {
                "url": "index",
                "text": "",
                "cotown": {
                    "title": "Pisos compartidos - Coliving COTOWN",
                    "description": "Coliving en España ideal para nómadas digitales. Habitaciones modernas, tecnológicas y con todos los servicios incluidos. ⭐⭐⭐⭐⭐",
                },
            },
            "locations": {"url": "destinos", "text": "Destinos"},
            "rooms": {"url": "pisos-compartidos", "text": "Localizaciones"},
            "flats": {"url": "apartamentos-privados", "text": "Localizaciones"},
            "residences": {"url": "residencias", "text": "Residencias"},
            "advantages": {"url": "membership", "text": "Membership"},
            "faqs": {"url": "preguntas-frecuentes", "text": "FAQs"},
            "blog": {"url": "blog", "text": "Blog"},
            "contact": {"url": "contacto", "text": "Contacto"},
            "privacy": {"url": "politica-privacidad", "text": "Politica de privacidad"},
            "legal": {"url": "aviso-legal", "text": "Aviso legal"},
            "datasecurity": {"url": "seguridad-datos", "text": "Seguridad y datos"},
            "book": {"url": "reserva", "text": "¡Reserva ahora!"},
        },
    },
}

# ---------------------------------------------------------------------------
# Literales (equivalente al shortcode {% literal texts, 'id', L %})
# ---------------------------------------------------------------------------

TEXTS = {
    # Cabecera / botones
    "button-descubrir": {"es": "Contactar", "en": "Contact"},
    "button-area-privada": {"es": "Mi cuenta", "en": "My account"},
    "button-reservar": {"es": "Reservar", "en": "Book"},
    "button-buscar": {"es": "Buscar", "en": "Search"},
    "button-nuevo-hogar": {"es": "Encontrar mi nuevo hogar", "en": "Find my new home"},
    # Buscador
    "home-bienvenido": {
        "es": 'BIENVENIDO AL <span class="pure-u-1">COLIVING.</span>',
        "en": 'WELCOME TO THE <span class="pure-u-1">COLIVING.</span>',
    },
    "home-bienvenido-donde": {"es": "Quiero vivir en", "en": "I want to live in"},
    "home-bienvenido-tipo": {"es": "Tipo de alojamiento", "en": "Accommodation type"},
    "home-bienvenido-cuando": {"es": "Cuándo", "en": "When"},
    "home-donde-seleccionar": {"es": "Seleccionar Ubicación", "en": "Select location"},
    # Qué es
    "home-que-es-h1": {"es": "", "en": ""},
    "home-que-es-titulo": {"es": "¿Qué es Cotown?", "en": "What is Cotown?"},
    "home-que-es-texto": {
        "es": "<p></p>"
        "<p>Cotown llega al mercado para revolucionar el concepto de <strong>Coliving en España</strong>. "
        "Pero, sobre todo, brindar la oportunidad a los futuros cotowners, tanto nacionales e internacionales, "
        "de ser «ciudadanos con suerte».</p>"
        "<p>Desde el equipo de Cotown, nos proponemos cubrir y dar apoyo a esta nueva necesidad de vivienda "
        "temporal para impulsar la optimización de los espacios dentro de los pisos y transformarlos en un hogar "
        "moderno, tecnológico y adaptable a cualquier circunstancia. <strong>El 100% de nuestra energía está "
        "dedicada a hacer que te sientas como en casa</strong>.</p>"
        "<p><strong>¡Bienvenido/a!</strong></p><p></p>",
        "en": "<p></p>"
        "<p>Cotown has come to the market to revolutionize the concept of <strong>Coliving in Spain</strong>. "
        "But above all, to offer the opportunity to future cotowners, both national and international, to be "
        "&quot;lucky citizens.&quot;</p>"
        "<p>From the Cotown team, we aim to cover and support this new need for temporary housing to boost the "
        "optimization of spaces within apartments and transform them into a modern, technological, and adaptable "
        "home for any circumstance. <strong>100% of our energy is dedicated to making you feel at home</strong>.</p>"
        "<p><strong>Welcome!</strong></p><p></p>",
    },
    # Localizaciones
    "home-localizaciones-titulo": {
        "es": "¿Dónde quieres vivir?",
        "en": "Where do you want to live?",
    },
    # Elige alojamiento
    "home-pisazos-elige": {
        "es": "Elige tu alojamiento temporal",
        "en": "Choose your temporary housing",
    },
    "home-pisazos-apartamento": {"es": "Apartamento", "en": "Private"},
    "home-pisazos-privado": {"es": "Privado", "en": "Apartment"},
    "home-pisazos-piso": {"es": "Piso", "en": "Shared"},
    "home-pisazos-compartido": {"es": "Compartido", "en": "Flat"},
    "home-pisazos-residencia": {"es": "Residencia", "en": "Student"},
    "home-pisazos-universitaria": {"es": "Universitaria", "en": "Residence"},
    # Servicios
    "home-servicios-titulo": {
        "es": "Todos los servicios incluidos",
        "en": "All services included",
    },
    "home-servicios-texto": {
        "es": "Descubre todo lo que tendrás en tu nuevo hogar",
        "en": "Discover everything you'll have in your new home",
    },
    # Cotownity
    "home-cotownity-titulo": {
        "es": "Unete a nuestra cotownity",
        "en": "Join our cotownity",
    },
    "home-cotownity-hashtag": {"es": "#FEELINGLOCAL.", "en": "#FEELINGLOCAL."},
    "home-cotownity-tag": {
        "es": '<script defer async src="https://cdn.trustindex.io/loader-feed.js?157050262bc52637fc1658da5aa"></script>',
        "en": '<script defer async src="https://cdn.trustindex.io/loader-feed.js?157050262bc52637fc1658da5aa"></script>',
    },
    "home-cotownity-tag-mobile": {
        "es": '<script defer async src="https://cdn.trustindex.io/loader-feed.js?157050262bc52637fc1658da5aa"></script>',
        "en": '<script defer async src="https://cdn.trustindex.io/loader-feed.js?157050262bc52637fc1658da5aa"></script>',
    },
    # Partners
    "home-partners-titulo": {"es": "Nuestros partners", "en": "Our partners"},
    # Testimonios
    "home-testimonios-titulo": {
        "es": '<h2 class="head2 title">Qué dicen<div class="head2 title turquoise">de nosotros</div></h2>',
        "en": '<h2 class="head2 title">What they say<div class="head2 title turquoise">about us</div></h2>',
    },
    # Calendario
    "cal-seleccionar-fechas": {"es": "Seleccionar fechas", "en": "Select dates"},
    "cal-borrar-fechas": {"es": "Borrar fechas", "en": "Clear dates"},
    "cal-estancia-minima": {"es": "Estancia mínima: 1 mes", "en": "Minimum stay: 1 month"},
    "cal-error": {
        "es": "Mínima estancia 1 mes, máxima 11 meses",
        "en": "Minimum stay 1 month, maximum stay 11 months",
    },
    "cal-cerrar": {"es": "Cerrar", "en": "Close"},
    "cal-seleccionar": {"es": "Seleccionar", "en": "Select"},
    "dates-entrada": {"es": "Entrada", "en": "Check in"},
    "dates-salida": {"es": "Salida", "en": "Check out"},
    # Meta / tags
    "meta": {
        "es": '<meta name="google-site-verification" content="fj5OuAzbg6T7hX2HjohS-2hH_zotI8pezWjziKX2dac"/>',
        "en": '<meta name="google-site-verification" content="fj5OuAzbg6T7hX2HjohS-2hH_zotI8pezWjziKX2dac"/>',
    },
}

# ---------------------------------------------------------------------------
# Colecciones
# ---------------------------------------------------------------------------

BANNERS = [
    {
        "id": 4,
        "Page": "home",
        "Text": "¿Necesitas ayuda para reservar? Contáctanos",
        "Text_en": "Need help with your booking? Contact us",
        "Link": "https://cotown.com/es/contacto.html",
        "Link_en": "https://cotown.com/contact.html",
    }
]

LOCATIONS = [
    {"id": 1, "Name": "Barcelona", "Name_en": "Barcelona", "image": "home-640"},
    {"id": 3, "Name": "Valencia", "Name_en": "Valencia", "image": "home-640"},
]

SERVICES = [
    {
        "icon": "assistance",
        "Name": "24h Asistencia a emergencias",
        "Name_en": "24hr emergency assistance",
        "Description": "Estamos disponibles las 24 horas para cualquier urgencia en tu piso. La invasión alienígena va aparte, pero para lo demás, cuenta con nosotros.",
        "Description_en": "We are available 24 hours a day for any urgent issues. Alien invasions not included (yet).",
    },
    {
        "icon": "paperwork",
        "Name": "Apoyo en trámites administrativos",
        "Name_en": "Support in administrative procedures",
        "Description": "Firmas, papeles… Respira, nosotros nos encargamos de la burocracia en tu relocation en España.",
        "Description_en": "Signatures, paperwork...don’t worry, we’ll handle all the Spanish bureaucracy for your move.",
    },
    {
        "icon": "wifi",
        "Name": "Internet WI-FI",
        "Name_en": "Internet WI-FI",
        "Description": "Obviamente, el internet de alta velocidad va incluido en tu cuota. Qué somos ¿torturadores? Estarás conectado desde el minuto uno.",
        "Description_en": "Obviously, high-speed internet is included in your stay. You’ll be connected from the moment you arrive.",
    },
    {
        "icon": "maintenance",
        "Name": "Mantenimiento",
        "Name_en": "General apartment maintenance",
        "Description": "McGyver al lado de nuestro equipo de mantenimiento, era un aficionado. Si algo falla en tu piso de alquiler temporal, lo arreglamos rápido para que tú sigas disfrutando de la ciudad.",
        "Description_en": "Compared to our maintenance team, MacGyver was an amateur. If something breaks in your short-term rental, we’ll fix it fast so you can get back to enjoying your stay in Spain.",
    },
    {
        "icon": "cleaning",
        "Name": "Servicio profesional de limpieza",
        "Name_en": "Flat cleaning service",
        "Description": "Mary Poppins se largó por la ventana, pero tenemos reemplazo. Todo controlado, tu descansa.",
        "Description_en": "Mary Poppins floated off through the window, but we've got someone to take her place. Just relax! Everything’s under control.",
    },
    {
        "icon": "utilities",
        "Name": "Suministros: luz, agua y/o gas",
        "Name_en": "Utilities: electricity, water and/or gas included",
        "Description": "La vida es eso que pasa mientras consigues contratar los suministros. En este caso también nos encargamos nosotros. Olvida las facturas. Tu alquiler incluye luz, agua y gas.",
        "Description_en": "Life is what happens while you’re busy struggling to get hooked up to utilities. Never fear, we take care of all this as well. Forget the invoices. Tu alquiler incluye luz, agua y gas.",
    },
]

PARTNERS = [
    {"id": i + 1, "Name": name, "image": "iunit-1028-600"}
    for i, name in enumerate(
        [
            "IUNIT", "Euncet", "EINA", "ELISAVA", "ESERP", "Harbour Space", "EAE",
            "IUCT", "GRISART", "CITYLIFE", "BERKLEE", "UIBS", "EADA", "seeway",
            "insa", "TBS", "eu", "OSTELEA", "FD MODA", "COMPLOT", "HOTEL ARTS",
            "isep", "EDEM", "IDEP", "Middlebury", "udit",
        ]
    )
]

RRSS = [
    {"Name": "whatsapp", "Link": "https://wa.me/34663041433"},
    {"Name": "tiktok", "Link": "https://www.tiktok.com/@cotown_es"},
    {"Name": "facebook", "Link": "https://www.facebook.com/cotownspain/"},
    {"Name": "spotify", "Link": "https://open.spotify.com/user/316xl34pr2hf2iu5a32p2mldtuaa?si=56c886f7467e43f6"},
    {"Name": "instagram", "Link": "https://www.instagram.com/cotown_es/"},
    {"Name": "linkedin", "Link": "https://www.linkedin.com/company/cotowngroup/"},
]

OFFICES = [
    {
        "Address": "C / Beethoven 15, 7ª planta. 08021 Barcelona, España.",
        "Phone": "+34 93 595 29 39",
        "Phones": "",
        "Email": "hola@cotown.com",
    }
]

# Imágenes de la home (en el build real vienen del servidor de medios)
IMAGES = {
    "home": "home-640",
    "cotownity": "home-640",
    "apartamento-privado": "home-640",
    "piso-compartido": "home-640",
}

# Descuentos activos (sticker de promoción sobre la foto principal)
PROMOS = []
