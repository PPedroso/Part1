'use strict';

const PORT = 3500;
var http = require('http');
var url = require('url');

//---------Control and model initialization and configuration ---------------//

var searchmodel = require('./search-model');
var searchcontroller = require('./search-controller')(searchmodel);

var artistsmodel = require('./artists-model');
var artistscontroller = require('./artists-controller')(artistsmodel);

var handlers = {
    "search": searchcontroller.parse,
    "artists": artistscontroller.parse
};

//--------------------------Server Initialization----------------------//

handlers.notFound = function(req,rsp)
{
    rsp.writeHead(404);
    rsp.end();
}

let server = http.createServer(processRequest);

server.listen(PORT, () => console.log("Listening on port " + PORT));

function processRequest(req, rsp)
{
    let u = url.parse(req.url);
    let pathname = u.pathname.substr(1, u.pathname.length);
    let paths = pathname.split('/');
    console.log(pathname);
    let handler = handlers.hasOwnProperty(paths[0]) ? handlers[paths[0]] : handlers.notFound;
    handler(req, rsp,paths[1]);
    //rsp.setHeader("Content-Type", "text/html");
}
