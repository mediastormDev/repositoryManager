"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Drawder",
  setup(__props, { expose }) {
    const show = common_vendor.ref(false);
    const drawShow = common_vendor.ref(false);
    const openDrawer = () => {
      show.value = true;
      setTimeout(() => {
        drawShow.value = true;
      }, 100);
    };
    const closeDrawer = () => {
      drawShow.value = false;
      setTimeout(() => {
        show.value = false;
      }, 100);
    };
    expose({
      openDrawer,
      closeDrawer
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? common_vendor.e({
        b: drawShow.value
      }, drawShow.value ? {
        c: common_vendor.o(() => {
        })
      } : {}, {
        d: common_vendor.o(closeDrawer)
      }) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/Drawder/Drawder.vue"]]);
tt.createComponent(Component);
