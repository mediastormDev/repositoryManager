"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
var composables_UseSelectList = require("../../composables/UseSelectList.js");
var common_apis_fav = require("../../common/apis/fav.js");
var composables_UseToken = require("../../composables/UseToken.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../common/apis/borrow.js");
if (!Math) {
  (GearInfoView + OrderItemView + DrawerView)();
}
const DrawerView = () => "../Drawder/Drawder.js";
const OrderItemView = () => "../OrderItem/OrderItem.js";
const GearInfoView = () => "../GearInfoView/GearInfoView.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "GearItemList",
  setup(__props) {
    const {
      isAdmin
    } = composables_UseToken.UseToken();
    const {
      nowType,
      getBookInfo,
      nowGearList
    } = composables_UseGear.UseGear();
    const {
      selectedGears,
      addItem,
      removeItem
    } = composables_UseSelectList.UseSelectList();
    const drawerRef = common_vendor.ref(null);
    const selectedGear = common_vendor.ref();
    const bookInfo = common_vendor.ref();
    common_vendor.watch(nowGearList, (cur) => {
      for (let i = 0; i < selectedGears.value.length; i++) {
        const added = selectedGears.value[i];
        for (let i2 = 0; i2 < cur.length; i2++) {
          const newItem = cur[i2];
          if (added._id == newItem._id) {
            newItem.selected = true;
          }
        }
      }
    });
    const addToMyFav = () => {
      console.log("gear", selectedGear.value);
      if (nowType.value == "\u6536\u85CF") {
        common_apis_fav.removeFav(selectedGear.value._id).then(() => {
          common_vendor.uni.showToast({
            title: "\u5DF2\u53D6\u6D88"
          });
        });
      } else {
        common_apis_fav.addFav(selectedGear.value._id).then(() => {
          common_vendor.uni.showToast({
            title: "\u5DF2\u6536\u85CF"
          });
        });
      }
    };
    const selectGearItem = (gear) => {
      gear.selected = !gear.selected;
      if (gear.selected) {
        addItem(gear);
      } else {
        removeItem(gear);
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
        a: common_vendor.f(common_vendor.unref(nowGearList), (gear, k0, i0) => {
          return {
            a: gear.imageUrl || "../../static/logo.png",
            b: common_vendor.t(gear.name),
            c: gear.status == common_vendor.unref(composables_UseGear.GearStatus).free ? 1 : "",
            d: gear.status == common_vendor.unref(composables_UseGear.GearStatus).booked ? 1 : "",
            e: gear.status == common_vendor.unref(composables_UseGear.GearStatus).lend ? 1 : "",
            f: common_vendor.o(($event) => selectGearItem(gear)),
            g: gear.selected ? "" : "#F4F6F7",
            h: gear._id,
            i: gear,
            j: common_vendor.o(($event) => clickGear(gear))
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
        e: common_vendor.t(common_vendor.unref(nowType) == "\u6536\u85CF" ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF"),
        f: common_vendor.o(addToMyFav),
        g: common_vendor.t(common_vendor.unref(isAdmin) ? "\u7ACB\u5373\u501F\u51FA" : "\u9884\u7EA6"),
        h: common_vendor.o(toBook)
      } : {}, {
        i: common_vendor.sr(drawerRef, "5df02184-0", {
          "k": "drawerRef"
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5df02184"], ["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/GearItemList/GearItemList.vue"]]);
tt.createComponent(Component);
