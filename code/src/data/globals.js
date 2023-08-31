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
            "cdn": "https://cotown.com"
        }
    }

    if (config.site == "vanguard") { 
        return {
            ...common,
            "author": "VANGUARD",
            "image": "TBD",
            "url": "https://vanguard-student-housing.com",
            "cdn": "https://vanguard-student-housing.com"
        }
    }
    
};