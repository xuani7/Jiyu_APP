<template>
	<view class="container" @touchstart="touchStart" @touchend="touchEnd">
		<navBar :title="title"></navBar>
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :key="index" :title="item.targetText" :rightText="item.isFinish?'已完成':'未完成'"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import navBar from '../../components/navBar.vue'
	export default {
		components: {
			navBar
		},
		data() {
			return {
				title: "目标列表",
				startX: 0,
				list: [],
			}
		},
		methods: {
			/**
			 * 触摸开始
			 * @param {Object} e
			 */
			touchStart: function(e) {
				if (e.touches.length == 1) {
					//设置触摸起始点水平方向位置
					this.startX = e.touches[0].clientX;
				}
			},
			/**
			 * 触摸结束
			 * @param {Object} e
			 */
			touchEnd: function(e) {
				if (e.changedTouches.length == 1) {
					//手指移动结束后水平位置
					var endX = e.changedTouches[0].clientX;
					let diff = endX - this.startX;
					if (Math.abs(diff) > 200) {
						if (diff > 200) {
							// #ifdef APP-PLUS
							uni.navigateBack()
							// #endif
						}
					}
				}
			},
			
			getTargetList(){
				uniCloud.callFunction({
					name:"getTargetList"
				}).then(res => {
					this.list = res.result.data[0].target_list
				})
			}
		},
		onLoad() {
		    this.getTargetList()
		},
	}
</script>

<style>
</style>
