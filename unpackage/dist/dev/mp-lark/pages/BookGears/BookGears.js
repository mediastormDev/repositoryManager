"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_ticket = require("../../common/apis/ticket.js");
require("../../common/http/index.js");
require("../../composables/UseToken.js");
if (!Math) {
  (GearInfoView + OrderItemView + DatePickerView)();
}
const GearInfoView = () => "../../components/GearInfoView/GearInfoView.js";
const DatePickerView = () => "../../components/DatePickerView/DatePickerView.js";
const OrderItemView = () => "../../components/OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const datePickerRef = common_vendor.ref(null);
    const startDate = common_vendor.ref("");
    const endDate = common_vendor.ref("");
    const gearList = common_vendor.ref([]);
    const bookInfo = common_vendor.ref([]);
    const disableBtn = common_vendor.ref(false);
    const timeDiff = common_vendor.computed$1(() => {
      return timeDifference(startDate.value, endDate.value);
    });
    let selectDateType = 0;
    const timeDifference = (startTime, endTime) => {
      let start = typeof startTime == "number" ? startTime : new Date(startTime).getTime(), end = typeof endTime == "number" ? endTime : new Date(endTime).getTime(), difference = end - start, days = Math.floor(difference / (24 * 3600 * 1e3)), leave1 = difference % (24 * 3600 * 1e3), hours = Math.floor(leave1 / (3600 * 1e3)), leave2 = leave1 % (3600 * 1e3), minutes = Math.floor(leave2 / (60 * 1e3));
      return `${days}\u5929${hours}\u5C0F\u65F6${minutes}\u5206`;
    };
    const selectStartTime = () => {
      console.log("click show picker");
      selectDateType = 0;
      datePickerRef.value && datePickerRef.value.openPicker();
    };
    const selectEndTime = () => {
      selectDateType = 1;
      datePickerRef.value && datePickerRef.value.openPicker();
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
      if (startDate.value && endDate.value) {
        previewIfBooked();
      }
    };
    const previewIfBooked = () => {
      const barcodes = gearList.value.map((item) => item.barcode);
      common_apis_ticket.previewTicket(barcodes, startDate.value, endDate.value).then((res) => {
        const temp = res.map((booked) => {
          gearList.value.map((gear) => {
            if (gear.barcode == booked.barcode) {
              booked.gear = gear;
              gear.booked = true;
            }
          });
          return booked;
        });
        bookInfo.value = temp;
        return bookInfo;
      });
    };
    const pressBook = common_vendor.lodash.exports.debounce(() => {
      const barcodes = gearList.value.filter((item) => !item.booked).map((item) => item.barcode);
      if (barcodes.length) {
        common_apis_ticket.createTicket(barcodes, startDate.value, endDate.value).then((res) => {
          console.log("createTicket", res);
        });
      } else {
        common_vendor.uni.showToast({
          title: "\u65F6\u6BB5\u6709\u51B2\u7A81",
          icon: "error"
        });
      }
    }, 100);
    common_vendor.onMounted(() => {
      common_vendor.uni.getStorage({
        key: "selectedGears",
        success: (res) => {
          gearList.value = res.data;
          console.log("selectedGears", gearList.value);
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(gearList.value, (gear, k0, i0) => {
          return common_vendor.e({
            a: "10c04a64-0-" + i0,
            b: common_vendor.p({
              gear
            })
          }, gearList.value.length !== 1 ? {} : {}, {
            c: gear._id
          });
        }),
        b: gearList.value.length !== 1,
        c: startDate.value
      }, startDate.value ? {
        d: common_vendor.t(startDate.value && common_vendor.unref(common_vendor.dayjs)(startDate.value).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        e: common_vendor.o(selectStartTime),
        f: endDate.value
      }, endDate.value ? {
        g: common_vendor.t(endDate.value && common_vendor.unref(common_vendor.dayjs)(endDate.value).format("MM\u6708DD\u65E5 HH:mm"))
      } : {}, {
        h: common_vendor.o(selectEndTime),
        i: startDate.value && endDate.value && !disableBtn.value
      }, startDate.value && endDate.value && !disableBtn.value ? {
        j: common_vendor.t(common_vendor.unref(timeDiff))
      } : {}, {
        k: bookInfo.value.length
      }, bookInfo.value.length ? {
        l: common_vendor.f(bookInfo.value, (book, k0, i0) => {
          return {
            a: common_vendor.t(book.gear.name),
            b: "10c04a64-1-" + i0,
            c: common_vendor.p({
              info: book,
              bgColor: "#FFFFFF"
            }),
            d: book._id
          };
        })
      } : {}, {
        m: disableBtn.value,
        n: common_vendor.o((...args) => common_vendor.unref(pressBook) && common_vendor.unref(pressBook)(...args)),
        o: common_vendor.sr(datePickerRef, "10c04a64-2", {
          "k": "datePickerRef"
        }),
        p: common_vendor.o(onDatePickerConfirm)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/BookGears/BookGears.vue"]]);
tt.createPage(MiniProgramPage);
