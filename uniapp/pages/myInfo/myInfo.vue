<template>
	<view class="myInfo">
		<unLoginInfo v-show="!isLogin"></unLoginInfo>
		<loginInfo v-show="isLogin"></loginInfo>
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
				"nowUsername"
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