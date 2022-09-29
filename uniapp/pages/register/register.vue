<template>
	<view class="login">
		<uni-icons custom-prefix="iconfont" type="icon-denglu" size="150"></uni-icons>
		<view>
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" v-model="username"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" password type="text" placeholder="这是一个密码输入框" v-model="password"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">确认密码</view>
				<input class="uni-input" password type="text" placeholder="这是一个密码输入框" v-model="repassword"/>
			</view>
		</view>
		<view class="btns">
			<button type="warn" @click="getLogin()">登录</button>
			<button class="longbtn" type="warn" @click="getRegister()">注册</button>
		</view>
	</view>
	<!-- 蒙版 -->
	<view class="error" v-show="isClose">
		<text>{{text}}</text>
		<button @click="changClose()">X</button>
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				// console.log('r'+option.pages); //打印出上个页面传递的参数。
				this.pages = option.pages;
		},
		data(){
			return {
				showPassword:true,
				username: '',
				password: '',
				repassword: '',
				text:'',
				pages:''
			}
		},
		computed:{
			...mapState([
				"isClose",
				"isLogin",
				"nowUsername"
			])
		},
		methods:{
			...mapActions([
				"changClose",
				"changeLogin",
				"changeUsername"
			]),
			getLogin(){
				uni.navigateTo({
					url:'/pages/login/login?pages='+this.pages
				})
			},
			getNull(){
				this.username = ''
				this.password = ''
				this.repassword = ''
			},
			getRegister(){
				if(this.username === ''){
					// 用户名为空时
					this.text = "用户名为空"
					this.getNull()
					this.changClose();
				}else if(this.password === '' || this.repassword === '' || this.password !== this.repassword){
					// 密码或确认密码为空或者密码和确认密码不一样时
					this.text = "密码为空或不一致"
					this.getNull()
					this.changClose();
				}else{
					// 用户名不为空，密码和确认密码不为空，且确认密码和密码一致
					uni.request({
					    url: 'http://127.0.0.1:8000/register', 
					    data:{
								username:this.username,
								password:this.password,
								repassword:this.repassword
							},
					    header: {
					        'custom-header': 'hello' 
					    },
					    success: (res) => {
					        // console.log(res.data);
									if(res.data == 0){
										// 当验证用户名已经存在时
										this.text = "用户名已存在，请重新输入";
										this.getNull()
										this.changClose();
									}else{
										// 用户名存入用户后直接登录并跳转到来时的页面
										this.changeLogin();
										this.changeUsername(this.username);
										console.log(this.nowUsername);
										uni.switchTab({
											url: "/pages/"+this.pages+"/"+this.pages
										});
									}
					    }
					});
				}
				
			}
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
