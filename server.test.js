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
