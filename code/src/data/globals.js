module.exports = async (config) => {

    common = {
        "maps": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "attribution": "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors"
    }

    if (config.site == "cotown") { 
        return {
            ...common,
            "author": "COTOWN",
            "image": "TBD",
            "url": "https://cotown.com",
            "cdn": "https://cotown.com",
            "rrss": {
                "wh": "https://api.whatsapp.com/send?phone=+34663041433&text=Hello! I want to be a Cotowner!! ",
                "tk": "https://www.tiktok.com/@cotown_es",
                "fb": "https://www.facebook.com/cotownspain/",
                "sp": "https://open.spotify.com/user/316xl34pr2hf2iu5a32p2mldtuaa?si=56c886f7467e43f6",
                "ig": "https://www.instagram.com/cotown_es/",
                "in": "https://www.linkedin.com/company/cotowngroup/"
            }
        }
    }

    if (config.site == "vanguard") { 
        return {
            ...common,
            "author": "VANGUARD",
            "image": "TBD",
            "url": "https://vanguard-student-housing.com",
            "cdn": "https://vanguard-student-housing.com",
            "rrss": {
                "wh": "https://api.whatsapp.com/send?phone=+34663041433&text=Hello! I want to be a Vanguarder!! ",
                "tk": "https://www.tiktok.com/@cotown_es",
                "fb": "https://www.facebook.com/cotownspain/",
                "sp": "https://open.spotify.com/user/316xl34pr2hf2iu5a32p2mldtuaa?si=56c886f7467e43f6",
                "ig": "https://www.instagram.com/cotown_es/",
                "in": "https://www.linkedin.com/company/cotowngroup/"
            }
        }
    }
    
};