

**min-countdown 1.0.2版本，现在已支持重设倒计时**

~~~
//我就喜欢修改别人的组件
<template>
  <view class="app">
    <view>基本用法</view>
    <min-countdown :targetTime="time1" @callback="callback"></min-countdown>
    <view>修改样式用法</view>
    <min-countdown :targetTime="time2" countdownClass="red" @callback="callback"></min-countdown>
    <view>高级用法</view>
    <min-countdown :targetTime="time3" countdownClass="red" @callback="callback" :format="format"></min-countdown>
	 <view @tap="reset">重设倒计时</view>
  </view>
</template>


import minCountdown from '@/components/min-countdown'
export default {
  components: {
    minCountdown
  },
  data () {
    return {
      time1: new Date().getTime() + 15000,
      time2: new Date().getTime() + 25000,
      time3: new Date().getTime() + 25000000000,
      format: `<div>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%d0}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%d1}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%d2}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">-</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%h0}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%h1}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">:</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%m0}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%m1}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">:</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%s0}</span>
        <span style="background: #dedede; color: #fff; width: 20px; text-align: center; display: inline-block;">{%s1}</span>
        </div>`
    }
  },
  methods: {
    callback () {
      console.log('倒计时结束')
    },
	reset:function(e){
	this.timefengpan=new Date().getTime() + 25*1000; 
	}
  }
}


<style>
.red {
  color: red;
  font-size: 40rpx;
}
</style>
~~~
