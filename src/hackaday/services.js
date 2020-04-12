const API_KEY = "o78Emp1CfQBNNOlF";
const BASE_URL = "https://api.hackaday.io/v1/projects?api_key=" + API_KEY;
const request = require('request');

const defaultConfiguration = {
  per_page: 50,
  sortby: "skulls",
  page: 1,
};

function generateUrlWithParams(requestParams) {
  let initialUrl = BASE_URL;
  initialUrl += ("&per_page=" + (!requestParams.per_page ? defaultConfiguration.per_page : requestParams.per_page));
  initialUrl += ("&sortby=" + (!requestParams.sortby ? defaultConfiguration.sortby : requestParams.sortby));
  initialUrl += ("&page=" + (!requestParams.page ? defaultConfiguration.page : requestParams.page));
  return initialUrl;
}

module.exports = {
    generateUrlWithParams
}