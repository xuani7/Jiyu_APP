<template>
	<view class="page">
		<swiper class="c-lockScreen-view" :disable-touch='!isChange' :indicator-dots="false" :autoplay="false" :interval="3000" :duration="500" :next-margin="isChange?'100rpx':'0'" :previous-margin="isChange?'100rpx':'0'">
			<swiper-item v-for="(item,index) in screenData" :key='index' >
				<view :class="{'c-lockScreen-view-change':isChange}" class="c-lockScreen-view-default" @longpress="longpress" @click="click(item)" @touchend="touchend">
					<image class="c-lockScreen-view-image" :src="item.value" mode="aspectFill"></image>
					<view :style="{'top':(isChange?16:top)+'px'}" style="position: relative;width: 100%;height: 100%;">
						<image class="c-lockScreen-view-Lock" src="/static/c-lockScreen/Lock.svg" mode=""></image>
						<view class="c-lockScreen-view-date"><text>Monday, June 6</text></view>
						<view class="c-lockScreen-view-time"><text>9:41</text></view>
						<view class="c-lockScreen-view-bottom">
							<image class="c-lockScreen-view-bottom-image" src="/static/c-lockScreen/Flashlight.png" mode=""></image>
							<view class="c-lockScreen-view-bottom-text">
								<image src="/static/c-lockScreen/Focus.svg" mode=""></image>Do Not Disturb
							</view>
							<image class="c-lockScreen-view-bottom-image" src="/static/c-lockScreen/Camera.png" mode=""></image>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	/**
	 * c-lockScreen 锁屏组件
	 * @property {Array} screenData [{id:'',value:''}]
	 * @event {Function()} confirm @return {Object} {id:'',value:''} 
	 * */
	import {ref} from 'vue'
	const props = defineProps({
		screenData:{
			type:Array,
			default:()=>[]
		}
	})
	const emits = defineEmits(['confirm'])
	const top = uni.getSystemInfoSync().statusBarHeight+18
	let isChange = ref(false)
	let islongPress=false //长按记录变量
	const longpress=()=>{
		islongPress = true;
		isChange.value=true
	}
	const touchend=()=>{
	   //延时执行为了防止 click() 还未判断 islongPress 的值就被置为 fasle
		setTimeout(() => {
			islongPress = false
		}, 200)
	}
	const click=(item)=>{
	   if(islongPress == false){
		   // console.log("不是长按事件");
		   if(isChange.value)emits('confirm',item)
		   isChange.value=false
	   }else if(islongPress == true){
		   // console.log("长按事件");
		   // isChange.value=true
	   }
   }
</script>

<style lang="scss">
.page{position: relative;}
.c-lockScreen-view{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	swiper-item{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.c-lockScreen-view-default{
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.3s;
	}
	.c-lockScreen-view-change{
		// width: 100%;
		height: 73%;
		// margin: auto 20rpx;
		border-radius: 40rpx;
		overflow: hidden;
		// transform: scale(0.9);
		transform: scale(0.9);
		.c-lockScreen-view-date{
			>text{
				font-size: 32rpx;
			}
		}
		.c-lockScreen-view-time{
			>text{
				font-size: 148rpx;
				line-height: 176rpx;
			}
		}
		.c-lockScreen-view-bottom{
			.c-lockScreen-view-bottom-image{
				width: 74rpx;
				height: 74rpx;
			}
			.c-lockScreen-view-bottom-text{
				font-size: 22rpx;
				>image{
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}
	.c-lockScreen-view-image{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.c-lockScreen-view-Lock{
		width: 48rpx;
		height: 70rpx;
		display: block;
		margin: 0 auto;
	}
	.c-lockScreen-view-date{
		margin: 32rpx 0;
		text-align: center;
		>text{
			font-weight: 500;
			font-size: 44rpx;
			line-height: 48rpx;
			text-align: center;
			letter-spacing: 0.38rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			// 文字颜色渐变
			// background: linear-gradient(0deg, rgba(255, 255, 255, 0.6) 20.17%, rgba(255, 255, 255, 0) 67.23%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), #FFFFFF;
			// background-clip: text;
			// text-fill-color: transparent;
			// background-blend-mode: overlay, soft-light, overlay;
			// mix-blend-mode: soft-light;
			// backdrop-filter: blur(200rpx);
			// color: transparent;
			color: #FFFFFF;
		}
	}
	.c-lockScreen-view-time{
		text-align: center;
		position: relative;
		bottom:35rpx;
		>text{
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			font-size: 200rpx;
			line-height: 200rpx;
			letter-spacing: -4.24rpx;
			// background: linear-gradient(0deg, rgba(255, 255, 255, 0.35) 20.17%, rgba(255, 255, 255, 0) 67.23%), linear-gradient(0deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), #FFFFFF;
			// background-clip: text;
			// text-fill-color: transparent;
			// background-blend-mode: overlay, soft-light, overlay;
			// color: transparent;
			color: #FFFFFF;
		}
	}
	.c-lockScreen-view-bottom{
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 45rpx calc(constant(safe-area-inset-bottom) + 120rpx); //兼容 IOS<11.2
		padding: 0 45rpx calc(env(safe-area-inset-bottom) + 120rpx); //兼容 IOS>11.2
		.c-lockScreen-view-bottom-image{
			width: 100rpx;
			height: 100rpx;
			// background: rgba(255, 255, 255, 0.35);
			// mix-blend-mode: normal;
			// backdrop-filter: blur(64rpx);
			// border-radius: 200rpx;

		}
		.c-lockScreen-view-bottom-text{
			display: flex;
			align-items: center;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 400;
			font-size: 30rpx;
			line-height: 40rpx;
			color: #FFFFFF;
			>image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 12rpx;
			}
		}
	}
}
</style>