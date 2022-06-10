"use strict";
var common_http_index = require("../http/index.js");
const getAssets = () => {
  return common_http_index.request("/api/asset/type", {}).then((res) => {
    return res;
  });
};
const getAssetsByType = (type) => {
  return common_http_index.request(`/api/asset/type/${type}`, {}, "GET").then((res) => {
    return res;
  });
};
exports.getAssets = getAssets;
exports.getAssetsByType = getAssetsByType;
