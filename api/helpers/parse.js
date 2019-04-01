const HTMLParser = require('node-html-parser');
const titleRegexp = /(.+):(.+) Lyrics.+/;

class Parse {
    static lyrics(body) {
        let parsedItemBody = HTMLParser.parse(body);
        let titleComponent = titleRegexp.exec(parsedItemBody.querySelector('title').text);
        let lyrics = parsedItemBody.querySelectorAll('div.lyricbox')[0].innerHTML.replace("<div class='lyricsbreak'></div>", '').replace(/<br\s*[\/]?>/gi, "\n").replace(/<\s*[\/]?i>/gi, "")
        lyrics = lyrics.includes("<b>Instrumental</b>") ? "♪" : lyrics
        let albums = []
        parsedItemBody
            .querySelectorAll('#song-header-container i')
            .map(i => i.text)
            .map(i => i.substr(0, i.length - 1).split(' ('))
            .forEach(e => albums.push({ "name": e[0], "year": e[1] }))
        return { lyrics, title: titleComponent[2].trim(), artist: titleComponent[1].trim(), albums }
    }

    static randomSong(body, band) {
        let songsList = []
        let parsedHtml = HTMLParser.parse(body).querySelectorAll('#mw-content-text *')
        
        // Prevent from adding "Others songs"
        for (let i = 0; i < parsedHtml.length; i++) {
            if (parsedHtml[i].toString().toLowerCase().includes("Other Songs".toLowerCase())) break
            songsList.push(parsedHtml[i])
        }

        songsList = HTMLParser.parse(songsList.toString())
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

    static art(body) {
        return HTMLParser.parse(body).querySelectorAll('img.thumbborder')[0].attributes.src
    }

    static googleTranslate(body) {
        return JSON.parse(body)[0].map(x => x[0]).join('')
    }
    static yandexTranslate(body) {
        return JSON.parse(body).text[0]
    }

    static clues(body) {
        let parsedItemBody = HTMLParser.parse(body);
        let band, flag, styles, country, members, labels
        try {
            let temp = parsedItemBody.querySelectorAll('table.plainlinks tr td a.image')
            if (temp.length > 1) {
                band = temp[0].attributes.href
                flag = temp[1].attributes.href
            } else {
                flag = temp[0].attributes.href
            }
        } catch (e) { }

        try {
            country = parsedItemBody.querySelectorAll('table.plainlinks tr td a b')[0].innerHTML
        } catch (e) { }

        try {
            styles = parsedItemBody.querySelectorAll('div.artist-info div.css-table-cell')[1].querySelectorAll('div')[0].querySelectorAll('ul li').map(x => x.structuredText)
        } catch (e) { }

        try {
            labels = parsedItemBody.querySelectorAll('div.artist-info div.css-table-cell')[1].querySelectorAll('div')[1].querySelectorAll('ul li').map(x => x.structuredText)
        } catch (e) { }

        try {
            let i = parsedItemBody.querySelectorAll('div.artist-info div.css-table-cell p.highlight b')[0].innerHTML.includes('Band members') ? 0 : 1
            members = parsedItemBody.querySelectorAll('div.artist-info div.css-table-cell')[0].querySelectorAll('div')[i].querySelectorAll('ul li').map(x => x.structuredText.split(' – ')[0].split(' - ')[0])
        } catch (e) { }

        return { country, flag, band, styles, members, labels }
    }
}

module.exports = Parse