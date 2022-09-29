<template>
	<view>
		<!-- <Card v-for="item,index in userdata" :key="index" :item="item"></Card> -->
		<uni-grid :column="2" :highlight="true" :square="false" :showBorder="false" @change="change">
			<uni-grid-item v-for="(item, index) in userdata" :key="index">
				<Card :item="item"></Card>
			</uni-grid-item>
		</uni-grid>
		<!-- <button @click="test()">测试数据</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata:{},
			}
		},
		computed:{
			isLogin(){
				return store.state.isLogin;
			}
		},
		methods: {
			// 从服务器中获取 category 数据表中的页面数据
			getData(){
				uni.request({
				    url: 'http://127.0.0.1:8000/category', 
						dataType:"json",
				    success: (res) => {
				        console.log(res.data);
								this.userdata = res.data;
				    },
				})
			},
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scope>
	Card{
		width: 50%;
	}
</style>
