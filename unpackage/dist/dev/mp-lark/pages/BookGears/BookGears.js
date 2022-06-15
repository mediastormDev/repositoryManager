"use strict";
var common_vendor = require("../../common/vendor.js");
var common_apis_ticket = require("../../common/apis/ticket.js");
var common_apis_borrow = require("../../common/apis/borrow.js");
var composables_UseToken = require("../../composables/UseToken.js");
require("../../common/http/index.js");
if (!Math) {
  (GearInfoView + OrderItemView + DatePickerView)();
}
const GearInfoView = () => "../../components/GearInfoView/GearInfoView.js";
const DatePickerView = () => "../../components/DatePickerView/DatePickerView.js";
const OrderItemView = () => "../../components/OrderItem/OrderItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const {
      isAdmin,
      openId
    } = composables_UseToken.UseToken();
    const adminChooseUser = common_vendor.ref();
    const datePickerRef = common_vendor.ref(null);
    const startDate = common_vendor.ref("");
    const endDate = common_vendor.ref("");
    const gearList = common_vendor.ref([]);
    const bookInfo = common_vendor.ref([]);
    const ticketInfo = common_vendor.ref();
    const disableBtn = common_vendor.ref(false);
    const timeDiff = common_vendor.computed$1(() => {
      return timeDifference(startDate.value, endDate.value);
    });
    let selectDateType = 0;
    const timeDifference = (startTime, endTime) => {
      let start = typeof startTime == "number" ? startTime : new Date(startTime).getTime(), end = typeof endTime == "number" ? endTime : new Date(endTime).getTime(), difference = end - start, days = Math.floor(difference / (24 * 3600 * 1e3)), leave1 = difference % (24 * 3600 * 1e3), hours = Math.floor(leave1 / (3600 * 1e3)), leave2 = leave1 % (3600 * 1e3), minutes = Math.floor(leave2 / (60 * 1e3));
      return `${days}\u5929${hours}\u5C0F\u65F6${minutes}\u5206`;
    };
    const selectUser = common_vendor.lodash.exports.debounce(() => {
      tt.chooseContact({
        multi: false,
        ignore: false,
        maxNum: 1,
        limitTips: "\u9009\u62E9\u4EBA\u6570\u8FBE\u5230\u4E0A\u9650\u4E86",
        enableChooseDepartment: true,
        success(res) {
          console.log(JSON.stringify(res));
          adminChooseUser.value = res.data[0];
        },
        fail(res) {
          console.log(`chooseContact fail: ${JSON.stringify(res)}`);
        }
      });
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
      if (startDate.value && endDate.value) {
        previewIfBooked();
      }
    };
    const removeGearByClick = (gear, index) => {
      console.log("gear", gear);
      if (ticketInfo.value) {
        common_apis_ticket.removeGear(ticketInfo.value._id, gear.borrowId).then((res) => {
          gearList.value.splice(index, 1);
        });
      } else {
        gearList.value.splice(index, 1);
      }
    };
    const previewIfBooked = () => {
      const barcodes = gearList.value.map((item) => {
        item.booked = false;
        return item.barcode;
      });
      if (ticketInfo.value && ticketInfo.value._id) {
        common_apis_ticket.previewTicket(barcodes, startDate.value, endDate.value, ticketInfo.value._id).then((res) => {
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
      } else {
        common_apis_ticket.previewTicket(barcodes, startDate.value, endDate.value, "").then((res) => {
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
      }
    };
    const pressBookAdmin = common_vendor.lodash.exports.debounce(() => {
      if (!startDate.value || !endDate.value) {
        common_vendor.uni.showToast({
          title: "\u672A\u9009\u62E9\u65F6\u95F4"
        });
        return;
      }
      if (!adminChooseUser.value) {
        common_vendor.uni.showToast({
          title: "\u672A\u9009\u62E9\u9886\u7528\u4EBA"
        });
        return;
      }
      const barcodes = gearList.value.filter((item) => !item.booked).map((item) => item.barcode);
      console.log("barcodes", barcodes);
      console.log("startDate", startDate.value);
      console.log("endDate", endDate.value);
      common_apis_borrow.adminBorrow({
        barcodes,
        openId: adminChooseUser.value.openId,
        pendingLentAt: startDate.value,
        pendingReturnAt: endDate.value
      }).then((res) => {
        common_vendor.uni.showToast({
          title: "\u9884\u5B9A\u6210\u529F"
        });
        common_vendor.uni.navigateBack({});
      });
    }, 100);
    const pressBook = common_vendor.lodash.exports.debounce(() => {
      const barcodes = gearList.value.filter((item) => !item.booked).map((item) => item.barcode);
      if (barcodes.length) {
        if (ticketInfo.value && ticketInfo.value._id) {
          common_apis_ticket.updateTickeDate(ticketInfo.value._id, startDate.value, endDate.value).then((res) => {
            common_vendor.uni.showToast({
              title: "\u9884\u5B9A\u6210\u529F"
            });
            common_vendor.uni.navigateBack({});
          });
        } else {
          common_apis_ticket.createTicket(barcodes, startDate.value, endDate.value).then((res) => {
            console.log("createTicket", res);
            common_vendor.uni.showToast({
              title: "\u9884\u5B9A\u6210\u529F"
            });
            common_vendor.uni.navigateBack({});
          });
        }
      } else {
        common_vendor.uni.showToast({
          title: "\u65F6\u6BB5\u6709\u51B2\u7A81",
          icon: "error"
        });
      }
    }, 100);
    const cancelBook = common_vendor.lodash.exports.debounce(() => {
      common_apis_ticket.cancelTicket(ticketInfo.value._id).then((res) => {
        common_vendor.uni.navigateBack({});
      });
    }, 100);
    common_vendor.onMounted(() => {
      const orderInfo = common_vendor.uni.getStorageSync("orderInfo");
      const orderInfoMore = common_vendor.uni.getStorageSync("orderInfoMore");
      console.log("orderInfo", orderInfo);
      console.log("orderInfoMore", orderInfoMore);
      if (orderInfo) {
        gearList.value = orderInfo.borrows.map((item) => {
          item.asset.borrowId = item._id;
          return item.asset;
        });
        startDate.value = orderInfo.pendingLentAt;
        endDate.value = orderInfo.pendingReturnAt;
        ticketInfo.value = orderInfo;
        common_vendor.uni.removeStorageSync("orderInfo");
      } else if (orderInfoMore) {
        gearList.value = orderInfoMore.borrows.map((item) => item.asset);
        startDate.value = orderInfoMore.pendingLentAt;
        endDate.value = orderInfoMore.pendingReturnAt;
        ticketInfo.value = orderInfoMore;
        ticketInfo.value._id = "";
        common_vendor.uni.removeStorageSync("orderInfoMore");
      } else {
        common_vendor.uni.getStorage({
          key: "selectedGears",
          success: (res) => {
            gearList.value = res.data;
            console.log("selectedGears", gearList.value);
            common_vendor.uni.removeStorageSync("selectedGears");
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(gearList.value, (gear, index, i0) => {
          return common_vendor.e({
            a: "10c04a64-0-" + i0,
            b: common_vendor.p({
              gear
            })
          }, gearList.value.length !== 1 ? {
            c: common_vendor.o(($event) => removeGearByClick(gear, index))
          } : {}, {
            d: gear._id
          });
        }),
        b: gearList.value.length !== 1,
        c: common_vendor.unref(isAdmin)
      }, common_vendor.unref(isAdmin) ? common_vendor.e({
        d: adminChooseUser.value
      }, adminChooseUser.value ? {
        e: common_vendor.t(adminChooseUser.value.openId)
      } : {}, {
        f: common_vendor.o((...args) => common_vendor.unref(selectUser) && common_vendor.unref(selectUser)(...args))
      }) : {}, {
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
        m: startDate.value && endDate.value && !disableBtn.value
      }, startDate.value && endDate.value && !disableBtn.value ? {
        n: common_vendor.t(common_vendor.unref(timeDiff))
      } : {}, {
        o: bookInfo.value.length
      }, bookInfo.value.length ? {
        p: common_vendor.f(bookInfo.value, (book, k0, i0) => {
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
        q: ticketInfo.value && ticketInfo.value._id
      }, ticketInfo.value && ticketInfo.value._id ? {
        r: common_vendor.o((...args) => common_vendor.unref(cancelBook) && common_vendor.unref(cancelBook)(...args))
      } : {}, {
        s: !common_vendor.unref(isAdmin)
      }, !common_vendor.unref(isAdmin) ? {
        t: common_vendor.t(ticketInfo.value ? "\u4FEE\u6539" : "\u7ACB\u5373"),
        v: disableBtn.value,
        w: common_vendor.o((...args) => common_vendor.unref(pressBook) && common_vendor.unref(pressBook)(...args))
      } : {}, {
        x: common_vendor.unref(isAdmin)
      }, common_vendor.unref(isAdmin) ? {
        y: disableBtn.value,
        z: common_vendor.o((...args) => common_vendor.unref(pressBookAdmin) && common_vendor.unref(pressBookAdmin)(...args))
      } : {}, {
        A: common_vendor.sr(datePickerRef, "10c04a64-2", {
          "k": "datePickerRef"
        }),
        B: common_vendor.o(onDatePickerConfirm)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/pages/BookGears/BookGears.vue"]]);
tt.createPage(MiniProgramPage);
