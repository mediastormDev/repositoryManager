"use strict";var e=require("../../common/vendor.js");const t=e.defineComponent({props:{typeItem:null,index:null},emits:["selectItem"],setup(t,{emit:n}){const o=t,m=()=>{n("selectItem",o.index),console.log("onTypeClick")};return(n,o)=>e.e({a:t.typeItem},t.typeItem?{b:e.t(t.typeItem.name),c:e.o(m),d:t.typeItem.selected?1:""}:{})}});tt.createComponent(t);
