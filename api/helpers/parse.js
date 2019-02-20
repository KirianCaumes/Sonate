const HTMLParser = require('node-html-parser');
const titleRegexp = /(.+):(.+) Lyrics.+/;

class Parse {
    static lyrics(body) {
        let parsedItemBody = HTMLParser.parse(body);
        let titleComponent = titleRegexp.exec(parsedItemBody.querySelector('title').text);
        let lyrics = parsedItemBody.querySelectorAll('div.lyricbox')[0].innerHTML.replace("<div class='lyricsbreak'></div>", '').replace(/<br\s*[\/]?>/gi, "\n").replace(/<\s*[\/]?i>/gi, "")
        lyrics = lyrics.includes("<b>Instrumental</b>") ? "*Instrumental Only*" : lyrics
        let albums = []
        parsedItemBody
            .querySelectorAll('#song-header-container i')
            .map(i => i.text)
            .map(i => i.substr(0, i.length - 1)
                .split(' ('))
            .forEach(e => albums.push({ "name": e[0], "year": e[1] }))
        return { lyrics, title: titleComponent[2].trim(), artist: titleComponent[1].trim(), albums }
    }

    static randomSong(body) {
        let songsList = HTMLParser.parse(body)
            .querySelectorAll('ol li b a')
            .map(item => item.attributes.title)
            .filter(x => x.toLowerCase().includes(band.toLowerCase()))
            .filter(x => !x.includes("(page does not exist)"))
        return songsList[Math.floor(Math.random() * songsList.length) + 0].split(':')[1];
    }

    static randomSongByAlbum(body) {
        let songsList = HTMLParser.parse(body).querySelectorAll('ol li b a').map(item => item.attributes.title).filter(x => !x.includes("(page does not exist)"))
        return songsList[Math.floor(Math.random() * songsList.length) + 0].split(':')[1];
    }

    static art(body){
        return HTMLParser.parse(body).querySelectorAll('img.thumbborder')[0].attributes.src
    }

    static googleTranslate(body){
        return JSON.parse(body)[0].map(x => x[0]).join('')
    }
    static yandexTranslate(body){
        return JSON.parse(body).text[0]
    }
}

module.exports = Parse