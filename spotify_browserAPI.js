'use strict';

const PORT = 3500;
var http = require('http');
var url = require('url');

//---------Control and model initialization and configuration ---------------//

var searchmodel = require('./search-model');
var searchcontroller = require('./search-controller')(searchmodel);

var artistsmodel = require('./artists-model');
var artistscontroller = require('./artists-controller')(artistsmodel);

var connect = require('./custom-connect');

var app = connect();



app.get("/search/",(req, res)=> {
  extractQuerystring(req, res, searchcontroller.parse)

});

app.get("/artists/",(req, res)=> {
  extractQuerystring(req, res, artistscontroller.parse)

});

app.use("*", (req, res) => notFound(req, res))

function extractQuerystring(req, res, handler)
{
  let u = url.parse(req.url);
  let pathname = u.pathname.substr(1, u.pathname.length);
  let paths = pathname.split('/');
   handler(req, res, paths[1]);
}

function notFound(req,rsp)
{
    rsp.writeHead(404);
    rsp.end("Endpoint not found");
}

let server = http.createServer(app);

server.listen(PORT, () => console.log("Listening on port " + PORT));
