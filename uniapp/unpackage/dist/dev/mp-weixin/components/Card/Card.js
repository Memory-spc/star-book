"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["item"]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: "../../static/images/" + $props.item["Image"],
    b: common_vendor.t($props.item["Name"])
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/HUAWEI/Desktop/uniapp/components/Card/Card.vue"]]);
wx.createComponent(Component);
