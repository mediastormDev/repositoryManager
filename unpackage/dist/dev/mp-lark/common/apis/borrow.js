"use strict";
var common_http_index = require("../http/index.js");
const previewTicket = (barcode) => {
  return common_http_index.request(`/api/borrow/barcode/${barcode}`, {}).then((res) => {
    return res;
  });
};
const lendGear = (borrowId) => {
  return common_http_index.request(`/api/borrow/lend/${borrowId}`, {}, "POST").then((res) => {
    return res;
  });
};
const returnGear = (borrowId) => {
  return common_http_index.request(`/api/borrow/return/${borrowId}`, {}, "POST").then((res) => {
    return res;
  });
};
const borrowListByType = (type, openId = "") => {
  const data = {
    type
  };
  if (openId) {
    data.openId = openId;
  }
  return common_http_index.request(`/api/borrow/list`, data).then((res) => {
    return res;
  });
};
const adminBorrow = ({
  barcodes,
  openId,
  pendingLentAt,
  pendingReturnAt
}) => {
  return common_http_index.request(`/api/borrow`, {
    barcodes,
    openId,
    pendingLentAt,
    pendingReturnAt
  }, "POST").then((res) => {
    return res;
  });
};
exports.adminBorrow = adminBorrow;
exports.borrowListByType = borrowListByType;
exports.lendGear = lendGear;
exports.previewTicket = previewTicket;
exports.returnGear = returnGear;
