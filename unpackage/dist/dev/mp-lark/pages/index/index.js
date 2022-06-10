"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_login = require("../../common/apis/login.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../composables/UseToken.js");
require("../../common/http/index.js");
require("../../common/apis/assets.js");
require("../../common/apis/borrow.js");
if (!Math) {
  (GearListView + GearItemList)();
}
const GearListView = () => "../../components/TypeListView/TypeListView.js";
const GearItemList = () => "../../components/GearItemList/GearItemList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const {
      getAssetList
    } = composables_UseGear.UseGear();
    common_vendor.ref("\u8BBE\u5907\u5E93");
    common_vendor.onMounted(() => {
      common_vendor.uni.login({
        complete: (res) => {
          console.log("login res", res);
          common_apis_login.login(res.code).then(() => {
            getAssetList().then((res2) => {
              console.log("res", res2);
            });
            common_apis_login.getMyprofile();
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/index/index.vue"]]);
tt.createPage(MiniProgramPage);
