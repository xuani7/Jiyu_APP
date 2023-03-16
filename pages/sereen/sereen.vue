  <template>
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
		<u-button @click="show = true" color="gary" shape="circle" class="btn" >选择时间</u-button>
  		<u-button type="primary" icon="lock-fill" shape="circle"  color="gary"  @click="lockPm" class="btn" >锁屏</u-button>
  	</view>
  </template>
  
  <script>
  	// 测试没密码的锁屏和解锁，请自行打包基座后，选择自定义 基座运行
  	var testModule = uni.requireNativePlugin("XYZ-ScreenManagerModule");
  	export default {
  		data() {
  			return {
				show: false,
  				title: 'Hello',
				time:Number(new Date()),
				shijian: 0
  			}
  		},
  		onLoad() {
  			// 激活设备管理器
  			testModule.getLockPermission()
  		},
  		methods: {
  			lockPm(){
  				var _this=this
  				testModule.lockPm(res => {
  					console.log(JSON.stringify(res))
  				})
  				setTimeout(function(){
  					_this.wakeUpAndUnlock()
  				},_this.shijian)
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
		background-color: #000000;
	}

	.page {
		height: 100%;
		width: 100%;
		background-color: #000000;
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
  		margin-top: 200rpx;
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
		width: 60px;
		margin: 20px;
	}
  </style>
  