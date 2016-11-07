'use strict';

var https = require('https');

module.exports.processData = function(query,cb)
{
   let request = https.request({
   path : "/v1/search?q={id}&type=artist".replace("{id}",query),
   host : "api.spotify.com",
   }, function(response)
   {
     let body = "";
     response.on('data', function(d)
     {
       body +=d;
     });

     response.on('end',function()
     {
       var parsed = JSON.parse(body);
       parsed.artists.link = "http://localhost:3500/artists/";
       cb(null,parsed.artists);
     });
   });
   request.end();
}
