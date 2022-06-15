"use strict";
var common_http_index = require("../http/index.js");
const addFav = (assetId) => {
  return common_http_index.request("/api/fav/add", {
    assetId
  }, "POST").then((res) => {
    return res;
  });
};
const removeFav = (assetId) => {
  return common_http_index.request("/api/fav/remove", {
    assetId
  }, "POST").then((res) => {
    return res;
  });
};
exports.addFav = addFav;
exports.removeFav = removeFav;
