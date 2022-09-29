"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: __spreadValues({}, common_vendor.mapState([
    "isLogin"
  ])),
  methods: __spreadValues({}, common_vendor.mapActions([]))
};
if (!Array) {
  const _easycom_unLoginCart2 = common_vendor.resolveComponent("unLoginCart");
  const _easycom_loginCart2 = common_vendor.resolveComponent("loginCart");
  (_easycom_unLoginCart2 + _easycom_loginCart2)();
}
const _easycom_unLoginCart = () => "../../components/unLoginCart/unLoginCart.js";
const _easycom_loginCart = () => "../../components/loginCart/loginCart.js";
if (!Math) {
  (_easycom_unLoginCart + _easycom_loginCart)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.isLogin,
    b: _ctx.isLogin
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/HUAWEI/Desktop/uniapp/pages/ShopingCart/ShopingCart.vue"]]);
wx.createPage(MiniProgramPage);
