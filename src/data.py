"""
Datos estáticos de la home (Cotown + Vanguard).

De momento son literales: reproducen lo que hoy devuelve el GraphQL de Oimbra +
los ficheros src/data/*.js del build de Eleventy. Se mantiene la forma original
de los registros (Name / Name_en, Text / Text_en, ...) para que, al conectar el
dinamismo, baste con sustituir cada constante por la llamada a la API sin tocar
las plantillas.

Multi-marca: casi todo es compartido. Lo que cambia por marca vive en SITES
(config: tema, IDs, dominio…) y en TEXTS_SITE (los pocos literales que difieren).
El resto de literales están en TEXTS (compartidos) y las colecciones (servicios,
partners, rrss, oficinas…) son iguales para ambas marcas.
"""

ROOT = ""

# Redes sociales del grupo (compartidas por ambas marcas)
_RRSS = {
    "wh": "https://wa.me/34663041433",
    "fb": "https://www.facebook.com/cotownspain/",
    "in": "https://www.linkedin.com/company/cotowngroup/",
    "tk": "https://www.tiktok.com/@cotown_es",
}

# ---------------------------------------------------------------------------
# Configuración por marca
# ---------------------------------------------------------------------------

SITES = {
    "cotown": {
        "site": "cotown",
        "siteid": 2,
        "theme": "cotown",          # -> /assets/css/cotown.css
        "hosts": ["cotown"],        # para resolver la marca por Host
        "globals": {
            "author": "COTOWN",
            "url": "https://cotown.com",
            "image": "TBD",
            "rrss": _RRSS,
        },
        "gtm": "GTM-TTZBHMV",
        "gtm_noscript": "GTM-5WR3Q84",
        "chatbot": "RXTmkM7BH7zPHDn",
        "trustindex_review": "b81fc5a47c3698375c26c38bc02",
        "trustindex_feed": "157050262bc52637fc1658da5aa",
        "fonts": "https://fonts.googleapis.com/css2?family=Oswald&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    "vanguard": {
        "site": "vanguard",
        "siteid": 1,
        "theme": "vanguard",        # -> /assets/css/vanguard.css
        "hosts": ["vanguard"],
        "globals": {
            "author": "VANGUARD",
            "url": "https://vanguard-student-housing.com",
            "image": "TBD",
            "rrss": _RRSS,
        },
        "gtm": "GTM-5WR3Q84",
        "gtm_noscript": "GTM-5WR3Q84",
        "chatbot": "7JlqKofVUMYNH2e",
        "trustindex_review": "2c6f462478c79832ad16d67d132",
        "trustindex_feed": "efe214b62a0b264f2536fe492d2",
        "fonts": "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
}

DEFAULT_SITE = "cotown"


def resolve_site(host="", override=""):
    """Elige la marca por override (env/query) o por el Host de la petición."""
    if override in SITES:
        return override
    host = (host or "").lower()
    for name, cfg in SITES.items():
        if any(h in host for h in cfg["hosts"]):
            return name
    return DEFAULT_SITE


# ---------------------------------------------------------------------------
# Idiomas y páginas (compartido; sólo el título/descr del index cambia por marca)
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
                "vanguard": {
                    "title": "Student Apartments in Spain - Vanguard Student Housing",
                    "description": "Student apartments in the best locations in Spain. Come and experience authentic student coliving.",
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
                "vanguard": {
                    "title": "Pisos para estudiantes en España - Vanguard Student Housing",
                    "description": "Pisos para estudiantes en las mejores ubicaciones de España. Ven a vivir el auténtico coliving para estudiantes universitari@s.",
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
# Literales compartidos (equivale al shortcode {% literal texts, 'id', L %})
# ---------------------------------------------------------------------------

TEXTS = {
    # Cabecera / botones
    "button-descubrir": {"es": "Contactar", "en": "Contact"},
    "button-area-privada": {"es": "Mi cuenta", "en": "My account"},
    "button-reservar": {"es": "Reservar", "en": "Book"},
    "button-buscar": {"es": "Buscar", "en": "Search"},
    # Buscador
    "home-bienvenido-donde": {"es": "Quiero vivir en", "en": "I want to live in"},
    "home-bienvenido-tipo": {"es": "Tipo de alojamiento", "en": "Accommodation type"},
    "home-bienvenido-cuando": {"es": "Cuándo", "en": "When"},
    "home-donde-seleccionar": {"es": "Seleccionar Ubicación", "en": "Select location"},
    # Qué es
    "home-que-es-h1": {"es": "", "en": ""},
    # Localizaciones (igual en ambas marcas)
    "home-localizaciones-titulo": {"es": "¿Dónde quieres vivir?", "en": "Where do you want to live?"},
    # Elige alojamiento
    "home-pisazos-elige": {"es": "Elige tu alojamiento temporal", "en": "Choose your temporary housing"},
    "home-pisazos-apartamento": {"es": "Apartamento", "en": "Private"},
    "home-pisazos-privado": {"es": "Privado", "en": "Apartment"},
    "home-pisazos-piso": {"es": "Piso", "en": "Shared"},
    "home-pisazos-compartido": {"es": "Compartido", "en": "Flat"},
    "home-pisazos-residencia": {"es": "Residencia", "en": "University"},
    "home-pisazos-universitaria": {"es": "Universitaria", "en": "Residence"},
    # Servicios (el subtítulo es igual)
    "home-servicios-texto": {"es": "Descubre todo lo que tendrás en tu nuevo hogar", "en": "Discover everything you'll have in your new home"},
    # Cotownity
    "home-cotownity-hashtag": {"es": "#FEELINGLOCAL.", "en": "#FEELINGLOCAL."},
    # Partners
    "home-partners-titulo": {"es": "Nuestros partners", "en": "Our partners"},
    # Calendario
    "cal-seleccionar-fechas": {"es": "Seleccionar fechas", "en": "Select dates"},
    "cal-borrar-fechas": {"es": "Borrar fechas", "en": "Clear dates"},
    "cal-estancia-minima": {"es": "Estancia mínima: 1 mes", "en": "Minimum stay: 1 month"},
    "cal-error": {"es": "Mínima estancia 1 mes, máxima 11 meses", "en": "Minimum stay 1 month, maximum stay 11 months"},
    "cal-cerrar": {"es": "Cerrar", "en": "Close"},
    "cal-seleccionar": {"es": "Seleccionar", "en": "Select"},
    "dates-entrada": {"es": "Entrada", "en": "Check in"},
    "dates-salida": {"es": "Salida", "en": "Check out"},
    # Meta (base vacío; cada marca añade el suyo en TEXTS_SITE)
    "meta": {"es": "", "en": ""},
}

# Literales que cambian por marca (override de TEXTS)
TEXTS_SITE = {
    "cotown": {
        "home-bienvenido": {
            "es": "BIENVENIDO AL <br>COLIVING.",
            "en": "WELCOME TO THE <br>COLIVING.",
        },
        "home-que-es-titulo": {"es": "¿Qué es Cotown?", "en": "What is Cotown?"},
        "home-que-es-texto": {
            "es": "<p></p><p>Cotown llega al mercado para revolucionar el concepto de <strong>Coliving en España</strong>. "
            "Pero, sobre todo, brindar la oportunidad a los futuros cotowners, tanto nacionales e internacionales, "
            "de ser «ciudadanos con suerte».</p>"
            "<p>Desde el equipo de Cotown, nos proponemos cubrir y dar apoyo a esta nueva necesidad de vivienda "
            "temporal para impulsar la optimización de los espacios dentro de los pisos y transformarlos en un hogar "
            "moderno, tecnológico y adaptable a cualquier circunstancia. <strong>El 100% de nuestra energía está "
            "dedicada a hacer que te sientas como en casa</strong>.</p>"
            "<p><strong>¡Bienvenido/a!</strong></p><p></p>",
            "en": "<p></p><p>Cotown has come to the market to revolutionize the concept of <strong>Coliving in Spain</strong>. "
            "But above all, to offer the opportunity to future cotowners, both national and international, to be "
            "&quot;lucky citizens.&quot;</p>"
            "<p>From the Cotown team, we aim to cover and support this new need for temporary housing to boost the "
            "optimization of spaces within apartments and transform them into a modern, technological, and adaptable "
            "home for any circumstance. <strong>100% of our energy is dedicated to making you feel at home</strong>.</p>"
            "<p><strong>Welcome!</strong></p><p></p>",
        },
        "home-servicios-titulo": {"es": "Todos los servicios incluidos", "en": "All services included"},
        "home-cotownity-titulo": {"es": "Unete a nuestra cotownity", "en": "Join our cotownity"},
        "home-testimonios-titulo": {
            "es": '<h2 class="text-xx-large title">Qué dicen<div class="text-xx-large title turquoise">de nosotros</div></h2>',
            "en": '<h2 class="text-xx-large title">What they say<div class="text-xx-large title turquoise">about us</div></h2>',
        },
        "meta": {
            "es": '<meta name="google-site-verification" content="fj5OuAzbg6T7hX2HjohS-2hH_zotI8pezWjziKX2dac"/>',
            "en": '<meta name="google-site-verification" content="fj5OuAzbg6T7hX2HjohS-2hH_zotI8pezWjziKX2dac"/>',
        },
    },
    "vanguard": {
        "home-bienvenido": {
            "es": "Encuentra tu alojamiento para estudiantes",
            "en": "Find your student accommodation",
        },
        "home-que-es-titulo": {"es": "¿Qué es Vanguard Student Housing?", "en": "What’s Vanguard Student Housing all about?"},
        "home-que-es-texto": {
            "es": "<p></p><p>Si eres estudiante y estás list@ para dar el gran paso de independizarte, Vanguard es el "
            "servicio de alojamiento temporal perfecto para ti.</p>"
            "<p>Vanguard es &quot;where everything begins&quot; , el punto de partida ideal para estudiantes universitarios "
            "que quieren comenzar a escribir su propia historia y abrirse camino en el mundo. Aquí encontrarás una "
            "comunidad vibrante y amigable, con otros estudiantes que, al igual que tú, están listos para enfrentar "
            "nuevos desafíos y vivir experiencias inolvidables en sus apartamentos compartidos y residencias de "
            "estudiantes.</p>"
            "<p>Además, sabemos que tus padres también necesitan tranquilidad en esta nueva etapa. Por eso, nos "
            "aseguramos de que todos nuestros apartamentos y residencias estén 100% equipados para que tengas todas "
            "las comodidades y necesidades básicas cubiertas.</p>"
            "<p>¡Bienvenid@ a tu casa!</p><p></p>",
            "en": "<p></p><p>If you’re a student and you’re ready to make the big leap to become independent, then "
            "Vanguard is the perfect temporary housing service for you.</p>"
            "<p>Vanguard is “where everything begins”, the perfect springboard for university student people who want "
            "to begin writing their own story and blaze a trail in the world. Here you’ll join a dynamic and outgoing "
            "community of fellow students, eager just like you to embrace new challenges and savour unforgettable "
            "experiences in their shared apartaments and residence halls.</p>"
            "<p>We also know that your parents need some peace of mind in this new stage of your life. That's why we "
            "make sure that all our apartments and residence halls are 100% equipped so that you have all the comforts "
            "and basic necessities covered.<br>Welcome to your home!</p><p></p>",
        },
        "home-servicios-titulo": {"es": "Todos nuestros servicios", "en": "All our services"},
        "home-cotownity-titulo": {"es": "Únete a nuestra comunidad Vanguard", "en": "Join our Vanguard community"},
        "home-testimonios-titulo": {
            "es": '<h2 class="text-xx-large title">Qué dicen<div class="text-xx-large title turquoise">de nosotros</div></h2>',
            "en": '<h2 class="text-xx-large title">What they say<div class="text-xx-large title turquoise">about us</div></h2>',
        },
        "meta": {"es": "", "en": ""},
    },
}

# ---------------------------------------------------------------------------
# Colecciones (compartidas por ambas marcas)
# ---------------------------------------------------------------------------

# El banner cambia el texto y el enlace (dominio) por marca
BANNERS_SITE = {
    "cotown": [
        {
            "id": 4,
            "Page": "home",
            "Text": "¿Necesitas ayuda para reservar? Contáctanos",
            "Text_en": "Need help with your booking? Contact us",
            "Link": "https://cotown.com/es/contacto.html",
            "Link_en": "https://cotown.com/contact.html",
        }
    ],
    "vanguard": [
        {
            "id": 4,
            "Page": "home",
            "Text": "¿Necesitas ayuda para reservar? Contacta con el equipo de reservas",
            "Text_en": "Need help with your booking? Contact us here",
            "Link": "https://vanguard-student-housing.com/es/contacto.html",
            "Link_en": "https://vanguard-student-housing.com/contact.html",
        }
    ],
}

# Localizaciones por marca (en el build real vienen filtradas por disponibilidad)
LOCATIONS_SITE = {
    "cotown": [
        {"id": 1, "Name": "Barcelona", "Name_en": "Barcelona", "image": "barcelona-1002-1280"},
        {"id": 3, "Name": "Valencia", "Name_en": "Valencia", "image": "valencia-1027-1280"},
    ],
    "vanguard": [
        {"id": 1, "Name": "Barcelona", "Name_en": "Barcelona", "image": "barcelona-2-1280"},
        {"id": 4, "Name": "Bilbao", "Name_en": "Bilbao", "image": "bilbao-40-1280"},
        {"id": 2, "Name": "Madrid", "Name_en": "Madrid", "image": "madrid-13-1280"},
        {"id": 3, "Name": "Valencia", "Name_en": "Valencia", "image": "valencia-27-546"},
    ],
}

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
    {"id": i + 1, "Name": name, "image": image}
    for i, (name, image) in enumerate(
        [
            ("IUNIT", "iunit-1028-600"),
            ("Euncet", "euncet-1030-370"),
            ("EINA", "eina-1005-370"),
            ("ELISAVA", "elisava-1006-370"),
            ("ESERP", "eserp-1007-370"),
            ("Harbour Space", "harbour-space-1008-370"),
            ("EAE", "eae-1003-192"),
            ("IUCT", "iuct-1011-370"),
            ("GRISART", "grisart-1010-192"),
            ("CITYLIFE", "citylife-1012-192"),
            ("BERKLEE", "berklee-1023-192"),
            ("UIBS", "uibs-1016-370"),
            ("EADA", "eada-1018-370"),
            ("seeway", "seeway-1019-370"),
            ("insa", "insa-1020-370"),
            ("TBS", "tbs-1021-370"),
            ("eu", "eu-1022-370"),
            ("OSTELEA", "ostelea-1024-192"),
            ("FD MODA", "fd-moda-1025-192"),
            ("COMPLOT", "complot-1013-192"),
            ("HOTEL ARTS", "hotel-arts-1014-192"),
            ("isep", "isep-1015-192"),
            ("EDEM", "edem-1004-192"),
            ("IDEP", "idep-1009-192"),
            ("Middlebury", "middlebury-1035-192"),
            ("udit", "udit-1039-300"),
        ]
    )
]

RRSS = [
    {"Name": "whatsapp", "Link": _RRSS["wh"]},
    {"Name": "tiktok", "Link": _RRSS["tk"]},
    {"Name": "facebook", "Link": _RRSS["fb"]},
    {"Name": "spotify", "Link": "https://open.spotify.com/user/316xl34pr2hf2iu5a32p2mldtuaa?si=56c886f7467e43f6"},
    {"Name": "instagram", "Link": "https://www.instagram.com/cotown_es/"},
    {"Name": "linkedin", "Link": _RRSS["in"]},
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
    "home": "home-1280",
    "cotownity": "community-1280",
    "apartamento-privado": "apartamento-privado-1280",
    "piso-compartido": "piso-compartido-1280",
    "residencia": "residencia-1280",
}

# Descuentos activos (sticker de promoción sobre la foto principal)
PROMOS = []
