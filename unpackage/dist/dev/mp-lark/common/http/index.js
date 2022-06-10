"use strict";
var common_vendor = require("../vendor.js");
var composables_UseToken = require("../../composables/UseToken.js");
const {
  token
} = composables_UseToken.UseToken();
const request = (url, data, method = "GET") => {
  console.log("token", token.value);
  return new Promise((resolve, reject) => {
    common_vendor.uni.request({
      url: "http://10.80.1.4:1627" + url,
      data,
      header: {
        authorization: `Bearer ${token.value}`
      },
      method,
      success: (res) => {
        console.log("http request", res);
        resolve(res.data);
      },
      fail: (error) => {
        console.error(error);
        reject(error);
      }
    });
  });
};
exports.request = request;
