"use strict";
var common_vendor = require("../vendor.js");
var composables_UseToken = require("../../composables/UseToken.js");
const {
  token
} = composables_UseToken.UseToken();
const request = (url, data, method = "GET") => {
  console.log("token", token.value);
  common_vendor.uni.showLoading({
    title: "\u8BF7\u7A0D\u5019"
  });
  return new Promise((resolve, reject) => {
    common_vendor.uni.request({
      url: "https://yidea.ysjf.com" + url,
      data,
      header: {
        authorization: `Bearer ${token.value}`
      },
      method,
      success: (res) => {
        console.log("http request", res);
        common_vendor.uni.hideLoading();
        resolve(res.data);
      },
      fail: (error) => {
        console.error(error);
        common_vendor.uni.hideLoading();
        reject(error);
      }
    });
  });
};
exports.request = request;
