(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/index/index"],{"185c":function(t,e,n){"use strict";var i=n("b737"),o=n.n(i);o.a},"1ba7":function(t,e,n){"use strict";n.r(e);var i=n("8a3a"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"1cbe":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},6441:function(t,e,n){"use strict";(function(t){n("515f");i(n("66fd"));var e=i(n("97e3"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("c11b")["createPage"])},"8a3a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{isShow:getApp().globalData.isShow,inputValue:"",kefu:null,isLoad:!1,canIUseAuthButton:!0}},onLoad:function(){this.getConfig()},methods:{onAuthError:function(t){console.log(t,"err")},onGetAuthorize:function(){console.log(123),my.getPhoneNumber({success:function(t){console.log(t,999);var e=t.response;my.request({url:"你的后端服务端",data:e})},fail:function(t){console.log(t),console.log("getPhoneNumber_fail")}})},color:function(){return 1===this.$type?"#007aff":2===this.$type?"#dd524d":3===this.$type?"#f0ad4e":4===this.$type?"#4cd964":void 0},getActivity:function(e,n){if(1===e&&"1"===n.activity_switch1?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2019101468369526&newUserTemplate=".concat(n.activity_id||"KP20191216000002176162"),success:function(t){console.log(1,t)},fail:function(t){}}):2===e&&"1"===n.activity_switch2?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001198661407&newUserTemplate=".concat(n.activity_id2||"KP20201017000002732219")}):3===e&&"1"===n.activity_switch3?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001198645779&newUserTemplate=".concat(n.activity_id3||"KP20201017000002732087")}):4===e&&"1"===n.activity_switch4&&my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001193682570&newUserTemplate=".concat(n.activity_id4||"KP20201017000002732089")}),1===e)if(getApp().globalData.isShow="1"===n["is_show_jf"],this.isShow="1"===n["is_show_jf"],"1"===n["is_show_jf"]){this.getAuth(),t.showTabBar()}else t.hideTabBar();else if(getApp().globalData.isShow="1"===n["is_show_jf"+e],this.isShow="1"===n["is_show_jf"+e],"1"===n["is_show_jf"+e]){this.getAuth(),t.showTabBar()}else t.hideTabBar();this.kefu=n.kefu_mobie},getConfig:function(){var t=this;this.isLoad=!0,this.$api.config().then((function(e){t.getActivity(t.$type,e)})).catch((function(t){console.log(t)}))},getAuth:function(){var t=this;my.getAuthCode({scopes:["auth_user"],success:function(e){t.getUserInfo(e.authCode)}})},getUserInfo:function(t){var e=this,n={auth_code:t,appid:"2021001198645779"};1===this.$type?n.appid="2019101468369526":2===this.$type?n.appid="2021001198661407":3===this.$type?n.appid="2021001198645779":4===this.$type&&(n.appid="2021001193682570"),this.$api.getUserInfo(n).then((function(t){getApp().globalData.userId=t.user_id,e.inputValue&&e.searchInfo()})).catch((function(t){console.log(t)}))},auth:function(t){var e=this,n={auth_code:t};this.$api.auth(n).then((function(t){console.log(t),getApp().globalData.userId=t.user_id,e.inputValue&&e.searchInfo()})).catch((function(t){console.log(t)}))},noticeModal:function(){t.showModal({title:"业务处理通知",content:"订单处理周期1个工作日，加急订单60分钟（早上8：30-晚上20：30）。告知单，通知书系统无法处理。",showCancel:!1,confirmText:"我知道了",success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}})},searchInfo:function(){var e=this;if(getApp().globalData.userId)try{var n={fkdbh:this.inputValue,user_id:getApp().globalData.userId};this.$api.search(n).then((function(n){t.navigateTo({url:"/pages/order/index?id=".concat(e.inputValue)}),getApp().globalData.orderInfo=n,console.log(n,e.inputValue)})).catch((function(t){console.log(t)}))}catch(i){t.showToast({title:"暂无数据",icon:"none"})}else this.getAuth()},onKeyInput:function(t){this.inputValue=t.target.value}}};e.default=n}).call(this,n("c11b")["default"])},"97e3":function(t,e,n){"use strict";n.r(e);var i=n("1cbe"),o=n("1ba7");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("185c");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=u.exports},b737:function(t,e,n){}},[["6441","common/runtime","common/vendor"]]]);