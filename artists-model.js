'use strict';

var https = require('https');

module.exports.processData = function(query,cb)
{
   let request = https.request({
   path : "/v1/artists/{id}".replace("{id}",query),
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
      console.log(parsed);
       cb(null,parsed);
     });
   });
   request.end()
}
