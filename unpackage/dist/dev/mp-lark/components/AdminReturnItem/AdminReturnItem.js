"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_borrow = require("../../common/apis/borrow.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
if (!Math) {
  (OrderItem + GearInfoView)();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const OrderItem = () => "../OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "AdminReturnItem",
  props: {
    borrowItems: { type: Array, required: true },
    loadData: { type: Function, required: true }
  },
  setup(__props) {
    const props = __props;
    const showListStatus = common_vendor.ref(false);
    const switch2Change = (e) => {
      showListStatus.value = e.detail.value;
    };
    const onClickReturn = (ticketid) => {
      common_vendor.uni.showLoading({
        title: "\u8BF7\u7A0D\u5019.."
      });
      common_apis_borrow.returnGear(ticketid).then(() => {
        common_vendor.uni.hideLoading();
        common_vendor.uni.showToast({
          title: "\u5DF2\u5F52\u8FD8"
        });
        props.loadData();
      });
    };
    const onClickReturnAll = common_vendor.lodash.exports.debounce(async () => {
      common_vendor.uni.showLoading({
        title: "\u8BF7\u7A0D\u5019.."
      });
      let failList = [];
      for (let item of props.borrowItems) {
        try {
          await common_apis_borrow.returnGear(item._id);
        } catch (e) {
          failList.push(item);
        }
      }
      if (failList.length) {
        common_vendor.uni.showModal({
          title: "\u63D0\u793A",
          content: `\u6709${failList.length}\u4EF6\u5F52\u8FD8\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u5F52\u8FD8`
        });
      }
      props.loadData();
    }, 100);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          info: __props.borrowItems[0],
          bgColor: "white"
        }),
        b: common_vendor.o(switch2Change),
        c: common_vendor.o((...args) => common_vendor.unref(onClickReturnAll) && common_vendor.unref(onClickReturnAll)(...args)),
        d: common_vendor.f(__props.borrowItems, (borrow, k0, i0) => {
          return common_vendor.e({
            a: "e5c8f9cc-1-" + i0,
            b: common_vendor.p({
              gear: borrow.asset,
              imageSize: "mini"
            }),
            c: borrow.asset.status == "INUSE"
          }, borrow.asset.status == "INUSE" ? {
            d: common_vendor.o(($event) => onClickReturn(borrow._id))
          } : {}, {
            e: borrow._id
          });
        }),
        e: showListStatus.value
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/AdminReturnItem/AdminReturnItem.vue"]]);
tt.createComponent(Component);
