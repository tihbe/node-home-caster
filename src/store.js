var spawn = require('child_process').spawn;

var inventory = [];
var readingPtr = 0;

//TODO: download url might not work multiple times
var addSong = function(url, playOnce) {
	var downloader = spawn("youtube-dl", ['-g', url, '-f 17']);
	downloader.stdout.setEncoding('utf8');
	downloader.stdout.on('data', function(data) {
		if (data) {
			var newInventoryElement = {
				youtubeUrl: url,
				downloadUrl: data.replace('\n', ''),
				playOnce: playOnce
			};
			inventory.push(newInventoryElement);
		};
	});
	downloader.on('close', function(code) {
		console.log("Code %s on url download %s", code, url);
		if (code != 0) {
			removeFromInventory(url);
		}
	});
}

function removeFromInventory(url) {
	console.log("removing %s from inventory", url);
	for (var key in inventory) {
		if (inventory[key].youtubeUrl == url) {
			inventory.splice(key, 1);
			if (readingPtr > key) {
				readingPtr--;
			};
		}
	}
}

var getNext = function() {
	if (inventory.length > 0) {
		if (readingPtr < inventory.length) {
			if (inventory[readingPtr].playOnce == true) {
				var item = inventory[readingPtr];
				inventory.splice(readingPtr, 1);
				return item.downloadUrl;
			}
			return inventory[readingPtr++].downloadUrl;
		} else {
			var index = Math.floor(Math.random()*inventory.length);
			return inventory[index].downloadUrl;
		}
	}
	return null;
}

module.exports = {
	getNext: getNext,
	addSong: addSong
}
