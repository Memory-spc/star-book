// 我们组装模块并导出 store 的地方
/**
 * 每一个 Vuex 应用的核心就是 store（仓库），它包含着你的应用中大部分的状态 (state)。
 * 状态管理有5个核心：state、getter、mutation、action、module。
 */

// 页面路径：store/index.js
import { createStore } from 'vuex'
const store = createStore({
	state:{//存放状态
		"isLogin":false,  // 验证是否登录
		"isClose":false,
		"nowUsername":''
	},
	mutations:{
		changeLogin(state){
			state.isLogin = !state.isLogin;
		},
		changeClose(state){
			state.isClose = !state.isClose;
		},
		changeUsername(state,context){
			state.nowUsername = context;
		}
	},
	actions:{
		changeLogin(context){
			context.commit('changeLogin');
		},
		changClose(context){
			context.commit('changeClose');
		},
		changeUsername(context,data){
			context.commit("changeUsername",data)
		}
	}
})

export default store
