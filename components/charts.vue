<template>
    <view class="charts-box">
        <qiun-data-charts type="column" :opts="opts" :chartData="chartData" errorMessage="出错啦~点击刷新" :ontouch="true" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                chartData: {
                    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    series: [{
                            name: "目标",
                            color: "#2185C5",
                            data: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                        },
                        {
                            name: "完成",
                            color: "#7ECEFD",
                            data: []
                        }
                    ]
                },
                //这里的 opts 是图表类型 type="column" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['column'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
                opts: {
                    timing: "easeOut",
                    duration: 1000,
                    rotate: false,
                    rotateLock: false,
                    color: ["#2185C5", "#7ECEFD"],
                    padding: [15, 15, 0, 5],
                    fontSize: 13,
                    fontColor: "#666666",
                    dataLabel: false,
                    dataPointShape: true,
                    dataPointShapeType: "solid",
                    touchMoveLimit: 60,
                    enableScroll: true,
                    enableMarkLine: false,
                    legend: {
                        show: false,
                        position: "bottom",
                        float: "center",
                        padding: 5,
                        margin: 5,
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        fontSize: 13,
                        fontColor: "#666666",
                        lineHeight: 11,
                        hiddenColor: "#CECECE",
                        itemGap: 10
                    },
                    xAxis: {
                        disableGrid: true,
                        disabled: false,
                        axisLine: true,
                        axisLineColor: "#CCCCCC",
                        calibration: false,
                        fontColor: "#666666",
                        fontSize: 13,
                        lineHeight: 20,
                        marginTop: 0,
                        rotateLabel: false,
                        rotateAngle: 45,
                        itemCount: 6,
                        boundaryGap: "center",
                        splitNumber: 5,
                        gridColor: "#CCCCCC",
                        gridType: "solid",
                        dashLength: 4,
                        gridEval: 1,
                        scrollShow: false,
                        scrollAlign: "left",
                        scrollColor: "#A6A6A6",
                        scrollBackgroundColor: "#EFEBEF",
                        title: "",
                        titleFontSize: 13,
                        titleOffsetY: 0,
                        titleOffsetX: 0,
                        titleFontColor: "#666666",
                        format: ""
                    },
                    yAxis: {
                        data: [{
                            min: 0,
                            disabled: true,
                            type: "value",
                            fontSize: 13,
                            position: "left",
                            calibration: false,
                            title: "打卡情况"
                        }],
                        disabled: false,
                        disableGrid: true,
                        splitNumber: 5,
                        gridType: "dash",
                        dashLength: 8,
                        gridColor: "#CCCCCC",
                        padding: 10,
                        showTitle: false
                    },
                    extra: {
                        column: {
                            type: "meter",
                            width: 30,
                            activeBgColor: "#000000",
                            activeBgOpacity: 0.08,
                            seriesGap: 2,
                            categoryGap: 2,
                            barBorderCircle: true,
                            linearType: "opacity",
                            linearOpacity: 0.8,
                            colorStop: 0,
                            meterBorder: 1,
                            meterFillColor: "#FFFFFF",
                            labelPosition: "insideTop"
                        },
                        tooltip: {
                            showBox: true,
                            showArrow: true,
                            showCategory: false,
                            borderWidth: 0,
                            borderRadius: 5,
                            borderColor: "#3E454C",
                            borderOpacity: 0.7,
                            bgColor: "#000000",
                            bgOpacity: 0.7,
                            gridType: "solid",
                            dashLength: 4,
                            gridColor: "#CCCCCC",
                            boxPadding: 3,
                            fontSize: 13,
                            lineHeight: 20,
                            fontColor: "#FFFFFF",
                            legendShow: false,
                            legendShape: "auto",
                            splitLine: true,
                            horizentalLine: false,
                            xAxisLabel: false,
                            yAxisLabel: false,
                            labelBgColor: "#FFFFFF",
                            labelBgOpacity: 0.7,
                            labelFontColor: "#666666"
                        },
                        markLine: {
                            type: "solid",
                            dashLength: 4,
                            data: []
                        }
                    }
                }
            };
        },
        mounted() {
            this.getServerData();
            uni.$on('update',()=>{
                this.getServerData()
            })
        },
        methods: {
            getServerData() {
                let dot_lists = []
                let filterData = []
                let DayData = []
                
                uniCloud.callFunction({
                    name:'getDotList'
                }).then(res => {
                    dot_lists = res.result.data[0].dot_list
                    // filterData = dot_lists.filter(item => new RegExp(('-'+ 2 +'-'),"i").test(item))
                    for (var i = 1; i < 12; i++) {
                        filterData = dot_lists.filter(item => new RegExp(('-'+ i +'-'),"i").test(item))
                        DayData.push(filterData.length)
                    }
                    this.chartData.series[1].data = DayData
                })
                
                this.chartData = JSON.parse(JSON.stringify(this.chartData))
            }
        }
    }
</script>

<style scoped>
    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
    .charts-box {
        width: 100%;
        height: 300px;
    }
</style>
