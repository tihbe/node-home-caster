"use strict";
var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var store = require('./store');
var url = require('url');
var io = require('socket.io')(http);

function handleRequest(request, res){
  res.statusCode = 200;
  fs.createReadStream("./index.html").pipe(res);
  var querysData = url.parse(request.url, true).query;
	if (queryData && queryData.url) {
  	if (queryData.url.match(/youtube.com\/watch\?/) != null) {
      var youtubeQuery = getParameterByName(queryData.url, 'v');
  		store.addSong("https://www.youtube.com/watch?v="+youtubeQuery, true);
  	}
  	if (queryData.goback == "1") {
  		res.writeHead(302, {
  			'Location': queryData.url
		    });
		  res.end();
    }
  }
}

io.on('connection', function(socket) {
  socket.on('addSong', function(data) {
    if (data && typeof data == "object" && data.url) {
      if (data.url.match(/youtube.com\/watch\?/) != null) {
        var video = url.parse(data.url, true).query.v;
        store.addSong("https://www.youtube.com/watch?v="+video, data.playonce);
      }
    }
  });
});

app.get('/', function(req, res) {
  res.statusCode = 200;
  fs.createReadStream("./index.html").pipe(res);
});

function startWebServer() {
  http.listen(8080);
}

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

module.exports = startWebServer;
