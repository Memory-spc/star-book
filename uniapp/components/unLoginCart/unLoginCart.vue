<template>
	<view class="unLogin">
		<uni-icons type="cart" size="100" color="red"></uni-icons><br>
		<text>登录后可同步购物车中的商品</text><br>
		<button @click="toLogin" size="mini" class="loginBtn">登录</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {

			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:"/pages/login/login?pages=ShopingCart"
				})
			}
			
		}
	}
</script>

<style scope>
	.unLogin {
		text-align: center;
		position: relative;
		top: 50%;
		transform: translateY(100%);
	}

	.loginBtn {
		margin-top: 20px;
		color: red;
		width: 30%;
		background-color: #fff;
		border: 1px solid red;
	}
</style>
