module.exports = async (config) => {

    if (config.site == "cotown") { 
        return {
            "author": "COTOWN",
            "image": "TBD",
            "url": "https://www.cotown.com",
            "cdn": "https://www.cotown.com",
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
            "author": "VANGUARD",
            "image": "TBD",
            "url": "https://www.pisosestudiantesbarcelona.com",
            "cdn": "https://www.pisosestudiantesbarcelona.com",
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