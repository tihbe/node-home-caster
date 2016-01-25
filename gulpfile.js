"use strict";

var gulp = require("gulp");
var chromecastHandler = require('./src/chromecastHandler');
var webServer = require('./src/webServer');
var browserify = require("browserify");
var source = require("vinyl-source-stream");

function buildWebApp() {
	browserify("./webSrc/jsx/index.jsx")
  		.transform("babelify", {presets: ["es2015", "react"]})
  		.bundle()
  		.pipe(source("app.js"))
  		.pipe(gulp.dest("dist"));
};

function startWebServer() {
  webServer();
};

function startChromecastHandler() {
  //chromecastHandler();
};



gulp.task('buildWebApp', buildWebApp);
gulp.task('startWebServer', startWebServer);
gulp.task('startChromecastHandler', startChromecastHandler);

gulp.task('default', ['startWebServer', 'startChromecastHandler', 'buildWebApp'])
