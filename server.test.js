const request = require("supertest");
const app = require("./server");
const globalConstants = require("./src/constants");

describe("GET /ping", function () {
  it("responds with json with pong as message", function (done) {
    request(app).get("/ping").set("Accept", globalConstants.json_type).expect(
      200,
      {
        msg: "pong",
        ok : true
      },
      done
    );
  });
});


describe("Testing /hackaday", function () {

    it("Response should contain valid default hackaday URL when no query params are present", function (done) {
      request(app).get("/hackaday").set("Accept", globalConstants.json_type).expect(
        200,
        {
          msg: "https://api.hackaday.io/v1/projects?api_key=o78Emp1CfQBNNOlF&per_page=50&sortby=skulls&page=1",
          ok : true
        },
        done
      );
    });

    it("Response url should be generated based on query params(per_page)", function (done) {
        request(app).get("/hackaday?per_page=5").set("Accept", globalConstants.json_type).expect(
          200,
          {
            msg: "https://api.hackaday.io/v1/projects?api_key=o78Emp1CfQBNNOlF&per_page=5&sortby=skulls&page=1",
            ok : true
          },
          done
        );
      });
      it("Response url should be generated based on query params(sortby)", function (done) {
        request(app).get("/hackaday?sortby=comments").set("Accept", globalConstants.json_type).expect(
          200,
          {
            msg: "https://api.hackaday.io/v1/projects?api_key=o78Emp1CfQBNNOlF&per_page=50&sortby=comments&page=1",
            ok : true
          },
          done
        );
      });
      it("Response url should be generated based on query params(page)", function (done) {
        request(app).get("/hackaday?page=4").set("Accept", globalConstants.json_type).expect(
          200,
          {
            msg: "https://api.hackaday.io/v1/projects?api_key=o78Emp1CfQBNNOlF&per_page=50&sortby=skulls&page=4",
            ok : true
          },
          done
        );
      });
      it("Response url should be generated based on query params(all)", function (done) {
        request(app).get("/hackaday?page=4&sortby=comments&per_page=15").set("Accept", globalConstants.json_type).expect(
          200,
          {
            msg: "https://api.hackaday.io/v1/projects?api_key=o78Emp1CfQBNNOlF&per_page=15&sortby=comments&page=4",
            ok : true
          },
          done
        );
      });

  });