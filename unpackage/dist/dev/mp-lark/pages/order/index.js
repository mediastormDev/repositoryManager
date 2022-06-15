"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseToken = require("../../composables/UseToken.js");
if (!Math) {
  (MyOrdersView + MyReturnsView + AdminBorrowView + AdminReturnsView)();
}
const MyOrdersView = () => "../../components/MyOrders/MyOrders.js";
const MyReturnsView = () => "../../components/MyReturns/MyReturns.js";
const AdminReturnsView = () => "../../components/AdminReturn/AdminReturn.js";
const AdminBorrowView = () => "../../components/AdminBorrow/AdminBorrow.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const orderViewRef = common_vendor.ref(null);
    const myreturnsRef = common_vendor.ref(null);
    const adminBorrowRef = common_vendor.ref(null);
    const adminReturnsRef = common_vendor.ref(null);
    const {
      isAdmin
    } = composables_UseToken.UseToken();
    const tabsIndex = common_vendor.ref(0);
    const clickTabs = (index) => {
      console.log("isAdmin.value", isAdmin.value);
      tabsIndex.value = index;
    };
    common_vendor.onPullDownRefresh(() => {
      console.log("onPullDownRefresh");
      if (tabsIndex.value == 0) {
        orderViewRef.value && orderViewRef.value.loadData();
      } else if (tabsIndex.value == 1) {
        myreturnsRef.value && myreturnsRef.value.loadData();
      } else if (tabsIndex.value == 2) {
        adminBorrowRef.value && adminBorrowRef.value.loadData();
      } else if (tabsIndex.value == 3) {
        adminReturnsRef.value && adminReturnsRef.value.loadData();
      }
    });
    common_vendor.onShow(() => {
      console.log("A page onshow");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(isAdmin)
      }, !common_vendor.unref(isAdmin) ? {
        b: common_vendor.o(($event) => clickTabs(0)),
        c: tabsIndex.value === 0 ? 1 : ""
      } : {}, {
        d: !common_vendor.unref(isAdmin)
      }, !common_vendor.unref(isAdmin) ? {
        e: common_vendor.o(($event) => clickTabs(1)),
        f: tabsIndex.value === 1 ? 1 : ""
      } : {}, {
        g: common_vendor.unref(isAdmin)
      }, common_vendor.unref(isAdmin) ? {
        h: common_vendor.o(($event) => clickTabs(2)),
        i: tabsIndex.value === 2 ? 1 : ""
      } : {}, {
        j: common_vendor.unref(isAdmin)
      }, common_vendor.unref(isAdmin) ? {
        k: common_vendor.o(($event) => clickTabs(3)),
        l: tabsIndex.value === 3 ? 1 : ""
      } : {}, {
        m: common_vendor.sr(orderViewRef, "6acf1b90-0", {
          "k": "orderViewRef"
        }),
        n: tabsIndex.value === 0,
        o: common_vendor.sr(myreturnsRef, "6acf1b90-1", {
          "k": "myreturnsRef"
        }),
        p: tabsIndex.value === 1,
        q: common_vendor.sr(adminBorrowRef, "6acf1b90-2", {
          "k": "adminBorrowRef"
        }),
        r: tabsIndex.value === 2,
        s: common_vendor.sr(adminReturnsRef, "6acf1b90-3", {
          "k": "adminReturnsRef"
        }),
        t: tabsIndex.value === 3
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/order/index.vue"]]);
tt.createPage(MiniProgramPage);
