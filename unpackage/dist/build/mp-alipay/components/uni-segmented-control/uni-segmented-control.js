;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/uni-segmented-control/uni-segmented-control"],{"34e4":function(t,n,e){"use strict";e.r(n);var r=e("8d75"),u=e.n(r);for(var c in r)"default"!==c&&function(t){e.d(n,t,function(){return r[t]})}(c);n["default"]=u.a},"8c12":function(t,n,e){},"8d75":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"UniSegmentedControl",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}}};n.default=r},a8d9:function(t,n,e){"use strict";e.r(n);var r=e("d78d"),u=e("34e4");for(var c in u)"default"!==c&&function(t){e.d(n,t,function(){return u[t]})}(c);e("e04f");var i=e("2877"),o=Object(i["a"])(u["default"],r["a"],r["b"],!1,null,null,null);n["default"]=o.exports},d78d:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})},e04f:function(t,n,e){"use strict";var r=e("8c12"),u=e.n(r);u.a}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/uni-segmented-control/uni-segmented-control-create-component',
    {
        'components/uni-segmented-control/uni-segmented-control-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("a8d9"))
        })
    },
    [['components/uni-segmented-control/uni-segmented-control-create-component']]
]);                
