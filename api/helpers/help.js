class Help {
    static toFirstUpper(text) {
        return text
            .toLowerCase()
            .split(' ') //Put First letter of each word to uppercase
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .split('.') //Put First letter of each word separate by dot to uppercase
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join('.')
            .replace(/\&/g, "%26")
            .replace(/\?/g, "%3F")
            .replace(/\s/g, "_");
    }

    static toFullUpper(text) {
        return text
            .toUpperCase()
            .replace(/\&/g, "%26")
            .replace(/\?/g, "%3F")
            .replace(/\s/g, "_");
    }
}

module.exports = Help