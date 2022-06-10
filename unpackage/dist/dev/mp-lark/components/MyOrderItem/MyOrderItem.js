"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
if (!Math) {
  GearInfoView();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const gearItem = common_vendor.ref({
      name: "\u79D1\u83AB\u591A11",
      _id: 1,
      image: "http://via.placeholder.com/640x360",
      status: composables_UseGear.GearStatus.free,
      selected: false
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          imageSize: "small",
          gear: gearItem.value
        }),
        b: common_vendor.p({
          imageSize: "small",
          gear: gearItem.value
        }),
        c: common_vendor.p({
          imageSize: "small",
          gear: gearItem.value
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyOrderItem/MyOrderItem.vue"]]);
tt.createComponent(Component);
