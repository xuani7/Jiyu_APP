<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <navBar :title="title"></navBar>
        <target @click="changeTarget()" ref="target"></target>
        <lxCalendar :dot_lists="dot_lists"></lxCalendar>
        <uni-card isShadow class="chartsContainer">
            <uCharts ref="uCharts"></uCharts>
        </uni-card>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import lxCalendar from "../../components/lx-calendar/lx-calendar.vue"
    import target from "../../components/target.vue"
    import uCharts from "../../components/charts.vue"
    export default {
        components: {
            navBar,
            lxCalendar,
            target,
            uCharts
        },
        data() {
            return {
                title: "目标",
                dot_lists: ['2023-2-15', '2023-2-22'],
				//初始化点击位置的x坐标
				startX:0,
				show:false
            }
        },
        methods: {
            onClick(e) {
                console.log(e)
            },
			
			/**
			* 触摸开始
			* @param {Object} e
			*/
			touchStart: function (e) {
				if (e.touches.length == 1) {
					//设置触摸起始点水平方向位置
					this.startX=e.touches[0].clientX;
				}
			},
			/**
			 * 触摸结束
			 * @param {Object} e
			 */
			touchEnd: function (e) {
				if (e.changedTouches.length == 1) {
					//手指移动结束后水平位置
					var endX = e.changedTouches[0].clientX;
					let diff = endX-this.startX;
					if(Math.abs(diff)>100){
						if(diff>0){
							// #ifdef APP-PLUS
							uni.navigateTo({
							    url: "/pages/user/user",
							    animationType: 'fade-in',
							    animationDuration: 300
							})
							// #endif
						}
					}
				}
			},
			
        },
        onLoad() {
            this.$nextTick(function() {
                this.$refs.uCharts.getServerData()
            });
        }
    }
</script>

<style lang="scss">
    .container {
        position: fixed;
        position: relative;
        height: auto;
        padding-bottom: 17rpx;
    }
    .chartsContainer{
        height: 320px;
    }
</style>
