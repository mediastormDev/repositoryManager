"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (GearInfoView + OrderItem)();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const OrderItem = () => "../OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          imageSize: "mini"
        }),
        b: common_vendor.p({
          bgColor: "white"
        }),
        c: common_vendor.p({
          bgColor: "white"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyReturnItem/MyReturnItem.vue"]]);
tt.createComponent(Component);
