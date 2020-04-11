const express = require("express");
const path = require("path");
const https = require("https");
const globalConstants = require("./src/constants");


const app = express();

app.use(express.json());


function responeHandler(res, responseBody, responseCode, status, contentType) {
  res.statusCode = responseCode;
  responseBody.ok = status;
  res.header("Content-Type", contentType);
  res.send(responseBody);
  res.end();
}

app.get("/ping", function (req, res) {
  let sucessResponse = {
    msg: "pong",
  };
  responeHandler(res, sucessResponse, 200, true, globalConstants.json_type);
});

app.get('/', function(req, res) {
    responeHandler(res, sucessResponse, 200, true, globalConstants.json_type);
});

module.exports = app;