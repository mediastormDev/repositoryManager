"use strict";var e=require("../../common/vendor.js"),o=require("../../common/apis/ticket.js");require("../../common/http/index.js"),require("../../composables/UseToken.js"),Math||t();const t=()=>"../MyOrderItem/MyOrderItem.js",r=e.defineComponent({setup(t,{expose:r}){const n=e.ref([]),s=()=>{o.getTickets().then((o=>{n.value=o,e.uni.stopPullDownRefresh()}))};return e.onMounted((()=>{s()})),r({loadData:s}),(o,t)=>({a:e.f(n.value,((o,t,r)=>({a:o._id,b:"62031958-0-"+r,c:e.p({orderInfo:o})})))})}});tt.createComponent(r);
