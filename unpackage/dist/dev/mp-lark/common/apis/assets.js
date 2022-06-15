"use strict";
var common_http_index = require("../http/index.js");
const getAssets = () => {
  return common_http_index.request("/api/asset/type", {}).then((res) => {
    return res;
  });
};
const getAssetsByType = (type, pendingLentAt, pendingReturnAt) => {
  if (pendingLentAt && pendingReturnAt) {
    return common_http_index.request(`/api/asset/type/${type}`, {
      pendingLentAt,
      pendingReturnAt
    }, "GET").then((res) => {
      return res;
    });
  } else {
    return common_http_index.request(`/api/asset/type/${type}`, {}, "GET").then((res) => {
      return res;
    });
  }
};
const getFav = (pendingLentAt, pendingReturnAt) => {
  let data = {};
  if (pendingLentAt && pendingReturnAt) {
    data.pendingLentAt = pendingLentAt;
    data.pendingReturnAt = pendingReturnAt;
  }
  return common_http_index.request(`/api/asset/type/fav`, data, "GET").then((res) => {
    return res;
  });
};
exports.getAssets = getAssets;
exports.getAssetsByType = getAssetsByType;
exports.getFav = getFav;
