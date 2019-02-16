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
                const parsedItemBody = HTMLParser.parse(body);
                const htmlTitle = parsedItemBody.querySelector('title').text;
                const titleComponent = titleRegexp.exec(htmlTitle);
                let artist = titleComponent[1].trim();
                let song = titleComponent[2].trim();
                let lyrics = parsedItemBody.querySelectorAll('div.lyricbox')[0].innerHTML.replace("<div class='lyricsbreak'></div>", '').replace(/<br\s*[\/]?>/gi, "\n")
                let albums = []
                parsedItemBody
                    .querySelectorAll('#song-header-container i')
                    .map(i => i.text)
                    .map(i => i.substr(0, i.length - 1)
                        .split(' ('))
                    .forEach(e => albums.push({ "name": e[0], "year": e[1] }))
                return {
                    lyrics,
                    song,
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
                const parsedBandItemBody = HTMLParser.parse(body);
                const songsList = parsedBandItemBody.querySelectorAll('ol li b a').map(item => item.attributes.title).filter(x => !x.includes("(page does not exist)"))
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
                const parsedBandItemBody = HTMLParser.parse(body);
                const songsList = parsedBandItemBody.querySelectorAll('ol li b a').map(item => item.attributes.title).filter(x => !x.includes("(page does not exist)"))
                return songsList[Math.floor(Math.random() * songsList.length) + 0].split(':')[1];
            })
            .catch((e) => {
                throw "Band, album or random song not found"
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
                throw "Translation failed"
            })
    }

    static toCapitalize(text) {
        return text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }
}

module.exports = Helper