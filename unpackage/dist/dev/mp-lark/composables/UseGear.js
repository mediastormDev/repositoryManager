"use strict";
var common_vendor = require("../common/vendor.js");
var common_apis_assets = require("../common/apis/assets.js");
var common_apis_borrow = require("../common/apis/borrow.js");
var GearStatus = /* @__PURE__ */ ((GearStatus2) => {
  GearStatus2["free"] = "IDLE";
  GearStatus2["booked"] = "PENDING";
  GearStatus2["lend"] = "INUSE";
  GearStatus2["repair"] = "REPAIR";
  return GearStatus2;
})(GearStatus || {});
const GearStatusString = {
  IDLE: "\u7A7A\u95F2",
  PENDING: "\u9501\u5B9A",
  INUSE: "\u5360\u7528",
  REPAIR: "\u7EF4\u4FEE"
};
const gearList = common_vendor.ref([]);
const nowGearList = common_vendor.ref([]);
const nowType = common_vendor.ref("");
const orderList = [
  "\u6444\u5F71\u673A",
  "\u5FAE\u5355",
  "\u8FD0\u52A8\u76F8\u673A",
  "EF\u53E3",
  "E\u5361\u53E3",
  "RF\u53E3",
  "V\u53E3\u7535\u6C60",
  "FZ100\u7535\u6C60",
  "970\u7535\u6C60",
  "LPE6\u7535\u6C60",
  "\u56FE\u4F20",
  "\u76D1\u89C6\u5668",
  "\u7A33\u5B9A\u5668",
  "\u4E09\u811A\u67B6",
  "\u4E91\u53F0",
  "\u6ED1\u8F68",
  "\u6EE4\u955C"
].reverse();
var UseGear = () => {
  const getAssetList = () => {
    return common_apis_assets.getAssets().then((res) => {
      let tempArr = res.map((item, index) => {
        return {
          name: item,
          selected: false
        };
      });
      tempArr = tempArr.sort((a, b) => {
        return orderList.indexOf(b.name) - orderList.indexOf(a.name);
      });
      tempArr.map((item, index) => {
        if (index === 0) {
          getMyAssetByType(item.name);
        }
        item.selected = index === 0;
        return item;
      });
      console.log("tempArr", tempArr);
      gearList.value = tempArr;
      return gearList.value;
    });
  };
  const getMyAssetByType = (type, pendingLentAt, pendingReturnAt) => {
    console.log("pendingLentAt", pendingLentAt, typeof pendingLentAt);
    console.log("pendingReturnAt", pendingReturnAt);
    if (pendingLentAt !== void 0 && pendingReturnAt !== void 0) {
      return common_apis_assets.getAssetsByType(type, pendingLentAt, pendingReturnAt).then((res) => {
        nowGearList.value = res;
        console.log("nowGearList", nowGearList.value);
        return res;
      });
    } else {
      return common_apis_assets.getAssetsByType(type).then((res) => {
        nowGearList.value = res;
        console.log("nowGearList", nowGearList.value);
        return res;
      });
    }
  };
  const getMyFavList = (pendingLentAt, pendingReturnAt) => {
    return common_apis_assets.getFav(pendingLentAt, pendingReturnAt).then((res) => {
      nowGearList.value = res;
      console.log("fav", res);
      return res;
    });
  };
  const getBookInfo = (barcode) => {
    return common_apis_borrow.previewTicket(barcode);
  };
  return {
    getAssetList,
    getMyFavList,
    getMyAssetByType,
    getBookInfo,
    nowGearList,
    nowType,
    gearList
  };
};
exports.GearStatus = GearStatus;
exports.GearStatusString = GearStatusString;
exports.UseGear = UseGear;
