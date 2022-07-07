"use strict";
var common_http_index = require("../http/index.js");
const previewTicket = (barcodes, pendingLentAt, pendingReturnAt, ticketId) => {
  const data = {
    barcodes,
    pendingLentAt,
    pendingReturnAt
  };
  if (ticketId) {
    data.ticketId = ticketId;
  }
  return common_http_index.request("/api/ticket/preivew", data, "POST").then((res) => {
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
const updateTickeDate = (ticketId, pendingLentAt, pendingReturnAt) => {
  return common_http_index.request(`/api/ticket/${ticketId}/update`, {
    pendingLentAt,
    pendingReturnAt
  }, "POST").then((res) => {
    return res;
  });
};
const cancelTicket = (ticketId) => {
  return common_http_index.request(`/api/ticket/${ticketId}/cancel`, {}, "POST").then((res) => {
    return res;
  });
};
const getTickets = () => {
  return common_http_index.request("/api/ticket", {}, "GET").then((res) => {
    return res;
  });
};
const getTicketsAll = () => {
  return common_http_index.request("/api/ticket/all", {}, "GET").then((res) => {
    return res;
  });
};
const removeGear = (ticketId, borrowId) => {
  return common_http_index.request(`/api/ticket/${ticketId}/${borrowId}/remove`, {}, "POST").then((res) => {
    return res;
  });
};
exports.cancelTicket = cancelTicket;
exports.createTicket = createTicket;
exports.getTickets = getTickets;
exports.getTicketsAll = getTicketsAll;
exports.previewTicket = previewTicket;
exports.removeGear = removeGear;
exports.updateTickeDate = updateTickeDate;
