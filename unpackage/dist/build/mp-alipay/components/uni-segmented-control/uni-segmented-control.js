;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/uni-segmented-control/uni-segmented-control"],{"0de4":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"UniSegmentedControl",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}}};e.default=r},"86a9":function(t,e,n){"use strict";n.r(e);var r=n("e5e4"),u=n("f8b9");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("e9e6");var i,o=n("f0c5"),a=Object(o["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=a.exports},"8c43":function(t,e,n){},e5e4:function(t,e,n){"use strict";var r,u=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r}))},e9e6:function(t,e,n){"use strict";var r=n("8c43"),u=n.n(r);u.a},f8b9:function(t,e,n){"use strict";n.r(e);var r=n("0de4"),u=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=u.a}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/uni-segmented-control/uni-segmented-control-create-component',
    {
        'components/uni-segmented-control/uni-segmented-control-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("86a9"))
        })
    },
    [['components/uni-segmented-control/uni-segmented-control-create-component']]
]);
