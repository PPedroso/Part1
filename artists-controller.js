'use strict';

var hb = require('handlebars');
let model = undefined;

let obj = {};

function view(viewName,result,cb)
  {
    var source =`
    <html>
      <head>
  		  <title>{{name}}</title>
      </head>
      <body>
          <h4>{{type}}</h4>
  		    <h1>{{name}}</h1>
  		    <table>
      			<tr>
      				<td><img src="{{images.2.url}}"></td>
      			</tr>
    			  <tr>
      				<td>Popularity:</td>
      				<td>{{popularity}}</td>
      				<td>&nbsp;</td>
            </tr>
            <tr>
              <td>Followers:</td>
      				<td>{{followers.total}}</td>
  			    </tr>
            <tr>
            <td>Genres:</td>
            {{#each genres}}
              <td>{{this}}</td>
            {{/each}}
            </tr>
  		    </table>
      </body>
    </html>
            `
    var template = hb.compile(source);
    var resr = template(result);
    cb(null,resr);
}

obj.parse = function (req,rsp,query)
{
      model.processData(query, (error, result) => view("search-view",result,(error,viewResult) => {
          if(!error)
          {
            rsp.writeHead(200,{"Content-type":"text/html"});
          }
          else {
            rsp.writeHead(404);
          }
      rsp.end(viewResult)}));
}

module.exports = function(m)
{
    model = m;
    return obj;
}
