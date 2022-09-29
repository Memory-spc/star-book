<template>
		<view class="Card">
			<image :src="'../../static/images/'+item['Image']" mode="aspectFit"></image>
			<text>{{item["Name"]}}</text>
		</view>
		
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:["item"]
	}
</script>

<style scope>
	.Card{
		margin:10px 0;
		text-align: center;
		overflow: hidden;
	}
	image{
		height: 100px;
		width: 100%;
	}
</style>