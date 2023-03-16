# c-lockScreen

### 
- c-design 锁屏组件

### 示例预览
[https://cloud.vuedata.wang/cdesign/#/pages/lockScreen/lockScreen](https://cloud.vuedata.wang/cdesign/#/pages/lockScreen/lockScreen)

### 一、使用示例
```html
   <template>
   	<view>
   		<c-lockScreen :screenData='screenData' @confirm='confirm'></c-lockScreen>
   	</view>
   </template>
   
   <script>
   	export default {
   		data() {
   			return {
   				screenData:[
   					{id:1,value:'/static/c-lockScreen/1.jpg'},
   					{id:2,value:'/static/c-lockScreen/2.jpg'},
   					{id:3,value:'/static/c-lockScreen/3.jpg'}
   				]
   			}
   		},
   		methods: {
   			confirm(e){
   				console.log(e);
   			}
   		}
   	}
   </script>
   <style>
   
   </style>
```



### 二、属性介绍

| 字段             | 类型      | 必填 | 默认值               | 描述  |
| ----------- | -------- | ---- | ---------------------- | ------------------------------- |
| screenData  | Array | 是  |  []                   | 需要展示的图片数据 格式：[{id:'',value:''}]       |



### 三、事件

| 字段      | 描述  |
| --------- | ------------------------ |
| confirm   | 点击确定按钮的响应事件  返回当前点击的对象 {id:'',value:''}    | 
