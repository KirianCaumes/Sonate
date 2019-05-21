const rp = require('request-promise');
const Parse = require('./calc/parse')
const Help = require('../helpers/help')

module.exports = class SongModel {
    /**
    * Get lyrics from a song and a band
    * @param {String} bandName
    * @param {String} songName
    * @returns {String}
    */
    static async getLyrics(band, song) {
        let urls = [
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(song)}`,
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(song)}`,
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(song)}`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(song)}`
        ]

        return await rp(urls[0])
            .then((body) => { return Help.pushUrl(Parse.lyrics(body), urls[0]) })
            .catch(() => {
                return rp(urls[1])
                    .then((body) => { return Help.pushUrl(Parse.lyrics(body), urls[1]) })
                    .catch(() => {
                        return rp(urls[2])
                            .then((body) => { return Help.pushUrl(Parse.lyrics(body), urls[2]) })
                            .catch(() => {
                                return rp(urls[3])
                                    .then((body) => { return Help.pushUrl(Parse.lyrics(body), urls[3]) })
                                    .catch(() => {
                                        throw "Lyrics not found"
                                    })
                            })
                    })
            })
    }

    /**
    * Get a random song from a band
    * @param {String} bandName
    * @returns {String}
    */
    static async getRandomSongNameByBand(band) {
        let urls = [
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}`
        ]
        return await rp(urls[0])
            .then((body) => { return Parse.randomSong(body, band) })
            .catch((e) => {
                return rp(urls[1])
                    .then((body) => { return Parse.randomSong(body, band) })
                    .catch((e) => {
                        throw "Band or random song not found"
                    })
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
        let urls = [
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFirstUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(album)}_(${year})`
        ]
        return await rp(urls[0])
            .then((body) => { return Parse.randomSongByAlbum(body) })
            .catch((e) => {
                return rp(urls[1])
                    .then((body) => { return Parse.randomSongByAlbum(body) })
                    .catch((e) => {
                        return rp(urls[2])
                            .then((body) => { return Parse.randomSongByAlbum(body) })
                            .catch((e) => {
                                return rp(urls[3])
                                    .then((body) => { return Parse.randomSongByAlbum(body) })
                                    .catch((e) => {
                                        throw "Band, album or random song not found"
                                    })
                            })
                    })
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
        let urls = [
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFirstUpper(album)}_(${year})`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(album)}_(${year})`
        ]
        return await rp(urls[0])
            .then((body) => { return Parse.art(body) })
            .catch((e) => {
                return rp(urls[1])
                    .then((body) => { return Parse.art(body) })
                    .catch((e) => {
                        return rp(urls[2])
                            .then((body) => { return Parse.art(body) })
                            .catch((e) => {
                                return rp(urls[3])
                                    .then((body) => { return Parse.art(body) })
                                    .catch((e) => {
                                        throw "Band, album or cover not found"
                                    })
                            })
                    })
            })
    }

    /**
    * Find clues
    * @param {String} band
    * @returns {String}
    */
    static async getClues(band) {
        let urls = [
            `http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}`,
            `http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}`
        ]
        return await rp(urls[0])
            .then((body) => { return Parse.clues(body, band) })
            .catch((e) => {
                return rp(urls[1])
                    .then((body) => { return Parse.clues(body, band) })
                    .catch((e) => {
                        throw "Band or clues not found"
                    })
            })
    }

    /**
    * Translate lyrics
    * @param {String} lyrics
    * @returns {String}
    */
    static async getTranslate(data, lang) {
        return await rp("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + lang + "&dt=t&q=" + encodeURI(data) + "&ie=UTF-8&oe=UTF-8")
            .then((body) => { return Parse.googleTranslate(body) })
            .catch((e) => {
                return rp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + process.env.YANDEX_KEY + "&text=" + encodeURI(data) + "&lang=" + lang)
                    .then((body) => { return Parse.yandexTranslate(body) })
                    .catch((e) => {
                        throw "Translation failed"
                    })
            })

    }
}