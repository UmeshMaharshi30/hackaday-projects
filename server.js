const express = require("express");
const path = require("path");
const https = require("https");
const globalConstants = require("./src/constants");
const url = require('url');
const querystring = require('querystring');
const services = require('./src/hackaday/services');


const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    req.getUrl = function() {
      return req.protocol + "://" + req.get('host') + req.originalUrl;
    }
    return next();
});


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
    let sucessResponse = {
        msg: "successful",
      };
    responeHandler(res, sucessResponse, 200, true, globalConstants.json_type);
});

app.get('/projects', async function(req, res) {
    let rawUrl = req.getUrl();
    let parsedUrl = url.parse(rawUrl);
    let parsedQs = querystring.parse(parsedUrl.query);
    let hackadayQueryURL = services.generateUrlWithParams(parsedQs);
    responeHandler(res, {msg : hackadayQueryURL}, 200, true, globalConstants.json_type);
});


app.get('/project/:id', async function(req, res) {
    res.end();
});

module.exports = app;