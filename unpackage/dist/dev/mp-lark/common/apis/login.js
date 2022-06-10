"use strict";
var composables_UseToken = require("../../composables/UseToken.js");
var common_http_index = require("../http/index.js");
const {
  token
} = composables_UseToken.UseToken();
const login = (code) => {
  return common_http_index.request("/api/auth/token", {
    code
  }, "POST").then((res) => {
    console.log("token1", res);
    token.value = res.token;
    console.log("token", token.value);
  });
};
const getMyprofile = () => {
  return common_http_index.request("/api/auth/profile", {}, "GET").then((res) => {
    console.log("profile", res);
  });
};
exports.getMyprofile = getMyprofile;
exports.login = login;
