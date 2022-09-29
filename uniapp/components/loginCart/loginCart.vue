<template>
	<view class="LoginCart">
		<!-- <uni-goods-nav class="nav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="" /> -->
		<view class="nav">
			<text>总价：{{num}}元</text>
			<button class="next">继续选购</button>
			<button class="end">结算</button>
		</view>
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
				num:0,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info:0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info:0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			...mapState([
				"isLogin",
				"nowUsername"
			])
		},
		methods: {
			...mapActions([
				// "changeLogin",
				// 'changeUsername'
			]),
			getData(address) {
				uni.request({
					url: "http://127.0.0.1:8000/" + address,
					data: {

					},
					success: (res) => {
						console.log(res.data);
					}
				})
			}
		}
	}
</script>

<style>
	.nav{
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: right;
	}
	.nav text{
		display: block;
		padding: 10px;
	}
	.nav button {
		display: inline-block;
		border: none;
		border-radius: 0;
		outline: none;
		background-color: #ffdee6;
		width: 50%;
	}
	.nav button:hover{
		background-color: #ffc1ce;
	}
</style>
