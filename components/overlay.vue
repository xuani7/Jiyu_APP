<template>
    <view class="container">
        <u-overlay :show="show" @click="show = false">
            <view class="warp">
                <view class="rect" @tap.stop></view>
            </view>
        </u-overlay>
    </view>
</template>

<script>
    export default {
        name:"overlay",
        data() {
            return {
                show: true
            }
        },
        onLoad() {
            console.log("111")
        }
    }
</script>

<style lang="scss" scoped>
    .warp {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .rect {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }
</style>
