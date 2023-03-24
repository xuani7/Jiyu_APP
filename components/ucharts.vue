<template>
    <view class="charts-box">
        <qiun-data-charts type="line" :opts="opts" :chartData="chartData" errorMessage="出错啦~点击刷新" :ontouch="true" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
				dayNum:0,
				mouth:0,
                chartData: {
                    categories: [],
                    series: [{
						name: "专注时间",
						color: "#FF7F66",
						data: [],
                    }]
                },
                //这里的 opts 是图表类型 type="column" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['column'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
                opts: {
					enableScroll:true,
                    color: ["#FF7F66"],
					padding: [15,10,0,15],
					enableScroll: true,
					legend: {
						show: false
					},
					xAxis: {
					  disableGrid: true,
					  itemCount:5
					},
					yAxis: {
					  gridType: "dash",
					  dashLength: 2,
					  disabled: true
					},
					extra: {
					  line: {
						type: "curve",
						width: 2,
						activeType: "hollow"
					  }
					}
                }
            };
        },
        mounted() {
            this.getServerData();
			this.getMouth()
            uni.$on('update1',()=>{
                this.getServerData()
            })
        },
        methods: {
			getMouth(){
				let myDate = new Date()
				let Mouth = myDate.getMonth() + 1
				this.mouth = Mouth
				let DayNum = 0
				if(Mouth == 2){
					DayNum = 28
				}
				if ([1,3,5,7,8,10,12].indexOf(Mouth) == -1){
					DayNum = 30
				}else{
					DayNum = 31
				}
				this.dayNum = DayNum
				for (var i = 1; i <= DayNum; i++) {
					this.chartData.categories.push(Mouth+"-"+i)
				}
			},
            getServerData() {
                let focus_lists = []
                let filterData = []
                let DayData = []
                
                uniCloud.callFunction({
                    name:'getFocusList'
                }).then(res => {
                    focus_lists = res.result.data[0].focus_list
                    // filterData = focus_lists.filter(item => new RegExp(('-'+ 2 +'-'),"i").test(item))
                    for (var i = 1; i <= this.dayNum; i++) {
                        filterData = focus_lists.filter(item => new RegExp(('/'+ this.mouth +'/'+i+"$"),"i").test(item.focusDate))
						if(filterData.length == 0){
							DayData.push(0)
						}else{
							DayData.push(filterData[0].focusTime)
						}
                    }
                    this.chartData.series[0].data = DayData
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
