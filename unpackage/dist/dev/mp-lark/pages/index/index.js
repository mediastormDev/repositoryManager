"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_login = require("../../common/apis/login.js");
var composables_UseGear = require("../../composables/UseGear.js");
var composables_UseSelectList = require("../../composables/UseSelectList.js");
require("../../composables/UseToken.js");
require("../../common/http/index.js");
require("../../common/apis/assets.js");
require("../../common/apis/borrow.js");
if (!Math) {
  (GearFilters + GearListView + GearItemList)();
}
const GearListView = () => "../../components/TypeListView/TypeListView.js";
const GearItemList = () => "../../components/GearItemList/GearItemList.js";
const GearFilters = () => "../../components/GearFilter/GearFilter.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const {
      nowGearList,
      getAssetList
    } = composables_UseGear.UseGear();
    const {
      selectedGears
    } = composables_UseSelectList.UseSelectList();
    common_vendor.ref("\u8BBE\u5907\u5E93");
    const toBook = common_vendor.lodash.exports.debounce(() => {
      common_vendor.uni.setStorage({
        data: selectedGears.value,
        key: "selectedGears",
        success: () => {
          common_vendor.uni.navigateTo({
            url: "/pages/BookGears/BookGears"
          });
        }
      });
    }, 100);
    common_vendor.onMounted(() => {
      common_vendor.uni.login({
        complete: (res) => {
          console.log("login res", res);
          common_apis_login.login(res.code).then(() => {
            getAssetList().then((res2) => {
              console.log("res444", res2);
            });
            common_apis_login.getMyprofile();
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => common_vendor.unref(toBook) && common_vendor.unref(toBook)(...args)),
        b: common_vendor.unref(selectedGears).length
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/index/index.vue"]]);
tt.createPage(MiniProgramPage);
