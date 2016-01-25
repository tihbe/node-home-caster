'use strict';

var Client                = require('castv2-client').Client;
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
var mdns                  = require('mdns');
var store                 = require('./store');
var client = new Client();

function launchChromecastStreamingApp() {

  var browser = mdns.createBrowser(mdns.tcp('googlecast'));
  browser.on('serviceUp', function(service) {
    console.log('Found Chromecast "%s" at %s:%d', service.name, service.addresses[0], service.port);
    startCasting(service.addresses[0]);
    browser.stop();
  });

  browser.start();
}

function startCasting(chromecast) {
  client.on('error', function(err) {
    console.log('An error (Chromecast) occurred: %s', err.message);
    client.close();
  });
  client.connect(chromecast, launchQueue);
}

function playNextSong(player, u) {
  var url = u || store.getNext();
  var media = {
    contentId: url,
    contentType: 'audio/mpeg',
    streamType: 'BUFFERED',
  };
  var opts = { autoplay: true };
  var callback = function(err, status) {
    if(err) {
      console.log('An error (DefaultMediaReceiver) occurred', err);
      setTimeout(function() {playNextSong(player, url);}, 2000);
    } else {
      console.log('Media loaded. Starting to play soon...');
    }
  };

  player.load(media, opts, callback);
}

function launchQueue() {
  var url = store.getNext();
  if (url != null && client != null) {
    client.launch(DefaultMediaReceiver, function(err, player) {
      player.on('status', function(status) {
        console.log('Chromecast changed state to %s', status.playerState);
        if (status.playerState == "IDLE") {
          playNextSong(player);
        }
      });
      playNextSong(player, url);
    });
  } else {
    setTimeout(launchQueue, 2000); //If the store is empty, wait 2 sec and re-try to launch
  }
}

module.exports = launchChromecastStreamingApp;
