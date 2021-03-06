"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_borrow = require("../../common/apis/borrow.js");
var composables_UseToken = require("../../composables/UseToken.js");
require("../../common/http/index.js");
if (!Math) {
  MyReturnItemView();
}
const MyReturnItemView = () => "../MyReturnItem/MyReturnItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "MyReturns",
  setup(__props, { expose }) {
    const {
      openId
    } = composables_UseToken.UseToken();
    const borrowList = common_vendor.ref([]);
    const loadData = () => {
      console.log("openId", openId.value);
      common_apis_borrow.borrowListByType("INUSE", openId.value).then((res) => {
        borrowList.value = res;
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
            a: "49f63f64-0-" + i0,
            b: common_vendor.p({
              returnItem: borrow
            }),
            c: borrow._id
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/MyReturns/MyReturns.vue"]]);
tt.createComponent(Component);
