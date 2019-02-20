const rp = require('request-promise');
const Parse = require('../helpers/parse')
const Help = require('../helpers/help')

class RequestsSongs {
    /**
    * Get lyrics from a song and a band
    * @param {String} bandName
    * @param {String} songName
    * @returns {String}
    */
    static async getLyrics(band, song) {
        return await rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(song)}`)
            .then((body) => { return Parse.lyrics(body) })
            .catch(() => {
                return rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(song)}`)
                    .then((body) => { return Parse.lyrics(body) })
                    .catch(() => {
                        return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFirstUpper(song)}`)
                            .then((body) => { return Parse.lyrics(body) })
                            .catch(() => {
                                return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(song)}`)
                                    .then((body) => { return Parse.lyrics(body) })
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
        return await rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}`)
            .then((body) => { return Parse.randomSong(body) })
            .catch((e) => {
                return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}`)
                    .then((body) => { return Parse.randomSong(body) })
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
        return await rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(album)}_(${year})`)
            .then((body) => { return Parse.randomSongByAlbum(body) })
            .catch((e) => {
                return rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(album)}_(${year})`)
                    .then((body) => { return Parse.randomSongByAlbum(body) })
                    .catch((e) => {
                        return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFirstUpper(album)}_(${year})`)
                            .then((body) => { return Parse.randomSongByAlbum(body) })
                            .catch((e) => {
                                return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(album)}_(${year})`)
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
        return await rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFirstUpper(album)}_(${year})`)
            .then((body) => { return Parse.art(body) })
            .catch((e) => {
                return rp(`http://lyrics.wikia.com/wiki/${Help.toFirstUpper(band)}:${Help.toFullUpper(album)}_(${year})`)
                    .then((body) => { return Parse.art(body) })
                    .catch((e) => {
                        return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFirstUpper(album)}_(${year})`)
                            .then((body) => { return Parse.art(body) })
                            .catch((e) => {
                                return rp(`http://lyrics.wikia.com/wiki/${Help.toFullUpper(band)}:${Help.toFullUpper(album)}_(${year})`)
                                    .then((body) => { return Parse.art(body) })
                                    .catch((e) => {
                                        throw "Band, album or cover not found"
                                    })
                            })
                    })
            })
    }
}

module.exports = RequestsSongs