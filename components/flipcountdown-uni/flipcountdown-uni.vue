<template>
	<view id="retroclockbox_counter" class="xdsoft">
		<view class="xdsoft_flipcountdown " ref="flipcountdown" :style="{'zoom':zoom}">
			<!-- 显示中文 -->
			<view v-if="propsShowCN"
				:style="{'background-position':item.backgroundPosition,'transition-duration': !isDefault?duration+'s':'unset'}"
				class="xdsoft_digit" :class="{
				'xdsoft_dot':item.value ==='.',
				'xdsoft_space_cn':isNaN(item.value) && item.value !=='.'}" :data-value="item.value"
				v-for="(item,index) of dataList" :key="index">
				<text class="cn-class"
					:style="{'font-size':cnFontSize+'rpx','color':cnColor}">{{isNaN(item.value) && item.value !=='.' ?item.value:''}}</text>
			</view>
			<view v-if="propsShowCN && colonTotal>0" :style="{'transition-duration': !isDefault?duration+'s':'unset'}"
				class="xdsoft_digit xdsoft_space_cn">
				<text class="cn-class" :style="{'font-size':cnFontSize+'rpx','color':cnColor}">秒</text>
			</view>
			<!-- 显示中文 -->

			<!-- 不显示中文 -->
			<view v-if="!propsShowCN" :style="{'background-position':item.backgroundPosition,
				'transition-duration': !isDefault?duration+'s':'unset',
				'display':value==='00:00:00'?(index===0 ||index===1 ||index===2||index===11  ) ?'none':'':''}"
				:class="[item.value ==='.'? 'xdsoft_digit xdsoft_dot' : item.value ===':'? 'xdsoft_digit  xdsoft_space':'xdsoft_digit']"
				:data-value="item.value" v-for="(item,index) of dataList" :key="index"></view>
			<!-- 不显示中文 -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//小数点X位置
			dotX: {
				type: [String, Number],
				default: -27
			},
			//小数点y位置
			dotY: {
				type: [String, Number],
				default: -3120
			},
			//1、正常计时，2、倒计时,3、数字增加
			type: {
				type: [String, Number],
				default: 1
			},
			// 是否默认图片
			isDefault: {
				type: Boolean,
				default: true
			},
			// 雪碧图里的每个数字的共同高度
			numHeight: {
				type: [String, Number],
				default: 52
			},
			// 数字 0 、0.1
			value: {
				type: [String, Number],
				default: 0
			},
			// 开始时间
			startTime: {
				type: [String, Number],
				default: 0
			},
			// 结束时间
			endTime: {
				type: [String, Number],
				default: 4070880000000
			},
			// 切换速度，即执行时间
			speed: {
				type: [String, Number],
				default: 1000
			},
			// transition-duration
			duration: {
				type: [String, Number],
				default: 0.1
			},
			// 自定义函数
			tick: {
				type: Function,
				default: function tick() {}
			},
			// 例如默认图片中，0到0共有60张，所以填60
			speedFlip: {
				type: [String, Number],
				default: 60
			},

			// 初始个数,比如雪碧图0-1，0到1需要翻转6次，所以填6，自定义的雪碧图0到1只要翻转1次，所以填1
			rollingNumber: {
				type: [String, Number],
				default: 6
			},
			// 所有个数,比如0-9-0共10个，就填10，不包括.和:
			total: {
				type: [String, Number],
				default: 60
			},
			// 是否显示天数
			showDay: {
				type: Boolean,
				default: false
			},
			// 是否显示中文
			showCN: {
				type: Boolean,
				default: false
			},
			// 是否自动开始
			autoplay: {
				type: Boolean,
				default: true
			},
			// 中文字体大小
			cnFontSize: {
				type: [String, Number],
				default: 72
			},
			// 中文颜色
			cnColor: {
				type: String,
				default: '#0d0d0d'
			},
			// 缩放比例
			zoom: {
				type: [String, Number],
				default: 1
			},

		},
		watch: {
			autoplay: {
				handler(newValue, oldValue) {
					let type = this.propsType
					if (oldValue === undefined) {
						if (type === 1) {
							this.getNTpropsVal()
							if (this.isTimeAllZero) {
								this.getNTZPropsVal()
							}
						} else if (type === 2) {
							this.getSCDPropsVal()
						} else if (type === 3) {
							this.addNumber()
						}
						this.init()
					}
					if (newValue) {
						if (type === 1) {
							this.normalTiming()
							if (this.isTimeAllZero) {
								this.fastNormalTiming()
							}
						} else if (type === 2) {
							this.startCountDown()
						} else if (type === 3) {
							this.addNumber()
						}
					} else {
						this.clearTimer()
					}
				},
				immediate: true
			}
		},
		data() {
			return {
				dataList: [],
				splitPropsVal: [],
				propsVal: this.value,
				propsType: Number(this.type),
				propsSpeed: Number(this.speed),
				propsShowCN: this.showCN,
				propsShowDay: this.showDay,
				timeoutTimer: null, // 定时器
				cnDayList: ['天', '时', '分'],
				cnHourList: ['时', '分'],
				cnMinuteList: ['分'],
				colonTotal: 0, //冒号数量
				timeStamp: 0, //时间戳
				cycleIndex: 0, //循环次数
				timeOut: false, //倒计时时间结束
				timingTime: 10, //00:00:00或者00:00:000，定时器默认为10
				isTimeAllZero: this.value === "00:00:00" || this.value === "00:00:000" && Number(this.type) !==
					2 //是否为00:00:00或者00:00:000
			}
		},

		methods: {
			init() {

				if (this.isTimeAllZero) {
					this.propsSpeed = this.timingTime
					this.propsShowCN = false
					this.propsShowDay = false
				}

				if (this.propsType === 1) {
					this.splitVal(this.timeStampChangeDate(this.timeStamp))
				} else {
					this.splitVal(this.propsVal)
				}
			},

			// 时间戳转日期
			timeStampChangeDate(val) {
				let date = new Date(val),
					h = date.getHours(), //获取小时
					m = date.getMinutes(), //获取分钟
					s = date.getSeconds(), //获取秒
					ms = (1000 + date.getMilliseconds()).toString().substr(1), //获取毫秒 000
					sTime = h + ":" + m + ":" + s,
					mTime = h + ":" + m + ":" + s + ":" + ms;

				if (this.isTimeAllZero) {
					return this.zeroFill(mTime.toString().split(":"))
						.join("")
				}
				return this.zeroFill(sTime.toString().split(":"))
					.join("")
			},
			// 时间戳转日期

			// 分割
			splitVal(val) {
				let temp = [],
					splitList = [];
				switch (val.constructor) {
					case String:
						splitList = val.replace(/[^0-9\:\.\s]/g, '').split('');
						break;
					case Number:
						splitList = val.toString().split('');
						break;
				}

				splitList.forEach((item, index) => {
					if (item === ".") {
						temp.push({
							value: item,
							backgroundPosition: this.dotX + 'px ' + this.dotY + 'px',
						})
					} else {
						let rollingNumber = Number(this.rollingNumber),
							numHeight = Number(this.numHeight);
						temp.push({
							value: item,
							backgroundPosition: '0px -' + (item * rollingNumber * numHeight + 1) + 'px',
						})
					}
				})

				// 是否显示中文
				if (this.propsShowCN) {
					this.cn(temp)
				}
				// 是否显示中文
				this.dataList = temp
				this.generate(splitList, this.propsType)
			},
			// 分割

			// 中文
			cn(temp) {
				let colonTotal = 0,
					colonCount = 0;

				// 计算共有多少个:
				temp.forEach((item) => {
					if (item.value === ':') {
						colonTotal++
					}
				})
				this.colonTotal = colonTotal
				// 计算共有多少个:

				temp.forEach((item) => {
					if (item.value === ':') {
						if (colonTotal === 3) {
							item.value = this.cnDayList[colonCount]
						} else if (colonTotal === 2) {
							item.value = this.cnHourList[colonCount]
						} else if (colonTotal === 1) {
							item.value = this.cnMinuteList[colonCount]
						}
						colonCount++
					}
				})
			},
			// 中文

			// 算是比较核心的
			generate(arr, type) {
				let box, old, crnt, temp = this.splitPropsVal;
				arr.forEach((item, index) => {
					temp[index] = Number(temp[index])
					old = temp[index]

					if (temp[index] != item && !isNaN(old)) {
						crnt = parseInt(arr[index]);
						if (type === 1 || type === 3) {
							old = (crnt - 1) < 0 ? 9 : crnt - 1;
						} else if (type === 2) {
							old = (crnt + 1) < 0 ? 9 : crnt + 1;
						}
						box = this.dataList[index]
						if (type == 1 || type === 3) {
							this.animate(box, old, 1)
						} else if (type === 2) {
							this.animate(box, old, -1)
						}
					}
				})

			},

			animate(box, old, arrow) {
				let val = 0,
					rollingNumber = Number(this.rollingNumber),
					numHeight = Number(this.numHeight);

				val = -(old * rollingNumber * numHeight) - 1

				if (old === 10 && this.isDefault) {
					val = -(old * rollingNumber * numHeight) + numHeight - 1
				}

				this.setMargin(box, val, 1, arrow, () => {
					animate(box, old + arrow, arrow);
				});
			},

			// 设置margin-top
			setMargin(box, marginTop, rec, arrow, callback) {
				let numHeight = Number(this.numHeight),
					total = Number(this.total);

				if (!isNaN(marginTop)) {
					if (this.propsType !== 2 && marginTop <= -numHeight * total) {
						marginTop = -1
					}

					if (marginTop < 0) {
						box.backgroundPosition = '0px ' + marginTop + 'px'
					}

				}
				if (rec <= Number(this.rollingNumber)) {
					this.timeoutTimer = setTimeout(() => {
						this.setMargin(box, marginTop - arrow * numHeight, ++rec, arrow, callback);
					}, parseInt(this.speedFlip));
				}

			},
			// 设置margin-top
			// 算是比较核心的


			// 正常计时
			normalTiming() {
				this.clearTimer()
				if (this.autoplay) {
					this.timeoutTimer = setTimeout(this.normalTimingTimeOutFun, 1000);
				}
			},

			normalTimingTimeOutFun() {
				this.clearTimer()
				if (!this.autoplay) {
					return
				}
				this.getSplitPropsVal(1)
				this.getNTpropsVal()
				this.init()
				this.timeoutTimer = setTimeout(this.normalTimingTimeOutFun, 1000);
			},
			// 正常计时

			// 快速计时
			fastNormalTiming() {
				this.clearTimer()
				if (this.autoplay) {
					this.timeoutTimer = setTimeout(this.fastNormalTimingTimeOutFun, this.propsSpeed);
				}
			},

			fastNormalTimingTimeOutFun() {
				this.clearTimer()
				if (!this.autoplay) {
					return
				}
				this.getSplitPropsVal(1)
				if (this.cycleIndex === 0) {
					this.getNTZPropsVal()
					this.cycleIndex = 1
				} else {
					if (this.value === "00:00:00") {
						this.timeStamp = Number(this.timeStamp) + 1
						let splitTimeStamp = this.timeStamp.toString().split(""),
							lastNum = splitTimeStamp[splitTimeStamp.length - 1];
						if (lastNum >= 9) {
							splitTimeStamp[splitTimeStamp.length - 1] = 0
							this.timeStamp = splitTimeStamp.join("")
						}
						this.timeStamp = Number(this.timeStamp) + 10
					} else
					if (this.value === "00:00:000" && this.propsType !== 2) {
						this.timeStamp = Number(this.timeStamp) + 1
						let splitTimeStamp = this.timeStamp.toString().split(""),
							lastNum = splitTimeStamp[splitTimeStamp.length - 1];
						if (lastNum >= 9) {
							splitTimeStamp[splitTimeStamp.length - 1] = 0
							this.timeStamp = splitTimeStamp.join("")
						}
						this.timeStamp = Number(this.timeStamp) + 10
					}
				}
				this.init()

				this.timeoutTimer = setTimeout(this.fastNormalTimingTimeOutFun, this.propsSpeed);
			},
			// 快速计时

			// 数字增加
			addNumber() {
				this.clearTimer()
				if (this.autoplay) {
					this.timeoutTimer = setTimeout(this.addNumberTimeOutFun, this.propsSpeed);
				}
			},

			addNumberTimeOutFun() {
				this.clearTimer()
				if (!this.autoplay) {
					return
				}
				this.getSplitPropsVal(3)
				this.tick()
				this.init()
				this.timeoutTimer = setTimeout(this.addNumberTimeOutFun, this.propsSpeed);
			},
			// 数字增加


			// 获取当前时间戳
			getNTpropsVal() {
				this.timeStamp = Math.round(new Date())
			},
			// 获取当前时间戳

			// 获取00:00:00的时间戳
			getNTZPropsVal() {
				this.timeStamp = new Date(new Date().toLocaleDateString()).getTime();
				console.log(this.timeStamp)

			},
			// 获取00:00:00的时间戳


			// 开始倒计时
			startCountDown() {
				this.clearTimer()
				if (this.autoplay) {
					this.timeoutTimer = setTimeout(this.startCountDownTimeOutFun, this.propsSpeed);
				}
			},

			startCountDownTimeOutFun() {
				this.clearTimer()
				if (!this.autoplay || this.timeOut) {
					return
				}
				this.getSplitPropsVal(2)
				this.getSCDPropsVal()
				this.init()
				this.timeoutTimer = setTimeout(this.startCountDownTimeOutFun, this.propsSpeed);
			},



			getSCDPropsVal() {
				let startTime = 0,
					endTime = 0;

				if (this.endTime.toString().length === 10) {
					endTime = Number(this.endTime) * 1000
				} else {
					endTime = Number(this.endTime)
				}

				// 判断是否传入了startTime
				if (this.startTime) {
					startTime = this.startTime
					if (this.startTime.toString().length === 10) {
						startTime = Number(this.startTime) * 1000
					}

					// 判断当前时间是否大于等于传入的开始时间
					if (new Date().getTime() >= startTime) {
						startTime = new Date().getTime()
					}


					// 判断当前时间是否大于等于传入的开始时间
				} else {
					startTime = new Date().getTime()
				}
				// 判断是否传入了startTime

				if (!this.countDown(startTime, endTime).includes("-")) {
					this.propsVal = this.countDown(startTime, endTime)
				} else {
					this.timeOut = true
					uni.$emit('timeOut', {
						msg: '00:00:00'
					})
					this.propsVal = "00:00:00"
				}
			},

			// 开始倒计时



			// 先初始化分割才有翻页效果
			getSplitPropsVal(type) {
				if (type === 1) {
					this.splitPropsVal = this.timeStampChangeDate(this.timeStamp).toString().split("")
				} else {
					this.splitPropsVal = this.propsVal.toString().split("")
				}
			},
			// 先初始化分割才有翻页效果

			/*
			 *	倒计时
			 * 	startTime 开始时间
			 *  endTime 结束时间
			 * */
			countDown(startTime, endTime) {
				let d, h, m, s, ms,
					time = endTime - startTime,
					date = new Date(time),
					timeArray = [],
					lastArray = [];
				if (this.propsShowDay) {
					// 天
					d = Math.floor(time / (24 * 60 * 60 * 1000))
					// 时
					h = Math.floor(time / (60 * 60 * 1000) - (d * 24))
					// 分
					m = date.getMinutes()
					// 秒
					s = date.getSeconds()
				} else {
					// 时
					h = Math.floor(time / (60 * 60 * 1000))
					// 分
					m = date.getMinutes()
					// 秒
					s = date.getSeconds()
					// 毫秒
					ms = (1000 + date.getMilliseconds()).toString().substr(1)
				}

				if (this.propsShowDay) {
					if (d !== 0) {
						timeArray = [d, h, m, s]
					} else {
						timeArray = [h, m, s]
					}
				} else {
					if (this.value === "00:00:000" && this.propsType === 2) {
						timeArray = [h, m, s, ms]
					} else {
						timeArray = [h, m, s]
					}

				}
				lastArray = this.zeroFill(timeArray)

				if (this.propsShowDay) {
					return lastArray[0] + lastArray[1] + lastArray[2] + lastArray[3]
				} else {
					if (this.value === "00:00:000" && this.propsType === 2) {
						return lastArray[0] + lastArray[1] + lastArray[2] + lastArray[3]
					} else {
						return lastArray[0] + lastArray[1] + lastArray[2]
					}
				}

			},
			//补0
			zeroFill(arr) {
				let lastArray = [];
				arr.forEach((item, value) => {
					if (this.isTimeAllZero) {
						if (value === 3) {
							item = item.toString().length < 2 ? '00' + item : item;
						}
						item = item.toString().length < 2 ? '0' + item : item;
					} else {
						if (arr.length === 4 && value === 0) {} else {
							item = item.toString().length < 2 ? '0' + item : item;
						}
					}

					if (value < arr.length - 1) {
						item = item + ":"
					}
					lastArray.push(item)
				})

				return lastArray
			},
			//补0

			// 清除定时器
			clearTimer() {
				clearTimeout(this.timeoutTimer);
			},
			// 清除定时器
			// 重置
			reset() {
				if (!this.value || (this.value && this.propsType === 2)) {
					return
				}
				let rollingNumber = Number(this.rollingNumber),
					numHeight = Number(this.numHeight);
				let splitList = this.value.toString().split(''),
					temp = [];

				if (this.isTimeAllZero) {
					splitList = "00:00:00:000".split('')
				}

				splitList.forEach((item, index) => {
					if (item === ".") {
						temp.push({
							value: item,
							backgroundPosition: this.dotX + 'px ' + this.dotY + 'px',
						})
					} else {
						let rollingNumber = Number(this.rollingNumber),
							numHeight = Number(this.numHeight);
						temp.push({
							value: item,
							backgroundPosition: '0px -' + (item * rollingNumber * numHeight + 1) + 'px',
						})
					}
				})


				if (this.isTimeAllZero) {
					this.getNTZPropsVal()
				}

				this.propsVal = this.value
				this.dataList = temp
			},
			// 重置
		}
	}
</script>

<style lang="scss">
	.xdsoft_flipcountdown {
		display: inline-block;

		.xdsoft_digit {
			float: left;
			background-repeat: no-repeat;
			width: 36px;
			height: 51px;
			background-image: url(/static/uni-flipcountdown/digit-md.png);
			background-position: 0px 0px;

			+.xdsoft_dot,
			+.xdsoft_space {
				width: 10px;
			}

			+.xdsoft_dot {
				background-position: -27px -3120px
			}

			+.xdsoft_space {
				background-position: -13px -3120px;
			}

			+.xdsoft_space_cn {
				background-image: unset !important;
				margin: 0 5rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
