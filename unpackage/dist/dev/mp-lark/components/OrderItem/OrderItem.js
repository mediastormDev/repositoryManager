"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "OrderItem",
  props: {
    hideStatus: { type: null, required: true },
    bgColor: { type: null, required: false },
    info: { type: null, required: true }
  },
  setup(__props) {
    common_vendor.ref();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.info
      }, __props.info ? common_vendor.e({
        b: common_vendor.t(__props.info.nickname || ""),
        c: !__props.hideStatus
      }, !__props.hideStatus ? common_vendor.e({
        d: __props.info.lentAt
      }, __props.info.lentAt ? {
        e: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.info.lentAt).format("MM-DD HH:mm"))
      } : {
        f: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.info.pendingLentAt).format("MM-DD HH:mm")),
        g: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.info.pendingReturnAt).format("MM-DD HH:mm"))
      }) : {
        h: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.info.pendingLentAt).format("MM-DD HH:mm")),
        i: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.info.pendingReturnAt).format("MM-DD HH:mm"))
      }, {
        j: __props.bgColor
      }) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/OrderItem/OrderItem.vue"]]);
tt.createComponent(Component);
