var http = require('http');
var path = require('path');

var express = require('express');

var app = express();

app.use((req, res, next) => {
  
  console.log(req.method + ' request for ' + req.url);

  next();
  
});

app.use((req, res) => {
  
    var userAgent = req.headers['user-agent'],
        openP = userAgent.indexOf('('),
        closeP = userAgent.indexOf(')'),
        software = userAgent.slice(openP + 1, closeP);
        
    var language = req.headers['accept-language'].split(',')[0];
      
      
      var payload = {
        ipaddress: req.headers['x-forwarded-for'],
        language: language,
        software: software
      };

  
  res.writeHead(200, {"Content-Type": "text/html"  });
  res.end(JSON.stringify(payload));
})

var PORT = process.env.PORT || 8080;

console.log('Express app listening on port ' + PORT);

app.listen(PORT)