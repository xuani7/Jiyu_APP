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
                <u-form :model="this.targetInfo">
                    <u-form-item label="日期" name="date">
                        <uni-datetime-picker type="date" v-model="targetInfo.targetDate"
                            placeholder="点击选择日期~" returnType="timestamp"></uni-datetime-picker>
                    </u-form-item>
                    <u-form-item label="目标" name="target">
                        <u-input v-model="targetInfo.targetText" type="textarea" border-color="#7ECEFD" auto-height
                            placeholder="快来制定新目标吧~" />
                    </u-form-item>
                    <u-row gutter="16">
                        <u-col span="6">
                            <button type="default" size="mini" form-type="reset" @click="onReset">清空</button>
                        </u-col>
                        <u-col span="6">
                            <button type="primary" size="mini" form-type="submit" @click="onSubmit">提交</button>
                        </u-col>
                    </u-row>
                </u-form>
            </u-card>
        </u-popup>
        <u-toast ref="uToast"></u-toast>
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
                dot_lists: [],
                //初始化点击位置的x坐标
                startX: 0,
                show: false,
                showDate: false,
                dateMode: 'date',
                targetInfo: {
                    targetText: '',
                    targetDate: ''
                }
            }
        },
        methods: {
            onSubmit() {
                uniCloud.callFunction({
                    name: "setTargetInfo",
                    data: this.targetInfo
                }).then(res => {
                    if (res.result.updated) {
                        this.showToast()
                    }
                })
                this.changeTarget()
                this.onReset()
                
                this.$refs.target.getTargetInfo()
            },
            onReset() {
                this.targetInfo = {
                    targetText: '',
                    targetDate: ''
                }
            },

            showToast() {
                this.$refs.uToast.show({
                    title:"操作成功",
                    type:"success"
                })
            },

            changeDateShow() {
                showDate = true
            },

            /**
             * 触摸开始
             * @param {Object} e
             */
            touchStart: function(e) {
                if (e.touches.length == 1) {
                    //设置触摸起始点水平方向位置
                    this.startX = e.touches[0].clientX;
                }
            },
            /**
             * 触摸结束
             * @param {Object} e
             */
            touchEnd: function(e) {
                if (e.changedTouches.length == 1) {
                    //手指移动结束后水平位置
                    var endX = e.changedTouches[0].clientX;
                    let diff = endX - this.startX;
                    if (Math.abs(diff) > 200) {
                        if (diff > 200) {
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
            changeTarget() {
                this.show = !this.show
            },
            
            getDotList(e){
            	uniCloud.callFunction({
            		name:"getDotList",
            		data:{}
            	}).then(res => {
            		this.dot_lists = res.result.data[0].dot_list
            	})
            },
        },
        onLoad() {
            this.$nextTick(function() {
                this.$refs.uCharts.getServerData()
                this.$refs.target.getTargetInfo()
                this.getDotList()
            })
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

    .chartsContainer {
        height: 320px;
    }

    .form {
        width: 300px;
        height: 150px;
        padding: 30px;
    }
</style>
