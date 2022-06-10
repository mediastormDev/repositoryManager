"use strict";
var common_http_index = require("../http/index.js");
const previewTicket = (barcode) => {
  return common_http_index.request(`/api/borrow/barcode/${barcode}`, {}).then((res) => {
    return res;
  });
};
exports.previewTicket = previewTicket;
