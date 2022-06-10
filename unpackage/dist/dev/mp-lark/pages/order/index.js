"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  (MyOrdersView + MyReturnsView)();
}
const MyOrdersView = () => "../../components/MyOrders/MyOrders.js";
const MyReturnsView = () => "../../components/MyReturns/MyReturns.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const tabsIndex = common_vendor.ref(0);
    const clickTabs = (index) => {
      tabsIndex.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => clickTabs(0)),
        b: tabsIndex.value === 0 ? 1 : "",
        c: common_vendor.o(($event) => clickTabs(1)),
        d: tabsIndex.value === 1 ? 1 : "",
        e: tabsIndex.value === 0,
        f: tabsIndex.value === 1
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/order/index.vue"]]);
tt.createPage(MiniProgramPage);
