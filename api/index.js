const express = require('express');
const path = require('path');
const request = require('request');
var HTMLParser = require('node-html-parser');
const cors = require('cors')

const app = express();
const helper = require('./helper')

app.use(cors())

//ex: http://localhost:5000/api/song/byname/fear%20of%20the%20dark
app.get('/api/song/byname/:name', (req, res) => {
    helper.getLyricUrl(req.params.name)
        .then((lyricUrl) => {
            helper.getLyrics(lyricUrl)
                .then((song) => {
                    helper.getTranslate(song.lyrics)
                        .then((lyricsTranslated) => {
                            res.json(
                                {
                                    lyricsTranslated: lyricsTranslated,
                                    lyrics: song.lyrics,
                                    song: song.song,
                                    artist: song.artist
                                }
                            );
                        })
                })
        })
});

//ex: http://localhost:5000/api/song/byband/system%20of%20a%20down
app.get('/api/song/byband/:name', (req, res) => {
    helper.getBandUrl(req.params.name)
        .then((bandUrl) => {
            helper.getRandomLyricUrl(bandUrl)
                .then((lyricUrl) => {
                    helper.getLyrics(lyricUrl)
                        .then((song) => {
                            helper.getTranslate(song.lyrics)
                                .then((lyricsTranslated) => {
                                    res.json(
                                        {
                                            lyricsTranslated: lyricsTranslated,
                                            lyrics: song.lyrics,
                                            song: song.song,
                                            artist: song.artist
                                        }
                                    );
                                })
                        })
                })
        })
});

app.get('*', (req, res) => {
    res.send("Api");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


