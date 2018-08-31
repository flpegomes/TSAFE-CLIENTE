const request = require("superagent");
const defaultAjaxTimeout = 30000;
//const cookie = require("cookie")
request.Request.prototype.finish = function(callback) {
    this.end((err, res) => {
        callback(err, res);
    });
};

var requestWrapper = function(method) {
    return function(url) {
        return request[method](url)
        .type("form")
        .timeout(defaultAjaxTimeout);
    };
};

export default {
    get: requestWrapper("get"),
    put: requestWrapper("put"),
    post: requestWrapper("post"),
    dele: requestWrapper("del")
};