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
  __name: "AdminBorrowItem",
  props: {
    hideStatus: { type: null, required: true },
    borrowItems: { type: Array, required: true },
    loadData: { type: Function, required: true }
  },
  setup(__props) {
    const props = __props;
    const showListStatus = common_vendor.ref(false);
    const switch2Change = (e) => {
      showListStatus.value = e.detail.value;
    };
    const onClickBorrow = common_vendor.lodash.exports.debounce((ticketid) => {
      common_vendor.uni.showLoading({
        title: "\u8BF7\u7A0D\u5019.."
      });
      common_apis_borrow.lendGear(ticketid).then((res) => {
        common_vendor.uni.hideLoading();
        common_vendor.uni.showToast({
          title: "\u5DF2\u501F\u51FA"
        });
        props.loadData();
      });
    }, 100);
    const onClickBorrowAll = common_vendor.lodash.exports.debounce(async () => {
      common_vendor.uni.showLoading({
        title: "\u8BF7\u7A0D\u5019.."
      });
      let failList = [];
      for (let item of props.borrowItems) {
        try {
          await common_apis_borrow.lendGear(item._id);
        } catch (e) {
          failList.push(item);
        }
      }
      if (failList.length) {
        common_vendor.uni.showModal({
          title: "\u63D0\u793A",
          content: `\u6709${failList.length}\u4EF6\u501F\u51FA\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u501F\u51FA`
        });
      }
      props.loadData();
    }, 100);
    common_vendor.onMounted(() => {
      console.log("admin item mounted", props.borrowItems);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          hideStatus: true,
          info: __props.borrowItems[0],
          bgColor: "white"
        }),
        b: common_vendor.o(switch2Change),
        c: !__props.hideStatus
      }, !__props.hideStatus ? {
        d: common_vendor.o((...args) => common_vendor.unref(onClickBorrowAll) && common_vendor.unref(onClickBorrowAll)(...args))
      } : {}, {
        e: common_vendor.f(__props.borrowItems, (borrow, k0, i0) => {
          return common_vendor.e({
            a: "1e85eeb8-1-" + i0,
            b: common_vendor.p({
              gear: borrow.asset,
              imageSize: "mini"
            }),
            c: borrow.asset.status !== "INUSE"
          }, borrow.asset.status !== "INUSE" ? {
            d: common_vendor.o(($event) => common_vendor.unref(onClickBorrow)(borrow._id))
          } : {}, {
            e: borrow._id
          });
        }),
        f: showListStatus.value
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/AdminBorrowItem/AdminBorrowItem.vue"]]);
tt.createComponent(Component);
