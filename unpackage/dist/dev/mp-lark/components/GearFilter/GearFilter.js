"use strict";
var common_vendor = require("../../common/vendor.js");
var composables_UseGear = require("../../composables/UseGear.js");
var composables_UseSelectList = require("../../composables/UseSelectList.js");
require("../../common/apis/assets.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
require("../../common/apis/borrow.js");
if (!Math) {
  (DrawderView + DatePickerView2)();
}
const DrawderView = () => "../Drawder/Drawder.js";
const DatePickerView2 = () => "../DatePickerView/DatePickerView.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const {
      nowType,
      getMyAssetByType,
      nowGearList,
      getMyFavList
    } = composables_UseGear.UseGear();
    const {
      selectedGears,
      removeItems
    } = composables_UseSelectList.UseSelectList();
    const filterDrawerRef = common_vendor.ref(null);
    const datePickerRef = common_vendor.ref(null);
    const startDate = common_vendor.ref();
    const endDate = common_vendor.ref();
    const disableBtn = common_vendor.ref(false);
    let selectDateType = 0;
    const showFilter = () => {
      filterDrawerRef.value.openDrawer();
    };
    const removeAll = () => {
      removeItems(nowGearList.value);
    };
    const closePicker = common_vendor.lodash.exports.debounce(() => {
      startDate.value = null;
      endDate.value = null;
      if (nowType.value == "\u6536\u85CF") {
        getMyFavList().then((res) => {
          console.log("fav", res);
          filterDrawerRef.value.closeDrawer();
        });
      } else {
        getMyAssetByType(nowType.value).then(() => {
          filterDrawerRef.value.closeDrawer();
        });
      }
    }, 100);
    const over = common_vendor.lodash.exports.debounce(() => {
      if (startDate.value && endDate.value) {
        if (nowType.value == "\u6536\u85CF") {
          getMyFavList(common_vendor.dayjs(startDate.value).format(), common_vendor.dayjs(endDate.value).format()).then((res) => {
            console.log("fav", res);
            filterDrawerRef.value.closeDrawer();
          });
        } else {
          getMyAssetByType(nowType.value, common_vendor.dayjs(startDate.value).format(), common_vendor.dayjs(endDate.value).format()).then((res) => {
            filterDrawerRef.value.closeDrawer();
          });
        }
      }
    }, 100);
    const selectStartTime = () => {
      console.log("click show picker");
      selectDateType = 0;
      datePickerRef.value && datePickerRef.value.openPicker(startDate.value);
    };
    const selectEndTime = () => {
      selectDateType = 1;
      datePickerRef.value && datePickerRef.value.openPicker(endDate.value);
    };
    const onDatePickerConfirm = (date) => {
      console.log("date", date);
      if (selectDateType === 0) {
        startDate.value = date;
      } else {
        endDate.value = date;
      }
      if (startDate.value && endDate.value) {
        const start = common_vendor.dayjs(startDate.value);
        const end = common_vendor.dayjs(endDate.value);
        console.log("sdfds", start.diff(end, "millisecond"));
        if (start.diff(end, "millisecond") > 0) {
          common_vendor.uni.showModal({
            title: "\u9519\u8BEF",
            content: "\u5F00\u59CB\u65F6\u95F4\u4E0D\u80FD\u5927\u4E8E\u7ED3\u675F\u65F6\u95F4",
            showCancel: false
          });
          disableBtn.value = true;
          return;
        } else if (end.diff(start, "millisecond") < 0) {
          common_vendor.uni.showModal({
            title: "\u9519\u8BEF",
            content: "\u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u5C0F\u4E8E\u7ED3\u675F\u65F6\u95F4",
            showCancel: false
          });
          disableBtn.value = true;
          return;
        }
      }
      disableBtn.value = false;
      if (startDate.value && endDate.value)
        ;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(removeAll),
        b: common_vendor.unref(selectedGears).length,
        c: common_vendor.t(common_vendor.unref(selectedGears).length),
        d: common_vendor.unref(selectedGears).length,
        e: common_vendor.o(showFilter),
        f: startDate.value && endDate.value ? "../../static/filter_select.png" : "../../static/filter.png",
        g: startDate.value
      }, startDate.value ? {
        h: common_vendor.t(startDate.value && common_vendor.unref(common_vendor.dayjs)(startDate.value).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        i: common_vendor.o(selectStartTime),
        j: endDate.value
      }, endDate.value ? {
        k: common_vendor.t(endDate.value && common_vendor.unref(common_vendor.dayjs)(endDate.value).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        l: common_vendor.o(selectEndTime),
        m: common_vendor.o((...args) => common_vendor.unref(closePicker) && common_vendor.unref(closePicker)(...args)),
        n: common_vendor.o((...args) => common_vendor.unref(over) && common_vendor.unref(over)(...args)),
        o: common_vendor.sr(filterDrawerRef, "fe442d38-0", {
          "k": "filterDrawerRef"
        }),
        p: common_vendor.sr(datePickerRef, "fe442d38-1", {
          "k": "datePickerRef"
        }),
        q: common_vendor.o(onDatePickerConfirm)
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fe442d38"], ["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/GearFilter/GearFilter.vue"]]);
tt.createComponent(Component);
