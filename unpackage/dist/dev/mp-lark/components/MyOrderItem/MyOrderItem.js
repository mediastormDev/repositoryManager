"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
if (!Math) {
  GearInfoView();
}
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    orderInfo: { type: null, required: true }
  },
  setup(__props) {
    const props = __props;
    const remindReturn = () => {
      common_vendor.uni.showToast({
        title: "\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u5F52\u8FD8"
      });
    };
    const modifyBook = () => {
      common_vendor.uni.setStorage({
        data: props.orderInfo,
        key: "orderInfo",
        success: () => {
          common_vendor.uni.navigateTo({
            url: "/pages/BookGears/BookGears"
          });
        }
      });
    };
    const moreBook = () => {
      common_vendor.uni.setStorage({
        data: props.orderInfo,
        key: "orderInfoMore",
        success: () => {
          common_vendor.uni.navigateTo({
            url: "/pages/BookGears/BookGears"
          });
        }
      });
    };
    common_vendor.ref({
      name: "\u79D1\u83AB\u591A11",
      _id: 1,
      image: "http://via.placeholder.com/640x360",
      status: composables_UseGear.GearStatus.free,
      selected: false
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.orderInfo.createdAt).format("MM\u6708DD\u65E5 HH:mm")),
        b: common_vendor.f(__props.orderInfo.borrows, (borrow, k0, i0) => {
          return {
            a: "30438660-0-" + i0,
            b: common_vendor.p({
              imageSize: "small",
              gear: borrow.asset
            })
          };
        }),
        c: __props.orderInfo.status == "PENDING"
      }, __props.orderInfo.status == "PENDING" ? {
        d: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.orderInfo.pendingLentAt).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        e: __props.orderInfo.status == "INUSE"
      }, __props.orderInfo.status == "INUSE" ? {
        f: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(__props.orderInfo.pendingReturnAt).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        g: __props.orderInfo.status == "FINISH"
      }, __props.orderInfo.status == "FINISH" ? {} : {}, {
        h: __props.orderInfo.status == "OTHER"
      }, __props.orderInfo.status == "OTHER" ? {
        i: common_vendor.t(__props.orderInfo.status)
      } : {}, {
        j: __props.orderInfo.status == "PENDING"
      }, __props.orderInfo.status == "PENDING" ? {
        k: common_vendor.o(modifyBook)
      } : {}, {
        l: __props.orderInfo.status == "INUSE"
      }, __props.orderInfo.status == "INUSE" ? {
        m: common_vendor.o(remindReturn)
      } : {}, {
        n: __props.orderInfo.status == "FINISH"
      }, __props.orderInfo.status == "FINISH" ? {
        o: common_vendor.o(moreBook)
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyOrderItem/MyOrderItem.vue"]]);
tt.createComponent(Component);
