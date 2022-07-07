"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
if (!Math) {
  TypeListItem();
}
const TypeListItem = () => "../TypeListItem/TypeListItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TypeListView",
  setup(__props) {
    const {
      nowGearList,
      getMyFavList,
      gearList,
      nowType,
      getMyAssetByType
    } = composables_UseGear.UseGear();
    const typeList = common_vendor.ref([]);
    common_vendor.watch(gearList, (cur) => {
      console.log("cur", cur);
      nowType.value = cur[0].name;
      typeList.value = [{
        name: "\u6536\u85CF",
        selected: false
      }, ...cur];
    });
    const loadAssetByType = (type) => {
      getMyAssetByType(type).then((res) => {
        console.log("\u67D0\u7C7B\u578B\u7684\u8D44\u4EA7");
      });
    };
    const loadMyFav = () => {
      getMyFavList().then((res) => {
        console.log("fav", res);
      });
    };
    const onSelectItem = (index) => {
      typeList.value.map((item, i) => {
        if (i === index) {
          item.selected = true;
          nowType.value = item.name;
          console.log("nowType", nowType.value);
          if (item.name == "\u6536\u85CF") {
            loadMyFav();
          } else {
            loadAssetByType(item.name);
          }
        } else {
          item.selected = false;
        }
        return item;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(typeList.value, (type, index, i0) => {
          return {
            a: index,
            b: "6efbbad4-0-" + i0,
            c: common_vendor.p({
              typeItem: type,
              index
            })
          };
        }),
        b: common_vendor.o(onSelectItem)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/TypeListView/TypeListView.vue"]]);
tt.createComponent(Component);
