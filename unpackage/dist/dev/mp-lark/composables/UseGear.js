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
var UseGear = () => {
  const getAssetList = () => {
    return common_apis_assets.getAssets().then((res) => {
      return gearList.value = res.map((item, index) => {
        if (index === 0) {
          getMyAssetByType(item);
        }
        return {
          name: item,
          selected: index === 0
        };
      });
    });
  };
  const getMyAssetByType = (type) => {
    return common_apis_assets.getAssetsByType(type).then((res) => {
      nowGearList.value = res;
      console.log("nowGearList", nowGearList.value);
      return res;
    });
  };
  const getBookInfo = (barcode) => {
    return common_apis_borrow.previewTicket(barcode);
  };
  return {
    getAssetList,
    getMyAssetByType,
    getBookInfo,
    nowGearList,
    gearList
  };
};
exports.GearStatus = GearStatus;
exports.GearStatusString = GearStatusString;
exports.UseGear = UseGear;
