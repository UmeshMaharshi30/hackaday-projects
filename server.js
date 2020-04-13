const express = require("express");
const path = require("path");
const https = require("https");
const globalConstants = require("./src/constants");
const url = require("url");
const querystring = require("querystring");
const services = require("./src/hackaday/services");
const request = require("request");
const fs = require("fs");

const app = express();

app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  req.getUrl = function () {
    return req.protocol + "://" + req.get("host") + req.originalUrl;
  };
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

app.get("/", function (req, res) {
  res.redirect("/projects");
});

app.get("/projects", async function (req, res) {
  /*  
  const projects = {"total":24298,"per_page":0,"last_page":2430,"page":2431, projects : [{"id":1313,"url":"https:\/\/hackaday.io\/project\/1313-openmv","owner_id":10526,"name":"OpenMV","summary":"Python-powered machine vision modules","description":"The OpenMV project aims at making machine vision more accessible to beginners by developing a user-friendly, open-source, low-cost machine vision platform.\r\n\r\nOpenMV cameras are programmable in Python3 and come with an extensive set of image processing functions such as face detection, keypoints descriptors, color tracking, QR and Bar codes decoding, AprilTags, GIF and MJPEG recording and more.\r\n\r\nAdditionally, OpenMV includes a cross-platform IDE (based on Qt Creator) designed specifically to support programmable cameras. The IDE allows viewing the camera&apos;s frame buffer, accessing sensor controls, uploading scripts to the camera via serial over USB (or WiFi\/BLE if available) and includes a set of image processing tools to generate tags, thresholds, keypoints etc...\r\n\r\nThe OpenMV project is a THP semifinalist and was successfully funded via Kickstarter back in 2015 and has come a long way since then.","image_url":"https:\/\/cdn.hackaday.io\/images\/5817461406329458960.JPG","views":211445,"comments":211,"followers":3834,"skulls":1401,"logs":19,"details":1,"instruction":0,"components":10,"images":6,"created":1401763612,"updated":1554388653,"tags":["camera","OpenMV","arm","TheHackadayPrize","python","stm32f7","machine vision","ongoing project","STm32f429","STM32F407"]},{"id":5373,"url":"https:\/\/hackaday.io\/project\/5373-hack-chat","owner_id":182178,"name":"Hack Chat","summary":"Use the team chat to talk about your projects and find collaborators for whatever you are working on.","description":"If you need help on your project you&apos;ve come to the right place. <br>Click on the &quot;Public Chat&quot; button on the left top and you&apos;re automatically in. <br>Hack Chat guidelines: <a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https:\/\/hackaday.io\/pages\/542\">https:\/\/hackaday.io\/pages\/542<\/a><br>All are welcome!","image_url":"https:\/\/cdn.hackaday.io\/images\/7255311484679597966.png","views":56773,"comments":193,"followers":2569,"skulls":1395,"logs":0,"details":1,"instruction":1,"components":0,"images":3,"created":1429655720,"updated":1585247332,"tags":["ongoing project"]}]};
    res.render('projects', {
        projects : projects.projects,
        pagination : {
          perPage : projects.per_page, 
          lastPage : projects.last_page,
          page : projects.page
        }
    });
    */

  let rawUrl = req.getUrl();
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let hackadayQueryURL = services.generateUrlWithParams(parsedQs);

  fs.readFile("dummy.json", (err, data) => {
    if (err) throw err;
    const hackadayResponse = JSON.parse(data);
    //fs.writeFileSync("dummy.json", body);
    res.render("projects", {
      projects: hackadayResponse.projects,
      pagination: {
        perPage: hackadayResponse.per_page,
        lastPage: hackadayResponse.last_page,
        page: hackadayResponse.page,
      },
    });
  });
  /*
  request.get(hackadayQueryURL, (error, response, body) => {
    if (error) {
      responeHandler(res, {}, 400, false, globalConstants.json_type);
    }

    const hackadayResponse = JSON.parse(body);
    fs.writeFileSync("dummy.json", body);
    console.log(hackadayResponse);
    res.render("projects", {
      projects: hackadayResponse.projects,
      pagination: {
        perPage: hackadayResponse.per_page,
        lastPage: hackadayResponse.last_page,
        page: hackadayResponse.page,
      },
    });
  });
  */
});

app.get("/hackaday", async function (req, res) {
  let rawUrl = req.getUrl();
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);
  let hackadayQueryURL = services.generateUrlWithParams(parsedQs);
  responeHandler(
    res,
    { msg: hackadayQueryURL },
    200,
    true,
    globalConstants.json_type
  );
});

app.get("/project/:id", async function (req, res) {

  fs.readFile("project-details.json", (err, data) => {
    if (err) throw err;
    const hackadayResponse = JSON.parse(data);
    //fs.writeFileSync("dummy.json", body);
    res.render("project", {
      project: hackadayResponse      
    });
  });    
});

module.exports = app;
