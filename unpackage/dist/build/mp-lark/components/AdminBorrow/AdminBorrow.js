"use strict";var e=require("../../common/vendor.js"),o=require("../../common/apis/borrow.js");require("../../common/http/index.js"),require("../../composables/UseToken.js"),Math||t();const t=()=>"../AdminBorrowItem/AdminBorrowItem.js",r=e.defineComponent({setup(t,{expose:r}){const n=e.ref([]),s=()=>{o.borrowListByType("PENDING").then((o=>{n.value=o,console.log("borrowList",n.value),e.uni.stopPullDownRefresh()}))};return e.onMounted((()=>{s()})),r({loadData:s}),(o,t)=>({a:e.f(n.value,((o,t,r)=>({a:"dabf5284-0-"+r,b:e.p({loadData:s,ticketInfo:o,borrowItem:o.asset,ticketid:o._id})})))})}});tt.createComponent(r);