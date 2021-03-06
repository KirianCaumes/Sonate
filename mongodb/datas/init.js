// SETTINGS
db.param_settings.insert([
    {
        "name": "nom",
        "inputsSelect": {
            "title": true,
            "artist": true,
            "album": false,
            "yearAlbum": false
        },
        "inputsOptions": {
            "time": true,
            "songs": false
        },
        "api": "byname",
        "inputGame": {
            "title": true,
            "artist": true,
            "album": false,
            "yearAlbum": false
        },
        "infosGame": {
            "title": false,
            "artist": false,
            "album": false,
            "yearAlbum": false
        },
        "hint": {
            "country": true,
            "flag": true,
            "band": true,
            "styles": true,
            "members": true,
            "labels": true,
            "letters": true,
            "art": true
        }
    },
    {
        "name": "groupe",
        "inputsSelect": {
            "title": false,
            "artist": true,
            "album": false,
            "yearAlbum": false
        },
        "inputsOptions": {
            "time": true,
            "songs": true
        },
        "api": "byband",
        "inputGame": {
            "title": true,
            "artist": false,
            "album": false,
            "yearAlbum": false
        },
        "infosGame": {
            "title": false,
            "artist": true,
            "album": false,
            "yearAlbum": false
        },
        "hint": {
            "country": false,
            "flag": false,
            "band": false,
            "styles": false,
            "members": false,
            "labels": false,
            "letters": true,
            "art": true
        }
    },
    {
        "name": "album",
        "inputsSelect": {
            "title": false,
            "artist": true,
            "album": true,
            "yearAlbum": true
        },
        "inputsOptions": {
            "time": true,
            "songs": true
        },
        "api": "byalbum",
        "inputGame": {
            "title": true,
            "artist": false,
            "album": false,
            "yearAlbum": false
        },
        "infosGame": {
            "title": false,
            "artist": true,
            "album": true,
            "yearAlbum": true
        },
        "hint": {
            "country": false,
            "flag": false,
            "band": false,
            "styles": false,
            "members": false,
            "labels": false,
            "letters": true,
            "art": false
        }
    }
])

// GOOGLE TRAD LANGS
db.param_levels.insert([
    {
        "name": "short",
        "time": "00:01:00",
        "songs": "2"
    },
    {
        "name": "medium",
        "time": "00:03:00",
        "songs": "5"
    },
    {
        "name": "long",
        "time": "00:07:00",
        "songs": "12"
    },
    {
        "name": "perso",
        "time": "00:59:59",
        "songs": "99"
    }
])

