<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <navBar :title="title"></navBar>
        <target @click.native="changeTarget" ref="target"></target>
        <lxCalendar :dot_lists="dot_lists"></lxCalendar>
        <uni-card isShadow class="chartsContainer">
            <uCharts ref="uCharts"></uCharts>
        </uni-card>
		<u-popup :show="show" mode="center" border-radius="14" @close="changeTarget" width="auto" height="auto">
			<u-card margin="30rpx" class="form">
				<u-form :model="form">
					<u-form-item label="日期">
						<uni-datetime-picker type="date" v-model="form.targetDate"></uni-datetime-picker>
					</u-form-item>
					<u-form-item label="目标">
						<u-input v-model="form.targetInfo" type="textarea" border-color="#7ECEFD" auto-height />
					</u-form-item>
					<u-form-item>
						<button type="primary" size="mini" @tap="submitForm">提交</button>
					</u-form-item>
				</u-form>
			</u-card>
		</u-popup>
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
				show:false,
				showDate:false,
				dateMode:'date',
				form:{
					targetInfo:'',
					targetDate:'2023-3-30'
				}
            }
        },
        methods: {
            submitForm(){
				
			},
			
			changeDateShow(){
				showDate = true
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
			changeTarget(){
				this.show = !this.show
				console.log("切换~"+this.show);
			}
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
	.form{
		width: 300px;
		height: 150px;
		padding: 30px;
	}
</style>
