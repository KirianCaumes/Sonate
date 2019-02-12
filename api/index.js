const express = require('express');
const path = require('path');
const request = require('request');
var HTMLParser = require('node-html-parser');
const cors = require('cors')

const app = express();

app.use(cors())

app.get('/api/getsong', (req, res) => {
    const titleRegexp = /(.+) - (.+) Lyrics.+/;
    request(`https://search.azlyrics.com/search.php?q=${req.query.search.replace(/\s/g, "+")}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedBody = HTMLParser.parse(body);
            const lyricUrl = parsedBody.querySelectorAll('a').map(item => item.attributes.href).filter(href => href.indexOf('/lyrics') > 0)[0];
            if (lyricUrl === undefined) res.json({ error: "no data found" });

            request(lyricUrl, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedItemBody = HTMLParser.parse(body);
                    const htmlTitle = parsedItemBody.querySelector('title').text;
                    const titleComponent = titleRegexp.exec(htmlTitle);
                    let artist = titleComponent[1].trim();
                    let song = titleComponent[2].trim();
                    let lyrics = parsedItemBody.querySelectorAll('div.col-xs-12.col-lg-8.text-center div')[4].text.trim();

                    request("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&dt=t&q=" + encodeURI(lyrics) + "&ie=UTF-8&oe=UTF-8", (error, response, body) => {
                        let bodyParse = JSON.parse(body)
                        let lyricsTranslated = ""
                        for (let i = 0; i < bodyParse.length; i++) {
                            lyricsTranslated += bodyParse[0][i][0];
                        }
                        console.log(encodeURI(lyrics))
                        res.json(
                            {
                                lyricsTranslated,
                                lyrics,
                                song,
                                artist
                            }
                        );
                    })


                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.send("Api");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
