<template>
	<view class="login">
		<uni-icons custom-prefix="iconfont" type="icon-denglu" size="150"></uni-icons>
		<view>
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" v-model="username" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" password type="text" placeholder="请输入密码" v-model="password" />
			</view>
		</view>
		<view class="btns">
			<button class="longbtn" type="warn" @click="getLogin()">登录</button>
			<button type="warn" @click="getRegister()">注册</button>
		</view>
	</view>
	<!-- 蒙版 -->
	<view class="error" v-show="isClose">
		<text>用户名或密码错误</text>
		<button @click="changClose()">X</button>
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				// console.log('L'+option.pages); //打印出上个页面传递的参数。
				this.pages = option.pages;
		},
		data() {
			return {
				showPassword: true,
				username: '',
				password: '',
				pages:''
			}
		},
		computed:{
			...mapState([
				"isLogin",
				"isClose",
				"nowUsername"
			])
		},
		methods: {
			...mapActions([
				"changClose",
				"changeLogin",
				"changeUsername",
			]),
			getLogin() {
				// console.log(typeof this.username);
				if(this.username !== '' && this.password !== ''){
					uni.request({
					    url: 'http://127.0.0.1:8000/login', //仅为示例，并非真实接口地址。
					    data: {
					      username:this.username,
								password:this.password,
					    },
					    header: {
					        'custom-header': 'hello' //自定义请求头信息
					    },
					    success: (res) => {
					        // console.log(res.data);
					        // this.text = 'request success';
									if(res.data.length === 0){
										this.changClose();
										this.username = '';
										this.password = '';
										console.log(typeof this.pages);
									}else{
										this.changeLogin();
										this.changeUsername(this.username);
										// console.log(this.nowUsername);
										uni.switchTab({
											url: "/pages/"+this.pages+"/"+this.pages
										});
									}
					    }
					});
				}else{
					alert("用户名或密码为空");
				}
			},
			getRegister() {
				uni.navigateTo({
					url:'/pages/register/register?pages='+this.pages
				})
			},
		}
	}
</script>

<style scope>
	body {
		position: relative;
		background-color: #fef0ff;
	}

	.login {
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		width: 100%;
	}

	.login input {
		outline: 1px solid #ddd;
		padding: 3px;
		font-size: 16px;
		margin: 10px auto;
		border-radius: 5px;
		background-color: #fff;
		width: 80%;
	}

	.login .btns{
		position: absolute;
		bottom: -40%;
		transform: translateX(15%);
		margin: 40px auto;
		display: flex;
		width: 80%;
	}
	.login button:nth-child(1){
		border-radius: 50px 0 0 50px;
		background-image: linear-gradient(to right,#5ef1fe,#31bef4);
	}
	.login button:nth-child(2){
		border-radius: 0px 50px 50px 0px;
		background-image: linear-gradient(to right,#31bef4,#0990eb);
	}
	.login button{
		bottom: 0;
		outline: none;
		width: 50%;
	}
	.login .longbtn{
		transition-duration:.5s;
		/* transform: scaleX(1.5); */
		width:80%;
	}
	
	/* 蒙版样式 */
	.error{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(195, 195, 195, 0.5);
		/* z-index: 20; */
		color: red;
		text-align: center;
		font-size: 20px;
	}
	.error text{
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.error button{
		position: absolute;
		top: 0;
		right: 0;
		margin: 10px;
		border: none;
		outline: none;
		box-shadow: none;
		background-color: transparent;
	}
</style>
