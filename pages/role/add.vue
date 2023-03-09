<template>
	<view class="add">
		<view class="status_bar">
		    
		</view>
		<form @submit="onSubmit">
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容"></textarea>
			</view>
			
			<view class="item">				
				<uni-file-picker 
					v-model="imageValue" 
					fileMediatype="image" 
					mode="grid"
					@success="uploadSuccess" 
					
				/>
			</view>
			
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="inDisabled(formValue)">发布</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue:[],
				formValue:{
					content:""
				},
				picurls:[]
			};
		},
		methods:{
			//图片上传成功
			uploadSuccess(e){				
				this.picurls=e.tempFilePaths
			},
			
			
			//判断按钮是否禁用
			inDisabled(obj){			   
			   let bool= Object.keys(obj).some((key,value)=>{
				   return obj[key]==''
			   })
			   return bool;
			},
			//点击发布
			onSubmit(e){
				let detail=e.detail.value
				uniCloud.callFunction({
					name:"addArticle",
					data:{
						detail,
						picurls:this.picurls
					}
				}).then(res=>{
                    let articleId  = res.result.id
                    uniCloud.callFunction({
                        name:'addArticleInit',
                        data: {articleId}
                    })
					
					uni.showToast({
						title:"发布成功"
					})
					
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/role/role"
						})
					},800)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    .status_bar {
    		height: var(--status-bar-height);
    		width: 100%;
    }
.add{
	padding:30rpx;
	.item{
		padding-bottom:20rpx;
		input,textarea{
			border:1rpx solid #eee;
			height: 80rpx;
			padding:0 20rpx;
		}
		textarea{
			height: 200rpx;
			width: 100%;
			box-sizing: border-box;
		}
		button{
			margin-bottom:20rpx;
		}
	}
}
</style>
