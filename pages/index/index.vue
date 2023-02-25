<template>
    <view class="container">
        <navBar></navBar>
        <target></target>
        <lxCalendar :dot_lists="dot_lists"></lxCalendar>
        <uni-card isShadow class="chartsContainer">
            <uCharts ref="uCharts"></uCharts>
        </uni-card>
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
                dot_lists: ['2023-2-15', '2023-2-22']
            }
        },
        methods: {
            onClick(e) {
                console.log(e)
            },
        },
        onLoad() {
            this.$nextTick(function() {
                this.$refs.uCharts.getServerData()
            });
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
    .chartsContainer{
        height: 320px;
    }
</style>
