"use strict";var e=require("../../common/vendor.js");Math||(r+t)();const r=()=>"../GearInfoView/GearInfoView.js",t=()=>"../OrderItem/OrderItem.js",o=e.defineComponent({props:{returnItem:null},setup(r){const t=()=>{console.log("提醒归还"),e.uni.showToast({title:"请联系管理员归还"})};return(o,n)=>({a:e.p({gear:r.returnItem.asset,imageSize:"mini"}),b:e.o(t),c:e.f(r.returnItem.borrows,((r,t,o)=>({a:"5b980414-1-"+o,b:e.p({info:r,bgColor:"white"})})))})}});tt.createComponent(o);