// LEVELS
db.param_googleTradLangs.insert([
    {
        "long": "Afrikaans",
        "short": "af"
    },
    {
        "long": "Albanais",
        "short": "sq"
    },
    {
        "long": "Allemand",
        "short": "de"
    },
    {
        "long": "Amharique",
        "short": "am"
    },
    {
        "long": "Anglais",
        "short": "en"
    },
    {
        "long": "Arabe",
        "short": "ar"
    },
    {
        "long": "Arménien",
        "short": "hy"
    },
    {
        "long": "Azéri",
        "short": "az"
    },
    {
        "long": "Basque",
        "short": "eu"
    },
    {
        "long": "Bengali",
        "short": "bn"
    },
    {
        "long": "Birman",
        "short": "my"
    },
    {
        "long": "Biélorusse",
        "short": "be"
    },
    {
        "long": "Bosniaque",
        "short": "bs"
    },
    {
        "long": "Bulgare",
        "short": "bg"
    },
    {
        "long": "Catalan",
        "short": "ca"
    },
    {
        "long": "Chichewa",
        "short": "ny"
    },
    {
        "long": "Chinois",
        "short": "zh"
    },
    {
        "long": "Corse",
        "short": "co"
    },
    {
        "long": "Coréen",
        "short": "ko"
    },
    {
        "long": "Croate",
        "short": "hr"
    },
    {
        "long": "Danois",
        "short": "da"
    },
    {
        "long": "Espagnol",
        "short": "es"
    },
    {
        "long": "Espéranto",
        "short": "eo"
    },
    {
        "long": "Estonien",
        "short": "et"
    },
    {
        "long": "Finnois",
        "short": "fi"
    },
    {
        "long": "Français",
        "short": "fr"
    },
    {
        "long": "Frison occidental",
        "short": "fy"
    },
    {
        "long": "Galicien",
        "short": "gl"
    },
    {
        "long": "Gallois",
        "short": "cy"
    },
    {
        "long": "Gaélique",
        "short": "gd"
    },
    {
        "long": "Goudjrati",
        "short": "gu"
    },
    {
        "long": "Grec moderne ",
        "short": "el"
    },
    {
        "long": "Géorgien",
        "short": "ka"
    },
    {
        "long": "Haoussa",
        "short": "ha"
    },
    {
        "long": "Haïtien",
        "short": "ht"
    },
    {
        "long": "Hindi",
        "short": "hi"
    },
    {
        "long": "Hongrois",
        "short": "hu"
    },
    {
        "long": "Igbo",
        "short": "ig"
    },
    {
        "long": "Indonésien",
        "short": "id"
    },
    {
        "long": "Irlandais",
        "short": "ga"
    },
    {
        "long": "Islandais",
        "short": "is"
    },
    {
        "long": "Italien",
        "short": "it"
    },
    {
        "long": "Japonais",
        "short": "ja"
    },
    {
        "long": "Kannada",
        "short": "kn"
    },
    {
        "long": "Kazakh",
        "short": "kk"
    },
    {
        "long": "Khmer central",
        "short": "km"
    },
    {
        "long": "Kirghiz",
        "short": "ky"
    },
    {
        "long": "Kurde",
        "short": "ku"
    },
    {
        "long": "Lao",
        "short": "lo"
    },
    {
        "long": "Latin",
        "short": "la"
    },
    {
        "long": "Letton",
        "short": "lv"
    },
    {
        "long": "Lituanien",
        "short": "lt"
    },
    {
        "long": "Luxembourgeois",
        "short": "lb"
    },
    {
        "long": "Macédonien",
        "short": "mk"
    },
    {
        "long": "Malais",
        "short": "ms"
    },
    {
        "long": "Malayalam",
        "short": "ml"
    },
    {
        "long": "Malgache",
        "short": "mg"
    },
    {
        "long": "Maltais",
        "short": "mt"
    },
    {
        "long": "Maori",
        "short": "mi"
    },
    {
        "long": "Marathe",
        "short": "mr"
    },
    {
        "long": "Mongol",
        "short": "mn"
    },
    {
        "long": "Norvégien",
        "short": "no"
    },
    {
        "long": "Néerlandais",
        "short": "nl"
    },
    {
        "long": "Népalais",
        "short": "ne"
    },
    {
        "long": "Ourdou",
        "short": "ur"
    },
    {
        "long": "Ouszbek",
        "short": "uz"
    },
    {
        "long": "Pachto",
        "short": "ps"
    },
    {
        "long": "Pendjabi",
        "short": "pa"
    },
    {
        "long": "Persan",
        "short": "fa"
    },
    {
        "long": "Polonais",
        "short": "pl"
    },
    {
        "long": "Portugais",
        "short": "pt"
    },
    {
        "long": "Roumain",
        "short": "ro"
    },
    {
        "long": "Russe",
        "short": "ru"
    },
    {
        "long": "Samoan",
        "short": "sm"
    },
    {
        "long": "Serbe",
        "short": "sr"
    },
    {
        "long": "Shona",
        "short": "sn"
    },
    {
        "long": "Sindhi",
        "short": "sd"
    },
    {
        "long": "Singhalais",
        "short": "si"
    },
    {
        "long": "Slovaque",
        "short": "sk"
    },
    {
        "long": "Slovène",
        "short": "sl"
    },
    {
        "long": "Somali",
        "short": "so"
    },
    {
        "long": "Sotho du Sud",
        "short": "st"
    },
    {
        "long": "Soundanais",
        "short": "su"
    },
    {
        "long": "Suédois",
        "short": "sv"
    },
    {
        "long": "Swahili",
        "short": "sw"
    },
    {
        "long": "Tadjik",
        "short": "tg"
    },
    {
        "long": "Tagalog",
        "short": "tl"
    },
    {
        "long": "Tamoul",
        "short": "ta"
    },
    {
        "long": "Tchèque",
        "short": "cs"
    },
    {
        "long": "Thaï",
        "short": "th"
    },
    {
        "long": "Turc",
        "short": "tr"
    },
    {
        "long": "Télougou",
        "short": "te"
    },
    {
        "long": "Ukrainien",
        "short": "uk"
    },
    {
        "long": "Vietnamien",
        "short": "vi"
    },
    {
        "long": "Xhosa",
        "short": "xh"
    },
    {
        "long": "Yiddish",
        "short": "yi"
    },
    {
        "long": "Yoruba",
        "short": "yo"
    },
    {
        "long": "Zoulou",
        "short": "zu"
    }
])

