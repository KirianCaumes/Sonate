const rp = require('request-promise');
const HTMLParser = require('node-html-parser');
const titleRegexp = /(.+):(.+) Lyrics.+/;

class Helper {

    /**
    * Get lyrics from a song and a band
    * @param {String} bandName
    * @param {String} songName
    * @returns {String}
    */
    static async getLyrics(band, song) {
        return await rp(`http://lyrics.wikia.com/wiki/${this.toCapitalize(band).replace(/\s/g, "_")}:${this.toCapitalize(song).replace(/\s/g, "_")}`)
            .then((body) => {
                let parsedItemBody = HTMLParser.parse(body);
                let htmlTitle = parsedItemBody.querySelector('title').text;
                let titleComponent = titleRegexp.exec(htmlTitle);
                let artist = titleComponent[1].trim();
                let title = titleComponent[2].trim();
                let lyrics = parsedItemBody.querySelectorAll('div.lyricbox')[0].innerHTML.replace("<div class='lyricsbreak'></div>", '').replace(/<br\s*[\/]?>/gi, "\n").replace(/<\s*[\/]?i>/gi, "")
                lyrics = lyrics.includes("<b>Instrumental</b>") ? "*Instrumental Only*" : lyrics
                let albums = []
                parsedItemBody
                    .querySelectorAll('#song-header-container i')
                    .map(i => i.text)
                    .map(i => i.substr(0, i.length - 1)
                        .split(' ('))
                    .forEach(e => albums.push({ "name": e[0], "year": e[1] }))
                return {
                    lyrics,
                    title,
                    artist,
                    albums
                }
            })
            .catch((e) => {
                throw "Lyrics not found"
            })
    }

    /**
    * Get a random song from a band
    * @param {String} bandName
    * @returns {String}
    */
    static async getRandomSongNameByBand(band) {
        return await rp(`http://lyrics.wikia.com/wiki/${this.toCapitalize(band).replace(/\s/g, "_")}`)
            .then((body) => {
                let songsList = HTMLParser.parse(body)
                    .querySelectorAll('ol li b a')
                    .map(item => item.attributes.title)
                    .filter(x => x.includes(this.toCapitalize(band)))
                    .filter(x => !x.includes("(page does not exist)"))
                return songsList[Math.floor(Math.random() * songsList.length) + 0].split(':')[1];
            })
            .catch((e) => {
                throw "Band or random song not found"
            })
    }

    /**
    * Get a random song from an album's band
    * @param {String} bandName
    * @param {String} albumName
    * @param {String} releaseYear
    * @returns {String}
    */
    static async getRandomSongNameByAlbum(band, album, year) {
        return await rp(`http://lyrics.wikia.com/wiki/${this.toCapitalize(band).replace(/\s/g, "_")}:${this.toCapitalize(album).replace(/\s/g, "_")}_(${year})`)
            .then((body) => {
                let songsList = HTMLParser.parse(body).querySelectorAll('ol li b a').map(item => item.attributes.title).filter(x => !x.includes("(page does not exist)"))
                return songsList[Math.floor(Math.random() * songsList.length) + 0].split(':')[1];
            })
            .catch((e) => {
                throw "Band, album or random song not found"
            })
    }

    /**
    * Get a random song from an album's band
    * @param {String} bandName
    * @param {String} albumName
    * @param {String} releaseYear
    * @returns {String}
    */
    static async getArt(band, album, year) {
        return await rp(`http://lyrics.wikia.com/wiki/${this.toCapitalize(band).replace(/\s/g, "_")}:${this.toCapitalize(album).replace(/\s/g, "_")}_(${year})`)
            .then((body) => {
                return HTMLParser.parse(body).querySelectorAll('img.thumbborder')[0].attributes.src
            })
            .catch((e) => {
                throw "Band, album or cover not found"
            })
    }


    /**
    * Translate lyrics
    * @param {String} lyrics
    * @returns {String}
    */
    static async getTranslate(data) {
        return await rp("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=" + encodeURI(data) + "&ie=UTF-8&oe=UTF-8")
            .then((body) => {
                return JSON.parse(body)[0].map(x => x[0]).join('')
            })
            .catch((e) => {
                return rp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190216T145755Z.dc5fb0f5660239ab.55fcbf8f0c27f29829bef16686b424a83848e025&text=" + encodeURI(data) + "&lang=fr")
                    .then((body) => {
                        return JSON.parse(body).text[0]
                    })
                    .catch((e) => {
                        throw "Translation failed"
                    })
            })

    }

    static toCapitalize(text) {
        return text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }
}

module.exports = Helper