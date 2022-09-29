<template>
	<view class="unLoginInfo">
		<view class="btns">
			<!-- <uni-icons custom-prefix="iconfont" type="icon-haixing" size="30"></uni-icons> -->
			<button @click="getLogin">
				登录/注册
			</button>
		</view>
		<uni-list class="lists">
			<uni-list-item class="lists-item" title="用户信息"></uni-list-item>
			<uni-list-item class="lists-item" title="收货地址"></uni-list-item>
			<uni-list-item class="lists-item" title="联系客服"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			getLogin(){
				uni.navigateTo({
					url:"/pages/login/login?pages=myInfo"
				})
			},
			getInfo(){
				console.log(123);
				uni.navigateTo({
					url:"/pages/Infos/Info"
				})
			}
		}
	}
</script>

<style scope>
	.unLoginInfo .lists{
		text-align: right;
		height: 100%;
	}
	.unLoginInfo .lists .lists-item{
		font-size: 25px;
		border: none;
		padding: 20px 0;
	}
	.unLoginInfo .lists-item:hover{
		background-color: #fdebee;
	}
	
</style>