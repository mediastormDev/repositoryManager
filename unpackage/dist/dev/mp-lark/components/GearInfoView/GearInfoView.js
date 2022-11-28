"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "GearInfoView",
  props: {
    showButton: { type: null, required: true },
    gear: { type: null, required: true },
    imageSize: { type: null, required: true }
  },
  setup(__props) {
    const props = __props;
    common_vendor.onMounted(() => {
      console.log(props.gear);
    });
    return (_ctx, _cache) => {
      return {
        a: __props.gear.imageUrl || "../../static/logo.png",
        b: __props.imageSize == "small" ? 1 : "",
        c: common_vendor.t(__props.gear.name),
        d: common_vendor.t(__props.gear.remark),
        e: common_vendor.t(common_vendor.unref(composables_UseGear.GearStatusString)[__props.gear.status]),
        f: __props.gear.status === common_vendor.unref(composables_UseGear.GearStatus).free ? 1 : "",
        g: __props.gear.status == common_vendor.unref(composables_UseGear.GearStatus).booked ? 1 : "",
        h: __props.gear.status == common_vendor.unref(composables_UseGear.GearStatus).lend ? 1 : "",
        i: common_vendor.t(__props.gear.barcode),
        j: common_vendor.t(__props.gear.type)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/GearInfoView/GearInfoView.vue"]]);
tt.createComponent(Component);
