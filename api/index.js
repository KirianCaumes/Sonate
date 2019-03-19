const express = require('express');
const cors = require('cors')

const app = express();
const RequestsSongs = require('./requests/songs')
const RequestTranslations = require('./requests/translations')

app.use(cors())

//ex: http://localhost:5000/api/song/byname?song=abnegation&band=in%20flames
app.get('/api/song/byname', (req, res) => {
    if (!req.query.band || !req.query.song) res.status(500).json({ error: "Arguments SONG and BAND are required" })
    RequestsSongs.getLyrics(req.query.band, req.query.song)
        .then((song) => {
            RequestTranslations.getTranslate(song.lyrics)
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
});

//ex: http://localhost:5000/api/song/byband?band=in%20flames
app.get('/api/song/byband', (req, res) => {
    if (!req.query.band) res.status(500).json({ error: "Argument BAND is required" })
    RequestsSongs.getRandomSongNameByBand(req.query.band)
        .then((songName) => {
            RequestsSongs.getLyrics(req.query.band, songName)
                .then((song) => {
                    RequestTranslations.getTranslate(song.lyrics)
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
});

//ex: http://localhost:5000/api/song/byalbum?band=in%20flames&album=come clarity&year=2006
app.get('/api/song/byalbum', (req, res) => {
    if (!req.query.band || !req.query.album || !req.query.year) res.status(500).json({ error: "Arguments BAND, ALBUM and YEAR are required" })
    RequestsSongs.getRandomSongNameByAlbum(req.query.band, req.query.album, req.query.year)
        .then((songName) => {
            RequestsSongs.getLyrics(req.query.band, songName)
                .then((song) => {
                    RequestTranslations.getTranslate(song.lyrics)
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
});


//ex: http://localhost:5000/api/art?band=in%20flames&album=come clarity&year=2006
app.get('/api/art', (req, res) => {
    if (!req.query.band || !req.query.album || !req.query.year) res.status(500).json({ error: "Arguments BAND, ALBUM and YEAR are required" })
    RequestsSongs.getArt(req.query.band, req.query.album, req.query.year)
        .then((artUrl) => {
            res.json(
                {
                    artUrl: artUrl
                }
            );
        })
        .catch((e) => res.status(500).json({ error: e }))
});

//ex: http://localhost:5000/api/clues/byBand?band=in%20flames
app.get('/api/clues/byBand', (req, res) => {
    if (!req.query.band) res.status(500).json({ error: "Arguments BAND is required" })
    RequestsSongs.getClues(req.query.band, req.query.song)
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
});

app.get('*', (req, res) => {
    res.send("Sonate's Api");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


