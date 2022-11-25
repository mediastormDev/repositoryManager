"use strict";
var common_vendor = require("../common/vendor.js");
const token = common_vendor.ref("");
const openId = common_vendor.ref("");
var UseToken = () => {
  const adminTokenList = ["ou_59fc5918c2fdf9106f0cc6ada7d0db1a", "ou_359431987ea6685b51b7cb4b1a5cbd63"];
  const isAdmin = common_vendor.computed$1(() => {
    console.log("isAdmin", !!adminTokenList.filter((admin) => admin == openId.value).length);
    console.log("openId.value", openId.value);
    return true;
  });
  return {
    isAdmin,
    token,
    openId
  };
};
exports.UseToken = UseToken;
