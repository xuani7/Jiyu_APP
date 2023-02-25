<template>
    <view>
        <u-popup :show="show" @close="close" @open="open">
            <view>
                <text>出淤泥而不染，濯清涟而不妖</text>
            </view>
        </u-popup>
    </view>
</template>

<script>
    export default {
        name:"clock",
        data() {
            return {
                show: false
            }
        },
        methods: {
            open() {
                this.show = true
            },
            close() {
                this.show = false
            },
            start() {
                uni.navigateTo({
                    url: "../timer/timer",
                    animationType: 'slide-in-bottom',
                    animationDuration: 300,
                    fail(err) {
                        console.log(err)
                    }
                })
            }
        },
        watch: {
            "$store.state.count": function(val, oldval) {
                this.open()
            }
        }
    }
</script>

<style scoped>
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
