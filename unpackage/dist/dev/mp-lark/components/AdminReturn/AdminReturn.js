"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_ticket = require("../../common/apis/ticket.js");
var composables_UseToken = require("../../composables/UseToken.js");
require("../../common/http/index.js");
if (!Math) {
  AdminReturnItemView();
}
const AdminReturnItemView = () => "../AdminReturnItem/AdminReturnItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "AdminReturn",
  setup(__props, { expose }) {
    const {
      openId
    } = composables_UseToken.UseToken();
    const borrowList = common_vendor.ref([]);
    const loadData = () => {
      console.log("openId", openId.value);
      common_apis_ticket.getTicketsAll().then((res) => {
        borrowList.value = res.filter((item) => {
          return item.borrows.filter((borrow) => borrow.asset.status == "INUSE").length;
        });
        console.log("borrowList", borrowList.value);
        common_vendor.uni.stopPullDownRefresh();
      });
    };
    common_vendor.onMounted(() => {
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
            b: "1a0191b4-0-" + i0,
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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/AdminReturn/AdminReturn.vue"]]);
tt.createComponent(Component);
