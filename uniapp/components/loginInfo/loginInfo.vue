<template>
	<view>
		<text>{{nowUsername}}</text>
		<uni-list class="lists">
			<uni-list-item class="lists-item" title="用户信息"></uni-list-item>
			<uni-list-item class="lists-item" title="收货地址"></uni-list-item>
			<uni-list-item class="lists-item" title="联系客服"></uni-list-item>
			<button @click="changeLogin()">退出</button>
		</uni-list>
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		computed:{
			...mapState([
				"nowUsername"
			])
		},
		methods:{
			...mapActions([
				"changeLogin"
			])
		}
	}
</script>

<style>
	.lists{
		text-align: right;
		height: 100%;
	}
	.lists .lists-item{
		font-size: 25px;
		border: none;
		padding: 20px 0;
	}
	.lists-item:hover{
		background-color: #fdebee;
	}
	.lists button{
		padding: 18px 26px;
		border: none;
		border-radius: 0;
		outline: none;
		outline-style: none;
		text-align: right;
		width: 100%;
		font-size: 20px;
		background-color: #fff;
		color: red;
	}
	.lists button:hover{
		background-color: #fdebee;
	}
</style>