"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  emits: ["onConfirm"],
  setup(__props, { expose, emit }) {
    const date = common_vendor.ref(new Date());
    const months = common_vendor.ref([]);
    const days = common_vendor.ref([]);
    const hours = common_vendor.ref([]);
    const minutes = common_vendor.ref([]);
    const value = common_vendor.ref();
    const result = common_vendor.ref();
    const show = common_vendor.ref(false);
    const bindChange = (e) => {
      const val = e.detail.value;
      value.value = val;
      console.log(val);
      const month = months.value[val[0]];
      const day = days.value[val[1]];
      const hour = hours.value[val[2]];
      const minute = minutes.value[val[3]];
      console.log(`${date.value.getFullYear()}/${month}/${day} ${hour}:${minute}:00`);
      result.value = new Date(`${date.value.getFullYear()}/${month}/${day} ${hour}:${minute}:00`).getTime();
      console.log("valuevalue", value.value);
    };
    const onConfirm = () => {
      emit("onConfirm", result.value);
      closePicker();
    };
    const openPicker = () => {
      show.value = true;
    };
    const closePicker = () => {
      show.value = false;
    };
    common_vendor.onMounted(() => {
      for (let i = 1; i <= 12; i++) {
        months.value.push(i);
      }
      for (let i = 1; i <= 31; i++) {
        days.value.push(i);
      }
      for (let i = 1; i <= 24; i++) {
        hours.value.push(i);
      }
      for (let i = 1; i <= 60; i++) {
        minutes.value.push(i);
      }
    });
    expose({
      openPicker,
      closePicker
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? {
        b: common_vendor.o(closePicker),
        c: common_vendor.o(onConfirm),
        d: common_vendor.f(months.value, (month, k0, i0) => {
          return {
            a: common_vendor.t(month)
          };
        }),
        e: common_vendor.f(days.value, (day, k0, i0) => {
          return {
            a: common_vendor.t(day)
          };
        }),
        f: common_vendor.f(hours.value, (hour, k0, i0) => {
          return {
            a: common_vendor.t(hour)
          };
        }),
        g: common_vendor.f(minutes.value, (min, k0, i0) => {
          return {
            a: common_vendor.t(min)
          };
        }),
        h: common_vendor.o(bindChange)
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/ysjf-jimmy/Documents/HBuilderProjects/\u5E93\u5B58\u7BA1\u7406/components/DatePickerView/DatePickerView.vue"]]);
tt.createComponent(Component);
