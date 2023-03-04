<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <!-- 用户页面顶部 -->
        <view class="top">
            <view class="center">
                <view class="center_top">
                    <view class="center_img" @tap="gotoFeeds('/pages/my/set/set')">
                        <!-- 这里可以放自己的静态头像 -->
                        <!-- #ifndef MP-WEIXIN -->
                        <image :src="src"></image>
                        <!-- #endif -->
                        <open-data type="userAvatarUrl" class="user_head"></open-data>
                    </view>
                    <view class="center_info" @tap="gotoFeeds('/pages/my/set/set')">
                        <view class="center_name">
                            <!-- 这里可以放自己的名称图片 -->
                            <!-- #ifndef MP-WEIXIN -->
                            <view>{{userInfo.name}}</view>
                            <!-- #endif -->
                            <open-data class="nickname" type="userNickName"></open-data>
                        </view>
                    </view>
                </view>
                <image src='@/static/user/userBackground.gif' mode='scaleToFill' class='gif-wave'></image>
            </view>
        </view>

        <view class="list-cell b-b m-t" @click="navTo('个人资料')" hover-class="cell-hover" :hover-stay-time="50">
            <text class="cell-tit">个人资料</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>
        <view class="list-cell b-b" @click="navTo('我的收藏')" hover-class="cell-hover" :hover-stay-time="50">
            <text class="cell-tit">我的收藏</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>
        <view class="list-cell b-b" @click="navTo('切换用户')" hover-class="cell-hover" :hover-stay-time="50">
            <text class="cell-tit">切换用户</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>

        <view class="list-cell m-t">
            <text class="cell-tit">消息推送</text>
            <switch checked color="#7ECEFD" @change="switchChange" />
        </view>
        <view class="list-cell m-t" @click="navTo('反馈帮助')" hover-class="cell-hover" :hover-stay-time="50">
            <text class="cell-tit">反馈帮助</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>
        <view class="list-cell" @click="navTo('用户协议')" hover-class="cell-hover" :hover-stay-time="50">
        	   <text class="cell-tit">用户协议</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>

        <view class="list-cell b-b" @click="navTo('关于机遇')" hover-class="cell-hover" :hover-stay-time="50">
            <text class="cell-tit">关于我们</text>
            <image src="../../static/user/to.png" class="cell-more "></image>
        </view>
        <view class="list-cell" @click="">
            <text class="cell-tit">检查更新</text>
            <text class="cell-tip">当前版本 1.0.3</text>
        </view>
        <view class="list-cell log-out-btn" @click="toLogout">
            <text class="cell-tit">退出登录</text>
        </view>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import {
        mapMutations
    } from 'vuex';
    export default {
        components: {
            navBar
        },
        data() {
            return {
                title: '个人设置',
                src: '../../static/user/face.jpg',
                userInfo: {
                    name: "做一晚泥工"
                },
                //初始化点击位置的x坐标
                startX: 0,

            };
        },
        created() {
            this.selectImageUrl()
        },
        methods: {
            ...mapMutations(['logout']),

            navTo(url) {
                this.$api.msg(`跳转到${url}`);
            },
            async selectImageUrl() {
                let res = await this.$u.api.selectImageUrl({
                    params: {
                        user: this.userInfo.name
                    }
                })
                this.image = res.data.data
                console.log("this.image ", this.image)
            },
            gotoFeeds(url) {
                // 可以跳多级目录
                uni.navigateTo({
                    url
                })
            },
            //退出登录
            toLogout() {
                uni.showModal({
                    content: '确定要退出登录么',
                    success: (e) => {
                        if (e.confirm) {
                            this.logout();
                            setTimeout(() => {
                                uni.navigateBack();
                            }, 200)
                        }
                    }
                });
            },
            //switch
            switchChange(e) {
                let statusTip = e.detail.value ? '打开' : '关闭';
                this.$api.msg(`${statusTip}消息推送`);
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
                    if (Math.abs(diff) > 80) {
                        if (diff > 0) {
                            console.log("左滑...");

                        } else {
                            uni.navigateBack({
                                animationType: 'fade-out',
                                animationDuration: 300
                            })
                        }
                    }
                }
            },

        }
    }
</script>

<style lang='scss'>
    page {
        background: $page-color-base;
    }

    .container {
        margin-top: 60px;

    }

    .avatar {
        text-align: center;
        margin: 0 auto;
    }

    .list-cell {
        display: flex;
        align-items: baseline;
        padding: 20upx $page-row-spacing;
        line-height: 60upx;
        position: relative;
        background: #fff;
        justify-content: center;

        &.log-out-btn {
            margin-top: 40upx;

            .cell-tit {
                color: $uni-color-primary;
                text-align: center;
                margin-right: 0;
            }
        }

        &.cell-hover {
            background: #fafafa;
        }

        &.b-b:after {
            left: 30upx;
            padding: 0 2px;
        }

        &.m-t {
            margin-top: 16upx;
        }

        .cell-more {
            align-self: baseline;
            font-size: 12px;
            width: 16px;
            height: 16px;
            color: $font-color-light;
            margin-left: 10upx;
        }

        .cell-tit {
            flex: 1;
            font-size: $font-base + 2upx;
            color: $font-color-dark;
            margin-right: 10upx;
        }

        .cell-tip {
            font-size: $font-base;
            color: $font-color-light;
        }

        switch {
            transform: translateX(16upx) scale(.84);
        }
    }

    .top {
        width: 100%;
        height: 130px;
        background: #7ECEFD;
        padding-top: 15px;
        position: relative;
    }

    .center {
        width: 95%;
        height: 100px;
        background: white;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        border-radius: 5px;
    }

    .center_top {
        display: flex;
        flex-direction: row;
        width: 80%;
        height: 80px;
        margin: 0 auto;
        margin-top: 20rpx;
        border-bottom: 1px solid #EEEEEE;
    }

    .center_img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        overflow: hidden;
    }

    .center_img image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .center_img .user_head {
        width: 100%;
        height: 100%;
    }

    .center_info {
        display: flex;
        flex-direction: column;
        margin-top: 20rpx;
        margin-left: 30px;
    }

    .center_name {
        font-size: 20px;
    }

    .center_phone {
        color: #BEBEBE;
    }

    // .center_down {
    // 	display: flex;
    // 	flex-direction: row;
    // 	width: 80%;
    // 	height: 35px;
    // 	margin: 0 auto;
    // 	margin-top: 20rpx;
    // }

    .center_rank {
        width: 50%;
        height: 35px;
        display: flex;
        flex-direction: row;
    }

    .rank_text {
        height: 35px;
        line-height: 35px;
        margin-left: 10rpx;
        color: #AAAAAA;
    }

    .center_rank image {
        width: 35px;
        height: 35px;
    }

    .center_score {
        width: 50%;
        height: 35px;
        display: flex;
        flex-direction: row;
    }

    .center_score image {
        width: 35px;
        height: 35px;
    }

    .gif-wave {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 99;
        mix-blend-mode: screen;
        height: 100rpx;
    }
</style>
