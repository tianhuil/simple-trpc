"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 4000;
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
