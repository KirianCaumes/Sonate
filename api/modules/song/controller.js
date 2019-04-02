const SongModel = require('./model')

module.exports = class SongController {
    static getByName(req, res, next) {
        if (!req.query.band || !req.query.song || !req.query.lang) res.status(500).json({ error: "Arguments SONG, BAND and LANG are required" })
        SongModel.getLyrics(req.query.band, req.query.song)
            .then((song) => {
                SongModel.getTranslate(song.lyrics, req.query.lang)
                    .then((lyricsTranslated) => {
                        res.json(
                            {
                                url: song.url,
                                lyricsTranslated: lyricsTranslated,
                                lyrics: song.lyrics,
                                title: song.title,
                                artist: song.artist,
                                albums: song.albums
                            }
                        );
                    })
                    .catch((e) => res.status(500).json({ error: e }))
            })
            .catch((e) => res.status(500).json({ error: e }))
    }

    static getByBand(req, res, next) {
        if (!req.query.band || !req.query.lang) res.status(500).json({ error: "Argument BAND and LANG are required" })
        SongModel.getRandomSongNameByBand(req.query.band)
            .then((songName) => {
                SongModel.getLyrics(req.query.band, songName)
                    .then((song) => {
                        SongModel.getTranslate(song.lyrics, req.query.lang)
                            .then((lyricsTranslated) => {
                                res.json(
                                    {
                                        url: song.url,
                                        lyricsTranslated: lyricsTranslated,
                                        lyrics: song.lyrics,
                                        title: song.title,
                                        artist: song.artist,
                                        albums: song.albums
                                    }
                                );
                            })
                            .catch((e) => res.status(500).json({ error: e }))
                    })
                    .catch((e) => res.status(500).json({ error: e }))
            })
            .catch((e) => res.status(500).json({ error: e }))
    }

    static getByAlbum(req, res, next) {
        if (!req.query.band || !req.query.album || !req.query.year || !req.query.lang) res.status(500).json({ error: "Arguments BAND, ALBUM, YEAR and LANG are required" })
        SongModel.getRandomSongNameByAlbum(req.query.band, req.query.album, req.query.year)
            .then((songName) => {
                SongModel.getLyrics(req.query.band, songName)
                    .then((song) => {
                        SongModel.getTranslate(song.lyrics, req.query.lang)
                            .then((lyricsTranslated) => {
                                res.json(
                                    {
                                        url: song.url,
                                        lyricsTranslated: lyricsTranslated,
                                        lyrics: song.lyrics,
                                        title: song.title,
                                        artist: song.artist,
                                        albums: song.albums
                                    }
                                );
                            })
                            .catch((e) => res.status(500).json({ error: e }))
                    })
                    .catch((e) => res.status(500).json({ error: e }))
            })
            .catch((e) => res.status(500).json({ error: e }))
    }

    static getArt(req, res, next) {
        if (!req.query.band || !req.query.album || !req.query.year) res.status(500).json({ error: "Arguments BAND, ALBUM and YEAR are required" })
        SongModel.getArt(req.query.band, req.query.album, req.query.year)
            .then((artUrl) => {
                res.json(
                    {
                        artUrl: artUrl
                    }
                );
            })
            .catch((e) => res.status(500).json({ error: e }))
    }

    static getClues(req, res, next) {
        if (!req.query.band) res.status(500).json({ error: "Arguments BAND is required" })
        SongModel.getClues(req.query.band, req.query.song)
            .then((band) => {
                res.json(
                    {
                        country: band.country,
                        flag: band.flag,
                        band: band.band,
                        styles: band.styles,
                        members: band.members,
                        labels: band.labels
                    }
                );
            })
            .catch((e) => res.status(500).json({ error: e }))
    }
}