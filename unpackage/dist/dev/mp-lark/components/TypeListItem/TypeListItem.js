"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TypeListItem",
  props: {
    typeItem: { type: null, required: true },
    index: { type: Number, required: true }
  },
  emits: ["selectItem"],
  setup(__props, { emit }) {
    const props = __props;
    const onTypeClick = () => {
      emit("selectItem", props.index);
      console.log("onTypeClick");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.typeItem
      }, __props.typeItem ? {
        b: common_vendor.t(__props.typeItem.name),
        c: common_vendor.o(onTypeClick),
        d: __props.typeItem.selected ? 1 : ""
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/TypeListItem/TypeListItem.vue"]]);
tt.createComponent(Component);
