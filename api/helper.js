const rp = require('request-promise');
const HTMLParser = require('node-html-parser');
const titleRegexp = /(.+) - (.+) Lyrics.+/;

class Helper {
    /**
    * Get url of the lyrics by searching
    * @param {String} songName
    * @returns {String}
    */
    static async getLyricUrl(data) {
        return await rp(`https://search.azlyrics.com/search.php?q=${data.replace(/\s/g, "+")}`)
            .then((body) => {
                const parsedBandItemBody = HTMLParser.parse(body);
                const songsList = parsedBandItemBody.querySelectorAll('a').map(item => item.attributes.href).filter(href => href ? href.indexOf('/lyrics') > 0 : null)
                return songsList[0];
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
        return await rp(data.replace("../", "https://www.azlyrics.com/"))
            .then((body) => {
                const parsedItemBody = HTMLParser.parse(body);
                const htmlTitle = parsedItemBody.querySelector('title').text;
                const titleComponent = titleRegexp.exec(htmlTitle);
                let artist = titleComponent[1].trim();
                let song = titleComponent[2].trim();
                let lyrics = parsedItemBody.querySelectorAll('div.col-xs-12.col-lg-8.text-center div')[4].text.trim();
                return {
                    lyrics,
                    song,
                    artist
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
        return await rp(`https://search.azlyrics.com/search.php?q=${data.replace(/\s/g, "+")}`)
            .then((body) => {
                const parsedBody = HTMLParser.parse(body)
                return parsedBody.querySelectorAll('a').map(item => item.attributes.href).filter(href => href.indexOf('/' + data.charAt(0) + '/') > 0)[0]
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
                const songsList = parsedBandItemBody.querySelectorAll('a').map(item => item.attributes.href).filter(href => href ? href.indexOf('/lyrics') > 0 : null)
                return songsList[Math.floor(Math.random() * songsList.length) + 0];
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
                return JSON.parse(body)[0].map(x => x[0]).toString()
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

module.exports = Helper