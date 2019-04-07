import $ from 'jquery'

export default class Request {
    static send(method, url, data, success, error) {
        url.unshift("http://localhost:5000/api");

        if (!data) data = {}

        if (error === undefined)
            error = (data) => {
                switch (data.status) {
                    case 401:
                        console.error("something bad happend :'(")
                        break;
                    default:
                        console.error("something bad happend :'(")
                }
            };

        if (success === undefined) success = (data) => { console.log(data) }

        return $.ajax({
            crossDomain: true,
            url: url.join("/"),
            method: method,
            contentType: "application/json",
            data: typeof data === "string" ? data : Request.toQueryData(data),
            success: success,
            error: error
        });
    }

    static toQueryData(data) {
        Object.keys(data).forEach((key) => !data[key] && delete data[key]);
        let res = [];
        for (let i in data) {
            res.push(encodeURI(i) + '=' + encodeURI(data[i]).replace(/&/g, "%26").replace(/\?/g, "%3F"));
        }
        return res.join('&');
    }
}