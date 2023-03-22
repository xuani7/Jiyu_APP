  <template>
	<view class="page">
		<view class="content">
			<view class="status_bar"></view>
			<view class="logo">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<u-datetime-picker
				:show="show"
				v-model="time"
				mode="datetime"
				@confirm="confirm"
				@cancel="cancel"
			></u-datetime-picker>
			<u-button @click="show = true" color="#7ECEFD" shape="circle" class="btn" >选择时间</u-button>
			<u-button type="primary" icon="lock-fill" shape="circle"  color="#7ECEFD"  @click="lockPm" class="btn" >锁屏</u-button>
			<uni-section title="定时列表" type="line" class="list" >
				<template v-slot:right>
					<uni-icons type="plusempty" color="#7ECEFD" size="25px" style="margin-right: 5px;" @click="show1 = true"></uni-icons>
				</template>
				<uni-list >
					<uni-list-item v-for="(item,index) in lockList" :key="index" 
					:title="item.lockTime">
					<template v-slot:footer>
						<u-switch v-model="item.isDo"  @change="switchChange(index)" size="20" activeColor="#7ECEFD" style="margin-right: 15px;"
						></u-switch>
						<view class="slot-button">
							<uni-icons type="trash-filled" color="#FF7F66" size="25px" style="margin-right: 2px;margin-right: 10px;" @click="removeLockTime(index)"></uni-icons>
						</view>
					</template>
					</uni-list-item>
				</uni-list>
			</uni-section>
			<u-datetime-picker
				:show="show1"
				v-model="value1"
				mode="time"
				@confirm = "addLockTime"
				@cancel="show1 = false"
			></u-datetime-picker>
		</view>
	</view>
  </template>
  
  <script>
  	// 测试没密码的锁屏和解锁，请自行打包基座后，选择自定义 基座运行
  	var testModule = uni.requireNativePlugin("XYZ-ScreenManagerModule");
  	export default {
  		data() {
  			return {
				show: false,
				show1:false,
				value1:"00:00",
  				title: 'Hello',
				time:Number(new Date()),
				shijian: 0,
				lockList:[],
				config: {
					time: '14:00:00', // 每天几点执行
					interval: 1, // 隔几天执行一次
					intervalTimer: '',
					timeOutTimer: ''
				}
  			}
  		},
  		async onLoad() {
  			await this.getLockList()
			激活设备管理器
  			testModule.getLockPermission()
			this.lockByTimer()
  		},
		beforeDestroy() {
			console.log(
			  '关闭任务定时器',
			  this.config.intervalTimer
			)
			clearInterval(this.config.intervalTimer)
			console.log('清除定时器timeout', this.config.timeOutTimer)
			clearTimeout(this.config.timeOutTimer)
		},
  		methods: {
			addLockTime(){
				this.show1 = false
				let val = this.value1
				uniCloud.callFunction({
					name:'addLock',
					data:{val}
				}).then(res => {
					console.log(res);
					this.getLockList()
				})
				
			},
			removeLockTime(index){
				console.log(index);
				uniCloud.callFunction({
					name:'removeLockTime',
					data:{index}
				}).then(res => {
					this.getLockList()
				})
			},
			//switch
			switchChange(index) {
				console.log(index);
				this.config.time = this.lockList[index].isDo ? this.lockList[index].lockTime : "00:00"
				for (var i = 0; i < this.lockList.length; i++) {
					if(i != index){
						this.lockList[i].isDo = false
					}
				}
				let lockList = this.lockList
				uniCloud.callFunction({
					name:'updateLock',
					data:{lockList}
				}).then(res => {
					console.log(res);
				})
			},
			getLockList(){
				uniCloud.callFunction({
					name:'getLockList'
				}).then(res => {
					this.lockList = res.result.data[0].lock_list
				})
			},
			lockByTimer() {
			  // 获取下次要执行的时间，如果执行时间已经过了今天，就让把执行时间设到明天的按时执行的时间
			  var nowTime = new Date().getTime()
			  var timePoint = this.config.time.split(':').map((i) => parseInt(i))
		 
			  var recent = new Date().setHours(...timePoint) // 获取执行时间的时间戳
		 
			  if (recent <= nowTime) {
				recent += 24 * 60 * 60 * 1000
			  }
			  // 未来程序执行的时间减去现在的时间，就是程序要多少秒之后执行
			  var doRunTime = recent - nowTime
			  this.config.timeOutTimer = setTimeout(this.setTimer, doRunTime)
			},
			setTimer() {
			  console.log('进入定时器')
			   //配置后的第一天12点执行
			  this.lock()
			  // 每隔多少天再执行一次
			  var intTime = this.config.interval * 24 * 60 * 60 * 1000
			  this.config.intervalTimer = setInterval(this.lock, intTime)
			},
			
  			lockPm(){
  				var _this=this
  				testModule.lockPm(res => {
  					console.log(JSON.stringify(res))
  				})
  				setTimeout(function(){
  					_this.wakeUpAndUnlock()
  				},_this.shijian)
  			},	
			lock(){
				testModule.lockPm(res => {
					console.log(JSON.stringify(res))
				})
			},
  			wakeUpAndUnlock(){
  				testModule.wakeUpAndUnlock(res => { 
  					console.log(JSON.stringify(res))
  				})
  			},
			confirm(value) {
				console.log(value.value);
				
				this.shijian = Number(new Date(value.value)) - Date.now()
				console.log(this.shijian);
				this.show = false
			},
			cancel() {
				this.show = false
			}
  		}
  	}
  </script>
  
  <style>
	  
	page {
		background-color: #FFFFFF;
		height: 100%;
		width: 100%;
	}

	.page {
		height: 100%;
		width: 100%;
		background-color: #FFFFFF;
	}
  	.content {
  		display: flex;
  		flex-direction: column;
  		align-items: center;
  		justify-content: center;
  	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		margin-bottom: 50px;
	}
  	.logo {
  		margin-top: 100rpx;
  		margin-left: auto;
  		margin-right: auto;
  		margin-bottom: 50rpx;
  	}
  
  	.text-area {
  		display: flex;
  		justify-content: center;
  	}
  
  	.title {
  		font-size: 36rpx;
  		color: #8f8f94;
  	}
	
	.btn {
		width: 200px;
		margin: 10px;
	}
	.list {
		width: 100%;
	}
  </style>
  