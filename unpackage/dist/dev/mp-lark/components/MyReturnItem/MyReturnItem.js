"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (GearInfoView + OrderItem)();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const OrderItem = () => "../OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    returnItem: { type: null, required: true }
  },
  setup(__props) {
    const onClickReturn = () => {
      console.log("\u63D0\u9192\u5F52\u8FD8");
      common_vendor.uni.showToast({
        title: "\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u5F52\u8FD8"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          gear: __props.returnItem.asset,
          imageSize: "mini"
        }),
        b: common_vendor.o(onClickReturn),
        c: common_vendor.f(__props.returnItem.borrows, (borrow, k0, i0) => {
          return {
            a: "5b980414-1-" + i0,
            b: common_vendor.p({
              info: borrow,
              bgColor: "white"
            })
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyReturnItem/MyReturnItem.vue"]]);
tt.createComponent(Component);
