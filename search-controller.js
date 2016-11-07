'use strict';

var hb = require('handlebars');

let model = undefined;

let obj = {};

function view(viewName,result,cb)
  {
    var source =`
    <html>
    <head>
      <title>Searching..</title>
    </head>
    <body>
    <h1>Search an Artist</h1>
    <table>
      {{#each items}}
        <tr>
          <td><a href="{{link}}{{id}}">{{name}}</a>({{id}})</td>
          <td><img src="{{images.1.url}}"></img></td>
        </tr>
      {{/each}}
    </table>
    </body>
  </html>    `

    hb.registerHelper('link', function() {
      var url = hb.escapeExpression("http://localhost:3500/artists/");
      return new hb.SafeString(
        url
      );
    });


    var template = hb.compile(source);
    var view = template(result.artists);
    console.log("template: " + view)
    cb(null,view);
}

obj.parse = function (req,rsp,query)
{
      model.processData(query, (error, result) => view("search-view",result,(error,viewResult) =>
      {
          if(!error)
          {
            rsp.writeHead(200,{"Content-type":"text/html"});
            console.log("viewResult: "+ viewResult);
          }
          else
          {
            rsp.writeHead(404);
          }
          rsp.end(viewResult)
      }));
}

module.exports = function(m)
{
    model = m;
    return obj;
}
