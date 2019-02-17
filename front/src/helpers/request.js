import $ from 'jquery'

export default class Request {
    static send(method, url, data, success, error) {
        url.unshift("http://localhost:5000/api");

        if (error === undefined)
            error = (data) => {
                switch (data.status) {
                    case 401:
                        console.log("something bad happend :'(")
                        break;
                    default:
                        console.log("something bad happend :'(")
                }
            };

        if (success === undefined)
            success = (data) => { console.log(data) };
        console.log(url.join("/"))
        return $.ajax({
            crossDomain: true,
            url: url.join("/"),
            method: method,
            contentType: "application/json",
            data: typeof data === "string" ? data : JSON.stringify(data),
            success: success,
            error: error
        });
    }

    static toQueryData(data) {
        let res = [];
        for (let i in data) {
            res.push(encodeURI(i) + '=' + encodeURI(data[i]).replace(/\&/g, "%26").replace(/\?/g, "%3F"));
        }
        return '?' + res.join('&');
    }
}