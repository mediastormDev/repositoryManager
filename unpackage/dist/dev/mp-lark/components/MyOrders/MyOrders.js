"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_ticket = require("../../common/apis/ticket.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
if (!Math) {
  MyOrderItem();
}
const MyOrderItem = () => "../MyOrderItem/MyOrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props, { expose }) {
    const orderList = common_vendor.ref([]);
    const loadData = () => {
      common_apis_ticket.getTickets().then((res) => {
        orderList.value = res;
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
        a: common_vendor.f(orderList.value, (order, k0, i0) => {
          return {
            a: order._id,
            b: "62031958-0-" + i0,
            c: common_vendor.p({
              orderInfo: order
            })
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyOrders/MyOrders.vue"]]);
tt.createComponent(Component);
