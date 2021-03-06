import $ from 'jquery'
import { history } from '../components/history'

export default class Request {
    static send(method, url, data, success, error) {

        url.unshift(Request.getApiUrl())

        if (!data) data = {}

        if (success === undefined) success = (data) => { console.log(data) }

        return $.ajax({
            crossDomain: true,
            url: url.join("/"),
            headers: {
                Authorization: localStorage.getItem('sonateToken') || null,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: method,
            contentType: "application/json",
            data: data,
            success: success,
            error: (e, request, status, err) => {
                switch (e.status) {
                    case 401:
                        history.push({ pathname: '/login', error: "Vous n'êtes plus authentifié, veuillez vous reconnecter" })
                        break
                    default:
                        console.error("something bad happend :'(")
                }
                if (error !== undefined) error(e, request, status, err)
            },
            // timeout: 10000
        })
    }

    static toQueryData(data) {
        Object.keys(data).forEach((key) => !data[key] && delete data[key]);
        let res = [];
        for (let i in data) {
            res.push(encodeURI(i) + '=' + encodeURI(data[i]).replace(/&/g, "%26").replace(/\?/g, "%3F"));
        }
        return res.join('&');
    }

    static getApiUrl() {
        if (process.env.NODE_ENV === "development") {
            return process.env.REACT_APP_API_URL_DEV
        } else if (process.env.NODE_ENV === "production") {
            return process.env.REACT_APP_API_URL_PROD
        } else {
            return "http://localhost:5000/api"
        }
    }
}