const rp = require('request-promise');
const HTMLParser = require('node-html-parser');
const titleRegexp = /(.+):(.+) Lyrics.+/;

class Helper {
    /**
    * Get url of the lyrics by searching
    * @param {String} songName
    * @returns {String}
    */
    static async getLyricUrl(data) {
        return await rp(`http://lyrics.wikia.com/wiki/Special:Search?search=${data.replace(/\s/g, "+")}`)
            .then((body) => {
                const parsedBandItemBody = HTMLParser.parse(body);
                return parsedBandItemBody
                    .querySelectorAll('ul.Results h1 a')
                    .map(item => item.attributes.href)
                    .filter(href => href.split(':').length > 2)[0]
            })
            .catch((e) => {
                console.log(e)
            })
    }

    /**
    * Get lyrics from a song url
    * @param {String} songUrl
    * @returns {String}
    */
    static async getLyrics(data) {
        return await rp(data)
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
                console.log(e)
            })
    }

    /**
    * Get a band url by searching
    * @param {String} bandName
    * @returns {String}
    */
    static async getBandUrl(data) {
        return await rp(`http://lyrics.wikia.com/wiki/Special:Search?search=${data.replace(/\s/g, "+")}`)
            .then((body) => {
                const parsedBody = HTMLParser.parse(body)
                return parsedBody
                    .querySelectorAll('ul.Results h1 a')
                    .map(item => item.attributes.href)
                    .filter(href => href.split(':').length < 3)[0]

            })
            .catch((e) => {
                console.log(e)
            })
    }

    /**
    * Get a random song from a bandUrl
    * @param {String} bandUrl
    * @returns {String}
    */
    static async getRandomLyricUrl(data) {
        return await rp(data)
            .then((body) => {
                const parsedBandItemBody = HTMLParser.parse(body);
                const songsList = parsedBandItemBody.querySelectorAll('ol li b a').map(item => item.attributes.href)
                return "http://lyrics.wikia.com/"+songsList[Math.floor(Math.random() * songsList.length) + 0];
            })
            .catch((e) => {
                console.log(e)
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
                console.log(e)
            })
    }
}

module.exports = Helper