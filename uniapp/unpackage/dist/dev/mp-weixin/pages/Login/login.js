"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    changePassword: function() {
      this.showPassword = !this.showPassword;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-denglu",
      size: "100"
    }),
    b: _ctx.showPassword,
    c: common_vendor.n(!_ctx.showPassword ? "uni-eye-active" : ""),
    d: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/HUAWEI/Desktop/uniapp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
