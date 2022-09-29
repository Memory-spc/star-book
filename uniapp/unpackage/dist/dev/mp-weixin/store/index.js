"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    "isLogin": true
  },
  mutations: {
    changeLogin(state) {
      state.isLogin = !state.isLogin;
    }
  },
  actions: {
    changeLogin(context) {
      context.commit("changeLogin");
    }
  }
});
exports.store = store;
