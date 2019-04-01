const rp = require('request-promise');
const Parse = require('../helpers/parse')

class RequestTranslations {
    /**
    * Translate lyrics
    * @param {String} lyrics
    * @returns {String}
    */
    static async getTranslate(data, lang) {
        return await rp("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + lang + "&dt=t&q=" + encodeURI(data) + "&ie=UTF-8&oe=UTF-8")
            .then((body) => { return Parse.googleTranslate(body) })
            .catch((e) => {
                return rp("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190216T145755Z.dc5fb0f5660239ab.55fcbf8f0c27f29829bef16686b424a83848e025&text=" + encodeURI(data) + "&lang=" + lang)
                    .then((body) => { return Parse.yandexTranslate(body) })
                    .catch((e) => {
                        throw "Translation failed"
                    })
            })

    }
}

module.exports = RequestTranslations