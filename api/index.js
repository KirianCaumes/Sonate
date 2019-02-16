const express = require('express');
const path = require('path');
const request = require('request');
var HTMLParser = require('node-html-parser');
const cors = require('cors')

const app = express();
const helper = require('./helper')

app.use(cors())

//ex: http://localhost:5000/api/song/byname?song=abnegation&band=in%20flames
app.get('/api/song/byname', (req, res) => {
    if (!req.query.band || !req.query.song) res.json({ error: "Arguments SONG and BAND are required" })
    helper.getLyrics(req.query.band, req.query.song)
        .then((song) => {
            helper.getTranslate(song.lyrics)
                .then((lyricsTranslated) => {
                    res.json(
                        {
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
    if (!req.query.band) res.json({ error: "Argument BAND is required" })
    helper.getRandomSongNameByBand(req.query.band)
        .then((songName) => {
            helper.getLyrics(req.query.band, songName)
                .then((song) => {
                    helper.getTranslate(song.lyrics)
                        .then((lyricsTranslated) => {
                            res.json(
                                {
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
    if (!req.query.band || !req.query.album || !req.query.year) res.json({ error: "Arguments BAND, ALBUM and YEAR are required" })
    helper.getRandomSongNameByAlbum(req.query.band, req.query.album, req.query.year)
        .then((songName) => {
            helper.getLyrics(req.query.band, songName)
                .then((song) => {
                    helper.getTranslate(song.lyrics)
                        .then((lyricsTranslated) => {
                            res.json(
                                {
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


//ex: http://localhost:5000/api/getArt?band=in%20flames&album=come clarity&year=2006
app.get('/api/getArt', (req, res) => {
    if (!req.query.band || !req.query.album || !req.query.year) res.json({ error: "Arguments BAND, ALBUM and YEAR are required" })
    helper.getArt(req.query.band, req.query.album, req.query.year)
        .then((artUrl) => {
            res.json(
                {
                    artUrl: artUrl
                }
            );
        })
        .catch((e) => res.status(500).json({ error: e }))
});


app.get('*', (req, res) => {
    res.send("Api");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


