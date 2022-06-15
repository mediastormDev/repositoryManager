"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_borrow = require("../../common/apis/borrow.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
if (!Math) {
  (GearInfoView + OrderItem)();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const OrderItem = () => "../OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    borrowItem: { type: null, required: true },
    ticketid: { type: null, required: true },
    ticketInfo: { type: null, required: true },
    loadData: { type: Function, required: true }
  },
  setup(__props) {
    const props = __props;
    const onClickBorrow = common_vendor.lodash.exports.debounce(() => {
      common_vendor.uni.showLoading({
        title: "\u8BF7\u7A0D\u5019.."
      });
      common_apis_borrow.lendGear(props.ticketid).then((res) => {
        common_vendor.uni.hideLoading();
        common_vendor.uni.showToast({
          title: "\u5DF2\u501F\u51FA"
        });
        props.loadData();
      });
    }, 100);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          gear: __props.borrowItem,
          imageSize: "mini"
        }),
        b: common_vendor.o((...args) => common_vendor.unref(onClickBorrow) && common_vendor.unref(onClickBorrow)(...args)),
        c: common_vendor.f(__props.ticketInfo.borrows, (borrow, k0, i0) => {
          return {
            a: "1e85eeb8-1-" + i0,
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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/AdminBorrowItem/AdminBorrowItem.vue"]]);
tt.createComponent(Component);
