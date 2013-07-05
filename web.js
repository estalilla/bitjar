var express = require('express');
var fs = require('fs');


var app = express.createServer(express.logger());

var buf = new Buffer('Hello World from index.html');


app.get('/', function(request, response) {
 //response.send('Hello World 2!');
 var sync = fs.readFileSync('index.html');
 var buffer = buf.toString([sync]);

 response.send(buffer);


});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
