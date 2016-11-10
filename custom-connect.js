"use strict";

const url = require('url');


Array.prototype.forEachWhile = function (predicate) {
    for(let i = 0; i < this.length; ++i) {
        if(!predicate(this[i]))
            return;
    }
}

function Midleware(path, mw, reqType) {
    this.reqType = reqType || "*";
    this.mw = mw;
    this.path = path || "*";

}

module.exports = function () {
    const midlewares = [];

    // Function called by http module, for all requests
    let appFn = function (req, rsp) {
        processMidleware(0);

        function processMidleware(idx)
        {
            for(; idx < midlewares.length; ++idx) {
                let currReqType = midlewares[idx].reqType;
                let currPath = midlewares[idx].path;
                let pathname = url.parse(req.url).pathname;
                pathname = pathname.substr(0, pathname.lastIndexOf('/')+1);
                if((currReqType == "*" || currReqType == req.method) && (currPath == "*" || currPath == pathname)) {
                    midlewares[idx].mw(req, rsp, () => !rsp.finished && processMidleware(++idx));
                    return;
                }
            }
        }
    };

    appFn.use = function (path, midleware) {
        midlewares.push(new Midleware(path, midleware));
    }

    appFn.get = function (path, midleware) {
        midlewares.push(new Midleware(path, midleware, "GET"));
    }

    appFn.post = function (path, midleware) {
        midlewares.push(new Midleware(path, midleware, "POST"));
    }

    return appFn;
};
