(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/index/index"],{"185c":function(t,n,e){"use strict";var i=e("b737"),o=e.n(i);o.a},"1ba7":function(t,n,e){"use strict";e.r(n);var i=e("8a3a"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},6441:function(t,n,e){"use strict";(function(t){e("515f");i(e("66fd"));var n=i(e("97e3"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("c11b")["createPage"])},"8a3a":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{isShow:getApp().globalData.isShow,inputValue:"",kefu:null,isLoad:!1,canIUseAuthButton:!0}},onLoad:function(){this.getConfig()},methods:{onAuthError:function(t){console.log(t,"err")},onGetAuthorize:function(){console.log(123),my.getPhoneNumber({success:function(t){console.log(t,999);var n=t.response;my.request({url:"你的后端服务端",data:n})},fail:function(t){console.log(t),console.log("getPhoneNumber_fail")}})},color:function(){return 1===this.$type?"#007aff":2===this.$type?"#dd524d":3===this.$type?"#f0ad4e":4===this.$type?"#4cd964":void 0},getActivity:function(n,e){if(1===n&&e.activity_switch1?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2019101468369526&newUserTemplate=".concat(e.activity_id||"KP20191216000002176162"),success:function(t){console.log(1,t)},fail:function(t){}}):2===n&&e.activity_switch2?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001198661407&newUserTemplate=".concat(e.activity_id2||"KP20201017000002732219")}):3===n&&e.activity_switch3?my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001198645779&newUserTemplate=".concat(e.activity_id3||"KP20201017000002732087")}):4===n&&e.activity_switch4&&my.navigateToMiniProgram({appId:"2018122562686742",path:"pages/index/index?originAppId=2021001193682570&newUserTemplate=".concat(e.activity_id4||"KP20201017000002732089")}),getApp().globalData.isShow="1"===e["is_show_jf"+n],this.isShow="1"===e["is_show_jf"+n],this.kefu=e.kefu_mobie,"1"===e["is_show_jf"+n]){this.getAuth(),t.showTabBar()}else t.hideTabBar()},getConfig:function(){var t=this;this.isLoad=!0,this.$api.config().then((function(n){t.getActivity(t.$type,n)})).catch((function(t){console.log(t)}))},getAuth:function(){var t=this;my.getAuthCode({scopes:["auth_user"],success:function(n){t.getUserInfo(n.authCode)}})},getUserInfo:function(t){var n=this,e={auth_code:t,appid:"2021001198645779"};1===this.$type?e.appid="2019101468369526":2===this.$type?e.appid="2021001198661407":3===this.$type?e.appid="2021001198645779":4===this.$type&&(e.appid="2021001193682570"),this.$api.getUserInfo(e).then((function(t){getApp().globalData.userId=t.user_id,n.inputValue&&n.searchInfo()})).catch((function(t){console.log(t)}))},auth:function(t){var n=this,e={auth_code:t};this.$api.auth(e).then((function(t){console.log(t),getApp().globalData.userId=t.user_id,n.inputValue&&n.searchInfo()})).catch((function(t){console.log(t)}))},noticeModal:function(){t.showModal({title:"业务处理通知",content:"订单处理周期1个工作日，加急订单60分钟（早上8：30-晚上20：30）。告知单，通知书系统无法处理。",showCancel:!1,confirmText:"我知道了",success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}})},searchInfo:function(){var n=this;if(getApp().globalData.userId)try{var e={fkdbh:this.inputValue,user_id:getApp().globalData.userId};this.$api.search(e).then((function(e){t.navigateTo({url:"/pages/order/index?id=".concat(n.inputValue)}),getApp().globalData.orderInfo=e,console.log(e,n.inputValue)})).catch((function(t){console.log(t)}))}catch(i){t.showToast({title:"暂无数据",icon:"none"})}else this.getAuth()},onKeyInput:function(t){this.inputValue=t.target.value}}};n.default=e}).call(this,e("c11b")["default"])},"97e3":function(t,n,e){"use strict";e.r(n);var i=e("b029"),o=e("1ba7");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("185c");var c,s=e("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);n["default"]=u.exports},b029:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var o=function(){var t=this,n=t.$createElement;t._self._c},a=[]},b737:function(t,n,e){}},[["6441","common/runtime","common/vendor"]]]);