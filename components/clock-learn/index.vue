<template>
	<view class="page flex-center" :class="cross?'column':'row'">
		<div class="back" @click="back()">
			<image src="@/static/image/back.png" style="width: 30px;height: 30px;"></image>
		</div>
		<div class="screen" @click="screen()">
			<image src="@/static/image/lock.png" style="width: 30px;height: 30px;"></image>
		</div>
		<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock" @click="showApm()">
			<clock :num='hours' :long="long" :apm="apm" style="height: 100% !important;"></clock>
		</view>
		<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock" @click="hidden()">
			<clock :num='minutes' :long="long" style="height: 100% !important;"></clock>
		</view>
		<block v-if="isshow">
			<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock">
				<clock :num='seconds' :long="long" style="height: 100% !important;"></clock>
			</view>
		</block>
	</view>
</template>

<script>
	import clock from './clock.vue'
	export default {
		components: {
			clock
		},
		data() {
			return {
				date : "",
				dayNum:0,
				year:0,
				mouth:0,
				day:0,
				focusTime: 0,
				hours: '',
				minutes: '',
				seconds: '',
				width: 0,
				long: 0,
				cross: false,
				isshow: true,
				isapm: true,
				apm: ''
			}
		},
		created() {
			this.timer();
			this.init();
			this.getMouth()
			this.addFocusTime()
			// #ifdef APP-PLUS
			// 屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
			// 隐藏状态栏
			plus.navigator.setFullscreen(true);
			// #endif
		},
		onHide() {
			this.setFocusTime()
		},
		watch: {
			hours() {
				// console.log('时');
			},
			minutes() {
				// console.log('分');
			},
			seconds() {
				// console.log(this.seconds + '秒');
			}
		},
		onResize() {
			this.init();
		},
		methods: {
			addFocusTime(){
				this.focusTime += 1
				setTimeout(() => {
					this.addFocusTime()
				},1000)
			},
			getMouth(){
				let myDate = new Date()
				let Mouth = myDate.getMonth() + 1
				this.mouth = Mouth
				this.year = myDate.getFullYear()
				this.day = myDate.getDate()
				this.date = this.year+"/"+this.mouth+"/"+this.day
				let DayNum = 0
				if(Mouth == 2){
					DayNum = 28
				}
				if ([1,3,5,7,8,10,12].indexOf(Mouth) == -1){
					DayNum = 30
				}else{
					DayNum = 31
				}
				this.dayNum = DayNum
			},
			setFocusTime() {
				console.log(this.focusTime);
				let focus_lists = []
				let filterData = []
				let focusTime = this.focusTime
				let focusDate = this.date
				let DayData = []
				
				uniCloud.callFunction({
				    name:'getFocusList'
				}).then(res => {
					if(res.result.data === []){
						uniCloud.callFunction({
							name:'setNewFocusTime',
							data:{focusTime,focusDate}
						}).then(res  => {
							console.log(res);
						})
					}
				    focus_lists = res.result.data[0].focus_list
					filterData = focus_lists.filter(item => new RegExp(('/'+ this.mouth +'/'+this.day+"$"),"i").test(item.focusDate))
					if(filterData.length == 0){
						uniCloud.callFunction({
							name:'setNewFocusTime',
							data:{focusTime,focusDate}
						}).then(res  => {
							console.log(res);
						})
					}else{
						focusTime += filterData[0].focusTime
						uniCloud.callFunction({
							name:'setFocusTime',
							data:{focusTime,focusDate}
						}).then(res  => {
							console.log(res);
						})
					}
				})
			},
			init() {
				uni.getSystemInfo({
					success: (res) => {
						if (res.windowWidth > res.windowHeight) {
							this.width = res.windowWidth;
							this.cross = false;
						} else {
							this.width = res.windowHeight;
							this.cross = true;
						}
						if (this.isshow) {
							this.long = parseInt(this.width / 3) - 30;
						} else {
							this.long = parseInt(this.width / 2) - 100;
						}
					}
				})
			},
			timer() {
				let date = new Date()
				let hours = date.getHours().toString()
				this.apm = '';
				if (this.isapm && hours <= 12) {
					this.apm = 'AM'
				}
				if (this.isapm && hours > 12) {
					hours = hours - 12;
					this.apm = 'PM'
				}

				// console.error(hours)
				// hours = hours>=10?hours:(hours);
				let minutes = date.getMinutes().toString();
				minutes = minutes >= 10 ? minutes : ('0' + minutes);
				let seconds = date.getSeconds().toString();
				seconds = seconds >= 10 ? seconds : ('0' + seconds);
				if (this.hours != hours) {
					this.hours = hours;
				}
				if (this.minutes != minutes) {
					this.minutes = minutes;
				}
				if (this.seconds != seconds) {
					this.seconds = seconds;
				}
				setTimeout(() => {
					this.timer()
				}, 100);
			},
			hidden() {
				this.isshow = !this.isshow;
				this.init();
			},
			showApm() {
				this.isapm = !this.isapm;
			},
			async back() {
				await this.setFocusTime()
				uni.$emit('update1',{})
				uni.navigateBack()
			},
			screen() {
				// uni.navigateBack()
			
				uni.navigateTo({
					url:'/pages/sereen/sereen'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	.page {
		height: 100vh;
		width: 100%;
		background-color: #000000;
	}

	.flex-center {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}

	.clock {
		padding: 2%;
		transform: rotate(90deg);
	}

	.back {
		transform: rotate(90deg);
		background-color: rgba(68, 68, 70, 0.2);
		border-radius: 50%;
		padding: 5px;
		width: 30px;
		height: 30px;
		position: absolute;
		bottom: 50rpx;
		right: 20rpx;
		z-index: 999;
	}
	.screen {
		transform: rotate(90deg);
		background-color: rgba(68, 68, 70, 0.2);
		border-radius: 50%;
		padding: 5px;
		width: 30px;
		height: 30px;
		position: absolute;
		bottom: 200rpx;
		right: 20rpx;
		z-index: 999;
	}
</style>
