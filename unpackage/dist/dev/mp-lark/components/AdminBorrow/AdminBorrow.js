"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_ticket = require("../../common/apis/ticket.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
if (!Math) {
  AdminBorrowItem();
}
const AdminBorrowItem = () => "../AdminBorrowItem/AdminBorrowItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "AdminBorrow",
  setup(__props, { expose }) {
    const borrowList = common_vendor.ref([]);
    const loadData = () => {
      common_apis_ticket.getTicketsAll().then((res) => {
        borrowList.value = res.filter((item) => {
          return item.borrows.filter((borrow) => borrow.asset.status == "PENDING").length;
        });
        console.log("borrowList", borrowList.value);
        common_vendor.uni.stopPullDownRefresh();
      });
    };
    common_vendor.onMounted(() => {
      loadData();
    });
    common_vendor.onShow(() => {
      loadData();
    });
    expose({
      loadData
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(borrowList.value, (borrow, k0, i0) => {
          return {
            a: borrow._id,
            b: "dabf5284-0-" + i0,
            c: common_vendor.p({
              loadData,
              borrowItems: borrow && borrow.borrows
            })
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/AdminBorrow/AdminBorrow.vue"]]);
tt.createComponent(Component);
