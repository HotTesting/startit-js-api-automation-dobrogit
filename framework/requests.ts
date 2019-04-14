import * as request from "request-promise-native";

export class Request{
    url;
    options
    constructor(absoluteURL: string) {
        // initializing options object
        this.options = {
            uri: absoluteURL,
            method: "GET" // Doing GET request by default
        };
    }

    method(type: "GET" | "POST" |"PUT" | "DELETE") {
        this.options.method = type
        return this
    }

    get() {
        this.options.method = 'GET'
        return this
    }

    post() {
        this.options.method = 'POST'
        return this
    }

    put() {
        this.options.method = 'PUT'
        return this
    }

    delete() {
        this.options.method = 'DELETE'
        return this
    }

    body(reqBody) {
        this.options.body = reqBody
        return this
    }

    auth(token: string) {
        this.options.auth = {
            bearer: token
        };
        return this
    }

    headers(headers: Object) {
        this.options.headers = headers;
        return this;
    }

    send() {
        return request(this.options)
    }
}