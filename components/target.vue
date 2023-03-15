<template>
	<view class="targetContainer">
		<uni-card isShadow>

			<u-count-down :time="this.targetInfo.targetDate-this.nowTime" format="DD:HH:mm:ss" autoStart millisecond
				@change="onChange">
				<view class="time">
					<view class="time__custom">
						<text class="time__custom__item">{{ timeData.days>=10?timeData.days:'0'+timeData.days}}</text>
					</view>
					<text class="time__doc">:</text>
					<view class="time__custom">
						<text
							class="time__custom__item">{{ timeData.hours>=10?timeData.hours:'0'+timeData.hours}}</text>
					</view>
					<text class="time__doc">:</text>
					<view class="time__custom">
						<text
							class="time__custom__item">{{ timeData.minutes>=10?timeData.minutes:'0'+timeData.minutes}}</text>
					</view>
					<text class="time__doc">:</text>
					<view class="time__custom">
						<text
							class="time__custom__item">{{ timeData.seconds>=10?timeData.seconds:'0'+timeData.seconds}}</text>
					</view>
				</view>
			</u-count-down>

			<u-divider text="目标" textColor="#7ecefd" lineColor="#2185c5"></u-divider>

			<view class="target">
				<u-swipe-action >
					<u-swipe-action-item :options="options" btn-width="180" @click.native.stop="click">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<text class="swipe-action__content__text">{{this.targetInfo.targetText}}</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "target",
		data() {
			return {
				timeData: {},
				nowTime: 0,
				targetInfo: {
					user_id: '',
					_id: '',
					targetDate: 0,
					targetText: "还没有设置目标哦~ 请点击添加",
				},
				options: [{
					text: '完成',
					style: {
						backgroundColor: '#7ECEFD',
					}
				}],
			}
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			getTargetInfo(e) {
				uniCloud.callFunction({
					name: "getTargetInfo",
					data: {}
				}).then(res => {
					this.targetInfo = res.result.data[0]
					this.nowTime = Date.now()
				})
			},
			async click() {
				await uniCloud.callFunction({
					name:'finishTarget',
					data:this.targetInfo
				}).then(res => {
					console.log(res);
				})
			}
		},

	}
</script>

<style lang="scss">
	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 30%;
			height: 70px;
			background-color: #FF7F66;
			border-radius: 8px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fff;
				font-size: 50px;
				text-align: center;
			}
		}

		&__doc {
			color: #FF7F66;
			padding: 0px 4px;
			font-size: 50px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: #3e454c;
				padding-left: 30rpx;
			}
		}
	}
</style>
