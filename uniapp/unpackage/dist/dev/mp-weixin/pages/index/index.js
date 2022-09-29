"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userdata: {}
    };
  },
  computed: {
    isLogin() {
      return store.state.isLogin;
    }
  },
  methods: {
    getData() {
      common_vendor.index.request({
        url: "http://127.0.0.1:8000/category",
        dataType: "json",
        success: (res) => {
          console.log(res.data);
          this.userdata = res.data;
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
if (!Array) {
  const _easycom_Card2 = common_vendor.resolveComponent("Card");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_Card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_Card = () => "../../components/Card/Card.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_Card + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.userdata, (item, index, i0) => {
      return {
        a: "4400c8b6-2-" + i0 + "," + ("4400c8b6-1-" + i0),
        b: common_vendor.p({
          item
        }),
        c: index,
        d: "4400c8b6-1-" + i0 + ",4400c8b6-0"
      };
    }),
    b: common_vendor.o(_ctx.change),
    c: common_vendor.p({
      column: 2,
      highlight: true,
      square: false,
      showBorder: false
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/HUAWEI/Desktop/uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