// COUNTRIES
db.param_countries.insert(
    [
        {
            "en": "aruba",
            "fr": "aruba"
        },
        {
            "en": "afghanistan",
            "fr": "afghanistan"
        },
        {
            "en": "angola",
            "fr": "angola"
        },
        {
            "en": "anguilla",
            "fr": "anguilla"
        },
        {
            "en": "åland islands",
            "fr": "ahvenanmaa"
        },
        {
            "en": "albania",
            "fr": "albanie"
        },
        {
            "en": "andorra",
            "fr": "andorre"
        },
        {
            "en": "united arab emirates",
            "fr": "émirats arabes unis"
        },
        {
            "en": "argentina",
            "fr": "argentine"
        },
        {
            "en": "armenia",
            "fr": "arménie"
        },
        {
            "en": "american samoa",
            "fr": "samoa américaines"
        },
        {
            "en": "antarctica",
            "fr": "antarctique"
        },
        {
            "en": "french southern and antarctic lands",
            "fr": "terres australes et antarctiques françaises"
        },
        {
            "en": "antigua and barbuda",
            "fr": "antigua-et-barbuda"
        },
        {
            "en": "australia",
            "fr": "australie"
        },
        {
            "en": "austria",
            "fr": "autriche"
        },
        {
            "en": "azerbaijan",
            "fr": "azerbaïdjan"
        },
        {
            "en": "burundi",
            "fr": "burundi"
        },
        {
            "en": "belgium",
            "fr": "belgique"
        },
        {
            "en": "benin",
            "fr": "bénin"
        },
        {
            "en": "burkina faso",
            "fr": "burkina faso"
        },
        {
            "en": "bangladesh",
            "fr": "bangladesh"
        },
        {
            "en": "bulgaria",
            "fr": "bulgarie"
        },
        {
            "en": "bahrain",
            "fr": "bahreïn"
        },
        {
            "en": "bahamas",
            "fr": "bahamas"
        },
        {
            "en": "bosnia and herzegovina",
            "fr": "bosnie-herzégovine"
        },
        {
            "en": "saint barthélemy",
            "fr": "saint-barthélemy"
        },
        {
            "en": "saint helena, ascension and tristan da cunha",
            "fr": "sainte-hélène, ascension et tristan da cunha"
        },
        {
            "en": "belarus",
            "fr": "biélorussie"
        },
        {
            "en": "belize",
            "fr": "belize"
        },
        {
            "en": "bermuda",
            "fr": "bermudes"
        },
        {
            "en": "bolivia",
            "fr": "bolivie"
        },
        {
            "en": "caribbean netherlands",
            "fr": "pays-bas caribéens"
        },
        {
            "en": "brazil",
            "fr": "brésil"
        },
        {
            "en": "barbados",
            "fr": "barbade"
        },
        {
            "en": "brunei",
            "fr": "brunei"
        },
        {
            "en": "bhutan",
            "fr": "bhoutan"
        },
        {
            "en": "bouvet island",
            "fr": "île bouvet"
        },
        {
            "en": "botswana",
            "fr": "botswana"
        },
        {
            "en": "central african republic",
            "fr": "république centrafricaine"
        },
        {
            "en": "canada",
            "fr": "canada"
        },
        {
            "en": "cocos (keeling) islands",
            "fr": "îles cocos"
        },
        {
            "en": "switzerland",
            "fr": "suisse"
        },
        {
            "en": "chile",
            "fr": "chili"
        },
        {
            "en": "china",
            "fr": "chine"
        },
        {
            "en": "ivory coast",
            "fr": "côte d'ivoire"
        },
        {
            "en": "cameroon",
            "fr": "cameroun"
        },
        {
            "en": "dr congo",
            "fr": "congo (rép. dém.)"
        },
        {
            "en": "republic of the congo",
            "fr": "congo"
        },
        {
            "en": "cook islands",
            "fr": "îles cook"
        },
        {
            "en": "colombia",
            "fr": "colombie"
        },
        {
            "en": "comoros",
            "fr": "comores"
        },
        {
            "en": "cape verde",
            "fr": "îles du cap-vert"
        },
        {
            "en": "costa rica",
            "fr": "costa rica"
        },
        {
            "en": "cuba",
            "fr": "cuba"
        },
        {
            "en": "curaçao",
            "fr": "curaçao"
        },
        {
            "en": "christmas island",
            "fr": "île christmas"
        },
        {
            "en": "cayman islands",
            "fr": "îles caïmans"
        },
        {
            "en": "cyprus",
            "fr": "chypre"
        },
        {
            "en": "czechia",
            "fr": "tchéquie"
        },
        {
            "en": "germany",
            "fr": "allemagne"
        },
        {
            "en": "djibouti",
            "fr": "djibouti"
        },
        {
            "en": "dominica",
            "fr": "dominique"
        },
        {
            "en": "denmark",
            "fr": "danemark"
        },
        {
            "en": "dominican republic",
            "fr": "république dominicaine"
        },
        {
            "en": "algeria",
            "fr": "algérie"
        },
        {
            "en": "ecuador",
            "fr": "équateur"
        },
        {
            "en": "egypt",
            "fr": "égypte"
        },
        {
            "en": "eritrea",
            "fr": "érythrée"
        },
        {
            "en": "western sahara",
            "fr": "sahara occidental"
        },
        {
            "en": "spain",
            "fr": "espagne"
        },
        {
            "en": "estonia",
            "fr": "estonie"
        },
        {
            "en": "ethiopia",
            "fr": "éthiopie"
        },
        {
            "en": "finland",
            "fr": "finlande"
        },
        {
            "en": "fiji",
            "fr": "fidji"
        },
        {
            "en": "falkland islands",
            "fr": "îles malouines"
        },
        {
            "en": "france",
            "fr": "france"
        },
        {
            "en": "faroe islands",
            "fr": "îles féroé"
        },
        {
            "en": "micronesia",
            "fr": "micronésie"
        },
        {
            "en": "gabon",
            "fr": "gabon"
        },
        {
            "en": "united kingdom",
            "fr": "royaume-uni"
        },
        {
            "en": "georgia",
            "fr": "géorgie"
        },
        {
            "en": "guernsey",
            "fr": "guernesey"
        },
        {
            "en": "ghana",
            "fr": "ghana"
        },
        {
            "en": "gibraltar",
            "fr": "gibraltar"
        },
        {
            "en": "guinea",
            "fr": "guinée"
        },
        {
            "en": "guadeloupe",
            "fr": "guadeloupe"
        },
        {
            "en": "gambia",
            "fr": "gambie"
        },
        {
            "en": "guinea-bissau",
            "fr": "guinée-bissau"
        },
        {
            "en": "equatorial guinea",
            "fr": "guinée équatoriale"
        },
        {
            "en": "greece",
            "fr": "grèce"
        },
        {
            "en": "grenada",
            "fr": "grenade"
        },
        {
            "en": "greenland",
            "fr": "groenland"
        },
        {
            "en": "guatemala",
            "fr": "guatemala"
        },
        {
            "en": "french guiana",
            "fr": "guyane"
        },
        {
            "en": "guam",
            "fr": "guam"
        },
        {
            "en": "guyana",
            "fr": "guyana"
        },
        {
            "en": "hong kong",
            "fr": "hong kong"
        },
        {
            "en": "heard island and mcdonald islands",
            "fr": "îles heard-et-macdonald"
        },
        {
            "en": "honduras",
            "fr": "honduras"
        },
        {
            "en": "croatia",
            "fr": "croatie"
        },
        {
            "en": "haiti",
            "fr": "haïti"
        },
        {
            "en": "hungary",
            "fr": "hongrie"
        },
        {
            "en": "indonesia",
            "fr": "indonésie"
        },
        {
            "en": "isle of man",
            "fr": "île de man"
        },
        {
            "en": "india",
            "fr": "inde"
        },
        {
            "en": "british indian ocean territory",
            "fr": "territoire britannique de l'océan indien"
        },
        {
            "en": "ireland",
            "fr": "irlande"
        },
        {
            "en": "iran",
            "fr": "iran"
        },
        {
            "en": "iraq",
            "fr": "irak"
        },
        {
            "en": "iceland",
            "fr": "islande"
        },
        {
            "en": "israel",
            "fr": "israël"
        },
        {
            "en": "italy",
            "fr": "italie"
        },
        {
            "en": "jamaica",
            "fr": "jamaïque"
        },
        {
            "en": "jersey",
            "fr": "jersey"
        },
        {
            "en": "jordan",
            "fr": "jordanie"
        },
        {
            "en": "japan",
            "fr": "japon"
        },
        {
            "en": "kazakhstan",
            "fr": "kazakhstan"
        },
        {
            "en": "kenya",
            "fr": "kenya"
        },
        {
            "en": "kyrgyzstan",
            "fr": "kirghizistan"
        },
        {
            "en": "cambodia",
            "fr": "cambodge"
        },
        {
            "en": "kiribati",
            "fr": "kiribati"
        },
        {
            "en": "saint kitts and nevis",
            "fr": "saint-christophe-et-niévès"
        },
        {
            "en": "south korea",
            "fr": "corée du sud"
        },
        {
            "en": "kosovo",
            "fr": "kosovo"
        },
        {
            "en": "kuwait",
            "fr": "koweït"
        },
        {
            "en": "laos",
            "fr": "laos"
        },
        {
            "en": "lebanon",
            "fr": "liban"
        },
        {
            "en": "liberia",
            "fr": "liberia"
        },
        {
            "en": "libya",
            "fr": "libye"
        },
        {
            "en": "saint lucia",
            "fr": "sainte-lucie"
        },
        {
            "en": "liechtenstein",
            "fr": "liechtenstein"
        },
        {
            "en": "sri lanka",
            "fr": "sri lanka"
        },
        {
            "en": "lesotho",
            "fr": "lesotho"
        },
        {
            "en": "lithuania",
            "fr": "lituanie"
        },
        {
            "en": "luxembourg",
            "fr": "luxembourg"
        },
        {
            "en": "latvia",
            "fr": "lettonie"
        },
        {
            "en": "macau",
            "fr": "macao"
        },
        {
            "en": "saint martin",
            "fr": "saint-martin"
        },
        {
            "en": "morocco",
            "fr": "maroc"
        },
        {
            "en": "monaco",
            "fr": "monaco"
        },
        {
            "en": "moldova",
            "fr": "moldavie"
        },
        {
            "en": "madagascar",
            "fr": "madagascar"
        },
        {
            "en": "maldives",
            "fr": "maldives"
        },
        {
            "en": "mexico",
            "fr": "mexique"
        },
        {
            "en": "marshall islands",
            "fr": "îles marshall"
        },
        {
            "en": "macedonia",
            "fr": "macédoine"
        },
        {
            "en": "mali",
            "fr": "mali"
        },
        {
            "en": "malta",
            "fr": "malte"
        },
        {
            "en": "myanmar",
            "fr": "birmanie"
        },
        {
            "en": "montenegro",
            "fr": "monténégro"
        },
        {
            "en": "mongolia",
            "fr": "mongolie"
        },
        {
            "en": "northern mariana islands",
            "fr": "îles mariannes du nord"
        },
        {
            "en": "mozambique",
            "fr": "mozambique"
        },
        {
            "en": "mauritania",
            "fr": "mauritanie"
        },
        {
            "en": "montserrat",
            "fr": "montserrat"
        },
        {
            "en": "martinique",
            "fr": "martinique"
        },
        {
            "en": "mauritius",
            "fr": "île maurice"
        },
        {
            "en": "malawi",
            "fr": "malawi"
        },
        {
            "en": "malaysia",
            "fr": "malaisie"
        },
        {
            "en": "mayotte",
            "fr": "mayotte"
        },
        {
            "en": "namibia",
            "fr": "namibie"
        },
        {
            "en": "new caledonia",
            "fr": "nouvelle-calédonie"
        },
        {
            "en": "niger",
            "fr": "niger"
        },
        {
            "en": "norfolk island",
            "fr": "île norfolk"
        },
        {
            "en": "nigeria",
            "fr": "nigéria"
        },
        {
            "en": "nicaragua",
            "fr": "nicaragua"
        },
        {
            "en": "niue",
            "fr": "niue"
        },
        {
            "en": "netherlands",
            "fr": "pays-bas"
        },
        {
            "en": "norway",
            "fr": "norvège"
        },
        {
            "en": "nepal",
            "fr": "népal"
        },
        {
            "en": "nauru",
            "fr": "nauru"
        },
        {
            "en": "new zealand",
            "fr": "nouvelle-zélande"
        },
        {
            "en": "oman",
            "fr": "oman"
        },
        {
            "en": "pakistan",
            "fr": "pakistan"
        },
        {
            "en": "panama",
            "fr": "panama"
        },
        {
            "en": "pitcairn islands",
            "fr": "îles pitcairn"
        },
        {
            "en": "peru",
            "fr": "pérou"
        },
        {
            "en": "philippines",
            "fr": "philippines"
        },
        {
            "en": "palau",
            "fr": "palaos (palau)"
        },
        {
            "en": "papua new guinea",
            "fr": "papouasie-nouvelle-guinée"
        },
        {
            "en": "poland",
            "fr": "pologne"
        },
        {
            "en": "puerto rico",
            "fr": "porto rico"
        },
        {
            "en": "north korea",
            "fr": "corée du nord"
        },
        {
            "en": "portugal",
            "fr": "portugal"
        },
        {
            "en": "paraguay",
            "fr": "paraguay"
        },
        {
            "en": "palestine",
            "fr": "palestine"
        },
        {
            "en": "french polynesia",
            "fr": "polynésie française"
        },
        {
            "en": "qatar",
            "fr": "qatar"
        },
        {
            "en": "réunion",
            "fr": "réunion"
        },
        {
            "en": "romania",
            "fr": "roumanie"
        },
        {
            "en": "russia",
            "fr": "russie"
        },
        {
            "en": "rwanda",
            "fr": "rwanda"
        },
        {
            "en": "saudi arabia",
            "fr": "arabie saoudite"
        },
        {
            "en": "sudan",
            "fr": "soudan"
        },
        {
            "en": "senegal",
            "fr": "sénégal"
        },
        {
            "en": "singapore",
            "fr": "singapour"
        },
        {
            "en": "south georgia",
            "fr": "géorgie du sud-et-les îles sandwich du sud"
        },
        {
            "en": "svalbard and jan mayen",
            "fr": "svalbard et jan mayen"
        },
        {
            "en": "solomon islands",
            "fr": "îles salomon"
        },
        {
            "en": "sierra leone",
            "fr": "sierra leone"
        },
        {
            "en": "el salvador",
            "fr": "salvador"
        },
        {
            "en": "san marino",
            "fr": "saint-marin"
        },
        {
            "en": "somalia",
            "fr": "somalie"
        },
        {
            "en": "saint pierre and miquelon",
            "fr": "saint-pierre-et-miquelon"
        },
        {
            "en": "serbia",
            "fr": "serbie"
        },
        {
            "en": "south sudan",
            "fr": "soudan du sud"
        },
        {
            "en": "são tomé and príncipe",
            "fr": "são tomé et príncipe"
        },
        {
            "en": "suriname",
            "fr": "surinam"
        },
        {
            "en": "slovakia",
            "fr": "slovaquie"
        },
        {
            "en": "slovenia",
            "fr": "slovénie"
        },
        {
            "en": "sweden",
            "fr": "suède"
        },
        {
            "en": "eswatini",
            "fr": "swaziland"
        },
        {
            "en": "sint maarten",
            "fr": "saint-martin"
        },
        {
            "en": "seychelles",
            "fr": "seychelles"
        },
        {
            "en": "syria",
            "fr": "syrie"
        },
        {
            "en": "turks and caicos islands",
            "fr": "îles turques-et-caïques"
        },
        {
            "en": "chad",
            "fr": "tchad"
        },
        {
            "en": "togo",
            "fr": "togo"
        },
        {
            "en": "thailand",
            "fr": "thaïlande"
        },
        {
            "en": "tajikistan",
            "fr": "tadjikistan"
        },
        {
            "en": "tokelau",
            "fr": "tokelau"
        },
        {
            "en": "turkmenistan",
            "fr": "turkménistan"
        },
        {
            "en": "timor-leste",
            "fr": "timor oriental"
        },
        {
            "en": "tonga",
            "fr": "tonga"
        },
        {
            "en": "trinidad and tobago",
            "fr": "trinité-et-tobago"
        },
        {
            "en": "tunisia",
            "fr": "tunisie"
        },
        {
            "en": "turkey",
            "fr": "turquie"
        },
        {
            "en": "tuvalu",
            "fr": "tuvalu"
        },
        {
            "en": "taiwan",
            "fr": "taïwan"
        },
        {
            "en": "tanzania",
            "fr": "tanzanie"
        },
        {
            "en": "uganda",
            "fr": "ouganda"
        },
        {
            "en": "ukraine",
            "fr": "ukraine"
        },
        {
            "en": "united states minor outlying islands",
            "fr": "îles mineures éloignées des états-unis"
        },
        {
            "en": "uruguay",
            "fr": "uruguay"
        },
        {
            "en": "united states",
            "fr": "états-unis"
        },
        {
            "en": "uzbekistan",
            "fr": "ouzbékistan"
        },
        {
            "en": "vatican city",
            "fr": "cité du vatican"
        },
        {
            "en": "saint vincent and the grenadines",
            "fr": "saint-vincent-et-les-grenadines"
        },
        {
            "en": "venezuela",
            "fr": "venezuela"
        },
        {
            "en": "british virgin islands",
            "fr": "îles vierges britanniques"
        },
        {
            "en": "united states virgin islands",
            "fr": "îles vierges des états-unis"
        },
        {
            "en": "vietnam",
            "fr": "viêt nam"
        },
        {
            "en": "vanuatu",
            "fr": "vanuatu"
        },
        {
            "en": "wallis and futuna",
            "fr": "wallis-et-futuna"
        },
        {
            "en": "samoa",
            "fr": "samoa"
        },
        {
            "en": "yemen",
            "fr": "yémen"
        },
        {
            "en": "south africa",
            "fr": "afrique du sud"
        },
        {
            "en": "zambia",
            "fr": "zambie"
        },
        {
            "en": "zimbabwe",
            "fr": "zimbabwe"
        },
        {
            "en": "england",
            "fr": "angleterre"
        }
    ]
)

// HIGHSCORES
let scores = []
for (let i = 0; i < 300 + 1; i++) {
    let k = Math.floor(Math.random() * 4)
    let songsFound = Math.floor(Math.random() * [2, 5, 12, 99][k]) + 1
    scores.push(
        {
            username: Math.random().toString(36).substring(7),
            level: ['court', 'moyen', 'long', 'personalisé'][k],
            time: songsFound === [2, 5, 12, 99][k] ? Math.floor(Math.random() * 300 + 0): 0,
            songs: {
                found: songsFound,
                total: [2, 5, 12, 99][k]
            },
            date: new Date()
        }
    )
}
db.history.insert(scores)