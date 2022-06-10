"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
if (!Math) {
  (GearInfoView + OrderItemView + DrawerView)();
}
const DrawerView = () => "../Drawder/Drawder.js";
const OrderItemView = () => "../OrderItem/OrderItem.js";
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const {
      getBookInfo,
      nowGearList
    } = composables_UseGear.UseGear();
    const drawerRef = common_vendor.ref(null);
    const selectedGear = common_vendor.ref();
    const bookInfo = common_vendor.ref();
    const gearList = common_vendor.ref([]);
    common_vendor.watch(nowGearList, (cur) => {
      console.log("\u67D0\u7C7B\u578B\u7684\u8BBE\u5907\u5217\u8868", cur);
      gearList.value = cur;
    });
    const selectGearItem = (gear) => {
      if (gear.status == composables_UseGear.GearStatus.free) {
        gear.selected = !gear.selected;
      }
    };
    const clickGear = (gear) => {
      console.log("gear", gear);
      console.log("barcode", gear.barcode);
      drawerRef.value.openDrawer();
      selectedGear.value = gear;
      getBookInfo(gear.barcode).then((res) => {
        bookInfo.value = res;
      });
    };
    const toBook = () => {
      common_vendor.uni.setStorage({
        data: [selectedGear.value],
        key: "selectedGears",
        success: () => {
          common_vendor.uni.navigateTo({
            url: "/pages/BookGears/BookGears"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(gearList.value, (gear, k0, i0) => {
          return {
            a: common_vendor.t(gear.name),
            b: gear.status == common_vendor.unref(composables_UseGear.GearStatus).free ? 1 : "",
            c: gear.status == common_vendor.unref(composables_UseGear.GearStatus).booked ? 1 : "",
            d: gear.status == common_vendor.unref(composables_UseGear.GearStatus).lend ? 1 : "",
            e: common_vendor.o(($event) => selectGearItem(gear)),
            f: gear.selected ? "" : "#F4F6F7",
            g: gear._id,
            h: gear,
            i: common_vendor.o(($event) => clickGear(gear))
          };
        }),
        b: selectedGear.value
      }, selectedGear.value ? {
        c: common_vendor.p({
          gear: selectedGear.value
        }),
        d: common_vendor.f(bookInfo.value, (book, k0, i0) => {
          return {
            a: book._id,
            b: "5df02184-2-" + i0 + ",5df02184-0",
            c: common_vendor.p({
              info: book
            })
          };
        }),
        e: common_vendor.o(toBook)
      } : {}, {
        f: common_vendor.sr(drawerRef, "5df02184-0", {
          "k": "drawerRef"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5df02184"], ["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/GearItemList/GearItemList.vue"]]);
tt.createComponent(Component);
