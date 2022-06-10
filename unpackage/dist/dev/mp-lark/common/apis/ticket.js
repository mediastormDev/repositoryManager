"use strict";
var common_http_index = require("../http/index.js");
const previewTicket = (barcodes, pendingLentAt, pendingReturnAt) => {
  return common_http_index.request("/api/ticket/preivew", {
    barcodes,
    pendingLentAt,
    pendingReturnAt
  }, "POST").then((res) => {
    return res;
  });
};
const createTicket = (barcodes, pendingLentAt, pendingReturnAt) => {
  return common_http_index.request("/api/ticket/", {
    barcodes,
    pendingLentAt,
    pendingReturnAt
  }, "POST").then((res) => {
    return res;
  });
};
exports.createTicket = createTicket;
exports.previewTicket = previewTicket;
