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
}

module.exports = RequestsSongs

//TEST :
// let catches = [];
// let resolved = false
// console.time("test")
// return new Promise(
//     (resolve, reject) => {
//         rp(urls[0])
//             .then((body) => { resolved ? resolve(Help.pushUrl(Parse.lyrics(body), urls[0])) : ''; resolved = true; })
//             .catch(e => catches.length < 4 ? catches.push(true) : '')
//         rp(urls[1])
//             .then((body) => { resolved ? resolve(Help.pushUrl(Parse.lyrics(body), urls[1])) : ''; resolved = true; })
//             .catch(e => catches.length < 4 ? catches.push(true) : '')
//         rp(urls[2])
//             .then((body) => { resolved ? resolve(Help.pushUrl(Parse.lyrics(body), urls[2])) : ''; resolved = true; })
//             .catch(e => catches.length < 4 ? catches.push(true) : '')
//         rp(urls[3])
//             .then((body) => { resolved ? resolve(Help.pushUrl(Parse.lyrics(body), urls[3])) : ''; resolved = true; })
//             .catch(e => catches.length < 4 ? catches.push(true) : '')
//     }
// )
//     .then(res => {
//         console.timeEnd("test")
//         return res
//     })


// return Promise.all(urls.map(x => RequestsSongs.test(x))).then(bodies => bodies.find(x => x))
// static test(url) {
//     return rp(url)
//         .then((body) => { return Help.pushUrl(Parse.lyrics(body), url) })
//         .catch((e) => {
//             console.error(e)
//             return Promise.resolve(false)
//         })
// }