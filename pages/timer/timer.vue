<template>
    <view class="content">
        <!-- <countdown></countdown>
        <minCountdown :targetTime="time2" countdownClass="red" @callback="callback" :format="format"></minCountdown> -->
        <clock></clock>
    </view>
</template>

<script>
    import countdown from "@/components/flipcountdown-uni/flipcountdown-uni.vue"
    import minCountdown from "@/components/min-countdownre-tag/min-countdown.vue"
    import clock from "@/components/clock-learn/index.vue"
    export default {
        components: {
            countdown,
            minCountdown,
            clock
        },
        data() {
            return {
                title: '',
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
        onLoad() {

        },
        methods: {
            callback() {
                console.log('倒计时结束')
            },
            reset: function(e) {
                this.time2 = new Date().getTime() + 25 * 1000;
                this.time1 = new Date().getTime() + 25 * 1000;
                this.time3 = new Date().getTime() + 25 * 1000;
            }
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .red {
      color: red;
      font-size: 40rpx;
    }
</style>
