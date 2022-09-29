<template>
	<view class="ShopingCart">
		<unLoginCart v-show="!isLogin"></unLoginCart>
		<loginCart v-show="isLogin"></loginCart>	
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			...mapState([
				"isLogin",
				])
		},
		methods: {
			...mapActions([
				
			])
		}
	}
</script>

<style>
	
</style>